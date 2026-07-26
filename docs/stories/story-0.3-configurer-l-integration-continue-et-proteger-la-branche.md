> Story extraite de `docs/07-epics-stories.md`. À exécuter dans l'ordre. Prérequis : voir « Dépend de ».

### Story 0.3 — Configurer l'intégration continue et protéger la branche
- **Epic :** Epic 0 — Fondations
- **Dépend de :** Story 0.2
- **Objectif :** Empêcher qu'un code cassé soit fusionné dans `main`, par des contrôles automatiques
  bloquants.
- **Contexte :** Le contenu du fichier `ci.yml` et la configuration de la protection de branche sont
  donnés dans `03-stack-shard/09-qualite-et-journalisation.md` § Intégration continue et § Protection
  de branche. Il n'y a **aucun test automatisé** dans le périmètre du MVP (voir `06-plan.md` § 7) :
  ces trois contrôles sont donc la seule barrière automatique du projet.
- **Tâches :**
  1. Créer le workflow GitHub Actions exécutant `tsc --noEmit`, `pnpm lint` et `pnpm build` sur chaque
     pull request.
  2. Configurer ESLint et Prettier selon l'outillage retenu par la stack.
  3. Activer la protection de la branche `main` et déclarer le job de CI en **statut requis**.
  4. Vérifier en conditions réelles : ouvrir une pull request dont la compilation échoue et constater
     que la fusion est refusée.
- **Critères d'acceptance :**
  - [ ] Une pull request déclenche un workflow exécutant `tsc --noEmit`, `pnpm lint` et `pnpm build`.
  - [ ] Le résultat du workflow est visible sur la pull request.
  - [ ] La branche `main` est protégée et le contrôle de qualité est déclaré en statut requis.
  - [ ] Une pull request dont la compilation échoue ne peut pas être fusionnée dans `main`.
- **Terminé quand :** Un code qui ne compile pas ne peut plus atteindre `main`, vérification faite sur
  une pull request réelle.

> Le dernier critère est le seul qui compte réellement. Sans la protection de branche effectivement
> cochée, la CI est décorative : elle signale sans empêcher.
