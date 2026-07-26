> Story extraite de `docs/07-epics-stories.md`. À exécuter dans l'ordre. Prérequis : voir « Dépend de ».

### Story 0.5 — Installer et configurer le Supabase CLI
- **Epic :** Epic 0 — Fondations
- **Dépend de :** Story 0.4
- **Objectif :** Disposer du Supabase CLI lié au projet de développement, pour gérer toute la structure
  de la base sous forme de migrations versionnées.
- **Contexte :** La structure de la base est pilotée **uniquement via le Supabase CLI** : les
  migrations `.sql` sont la source de vérité, versionnées dans le dépôt (voir
  `03-stack-shard/06-migrations.md` § Règles fermes). Modifier le schéma depuis l'interface web de
  Supabase est **interdit** : la modification ne serait ni versionnée, ni reproductible sur un autre
  environnement.
- **Tâches :**
  1. Installer le Supabase CLI en dépendance de développement du projet.
  2. Lancer `supabase init` (crée `supabase/` avec `config.toml` et `migrations/`).
  3. S'authentifier : `supabase login`.
  4. Lier le projet local au projet `d-g-dev` : `supabase link`.
  5. Ajouter au `package.json` le script de génération des types TypeScript depuis le schéma.
  6. Committer le dossier `supabase/`.
- **Critères d'acceptance :**
  - [ ] Le Supabase CLI est installé en dépendance de développement (`supabase --version` répond).
  - [ ] Le dossier `supabase/` avec `migrations/` et `config.toml` existe et est versionné dans Git.
  - [ ] Le projet local est lié à `d-g-dev`.
  - [ ] Un script de génération des types TypeScript existe dans `package.json`.
- **Terminé quand :** Le Supabase CLI est installé, authentifié et lié au projet de développement,
  prêt à recevoir et appliquer les migrations.
