# Schéma PostgreSQL — DDL complet

> **Document :** Architecture technique (05) — projet digital-artisan (D-G), application D-g
> **Partie :** 4 / 12 · [Retour à l’index](./index.md)
> **Contenu :** Le DDL exécutable intégral : extensions, types énumérés, les cinq tables avec leurs contraintes, index, triggers et privilèges, suivi des choix structurants et des règles ON DELETE (section 8).

---

## 8. Schéma PostgreSQL — DDL complet

Ce DDL est **exécutable tel quel** sur PostgreSQL 15+ / Supabase. Il constitue le contenu des migrations décrites au §14.

```sql
-- =============================================================================
-- D-g (provisoire) — digital-artisan (D-G)
-- Schéma de données — application de suivi de réparations de vélos
-- PostgreSQL 15+ / Supabase
-- =============================================================================

-- -----------------------------------------------------------------------------
-- 0. Extensions
-- -----------------------------------------------------------------------------
create extension if not exists pgcrypto with schema extensions;   -- gen_random_uuid()
create extension if not exists pg_trgm  with schema extensions;   -- recherche ILIKE indexée

-- -----------------------------------------------------------------------------
-- 1. Types énumérés
--    Le générateur de types Supabase produit une union TypeScript à partir
--    de ces types, conformément à la stack §5.
-- -----------------------------------------------------------------------------
create type public.user_role as enum ('admin', 'employee');

create type public.user_status as enum ('pending', 'active', 'rejected');

create type public.repair_status as enum (
  'deposited',          -- Vélo déposé
  'diagnosis',          -- Diagnostic
  'waiting_for_part',   -- En attente de pièce
  'in_progress',        -- Réparation en cours
  'ready_for_pickup',   -- Prêt à récupérer
  'returned',           -- Restitué
  'cancelled'           -- Annulé
);
-- Les libellés français sont portés par l'interface (§9), jamais par la base.
-- Toute transition entre statuts est autorisée, sauf après 'returned' (§9).

-- -----------------------------------------------------------------------------
-- 2. Fonction utilitaire : updated_at
-- -----------------------------------------------------------------------------
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

-- -----------------------------------------------------------------------------
-- 3. profiles — complète auth.users
-- -----------------------------------------------------------------------------
create table public.profiles (
  id          uuid primary key references auth.users (id) on delete cascade,
  full_name   text        not null check (length(trim(full_name)) between 1 and 120),
  email       text        not null,
  role        public.user_role   not null default 'employee',
  status      public.user_status not null default 'pending',
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

comment on table public.profiles is
  'Profil applicatif. 1:1 avec auth.users. Le rôle et l''état ne sont jamais lus depuis les métadonnées d''authentification (§7).';
comment on column public.profiles.status is
  'pending par défaut : un compte doit être validé par un administrateur (§13). rejected conserve la décision sans donner accès (§7).';

create index profiles_status_idx on public.profiles (status);
create index profiles_role_idx   on public.profiles (role) where role = 'admin';

create trigger profiles_set_updated_at
  before update on public.profiles
  for each row execute function public.set_updated_at();

-- Création automatique du profil à l'inscription (§13).
-- SECURITY DEFINER : le trigger s'exécute sur auth.users, hors RLS de profiles.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public, pg_temp
as $$
begin
  insert into public.profiles (id, full_name, email)
  values (
    new.id,
    coalesce(nullif(trim(new.raw_user_meta_data ->> 'full_name'), ''), split_part(new.email, '@', 1)),
    new.email
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- -----------------------------------------------------------------------------
-- 4. clients
-- -----------------------------------------------------------------------------
create table public.clients (
  id          uuid primary key default gen_random_uuid(),
  name        text        not null check (length(trim(name)) between 1 and 160),
  phone       text            null check (phone is null or length(trim(phone)) between 4 and 30),
  email       text            null check (email is null or email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now(),
  -- Au moins un moyen de contact : un atelier doit pouvoir joindre le client.
  constraint clients_contact_required check (phone is not null or email is not null)
);

comment on table public.clients is
  'Propriétaire d''un ou plusieurs vélos (§7). Aucune suppression exposée dans le MVP (§10).';

create index clients_name_trgm_idx  on public.clients using gin (name extensions.gin_trgm_ops);
create index clients_created_at_idx on public.clients (created_at desc);

create trigger clients_set_updated_at
  before update on public.clients
  for each row execute function public.set_updated_at();

-- -----------------------------------------------------------------------------
-- 5. bikes
-- -----------------------------------------------------------------------------
create table public.bikes (
  id          uuid primary key default gen_random_uuid(),
  client_id   uuid        not null references public.clients (id)
                            on delete restrict on update cascade,
  brand       text        not null check (length(trim(brand)) between 1 and 80),
  model       text            null check (model is null or length(model) <= 80),
  notes       text            null check (notes is null or length(notes) <= 1000),
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now(),

  -- Cible référençable pour la clé étrangère composite de repairs (§10).
  -- Redondante en apparence (id est déjà unique) mais indispensable :
  -- PostgreSQL exige qu'une FK pointe vers une contrainte UNIQUE ou PRIMARY KEY.
  constraint bikes_client_id_id_key unique (client_id, id)
);

comment on constraint bikes_client_id_id_key on public.bikes is
  'Support de la FK composite repairs(client_id, bike_id) : garantit en base qu''un vélo appartient bien au client de la réparation (§10).';

create index bikes_client_id_idx  on public.bikes (client_id);
create index bikes_brand_trgm_idx on public.bikes using gin (brand extensions.gin_trgm_ops);
create index bikes_model_trgm_idx on public.bikes using gin (model extensions.gin_trgm_ops);

create trigger bikes_set_updated_at
  before update on public.bikes
  for each row execute function public.set_updated_at();

-- -----------------------------------------------------------------------------
-- 6. repairs — entité centrale
-- -----------------------------------------------------------------------------
create table public.repairs (
  id            uuid primary key default gen_random_uuid(),
  client_id     uuid        not null references public.clients (id)
                              on delete restrict on update cascade,
  bike_id       uuid        not null,
  repairer_id   uuid            null references public.profiles (id)
                              on delete set null on update cascade,
  problem       text        not null check (length(trim(problem)) between 1 and 2000),
  status        public.repair_status not null default 'deposited',

  -- Jeton public de suivi (§17).
  -- Généré en base : un jeton existe quelle que soit la voie d'insertion.
  -- UUID v4 = 122 bits d'entropie issus du CSPRNG de pgcrypto.
  public_token  uuid        not null default gen_random_uuid(),

  -- Message facultatif destiné au client, affiché sur la page publique.
  -- Distinct des notes internes, qui ne sortent jamais (§11, §12).
  public_message text           null check (public_message is null or length(public_message) <= 500),

  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now(),

  constraint repairs_public_token_key unique (public_token),

  -- Le couple (client, vélo) doit exister tel quel dans bikes.
  -- La base refuse structurellement une réparation associant un client
  -- au vélo d'un autre client, quelle que soit la voie d'écriture (§10).
  constraint repairs_bike_belongs_to_client_fkey
    foreign key (client_id, bike_id)
    references public.bikes (client_id, id)
    on delete restrict on update cascade
);

comment on table public.repairs is
  'Réparation (§7). Jamais supprimée (§10) — garanti par REVOKE DELETE, absence de policy DELETE et trigger.';
comment on column public.repairs.public_token is
  'Jeton de suivi public, distinct de l''identifiant interne (§17). Régénérable ; sans expiration.';
comment on column public.repairs.repairer_id is
  'Nullable : l''affectation peut suivre la création (§7) ; SET NULL au départ d''un employé (§10).';

-- Index — PostgreSQL n'indexe pas automatiquement les clés étrangères.
create index repairs_client_id_idx        on public.repairs (client_id);
create index repairs_bike_id_idx          on public.repairs (bike_id);
create index repairs_repairer_id_idx      on public.repairs (repairer_id);
create index repairs_status_created_idx   on public.repairs (status, created_at desc);
create index repairs_repairer_status_idx  on public.repairs (repairer_id, status);
create index repairs_updated_at_idx       on public.repairs (updated_at desc);
-- public_token : l'index unique de la contrainte suffit à la recherche par jeton.

create trigger repairs_set_updated_at
  before update on public.repairs
  for each row execute function public.set_updated_at();

-- Interdiction de suppression, garantie pour TOUS les rôles,
-- y compris service_role et le propriétaire de la table (§10).
create or replace function public.prevent_delete()
returns trigger
language plpgsql
as $$
begin
  raise exception
    'Suppression interdite sur %. Les réparations et leurs notes sont conservées (règle métier §10).',
    tg_table_name
    using errcode = 'restrict_violation';
end;
$$;

create trigger repairs_prevent_delete
  before delete on public.repairs
  for each row execute function public.prevent_delete();

-- Verrouillage après restitution (§9).
-- Une réparation restituée est close : ni son statut, ni ses données
-- métier ne peuvent plus changer. Seule la régénération du jeton public
-- reste possible (§17).
create or replace function public.guard_returned_repair()
returns trigger
language plpgsql
as $$
begin
  if old.status = 'returned' and (
       new.status         is distinct from old.status
    or new.client_id      is distinct from old.client_id
    or new.bike_id        is distinct from old.bike_id
    or new.repairer_id    is distinct from old.repairer_id
    or new.problem        is distinct from old.problem
    or new.public_message is distinct from old.public_message
  ) then
    raise exception
      'Réparation restituée : la fiche est verrouillée et ne peut plus être modifiée (§9).'
      using errcode = 'restrict_violation';
  end if;
  return new;
end;
$$;

create trigger repairs_guard_returned
  before update on public.repairs
  for each row execute function public.guard_returned_repair();

-- -----------------------------------------------------------------------------
-- 7. repair_notes — table dédiée, pas un champ texte (§7)
-- -----------------------------------------------------------------------------
create table public.repair_notes (
  id          uuid primary key default gen_random_uuid(),
  repair_id   uuid        not null references public.repairs (id)
                            on delete cascade on update cascade,
  author_id   uuid            null references public.profiles (id)
                            on delete set null on update cascade,
  body        text        not null check (length(trim(body)) between 1 and 2000),
  created_at  timestamptz not null default now()
);

comment on table public.repair_notes is
  'Notes internes. Table dédiée et non champ texte : une note a un auteur et un horodatage, indispensables à la collaboration (PRD §3). Append-only : ni modification ni suppression dans le MVP. Ne sort JAMAIS dans le suivi public (§10, §12).';

-- Pas de colonne updated_at : les notes ne sont pas modifiables.

create index repair_notes_repair_id_created_idx on public.repair_notes (repair_id, created_at desc);
create index repair_notes_author_id_idx         on public.repair_notes (author_id);

create trigger repair_notes_prevent_delete
  before delete on public.repair_notes
  for each row execute function public.prevent_delete();

-- -----------------------------------------------------------------------------
-- 8. Privilèges — seconde barrière, indépendante de la justesse des policies
-- -----------------------------------------------------------------------------

-- anon n'a AUCUN accès direct aux tables métier.
-- Le suivi public passe exclusivement par la fonction dédiée (§12).
revoke all on all tables in schema public from anon;
revoke all on schema public from anon;
grant usage on schema public to anon;

-- authenticated : pas de DELETE, même pour un compte actif (§10).
grant usage on schema public to authenticated;
grant select, insert, update on public.profiles, public.clients, public.bikes, public.repairs to authenticated;
grant select, insert on public.repair_notes to authenticated;   -- append-only
revoke delete on all tables in schema public from authenticated;

alter default privileges in schema public revoke all on tables from anon;
```

### Choix structurants du schéma

| Décision | Choix retenu | Justification |
|---|---|---|
| Type des clés primaires | `uuid` avec `gen_random_uuid()` | `profiles.id` doit de toute façon être un `uuid` (contrainte `auth.users`) ; l’uniformité évite les erreurs de jointure ; un compteur séquentiel dans `/reparations/[id]` divulguerait le volume d’activité de l’atelier. Natif depuis PostgreSQL 13, aucune extension requise. |
| Types temporels | `timestamptz` partout | Voir §7. |
| Rôles, états et statuts | `enum` PostgreSQL | Le générateur de types Supabase produit une union TypeScript exploitable dans tout le code. Le compilateur refuse une valeur invalide **avant** l’exécution. Une contrainte `CHECK` serait plus souple à modifier, mais ne génèrerait aucun type. |
| Recherche textuelle | `pg_trgm` + index GIN | Accélère `ILIKE '%terme%'` et tolère les fautes de frappe (« Dupond » trouve « Dupont ») — précieux pour des noms saisis à l’accueil ou au téléphone. |
| Index sur les clés étrangères | Créés explicitement | PostgreSQL ne les crée **pas** automatiquement, contrairement à MySQL/InnoDB. C’est l’oubli le plus fréquent ; il pénalise les jointures de la liste des réparations et les vérifications `ON DELETE RESTRICT`. |

Options écartées pour la recherche : `ILIKE 'terme%'` avec index B-tree `text_pattern_ops` (indexable, mais préfixe seulement — « Dupont » ne trouverait pas « Jean Dupont ») ; recherche plein texte `tsvector` (conçue pour du texte long avec radicalisation linguistique, mal adaptée aux noms propres, et nettement plus complexe).

### Règles `ON DELETE`

| Relation | Règle | Justification |
|---|---|---|
| `profiles.id → auth.users` | `CASCADE` | Standard Supabase : supprimer le compte d’authentification supprime le profil |
| `bikes.client_id → clients` | `RESTRICT` | Un vélo sans propriétaire n’a pas de sens |
| `repairs.client_id → clients` | `RESTRICT` | Un client ayant une réparation ne peut pas disparaître : protège l’historique |
| `repairs (client_id, bike_id) → bikes` | `RESTRICT` / `ON UPDATE CASCADE` | Idem, plus la propagation d’un transfert de propriétaire du vélo |
| `repairs.repairer_id → profiles` | `SET NULL` | Un employé peut quitter l’atelier ; les réparations survivent, non assignées |
| `repair_notes.repair_id → repairs` | `CASCADE` | Théorique : `repairs` n’est jamais supprimée. Cohérence formelle |
| `repair_notes.author_id → profiles` | `SET NULL` | La note survit à son auteur ; l’interface affiche « Employé supprimé ». Perdre la note serait pire que perdre l’attribution |

**Décision produit associée : aucune suppression de client ni de vélo n’est exposée dans l’interface du MVP.** Les `RESTRICT` sont un filet, pas une fonctionnalité. Un bouton « Supprimer le client » échouerait systématiquement en base — mauvaise expérience et fausse piste de débogage.

Sans ces règles, un `ON DELETE CASCADE` posé par mégarde sur `clients` détruirait ses vélos **et toutes ses réparations**, violant la règle de non-suppression par un chemin que personne n’aurait examiné.

---
