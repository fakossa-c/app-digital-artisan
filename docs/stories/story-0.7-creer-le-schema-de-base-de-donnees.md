> Story extraite de `docs/07-epics-stories.md`. À exécuter dans l'ordre. Prérequis : voir « Dépend de ».

### Story 0.7 — Créer le schéma de base de données
- **Epic :** Epic 0 — Fondations
- **Dépend de :** Story 0.5, Story 0.6
- **Objectif :** Créer les cinq tables métier, les types énumérés et les relations, sous forme de
  migrations versionnées.
- **Contexte :** Le DDL complet et exécutable figure dans
  `05-architecture-shard/04-schema-sql.md` § 8 ; la lecture fonctionnelle des tables dans
  `03-modele-donnees.md` § 7 ; l'ordre des migrations dans `08-migrations-et-seed.md` § 14. Les
  identifiants sont des `uuid` et les dates des `timestamptz`. Les notes internes sont une **table
  dédiée** avec auteur et horodatage, jamais un champ texte unique.
- **Tâches :**
  1. Écrire la migration des extensions PostgreSQL requises.
  2. Écrire la migration des trois types énumérés : `user_role`, `user_status`, `repair_status`.
  3. Écrire les migrations des cinq tables dans l'ordre de l'architecture : `profiles`, `clients`,
     `bikes`, `repairs`, `repair_notes`, avec leurs colonnes, clés étrangères et index.
  4. Poser les règles `ON DELETE` table par table selon l'architecture.
  5. Appliquer les migrations sur `d-g-dev` (`supabase db push`) et vérifier la structure dans le
     tableau de bord.
  6. Générer les types TypeScript depuis le schéma et les committer dans le même commit que les
     migrations.
- **Critères d'acceptance :**
  - [ ] Les tables `profiles`, `clients`, `bikes`, `repairs` et `repair_notes` existent après
        application des migrations sur une base vierge.
  - [ ] Le type `user_role` porte les valeurs `admin` et `employee`.
  - [ ] Le type `user_status` porte les valeurs `pending`, `active` et `rejected`.
  - [ ] Le type `repair_status` porte les sept valeurs `deposited`, `diagnosis`, `waiting_for_part`,
        `in_progress`, `ready_for_pickup`, `returned` et `cancelled`.
  - [ ] Chaque table porte ses colonnes de date de création et de modification en `timestamptz`.
  - [ ] Chaque note interne porte sa réparation, son auteur, son contenu et sa date de création.
  - [ ] Les fichiers de migration sont committés dans `supabase/migrations/`.
  - [ ] Le fichier de types TypeScript est généré depuis le schéma, versionné, et n'a jamais été édité
        à la main.
- **Terminé quand :** La base a ses cinq tables reliées et ses trois types énumérés, reproductibles à
  l'identique sur n'importe quel environnement par les migrations.
