# Migrations de base de données

> **Document :** Stack technique (03) — projet digital-artisan (D-G), application D-g
> **Partie :** 6 / 11 · [Retour à l'index](./index.md)
> **Contenu :** L'outillage Supabase CLI et la séquence de commandes, les règles fermes sur le versionnement du schéma et l'interdiction de modifier via l'interface web, et l'usage du fichier de données de démonstration (section 8).

---

## 8. Migrations de base de données

Le schéma est du code. Il est versionné, relu et reproductible au même titre que le reste de l’application.

### Outillage

Le **Supabase CLI**, installé en dépendance de développement, gère les migrations SQL.

```bash
pnpm add -D supabase
pnpm exec supabase init                       # crée supabase/ dans le dépôt
pnpm exec supabase link --project-ref <ref>   # lie au projet distant
pnpm exec supabase migration new create_profiles
# écrire le SQL dans supabase/migrations/<timestamp>_create_profiles.sql
pnpm exec supabase db push                    # applique les migrations non appliquées
```

### Règles fermes

- le dossier `supabase/migrations/` est **versionné dans Git** et constitue la **source de vérité** du schéma ;
- **aucune modification de schéma via l’interface web Supabase** — toute évolution passe par un fichier de migration relu en pull request ;
- les **politiques Row Level Security sont écrites dans les migrations**, jamais cliquées dans l’interface : c’est du code de sécurité, il doit être relu, versionné et reproductible ;
- les fonctions PostgreSQL (helpers RLS, fonction de suivi public, RPC transactionnelle) suivent la même règle ;
- après toute migration, les types TypeScript sont régénérés dans le même commit ([§5](./03-application-et-langage.md#génération-des-types-supabase)).

L’ordre des migrations et leur contenu figurent dans [`docs/05-architecture-shard/`](../05-architecture-shard/08-migrations-et-seed.md) (§8).

### Données de démonstration

Le fichier `supabase/seed.sql` contient les données de démonstration nécessaires à la formation (clients, vélos, réparations réparties sur les statuts). Il est exécuté **uniquement** en local et sur l’environnement de développement, **jamais** en production.
