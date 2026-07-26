# Permissions, politiques RLS et sécurité du suivi public

> **Document :** Architecture technique (05) — projet digital-artisan (D-G), application D-g
> **Partie :** 6 / 12 · [Retour à l’index](./index.md)
> **Contenu :** La règle structurante is_active_member(), les fonctions helper, le piège plpgsql contre sql, l’ensemble des politiques RLS par table, puis les options comparées pour le suivi public et la fonction get_public_repair() retenue (sections 11 et 12).

---

## 11. Permissions et politiques RLS

Les politiques RLS sont activées sur **toutes** les tables métier.

### Règle structurante — la plus importante du document

> **Aucune policy ne se contente de `auth.uid() is not null`. Toute policy sur une table métier appelle `is_active_member()`.**

La raison est exposée au §3 : un compte `pending` ou `rejected` possède une session Supabase valide et peut interroger PostgREST directement, sans passer par Next.js. Une policy écrite `USING (auth.uid() is not null)` — la traduction intuitive de « être connecté » — retournerait à ce compte **toutes les réparations, tous les clients avec leurs téléphones et e-mails, toutes les notes internes**.

Le cas `rejected` est le plus grave : une personne à qui l’atelier a **explicitement refusé** l’accès conserverait un accès complet aux données.

Cette règle s’applique sans exception à chaque nouvelle table ajoutée au produit.

### Seconde règle — performance

Les appels de fonction sont enveloppés dans `(select …)`. PostgreSQL les évalue alors une fois par requête (*InitPlan*) au lieu d’une fois par ligne. Sans cette enveloppe, l’advisor Supabase `auth_rls_initplan` signale l’anomalie et les listes ralentissent proportionnellement au volume.

### Fonctions helper

```sql
-- =============================================================================
-- Fonctions helper — SECURITY DEFINER, PL/pgSQL
-- =============================================================================

-- IMPORTANT : language plpgsql, PAS sql.
-- PostgreSQL inline les fonctions SQL simples lors de la planification ;
-- une fois inlinée, la fonction perd son contexte SECURITY DEFINER,
-- la RLS s'applique de nouveau et la récursion revient.
-- Les fonctions PL/pgSQL ne sont jamais inlinées.

create or replace function public.is_active_member()
returns boolean
language plpgsql
stable
security definer
set search_path = public, pg_temp
as $$
declare ok boolean;
begin
  select (p.status = 'active') into ok
  from public.profiles p
  where p.id = auth.uid();
  return coalesce(ok, false);   -- pas de profil => false
end;
$$;

comment on function public.is_active_member() is
  'Un compte pending ou rejected possède une session Supabase VALIDE et peut interroger PostgREST directement. Toute policy sur une table métier doit appeler cette fonction — jamais auth.uid() is not null seul.';

create or replace function public.is_admin()
returns boolean
language plpgsql
stable
security definer
set search_path = public, pg_temp
as $$
declare ok boolean;
begin
  select (p.role = 'admin' and p.status = 'active') into ok
  from public.profiles p
  where p.id = auth.uid();
  return coalesce(ok, false);
end;
$$;

comment on function public.is_admin() is
  'Parade à la récursion infinie : une policy sur profiles qui interrogerait profiles échoue en 42P17. SECURITY DEFINER contourne la RLS dans le corps de la fonction.';

revoke execute on function public.is_active_member() from public, anon;
revoke execute on function public.is_admin()         from public, anon;
grant  execute on function public.is_active_member() to authenticated;
grant  execute on function public.is_admin()         to authenticated;
```

### Pourquoi `plpgsql` et non `sql` — le piège dans le piège

Une policy sur `profiles` qui interroge `profiles` pour vérifier le rôle administrateur provoque une **récursion infinie** :

```sql
-- ⚠️ CASSE : erreur 42P17 "infinite recursion detected in policy for relation profiles"
create policy profiles_admin_update on public.profiles for update
  using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'));
```

La policy interroge la table, ce qui déclenche la policy, qui interroge la table… PostgreSQL détecte le cycle et échoue. La conséquence est totale : l’administrateur ne peut valider aucune inscription, donc **aucun employé n’accède jamais à l’application**.

`SECURITY DEFINER` fait s’exécuter le corps avec les droits du propriétaire, qui contourne la RLS — d’où l’absence de récursion.

Le détail décisif : la fonction doit être écrite en **`plpgsql`**, pas en `sql`. PostgreSQL *inline* les fonctions SQL simples lors de la planification ; une fois inlinée, la fonction **perd son contexte `SECURITY DEFINER`**, la RLS s’applique de nouveau à la requête interne et **la récursion revient**. Les fonctions PL/pgSQL ne sont jamais inlinées. Ce piège est peu documenté et le message d’erreur ne le suggère pas.

`SET search_path = public, pg_temp` est obligatoire : sans lui, une fonction `SECURITY DEFINER` est vulnérable au détournement par un schéma malveillant. `coalesce(…, false)` gère le cas d’un utilisateur sans profil.

**Alternative écartée : les custom claims JWT** (rôle inscrit dans le jeton). Plus performants, mais le jeton ne se rafraîchit qu’à son expiration — un employé validé resterait bloqué jusqu’à sa prochaine connexion, et un employé révoqué garderait ses droits jusque-là. Pour un atelier de quelques personnes, la fonction helper est le bon arbitrage.

### Politiques

```sql
-- =============================================================================
-- Activation de la RLS sur toutes les tables métier
-- =============================================================================
alter table public.profiles     enable row level security;
alter table public.clients      enable row level security;
alter table public.bikes        enable row level security;
alter table public.repairs      enable row level security;
alter table public.repair_notes enable row level security;

-- Aucune policy DELETE nulle part : refus par défaut,
-- doublé du REVOKE et du trigger (§10).

-- -----------------------------------------------------------------------------
-- profiles
-- -----------------------------------------------------------------------------

-- Tout utilisateur authentifié lit SON profil : indispensable à la connexion,
-- puisque c'est cette lecture qui détermine si l'accès est accordé (§13).
-- Seul endroit où is_active_member() n'est pas exigé — un compte pending
-- doit pouvoir constater son propre état.
create policy profiles_select_self on public.profiles
  for select to authenticated
  using ((select auth.uid()) = id);

-- Un membre actif lit les autres profils : nécessaire à l'affectation
-- d'un réparateur et à l'affichage des auteurs de notes (§5).
create policy profiles_select_active_members on public.profiles
  for select to authenticated
  using ((select public.is_active_member()));

-- Chacun met à jour son nom, jamais son rôle ni son état.
-- Le verrou est porté par le trigger ci-dessous : WITH CHECK ne peut pas
-- comparer new et old, il ne verrait pas une auto-promotion en admin.
create policy profiles_update_self on public.profiles
  for update to authenticated
  using ((select auth.uid()) = id)
  with check ((select auth.uid()) = id);

create or replace function public.guard_profile_privileges()
returns trigger
language plpgsql
security definer
set search_path = public, pg_temp
as $$
begin
  if (new.role is distinct from old.role or new.status is distinct from old.status)
     and not public.is_admin() then
    raise exception 'Seul un administrateur peut modifier le rôle ou l''état d''un profil (§11).'
      using errcode = 'insufficient_privilege';
  end if;
  -- Un administrateur ne se retire pas lui-même ses droits par accident.
  if new.id = auth.uid() and old.role = 'admin' and new.role <> 'admin' then
    raise exception 'Un administrateur ne peut pas se retirer son propre rôle.'
      using errcode = 'insufficient_privilege';
  end if;
  return new;
end;
$$;

create trigger profiles_guard_privileges
  before update on public.profiles
  for each row execute function public.guard_profile_privileges();

-- Un administrateur valide ou refuse une inscription.
-- is_admin() est SECURITY DEFINER : aucune récursion.
create policy profiles_update_admin on public.profiles
  for update to authenticated
  using ((select public.is_admin()))
  with check ((select public.is_admin()));

-- Pas de policy INSERT : les profils sont créés par le trigger
-- on_auth_user_created, en SECURITY DEFINER, hors RLS.

-- -----------------------------------------------------------------------------
-- clients et bikes — membres actifs uniquement, aucun accès public
-- -----------------------------------------------------------------------------
create policy clients_select on public.clients
  for select to authenticated using ((select public.is_active_member()));
create policy clients_insert on public.clients
  for insert to authenticated with check ((select public.is_active_member()));
create policy clients_update on public.clients
  for update to authenticated
  using ((select public.is_active_member()))
  with check ((select public.is_active_member()));

create policy bikes_select on public.bikes
  for select to authenticated using ((select public.is_active_member()));
create policy bikes_insert on public.bikes
  for insert to authenticated with check ((select public.is_active_member()));
create policy bikes_update on public.bikes
  for update to authenticated
  using ((select public.is_active_member()))
  with check ((select public.is_active_member()));

-- -----------------------------------------------------------------------------
-- repairs
-- -----------------------------------------------------------------------------
-- Tous les membres actifs voient toutes les réparations : c'est l'objectif
-- produit (« un point de référence partagé par toute l'équipe », PRD §1)
-- et la matrice de permissions du PRD §9 ne distingue pas admin et employé ici.
create policy repairs_select on public.repairs
  for select to authenticated using ((select public.is_active_member()));
create policy repairs_insert on public.repairs
  for insert to authenticated with check ((select public.is_active_member()));
create policy repairs_update on public.repairs
  for update to authenticated
  using ((select public.is_active_member()))
  with check ((select public.is_active_member()));

-- Aucune policy pour anon : la page publique passe par la fonction dédiée (§12).

-- -----------------------------------------------------------------------------
-- repair_notes — jamais exposées publiquement
-- -----------------------------------------------------------------------------
create policy repair_notes_select on public.repair_notes
  for select to authenticated using ((select public.is_active_member()));

-- L'auteur déclaré est nécessairement l'utilisateur courant : pas d'usurpation.
create policy repair_notes_insert on public.repair_notes
  for insert to authenticated
  with check ((select public.is_active_member()) and author_id = (select auth.uid()));

-- Ni UPDATE ni DELETE : append-only.
```

### Synthèse par table

| Table | `anon` | `pending` / `rejected` | `active` (employé) | `admin` |
|---|---|---|---|---|
| `profiles` | aucun accès | lecture de son seul profil | lecture de tous, écriture de son nom | + modification du rôle et de l’état |
| `clients` | aucun accès | aucun accès | lecture, création, modification | idem |
| `bikes` | aucun accès | aucun accès | lecture, création, modification | idem |
| `repairs` | aucun accès direct — voir §12 | aucun accès | lecture, création, modification | idem |
| `repair_notes` | aucun accès | aucun accès | lecture, ajout | idem |

Aucune ligne de ce tableau ne comporte de suppression : elle n’existe nulle part.

---

## 12. Sécurité du suivi public

Le suivi public est **le point le plus sensible du produit** : c’est la seule surface accessible sans authentification, et elle donne accès à des données personnelles.

### Options comparées

| Option | Fonctionnement | Verdict |
|---|---|---|
| **A.** Lecture serveur avec la clé anon + policy `USING (true)` sur `repairs` | Next.js filtre par `.eq('public_token', token)` | **Rejetée — faille.** Le filtre est appliqué par le client, pas par la base. `GET /rest/v1/repairs` avec la clé anon — publique par construction — retourne toute la table. |
| **B.** Policy comparant le jeton à un en-tête HTTP | `USING (public_token::text = current_setting('request.headers',true)::json->>'x-tracking-token')` | **Rejetée.** Fonctionne, mais dépend d’un en-tête propagé correctement à chaque appel ; non idiomatique, fragile, difficile à auditer. |
| **C.** `service_role key` dans le Server Component | Contourne la RLS ; le code filtre et projette | **Rejetée — fragile.** Un `.eq()` oublié, un `select('*')` au lieu d’une projection, et la base entière fuit sur une page publique. La sécurité reposerait sur zéro erreur, pour toujours. Une clé `service_role` n’a rien à faire dans un chemin de rendu public — et la stack §11 ne la provisionne pas. |
| **D.** Vue `security_invoker` restreinte aux colonnes publiques | `anon` lit la vue et filtre par jeton | Correcte mais insuffisante : `anon` peut énumérer la vue entière sans jeton. Il faudrait y adjoindre une policy — on retombe sur B. |
| **E.** Fonction `SECURITY DEFINER` exposée en RPC | `anon` appelle `get_public_repair(token)` ; aucun accès direct aux tables | **RETENUE.** |

### Pourquoi l’option E

1. **Aucune énumération possible.** `anon` n’a aucun privilège sur les tables métier (`REVOKE` du §8). Sans jeton valide, il n’existe aucune requête retournant quoi que ce soit.
2. **La projection est structurelle, pas conventionnelle.** Le type de retour est figé dans la signature : la fonction ne *peut pas* retourner de note interne, de coordonnées client ou de `repairer_id`. Un développeur distrait ne peut pas élargir la fuite sans modifier délibérément une migration — relue en tant que telle.
3. **Un seul point d’audit.** Une vingtaine de lignes de SQL portent toute la surface publique du produit.
4. **Aucune clé privilégiée dans le chemin public.**
5. **Le §3 est satisfait par construction :** les notes internes ne sont pas masquées au rendu, elles ne quittent jamais la base.

### La fonction

```sql
-- =============================================================================
-- Suivi public — surface d'exposition unique de l'application
-- =============================================================================

create or replace function public.get_public_repair(p_token uuid)
returns table (
  bike_brand      text,
  bike_model      text,
  status          public.repair_status,
  public_message  text,
  created_at      timestamptz,
  updated_at      timestamptz
)
language plpgsql
stable
security definer
set search_path = public, pg_temp
as $$
begin
  -- La liste des colonnes retournées est FIGÉE par la signature.
  -- Ne sortent jamais : repair_notes, clients (nom/téléphone/e-mail),
  -- repairer_id, problem, ni aucun identifiant interne (§11, §17).
  return query
  select
    b.brand,
    b.model,
    r.status,
    r.public_message,
    r.created_at,
    r.updated_at
  from public.repairs r
  join public.bikes  b on b.id = r.bike_id
  where r.public_token = p_token;
  -- Jeton inconnu => 0 ligne. Aucune distinction entre « inexistant »
  -- et « non autorisé » : réponse neutre (UX §9).
end;
$$;

comment on function public.get_public_repair(uuid) is
  'Unique surface publique de l''application. anon n''a aucun accès direct aux tables métier. Le type de retour interdit structurellement toute fuite de donnée interne (§11).';

-- anon peut appeler cette fonction, et rien d'autre.
revoke execute on function public.get_public_repair(uuid) from public;
grant  execute on function public.get_public_repair(uuid) to anon, authenticated;
```

### Utilisation côté Next.js

```tsx
// src/app/suivi/[token]/page.tsx — Server Component
// Client Supabase avec la clé ANON. Jamais la service_role key ici.

export const revalidate = 60; // absorbe les requêtes répétées (§17)

export default async function TrackingPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;

  // Un jeton mal formé n'atteint jamais la base : même réponse neutre.
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(token)) {
    return <TrackingNotFound />;
  }

  const supabase = createAnonClient();
  const { data, error } = await supabase.rpc('get_public_repair', { p_token: token });

  // Même rendu et même code HTTP pour « introuvable » et « erreur » (UX §9).
  if (error || !data?.length) return <TrackingNotFound />;

  return <TrackingView repair={data[0]} />;
}
```

Deux points d’implémentation qui comptent : la validation du format **avant** l’appel évite une requête inutile pour tout jeton mal formé, et le rendu identique pour « introuvable » et « erreur » supprime l’oracle de validité.

La page publique porte également une directive `noindex` : un lien de suivi indexé par un moteur de recherche exposerait la marque du vélo et l’état de la réparation.

```tsx
export const metadata = { robots: { index: false, follow: false } };
```

---
