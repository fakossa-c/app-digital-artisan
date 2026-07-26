> Story extraite de `docs/07-epics-stories.md`. À exécuter dans l'ordre. Prérequis : voir « Dépend de ».

### Story 0.10 — Créer le premier administrateur
- **Epic :** Epic 0 — Fondations
- **Dépend de :** Story 0.8
- **Objectif :** Disposer d'un compte administrateur dès l'installation, sans lequel l'application
  serait inutilisable.
- **Contexte :** Tout compte naît `pending`, seul un administrateur peut l'activer, et aucun
  administrateur n'existe : l'impasse est logique et complète (brief risque R5). Le flux est décrit
  dans `05-architecture-shard/07-flux-principaux.md` § Création du premier administrateur. Aucun
  mécanisme d'auto-promotion ne doit exister dans l'application.
- **Tâches :**
  1. Écrire la migration d'amorçage créant le premier compte administrateur à l'état `active`.
  2. Documenter dans le dépôt la procédure de création du premier administrateur pour un nouvel
     environnement, sans inscrire d'identifiants en clair.
  3. Vérifier qu'aucun chemin de l'application ne permet de devenir administrateur sans l'intervention
     d'un administrateur existant.
- **Critères d'acceptance :**
  - [ ] Appliquer les migrations sur une base vierge crée un compte administrateur à l'état `active`.
  - [ ] La création est réalisée par une opération d'initialisation, hors interface applicative.
  - [ ] La procédure d'installation sur un nouvel environnement est documentée dans le dépôt et
        n'inscrit aucun identifiant en clair.
  - [ ] Une requête d'inscription forçant le rôle `admin` ou l'état `active` est ignorée : le profil
        est créé au rôle `employee` et à l'état `pending`.
- **Terminé quand :** Un administrateur existe dès l'installation, la procédure est documentée, et
  aucune auto-promotion n'est possible depuis l'application.
