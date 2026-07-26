# Migrations, seed et vérification

> **Document :** Architecture technique (05) — projet digital-artisan (D-G), application D-g
> **Partie :** 8 / 12 · [Retour à l’index](./index.md)
> **Contenu :** L’ordre des douze fichiers de migration, le contenu du seed de démonstration et le plan de vérification des politiques RLS profil par profil (section 14).

---

## 14. Migrations, seed et vérification

### Migrations

Le schéma est du code : il est versionné dans `supabase/migrations/`, relu en pull request, et jamais modifié via l’interface web (`docs/03-stack.md` §8).

Ordre des migrations, aligné sur les phases du plan d’implémentation :

```text
supabase/migrations/
├── 20260801000000_extensions.sql            # pgcrypto, pg_trgm
├── 20260801000100_enums.sql                 # user_role, user_status, repair_status
├── 20260801000200_profiles.sql              # + trigger de création à l'inscription
├── 20260801000300_helper_functions.sql      # is_active_member(), is_admin()
├── 20260801000400_clients_bikes.sql
├── 20260801000500_repairs.sql               # + FK composite, protections DELETE et returned
├── 20260801000600_repair_notes.sql
├── 20260801000700_rls_policies.sql
├── 20260801000800_public_tracking.sql       # get_public_repair()
├── 20260801000900_rpc_create_repair.sql
├── 20260801001000_gdpr_anonymize.sql        # anonymize_client()
└── 20260801001100_seed_first_admin.sql
```

L’ordre importe : les fonctions helper précèdent les policies qui les appellent, et les tables précèdent leurs clés étrangères.

Après chaque migration, les types TypeScript sont régénérés **dans le même commit** (`docs/03-stack.md` §5).

### Seed de démonstration

Le projet est un support de formation : une application vide ne démontre rien. La liste des réparations, les filtres, la recherche, les statuts et la page publique n’ont de sens qu’avec des données.

`supabase/seed.sql` crée :

* une dizaine de clients, dont des noms proches (« Dupont » / « Dupond ») pour éprouver la recherche trigramme ;
* une quinzaine de vélos ;
* une vingtaine de réparations réparties sur les sept statuts, avec des dates échelonnées ;
* des profils `pending`, `active` et `rejected`, indispensables à la vérification des politiques RLS.

Il est exécuté **uniquement** en local et sur `d-g-dev`, **jamais** sur `d-g-prod`.

### Vérification des politiques RLS

C’est le **seul test réellement indispensable** de ce projet, et la raison en est précise : une policy défaillante ne provoque aucune erreur visible. Elle retourne trop de lignes, silencieusement. Ni la revue de code, ni le contrôle TypeScript, ni un test d’interface ne l’attrapent.

Le fichier de vérification prend, pour chaque profil type — `anon`, `pending`, `rejected`, `active`, `admin` —, une lecture sur chaque table, et compare le nombre de lignes retournées à l’attendu. Il s’exécute localement via `supabase db execute`.

Cas minimaux à couvrir :

| Profil | Table | Attendu |
|---|---|---|
| `anon` | `repairs`, `clients`, `bikes`, `repair_notes`, `profiles` | **0 ligne** sur chacune |
| `anon` | `get_public_repair(<jeton valide>)` | 1 ligne, sans donnée client |
| `pending` | `repairs`, `clients`, `bikes`, `repair_notes` | **0 ligne** |
| `pending` | `profiles` | 1 ligne — son seul profil |
| `rejected` | toutes les tables métier | **0 ligne** |
| `active` | `repairs`, `clients`, `bikes`, `repair_notes` | toutes les lignes |
| `active` | `UPDATE profiles SET role = 'admin'` sur soi-même | **échec** (`insufficient_privilege`) |
| n’importe qui | `DELETE FROM repairs` | **échec** (`restrict_violation`) |

Un test de bout en bout du parcours critique (inscription → validation → création → changement de statut → consultation publique) reste souhaitable, mais hors périmètre du MVP.
