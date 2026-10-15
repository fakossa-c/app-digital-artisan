> Story extraite de `docs/07-epics-stories.md`. À exécuter dans l'ordre. Prérequis : voir « Dépend de ».

### Story 0.1 — Initialiser le projet Next.js
- **Epic :** Epic 0 — Fondations
- **Dépend de :** Aucune
- **Objectif :** Disposer du squelette de l'application Next.js conforme à la stack figée, qui démarre
  en local et affiche une page d'accueil.
- **Contexte :** Versions épinglées dans `03-stack-shard/02-versions-epinglees.md` — Next.js 16.2.x,
  React 19.x, TypeScript 5.x, Tailwind 4.1.x, Node 24, pnpm 10. **Tailwind v4 se configure en CSS**,
  jamais par un `tailwind.config.js` (voir `03-stack-shard/04-interface.md` § Tailwind CSS).
  L'arborescence `src/` est définie dans `05-architecture-shard/02-structure-application.md` § 6. Le
  nom applicatif **D-g** est provisoire : il ne doit apparaître que dans la constante `APP_NAME`
  (brief § 1, risque R14). Aucune connexion à Supabase à ce stade. Le dépôt de code est le fork du
  dépôt de départ, déjà cloné en local avant cette story.
- **Tâches :**
  1. Vérifier que le dépôt local est bien branché sur le fork (`git remote -v` montre `origin` pointant
     vers le fork).
  2. Initialiser une application Next.js 16.2 en TypeScript strict avec l'App Router.
  3. Épingler les versions : `packageManager` à `pnpm@10.x`, `engines.node` à la version 24.
  4. Configurer Tailwind 4.1 : `@import "tailwindcss"` dans le fichier de styles global, plugin
     `@tailwindcss/postcss` déclaré, **aucun** `tailwind.config.js`.
  5. Créer l'arborescence `src/` conforme à l'architecture (`app/`, `features/`, `lib/`,
     `components/`).
  6. Créer la constante `APP_NAME` et l'utiliser pour tout affichage du nom.
  7. Remplacer la page d'accueil par défaut par une page d'accueil minimale portant le nom de
     l'application (aucun appel réseau, aucune donnée).
  8. Vérifier que `pnpm dev` démarre sans erreur et que `pnpm exec tsc --noEmit` passe.
  9. Committer et pousser.
- **Critères d'acceptance :**
  - [ ] `pnpm install` puis `pnpm dev` démarrent l'application sans erreur et une page d'accueil s'affiche.
  - [ ] `package.json` déclare Next.js 16.2.x, React 19.x, TypeScript 5.x et Tailwind 4.1.x.
  - [ ] `packageManager` vaut `pnpm@10.x`, et `engines.node` restreint Node à 24.
  - [ ] Tailwind est chargé par `@import "tailwindcss"` et aucun `tailwind.config.js` n'existe dans le dépôt.
  - [ ] Le mode strict de TypeScript est activé et `pnpm exec tsc --noEmit` se termine sans erreur.
  - [ ] La chaîne « D-g » n'apparaît que dans la définition de la constante `APP_NAME`.
  - [ ] Aucun paquet `@supabase/auth-helpers-*`, aucune bibliothèque de composants visuels ni de
        gestion d'état global n'est installé.
- **Terminé quand :** Le squelette de l'application tourne en local, affiche une page d'accueil aux
  couleurs du projet, et le code est sur GitHub.
