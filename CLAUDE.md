# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Nature de ce dépôt

Application web de suivi de réparations pour un atelier de vélos, réalisée pour le client
**digital-artisan** (« D-G »). Le code (Next.js, dans `src/`) vit à côté de la chaîne documentaire
de cadrage (`docs/`).

Nom applicatif retenu : **D-g**, provisoire. Il est lu depuis la constante `APP_NAME` de
`src/lib/constants.ts` (voir `docs/01-brief.md`, R6).

## Commandes

- Développer : `pnpm dev`
- Valider avant tout merge : `pnpm lint` puis `pnpm build`
- Tester : aucun script de test n'existe encore ; en ajouter un seulement si une story le demande.
- Versions : Node 24 (`engines`), pnpm 10 (`packageManager`).

## Branches et merge

- Branche d'intégration : `master`.
- L'agent merge une PR qui ne touche que `docs/`, `DESIGN.md`, `maquette-test/` ou `CLAUDE.md`.
- L'utilisateur merge toute PR qui touche `src/`, `package.json` ou `supabase/`.

## Naviguer dans `docs/`

La documentation est une chaîne de 7 documents numérotés, chacun s'appuyant sur les précédents
(`01-brief.md` est la racine). Ouvrir le document dont la condition se déclenche :

| # | Document | Quand le lire |
|---|---|---|
| 01 | `01-brief.md` | Trancher un périmètre ou un objectif métier |
| 02 | `02-PRD-shard/` | Une règle métier détaillée : qui peut faire quoi, statuts, champs |
| 03 | `03-stack-shard/` | Avant d'ajouter ou de monter une dépendance |
| 04 | `04-ux-design-shard/` | Avant de construire ou de modifier un écran |
| 05 | `05-architecture-shard/` | Une décision technique : schéma, RLS, flux, RGPD |
| 06 | `06-plan.md` | Connaître l'ordre de développement ou ce qu'un jalon exige |
| 07 | `07-epics-stories.md` + `stories/` | Implémenter une story : `stories/README.md` donne l'ordre, un fichier par story |

Pour un document en dossier `*-shard/`, commencer par son `index.md` : sa table « Où trouver quoi »
indexe le contenu par question concrète (« quelle version de Next.js », « qui peut modifier un
statut ») et pointe vers le fichier et la section exacts.

Avant de toucher à l'interface, lire `DESIGN.md` (racine : couleurs, typographie, ombres).
`maquette-test/` contient le design system exporté et une maquette de la page réparations.

## Règle de préséance entre documents

En cas de contradiction entre deux documents : le brief (`01-brief.md`) fait foi sur le
**périmètre** et les **objectifs métier** ; le document spécialisé fait foi sur son **domaine
propre** (le PRD pour les règles métier détaillées, l'architecture pour les décisions techniques).
Trancher et corriger la contradiction dans les deux documents.

## Décisions structurantes déjà actées

Ces choix sont arrêtés : les remettre en question seulement sur un signal explicite de
l'utilisateur dans la conversation en cours. Détail et justification dans les documents cités.

- **Mono-atelier.** L'application sert un atelier unique. Aucune entité *Atelier* dans le modèle
  de données ; l'appartenance à l'atelier est implicite (`docs/02-PRD-shard/`,
  `docs/05-architecture-shard/`). Le multi-atelier est hors périmètre.
- **Stack figée :** Next.js (App Router) + TypeScript + Tailwind CSS + Supabase (Auth, PostgreSQL,
  Row Level Security) + Vercel. Versions dans `docs/03-stack-shard/02-versions-epinglees.md`.
  Utiliser `@supabase/ssr` ; `@supabase/auth-helpers-*` est déprécié.
- **Toute politique RLS vérifie l'état `active` du profil**, jamais seulement
  `auth.uid() is not null` : un compte `pending` ou `rejected` possède une session Supabase valide
  et peut sinon interroger l'API directement. Détail et fonction helper `is_active_member()` dans
  `docs/05-architecture-shard/06-securite-rls.md`.
- **Une réparation n'est jamais supprimée.** Un statut `cancelled` existe pour les fiches ouvertes
  par erreur. Le droit à l'effacement RGPD passe par l'**anonymisation** du client, pas par la
  suppression de la fiche (`docs/05-architecture-shard/11-rgpd.md`).
- **Le lien de suivi client** est transmis manuellement par SMS ou e-mail (copié depuis la fiche) ;
  aucun envoi automatisé. Le QR code est un usage interne : imprimé sur un ticket accroché au
  vélo, il pointe vers la fiche interne pour que le réparateur la retrouve, pas vers la page
  publique (`docs/05-architecture-shard/07-flux-principaux.md`).
- **Notes internes** : table dédiée avec auteur et horodatage, jamais un champ texte unique.
- **Séquencement du développement** : schéma de données et RLS d'abord (stories 0.7 à 0.11), puis
  le suivi public (epic 4) avant l'inscription et la gestion des employés (epic 6). Justification
  et jalons dans `docs/06-plan.md`.
