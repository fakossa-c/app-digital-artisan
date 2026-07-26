> Story extraite de `docs/07-epics-stories.md`. À exécuter dans l'ordre. Prérequis : voir « Dépend de ».

### Story 0.6 — Connecter l'application à Supabase
- **Epic :** Epic 0 — Fondations
- **Dépend de :** Story 0.1, Story 0.5
- **Objectif :** Brancher l'application Next.js sur Supabase avec les trois clients requis, et
  configurer les variables d'environnement sur toutes les cibles de déploiement.
- **Contexte :** Trois points d'accès distincts sont nécessaires — un client serveur pour les Server
  Components et Server Actions, un client navigateur pour les composants clients, et un middleware qui
  renouvelle la session à chaque navigation. Tous s'appuient sur **`@supabase/ssr`**, jamais sur
  `@supabase/auth-helpers-*` qui est déprécié (voir `03-stack-shard/05-backend-et-donnees.md` § Les
  deux clients Supabase). ⚠️ La clé `service_role` n'est **provisionnée nulle part** : elle
  contournerait toutes les politiques de sécurité (voir
  `03-stack-shard/08-hebergement-et-deploiement.md` § Règle ferme sur la clé `service_role`).
  `middleware.ts` doit être dans `src/`, sinon il ne s'exécute pas.
- **Tâches :**
  1. Installer `@supabase/ssr` et `@supabase/supabase-js`.
  2. Créer la fabrique du client serveur et celle du client navigateur dans `lib/`, aux emplacements
     prévus par l'architecture.
  3. Créer `src/middleware.ts` renouvelant la session à chaque navigation.
  4. Créer `.env.local` avec l'URL et la clé `anon` de `d-g-dev` ; créer `.env.example` sans valeurs.
  5. Définir les variables d'environnement dans Vercel pour les trois cibles : Production →
     `d-g-prod`, Preview et Development → `d-g-dev`.
  6. Vérifier que l'application démarre toujours en local et que le déploiement Vercel passe.
- **Critères d'acceptance :**
  - [ ] Un client serveur, un client navigateur et un middleware existent, tous fondés sur `@supabase/ssr`.
  - [ ] `src/middleware.ts` renouvelle la session à chaque navigation.
  - [ ] Les variables sont définies dans Vercel pour Production, Preview et Development, les deux
        dernières pointant sur `d-g-dev`.
  - [ ] `SUPABASE_SERVICE_ROLE_KEY` n'est provisionnée ni dans le dépôt, ni dans Vercel, ni en local.
  - [ ] Aucune variable contenant un secret ne porte le préfixe `NEXT_PUBLIC_`.
  - [ ] `.env.local` est ignoré par Git et `.env.example` documente les variables attendues sans valeur.
  - [ ] L'application démarre en local et le déploiement Vercel reste vert.
- **Terminé quand :** L'application dispose de ses trois points d'accès à Supabase, configurés par
  environnement, sans qu'aucun secret ne soit exposé.
