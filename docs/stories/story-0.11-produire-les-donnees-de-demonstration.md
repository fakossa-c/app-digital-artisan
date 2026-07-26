> Story extraite de `docs/07-epics-stories.md`. À exécuter dans l'ordre. Prérequis : voir « Dépend de ».

### Story 0.11 — Produire les données de démonstration
- **Epic :** Epic 0 — Fondations
- **Dépend de :** Story 0.9, Story 0.10
- **Objectif :** Disposer d'un jeu de données réaliste et rejouable, pour que chaque phase soit
  démontrable et que les politiques de sécurité soient éprouvables.
- **Contexte :** Le contenu du seed est décrit dans
  `05-architecture-shard/08-migrations-et-seed.md` § Seed de démonstration. Sans ces données, la
  recherche, les filtres et le suivi public ne sont ni développables ni démontrables (risque R9). Le
  seed ne s'exécute **jamais** en production (voir `03-stack-shard/06-migrations.md` § Données de
  démonstration).
- **Tâches :**
  1. Écrire `supabase/seed.sql` créant un administrateur, deux employés `active`, un employé `pending`
     et un employé `rejected`.
  2. Y ajouter une dizaine de clients, une quinzaine de vélos et une vingtaine de réparations
     réparties sur les sept statuts, avec des dates de modification échelonnées.
  3. Inclure au moins deux clients aux noms volontairement proches, pour éprouver l'avertissement de
     doublon et la recherche approchante.
  4. Rendre le script rejouable sur une base déjà peuplée.
  5. Vérifier que le seed n'est pas exécuté lors d'un déploiement de production.
  6. Exécuter le fichier de vérification RLS de la story 0.9 sur les données du seed.
- **Critères d'acceptance :**
  - [ ] Le seed crée un administrateur actif, deux employés actifs, un employé en attente et un employé refusé.
  - [ ] Au moins dix clients, quinze vélos et vingt réparations existent, les réparations couvrant les
        sept statuts.
  - [ ] Les dates de dernière modification sont échelonnées, de quelques heures à plusieurs semaines.
  - [ ] Au moins deux clients portent des noms très proches l'un de l'autre.
  - [ ] Exécuter le script une seconde fois sur la même base se termine sans erreur et laisse une base
        cohérente.
  - [ ] La base de production ne contient aucune donnée fictive après un déploiement.
  - [ ] Le fichier de vérification RLS, rejoué sur ces données, confirme les comptages attendus.
- **Terminé quand :** La base de développement contient un jeu de données réaliste rejouable, et les
  politiques de sécurité ont été éprouvées dessus.

---

## Epic 1 — Accès à l'application

Ouvrir l'espace interne aux comptes actifs, et à eux seuls. L'inscription n'y figure pas : elle est en
Epic 6, les comptes nécessaires au développement provenant du seed. C'est ce déplacement qui permet
d'atteindre le cœur métier une phase plus tôt.
