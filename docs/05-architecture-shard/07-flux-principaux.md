# Flux principaux

> **Document :** Architecture technique (05) — projet digital-artisan (D-G), application D-g
> **Partie :** 7 / 12 · [Retour à l’index](./index.md)
> **Contenu :** Les flux détaillés : connexion d’un employé, réinitialisation du mot de passe, création du premier administrateur, création transactionnelle d’une réparation (RPC create_repair), modification d’un statut, consultation publique, transmission du lien et ticket d’atelier (section 13).

---

## 13. Flux principaux

### Connexion d’un employé

```text
Employé
    │
    ▼
Supabase Auth
    │
    ▼
Session créée   ← l'authentification RÉUSSIT quel que soit l'état du profil
    │
    ▼
Lecture du profil (policy profiles_select_self)
    │
    ├── active ──► accès autorisé
    ├── pending ──► page « compte en attente de validation »
    └── rejected ──► page « accès refusé »
```

La session existe dans les trois cas. Seules les politiques RLS empêchent un compte non actif d’atteindre les données (§3, §11).

---

### Réinitialisation du mot de passe

```text
Formulaire « mot de passe oublié »
    │
    ▼
supabase.auth.resetPasswordForEmail(email, { redirectTo })
    │
    ▼
E-mail contenant un lien à usage unique
    │
    ▼
Page /mot-de-passe-oublie/nouveau
    │
    ▼
supabase.auth.updateUser({ password })
```

Le message affiché après soumission est **identique** que l’adresse existe ou non : il ne doit pas permettre d’énumérer les comptes.

Cette fonctionnalité dépend du SMTP mutualisé de Supabase, limité en débit (`docs/03-stack.md` §9).

---

### Création du premier administrateur

Sans amorçage, l’application est inutilisable à son premier déploiement : tout compte naît `pending`, seul un administrateur peut l’activer, et aucun administrateur n’existe.

| Option | Verdict |
|---|---|
| « Le premier inscrit devient admin » | **Écartée.** Toute personne découvrant l’URL avant le responsable de l’atelier deviendrait administrateur. Fenêtre de vulnérabilité critique entre le déploiement et la première inscription. |
| Promotion manuelle via le dashboard Supabase | Fonctionne, mais non reproductible, non tracée, et suppose de savoir naviguer dans l’éditeur SQL. |
| **Migration de seed idempotente** | **Retenue.** Tracée dans le dépôt, rejouable, explicite. |

Le responsable de l’atelier s’inscrit **d’abord normalement** via le formulaire ; la migration le promeut ensuite sur la seule base de son adresse e-mail. Aucun mot de passe ne figure dans le dépôt.

```sql
-- =============================================================================
-- Amorçage : promotion du premier administrateur
-- Idempotente : rejouable sans effet de bord.
-- =============================================================================

do $$
declare
  v_admin_email text := 'responsable@digital-artisan.example';  -- à adapter
  v_user_id     uuid;
begin
  select id into v_user_id from auth.users where lower(email) = lower(v_admin_email);

  if v_user_id is null then
    raise notice 'Aucun compte pour % : inscrire ce compte puis rejouer la migration.', v_admin_email;
    return;
  end if;

  update public.profiles
  set role = 'admin', status = 'active'
  where id = v_user_id and (role <> 'admin' or status <> 'active');

  raise notice 'Administrateur initial promu : %', v_admin_email;
end;
$$;
```

Le trigger `profiles_guard_privileges` ne bloque pas cette migration : elle s’exécute avec les privilèges du propriétaire, hors session authentifiée.

---

### Création d’une réparation

Le parcours nominal d’un dépôt en atelier crée potentiellement **trois lignes** dans trois tables : le client, son vélo, et la réparation.

**Problème.** Le client Supabase JS ne permet pas de transaction multi-requêtes : chaque appel est une requête HTTP indépendante et auto-commitée. Si l’insertion du client réussit, celle du vélo réussit et celle de la réparation échoue — validation, contrainte, coupure réseau —, la base conserve un client et un vélo **orphelins**. L’employé, voyant l’erreur, recommence le formulaire et crée un **doublon** de client. Sur quelques semaines, la table `clients` se pollue de doublons partiels qui dégradent la recherche et faussent l’historique par client. Aucune compensation applicative n’est fiable : un `DELETE` de rattrapage peut lui-même échouer, et il faudrait le protéger contre la suppression d’un client préexistant.

**Solution : une fonction RPC PostgreSQL.** Le corps d’une fonction PostgreSQL s’exécute dans une transaction implicite : soit les trois lignes existent, soit aucune.

```text
Formulaire (recherche du client, puis du vélo, puis problème signalé)
    │
    ▼
Server Action
    │
    ├── vérifie la session
    ├── vérifie que le profil est actif
    ├── valide les données (Zod)
    └── appelle la RPC create_repair
            │
            ▼
    PostgreSQL — transaction implicite
            │
            ├── client existant réutilisé, ou créé
            ├── vélo existant réutilisé, ou créé
            ├── FK composite : le vélo appartient bien au client
            └── réparation créée, jeton public généré par défaut
            │
            ▼
    revalidatePath + redirection vers la fiche créée
```

```sql
-- =============================================================================
-- RPC transactionnelle : client + vélo + réparation en une seule opération
-- =============================================================================

create or replace function public.create_repair(
  p_client_id     uuid    default null,   -- renseigné si le client existe déjà
  p_client_name   text    default null,
  p_client_phone  text    default null,
  p_client_email  text    default null,
  p_bike_id       uuid    default null,   -- renseigné si le vélo existe déjà
  p_bike_brand    text    default null,
  p_bike_model    text    default null,
  p_problem       text    default null,
  p_repairer_id   uuid    default null,
  p_status        public.repair_status default 'deposited'
)
returns uuid
language plpgsql
security invoker            -- INVOKER : la RLS de l'appelant s'applique
set search_path = public, pg_temp
as $$
declare
  v_client_id uuid;
  v_bike_id   uuid;
  v_repair_id uuid;
begin
  if not public.is_active_member() then
    raise exception 'Accès refusé : profil non actif (§10).'
      using errcode = 'insufficient_privilege';
  end if;

  if p_client_id is not null then
    v_client_id := p_client_id;
  else
    insert into public.clients (name, phone, email)
    values (p_client_name, p_client_phone, p_client_email)
    returning id into v_client_id;
  end if;

  if p_bike_id is not null then
    v_bike_id := p_bike_id;
  else
    insert into public.bikes (client_id, brand, model)
    values (v_client_id, p_bike_brand, p_bike_model)
    returning id into v_bike_id;
  end if;

  -- La FK composite (§10) vérifie ici que le vélo appartient bien au client,
  -- y compris lorsque p_bike_id désigne un vélo préexistant.
  insert into public.repairs (client_id, bike_id, repairer_id, problem, status)
  values (v_client_id, v_bike_id, p_repairer_id, p_problem, p_status)
  returning id into v_repair_id;

  return v_repair_id;
  -- Toute exception annule l'intégralité : ni client ni vélo orphelins.
end;
$$;

revoke execute on function public.create_repair from public, anon;
grant  execute on function public.create_repair to authenticated;
```

`security invoker` est ici délibéré : contrairement à `get_public_repair`, cette fonction doit rester soumise à la RLS de l’appelant. Elle apporte l’**atomicité**, pas une élévation de privilèges. La vérification `is_active_member()` en tête produit un message d’erreur explicite plutôt qu’un échec silencieux de policy.

---

### Modification d’un statut

```text
Utilisateur interne
    │
    ▼
Server Action
    │
    ├── vérifie les permissions
    ├── valide le nouveau statut (Zod, contre l'enum)
    ├── met à jour la réparation
    │      └── trigger : updated_at rafraîchie
    │      └── trigger : refus si la fiche était déjà 'returned' (§9)
    │
    ├── revalidatePath('/reparations')
    ├── revalidatePath('/reparations/' + id)
    └── revalidatePath('/suivi/' + token)
```

**Pas de temps réel.** Un changement de statut n’apparaît pas spontanément sur l’écran des autres employés : il devient visible **dès leur prochaine consultation** de la fiche ou de la liste.

Justification :

1. **Le contexte métier ne l’exige pas.** Un atelier de deux à cinq personnes travaillant dans le même local coordonne par la parole. Le besoin réel est « quand j’ouvre la fiche, je vois l’état à jour », pas « mon écran se rafraîchit tout seul ».
2. **La stack est figée.** Supabase Realtime n’y figure pas ; l’ajouter serait une décision de stack, pas d’architecture.
3. **Le coût pédagogique serait disproportionné** : abonnements, nettoyage, reconnexion, cohérence avec la RLS.

Le mécanisme retenu est `revalidatePath()` de l’App Router, appelé dans la Server Action après mutation. Il invalide le cache serveur de la liste, de la fiche et de la page publique.

---

### Consultation publique

```text
Lien de suivi reçu par SMS ou e-mail
    │
    ▼
Page Next.js /suivi/[token]
    │
    ├── validation du format du jeton
    │      └── invalide ──► message neutre, sans appel à la base
    │
    ▼
RPC get_public_repair(token) avec la clé anon
    │
    ├── 1 ligne ──► données publiques uniquement
    └── 0 ligne ou erreur ──► message neutre, même code HTTP
```

### Transmission du lien au client

Un jeton UUID de 36 caractères n’est ni dictable au téléphone, ni recopiable à la main. La transmission est donc **manuelle et assistée**, par un canal écrit : un **bouton de copie du lien** sur la fiche de réparation, puis un **SMS ou un e-mail** envoyé au client par l’employé depuis le téléphone ou la messagerie de l’atelier, selon la coordonnée disponible. C’est le seul canal de transmission au client.

Aucune notification automatique n’est envoyée par l’application : les notifications métier sont hors périmètre du MVP (PRD §13).

### Ticket d’atelier et QR code interne

Le QR code n’est pas destiné au client : il figure sur un **ticket d’atelier** de petit format, imprimé depuis la fiche et accroché au vélo. Il encode l’URL de la **fiche interne** de la réparation — `/reparations/[id]`, et non le lien public `/suivi/[token]`. Le réparateur scanne le ticket accroché au guidon et ouvre directement la bonne fiche pour en changer le statut, sans passer par la recherche.

Cette route appartient au groupe `(internal)` (§6) : elle est déjà couverte par la protection des routes assurée par `src/middleware.ts`. Un scan par un appareil sans session valide aboutit donc à la page de connexion, sans qu’aucune donnée de la réparation ne soit rendue ; un membre dont le compte n’est pas actif reste bloqué par les mêmes vérifications que sur toute autre page interne (§10, RM-01). Aucun mécanisme spécifique n’est introduit pour le QR code — l’identifiant qu’il encode n’est pas un secret, c’est la session qui protège l’accès.
