# Modèle de données

> **Document :** Architecture technique (05) — projet digital-artisan (D-G), application D-g
> **Partie :** 3 / 12 · [Retour à l’index](./index.md)
> **Contenu :** La lecture fonctionnelle des cinq tables — profiles, clients, bikes, repairs, repair_notes —, leurs champs, les relations, le choix du timestamptz et la maintenance de updated_at par trigger (section 7).

---

## 7. Modèle de données

Le modèle repose sur **cinq tables** : `profiles`, `clients`, `bikes`, `repairs` et `repair_notes`.

Le DDL exécutable complet figure au §8. La présente section en donne la lecture fonctionnelle.

### Utilisateur authentifié

L’identité de connexion est gérée par Supabase Auth, dans la table `auth.users`.

Elle contient notamment :

* un identifiant unique ;
* une adresse e-mail ;
* les données nécessaires à l’authentification.

Les informations métier ne sont **jamais** stockées dans les métadonnées d’authentification : le rôle et l’état lus depuis un JWT ne se rafraîchissent qu’à l’expiration du jeton, ce qui laisserait un employé révoqué conserver ses droits.

---

### Profil — `profiles`

Le profil complète l’utilisateur authentifié, en relation 1:1.

| Champ | Type | Remarque |
|---|---|---|
| `id` | `uuid` | Clé primaire, référence `auth.users(id)` |
| `full_name` | `text` | Obligatoire, 1 à 120 caractères |
| `email` | `text` | Copie de l’e-mail d’authentification, pour l’affichage |
| `role` | `user_role` | `admin` ou `employee` — défaut `employee` |
| `status` | `user_status` | `pending`, `active` ou `rejected` — défaut `pending` |
| `created_at`, `updated_at` | `timestamptz` | `updated_at` maintenu par trigger |

L’état `rejected` conserve la décision de l’administrateur sans donner accès à l’application. Il n’est **pas** équivalent à l’absence de compte : le compte existe, il obtient une session, et seules les politiques RLS l’empêchent d’atteindre les données (§3, §11).

Le profil est créé **automatiquement** à l’inscription, par un trigger sur `auth.users` (§8).

---

### Client — `clients`

| Champ | Type | Remarque |
|---|---|---|
| `id` | `uuid` | Clé primaire |
| `name` | `text` | Obligatoire, 1 à 160 caractères |
| `phone` | `text` | Facultatif |
| `email` | `text` | Facultatif, format vérifié |
| `created_at`, `updated_at` | `timestamptz` | |

Contrainte métier : **au moins un moyen de contact** (téléphone ou e-mail). Un atelier doit pouvoir joindre son client.

Un client peut posséder plusieurs vélos et être associé à plusieurs réparations. La réutilisation d’un client existant est un scénario nominal, pas une optimisation : l’interface doit permettre de **rechercher un client avant d’en créer un** (§18), faute de quoi les doublons s’accumulent et rendent l’historique par client inexploitable.

---

### Vélo — `bikes`

| Champ | Type | Remarque |
|---|---|---|
| `id` | `uuid` | Clé primaire |
| `client_id` | `uuid` | Propriétaire, obligatoire |
| `brand` | `text` | Obligatoire |
| `model` | `text` | Facultatif |
| `notes` | `text` | Commentaire descriptif, facultatif |
| `created_at`, `updated_at` | `timestamptz` | |

Un vélo appartient à un seul client et peut faire l’objet de plusieurs réparations.

La table porte une contrainte `UNIQUE (client_id, id)` d’apparence redondante : elle sert de **cible référençable** à la clé étrangère composite de `repairs` (§10).

---

### Réparation — `repairs`

| Champ | Type | Remarque |
|---|---|---|
| `id` | `uuid` | Clé primaire interne |
| `client_id` | `uuid` | Obligatoire |
| `bike_id` | `uuid` | Obligatoire, lié au client par FK composite |
| `repairer_id` | `uuid` | **Nullable** : l’affectation peut suivre la création |
| `problem` | `text` | Description du problème signalé, obligatoire |
| `status` | `repair_status` | Défaut `deposited` |
| `public_token` | `uuid` | Jeton de suivi, unique, généré en base |
| `public_message` | `text` | Message facultatif destiné au client, affiché publiquement |
| `created_at`, `updated_at` | `timestamptz` | `updated_at` maintenu par trigger |

**Les notes internes ne sont pas un champ de la réparation** : elles font l’objet d’une table dédiée (voir ci-dessous).

Le jeton public est :

* unique, garanti par une contrainte `UNIQUE` ;
* imprévisible — UUID v4, 122 bits d’entropie issus du générateur cryptographique de `pgcrypto` ;
* distinct de l’identifiant interne de la réparation ;
* **généré en base**, par la valeur par défaut de la colonne, et non par le code applicatif. Un jeton existe donc quelle que soit la voie d’insertion.

---

### Note interne — `repair_notes`

| Champ | Type | Remarque |
|---|---|---|
| `id` | `uuid` | Clé primaire |
| `repair_id` | `uuid` | Réparation concernée |
| `author_id` | `uuid` | Auteur — `NULL` si l’employé a quitté l’atelier |
| `body` | `text` | Contenu, 1 à 2000 caractères |
| `created_at` | `timestamptz` | Horodatage |

**Décision : table dédiée, et non champ texte sur `repairs`.**

Une note interne a un **auteur** et un **horodatage**. Dès qu’une donnée porte ces deux attributs et se répète, c’est une entité, pas un attribut. Un champ `text` unique rendrait impossible de savoir qui a écrit quoi et quand, et deux employés modifiant la note simultanément s’écraseraient mutuellement — sans conflit détectable, sans récupération possible. Sur une fiche partagée par une équipe, c’est une perte de données silencieuse, directement contraire à l’objectif de collaboration du PRD §3.

Les notes sont **append-only** dans le MVP : ni modifiables, ni supprimables. Cela simplifie les politiques RLS et évite le débat « qui peut éditer la note d’un autre ».

Aucune colonne `updated_at` : une note ne se modifie pas.

**Conséquence à connaître :** ajouter une note ne modifie **pas** `repairs.updated_at`. C’est le comportement souhaitable — une note interne ne concerne pas le client et ne doit pas faire croire à une progression sur la page publique.

---

### Relations principales

```text
auth.users
    │ 1:1
    ▼
 profiles ──── 1:N ────► repairs (en tant que réparateur assigné)
    │
    └──────── 1:N ────► repair_notes (en tant qu'auteur)

 clients
    │
    ├── 1:N ──► bikes
    │
    └── 1:N ──► repairs

 bikes
    │
    └── 1:N ──► repairs

 repairs
    │
    └── 1:N ──► repair_notes
```

Une réparation référence obligatoirement un client et un vélo **appartenant à ce client** — garantie en base par une clé étrangère composite (§10), pas seulement par le code.

L’affectation à un réparateur peut être réalisée dès la création ou immédiatement après. Pour ce MVP, la fiche prévoit un seul réparateur responsable à un instant donné.

### Types temporels

**Toutes** les colonnes temporelles sont en `timestamptz`, jamais en `timestamp`.

`timestamp without time zone` stocke un instant sans référentiel. La base Supabase et les fonctions Vercel s’exécutent en UTC ; le client consulte depuis Paris. Une réparation mise à jour à 14 h 00 s’afficherait « 12:00 » sur la page publique, et le passage à l’heure d’hiver décalerait les dates historiques les unes par rapport aux autres.

L’affichage est converti au rendu, côté Next.js, en fixant **explicitement** le fuseau :

```ts
new Intl.DateTimeFormat('fr-FR', {
  timeZone: 'Europe/Paris',
  dateStyle: 'long',
  timeStyle: 'short',
}).format(new Date(repair.updated_at));
```

Fixer le fuseau plutôt que de laisser le navigateur décider évite qu’un client en déplacement voie des dates locales trompeuses.

### `updated_at` : maintenue par trigger

**Décision : trigger PostgreSQL `BEFORE UPDATE`, jamais le code applicatif.**

Trois raisons :

1. **Exhaustivité** — le trigger s’applique à toute écriture, y compris une correction manuelle en console SQL ou une future RPC. Impossible à oublier.
2. **Vérité** — la date vient de l’horloge du serveur de base (`now()`), pas de celle de l’instance Vercel ni du navigateur.
3. **Non-régression** — un développeur ajoutant une Server Action six mois plus tard en bénéficie sans le savoir.

Si la responsabilité incombait au code, il suffirait d’un chemin de mise à jour qui l’oublie pour que la page publique affiche une date périmée : le client conclurait que rien n’avance alors que la réparation progresse. Le bug serait silencieux — rien ne casse, la donnée est simplement fausse.

L’argument classique contre les triggers (« logique cachée ») est ici sans poids : la mise à jour d’un horodatage technique n’est pas de la logique métier.

---
