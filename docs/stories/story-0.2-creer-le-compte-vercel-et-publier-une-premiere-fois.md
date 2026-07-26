> Story extraite de `docs/07-epics-stories.md`. À exécuter dans l'ordre. Prérequis : voir « Dépend de ».

### Story 0.2 — Créer le compte Vercel et publier une première fois
- **Epic :** Epic 0 — Fondations
- **Dépend de :** Story 0.1
- **Objectif :** Mettre l'application en ligne dès maintenant, avec republication automatique à chaque
  mise à jour, pour disposer d'une URL démontrable tout au long du développement.
- **Contexte :** Vercel est l'hébergement du projet, conçu pour Next.js et branché sur GitHub (voir
  `03-stack-shard/08-hebergement-et-deploiement.md`). Le projet Vercel se nomme
  `d-g-suivi-reparations`. Publier dès maintenant plutôt qu'en fin de projet évite de découvrir les
  problèmes de build et de variables d'environnement au dernier moment.
- **Tâches :**
  1. Créer un compte Vercel et le connecter au compte GitHub.
  2. Importer le dépôt `d-g-suivi-reparations` dans Vercel.
  3. Lancer la première publication en production et vérifier que la page d'accueil s'affiche en ligne.
  4. Créer une branche de test, ouvrir une pull request, et vérifier qu'une URL de prévisualisation
     est générée.
  5. Consigner l'URL de production dans le `README.md` du dépôt.
- **Critères d'acceptance :**
  - [ ] Le projet Vercel se nomme `d-g-suivi-reparations` et est lié au dépôt GitHub.
  - [ ] L'URL de production répond avec un code 200 et affiche la page d'accueil.
  - [ ] Une fusion dans `main` déclenche automatiquement un déploiement de production.
  - [ ] Une pull request génère une URL de prévisualisation.
  - [ ] L'URL de production est consignée dans le `README.md`.
- **Terminé quand :** L'application est en ligne, se republie automatiquement à chaque mise à jour, et
  chaque pull request dispose de son URL de prévisualisation.
