# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Nature de ce dépôt

Ce dépôt ne contient **aucun code** pour l'instant — c'est la chaîne documentaire de cadrage
d'un projet pas encore développé. Il n'y a pas de `package.json`, pas de build, pas de tests, pas
de commande à lancer : tout le contenu est dans `docs/`. Ne pas inventer de commandes de
build/lint/test tant qu'aucun code n'existe — vérifier d'abord si la stack a été implémentée
(chercher `package.json` à la racine) avant de supposer que les instructions ci-dessous suffisent
encore.

**Projet :** application web de suivi de réparations pour un atelier de vélos, réalisée pour le
client **digital-artisan** (« D-G »). Nom applicatif retenu : **D-g** — provisoire, à centraliser
dans une constante unique plutôt que codé en dur (voir `docs/01-brief.md`).

## Naviguer dans `docs/`

La documentation est volontairement fragmentée en une chaîne de 7 documents numérotés, chacun
s'appuyant sur les précédents (`01-brief.md` est le document racine et ne référence rien en
amont). Deux formats coexistent selon la taille du document :

| # | Document | Format |
|---|---|---|
| 01 | Brief | fichier unique `01-brief.md` |
| 02 | PRD | dossier `02-PRD-shard/` |
| 03 | Stack technique | dossier `03-stack-shard/` |
| 04 | UX Design | dossier `04-ux-design-shard/` |
| 05 | Architecture | dossier `05-architecture-shard/` |
| 06 | Plan d'implémentation | fichier unique `06-plan.md` |
| 07 | Epics & Stories | fichier unique `07-epics-stories.md` + dossier `stories/` |

**Pour tout document en dossier `*-shard/`, toujours commencer par son `index.md`** — jamais par
un grep à l'aveugle dans le dossier. Chaque index contient une table « Où trouver quoi » qui
indexe le contenu par question concrète (ex. « quelle version de Next.js », « qui peut modifier un
statut », « pourquoi plpgsql et non sql ») et pointe directement vers le fichier et la section
exacts. C'est plus rapide que de lire plusieurs shards en espérant tomber sur la bonne réponse.

`docs/_archive/` contient les versions monolithiques d'avant découpage, conservées comme filet de
sécurité — ce ne sont plus les documents de référence, ne pas les lire ni les modifier sauf pour
vérifier un point précis de l'historique.

`docs/reviews/` contient 7 rapports de review indépendants (un par document, chacun rédigé du
point de vue d'un métier différent — PO, PM, Tech Lead, Designer, Architecte, Delivery Manager,
Scrum Master) plus une synthèse transverse `00-SYNTHESE.md`. Ce sont des comptes-rendus figés au
26 juillet 2026 : les problèmes qu'ils soulevaient ont déjà été corrigés dans les documents actifs
de `docs/`. Ne pas les traiter comme une source d'exigences à ré-appliquer ; ce sont des archives
de décision, utiles pour comprendre *pourquoi* un choix a été fait.

## Règle de préséance entre documents

En cas de contradiction constatée entre deux documents : le brief (`01-brief.md`) fait foi sur le
**périmètre** et les **objectifs métier** ; le document spécialisé fait foi sur son **domaine
propre** (le PRD pour les règles métier détaillées, l'architecture pour les décisions techniques).
Toute contradiction doit être tranchée et corrigée dans les deux documents, jamais contournée en
silence.

## Décisions structurantes déjà actées

Ces choix sont arrêtés — ne pas les remettre en question sans un signal explicite de l'utilisateur
dans la conversation en cours. Détail et justification complète dans les documents cités.

- **Mono-atelier.** L'application sert un atelier unique. Aucune entité *Atelier* dans le modèle
  de données ; l'appartenance à l'atelier est implicite (`docs/02-PRD-shard/`,
  `docs/05-architecture-shard/`). Le multi-atelier est explicitement hors périmètre.
- **Stack figée :** Next.js (App Router) + TypeScript + Tailwind CSS + Supabase (Auth, PostgreSQL,
  Row Level Security) + Vercel. Versions épinglées dans
  `docs/03-stack-shard/02-versions-epinglees.md` — Next.js 16.2 LTS, React 19, Tailwind v4,
  `@supabase/ssr` (jamais `@supabase/auth-helpers-*`, déprécié).
- **Toute politique RLS doit vérifier l'état `active` du profil**, jamais se contenter de
  `auth.uid() is not null` — un compte `pending` ou `rejected` possède une session Supabase valide
  et peut sinon interroger l'API directement. Détail et fonction helper `is_active_member()` dans
  `docs/05-architecture-shard/06-securite-rls.md`.
- **Une réparation n'est jamais supprimée.** Un statut `cancelled` existe pour les fiches ouvertes
  par erreur. Le droit à l'effacement RGPD passe par l'**anonymisation** du client, pas par la
  suppression de la fiche (`docs/05-architecture-shard/11-rgpd.md`).
- **Le lien de suivi client** est transmis manuellement par SMS ou e-mail (copié depuis la fiche) ;
  aucun envoi automatisé. Le QR code, lui, est un usage interne : imprimé sur un ticket accroché au
  vélo, il pointe vers la fiche interne pour que le réparateur la retrouve, pas vers la page
  publique (`docs/05-architecture-shard/07-flux-principaux.md`).
- **Notes internes** : table dédiée avec auteur et horodatage, jamais un champ texte unique.
- **Séquencement du développement** : schéma de données et RLS d'abord (phase 1b), suivi public
  remonté avant l'inscription/gestion des employés — voir `docs/06-plan.md` pour la justification
  du séquencement et les jalons.

## Utiliser le skill `/shard`

Un skill utilisateur `/shard` (`~/.claude/skills/shard/`) reproduit la méthode de découpage
utilisée pour produire les dossiers `*-shard/` de ce dépôt. À invoquer sur tout nouveau document de
`docs/` qui dépasserait ~800 lignes, plutôt que de le laisser monolithique ou de le découper à la
main avec une convention différente.
