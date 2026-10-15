# Epics & Stories — D-g

> Document de référence pour le développement. Les stories sont à exécuter dans l'ordre.
> Chaque story est autoportante : elle peut être donnée seule au développeur.
> Convention : `Story <N>.<n>` appartient à `Epic <N>`.

---

## Epic 0 — Fondations

Monter tout le socle invisible mais indispensable : le squelette de l'app déployée, les comptes
Supabase et Vercel, la structure de la base, les règles de sécurité, et des données d'exemple. Le
dépôt de code lui-même est le fork du dépôt de départ, déjà cloné en local avant cette phase. Rien ne
peut démarrer sans ce socle.

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
  1. Vérifier que le dépôt local est bien branché sur le fork (`git remote -v` montre `origin`
     pointant vers le fork).
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

### Story 0.4 — Créer les projets Supabase
- **Epic :** Epic 0 — Fondations
- **Dépend de :** Aucune
- **Objectif :** Disposer de deux projets Supabase distincts, l'un pour le développement et l'autre
  pour la production, afin de ne jamais travailler sur les données réelles.
- **Contexte :** Deux projets `d-g-dev` et `d-g-prod` (voir
  `03-stack-shard/08-hebergement-et-deploiement.md` § 14 Gestion des environnements). La confirmation
  d'e-mail est **désactivée** pour le MVP (voir `03-stack-shard/07-auth-et-validation.md`). ⚠️ Un
  projet Supabase gratuit est **mis en pause après 7 jours d'inactivité** : c'est la cause la plus
  fréquente d'une application qui semble cassée sans raison (risque R2).
- **Tâches :**
  1. Créer un compte Supabase.
  2. Créer deux projets sur le plan gratuit : `d-g-dev` et `d-g-prod` ; conserver les mots de passe de
     base en lieu sûr.
  3. Récupérer pour chacun l'URL du projet et la clé `anon`.
  4. Activer l'authentification e-mail + mot de passe sur les deux projets.
  5. Désactiver la confirmation d'adresse e-mail sur les deux projets.
  6. Documenter dans le dépôt la procédure de réactivation d'un projet mis en pause.
- **Critères d'acceptance :**
  - [ ] Deux projets nommés `d-g-dev` et `d-g-prod` existent.
  - [ ] L'authentification e-mail + mot de passe est activée sur les deux.
  - [ ] La confirmation d'adresse e-mail est désactivée sur les deux.
  - [ ] Les URL et clés `anon` des deux projets sont récupérées et conservées hors du dépôt.
  - [ ] La procédure de réactivation après mise en pause est documentée dans le dépôt.
- **Terminé quand :** Les deux projets Supabase sont prêts à recevoir les migrations et à servir
  l'authentification, et la procédure de réactivation est écrite.

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

### Story 0.8 — Écrire les triggers et les contraintes d'intégrité
- **Epic :** Epic 0 — Fondations
- **Dépend de :** Story 0.7
- **Objectif :** Faire garantir par la base elle-même les règles que le code applicatif pourrait
  oublier : cohérence client–vélo, unicité du jeton public, non-suppression, date de modification
  automatique et création du profil à l'inscription.
- **Contexte :** La clé étrangère composite `UNIQUE (client_id, id)` sur `bikes` est expliquée dans
  `05-architecture-shard/05-statuts-et-regles-metier.md` § La clé étrangère composite. Le trigger
  `updated_at` est décrit dans `03-modele-donnees.md` § `updated_at` maintenue par trigger. La
  non-suppression relève de la défense en profondeur (§ La non-suppression). Le trigger sur
  `auth.users` créant le profil correspondant est décrit dans
  `07-flux-principaux.md` § Création du premier administrateur. **Une réparation n'est jamais
  supprimée** : c'est une décision structurante du projet (brief § 3.1).
- **Tâches :**
  1. Écrire la contrainte garantissant qu'un vélo appartient bien au client de sa réparation (clé
     étrangère composite).
  2. Écrire la contrainte d'unicité sur le jeton public et sa génération aléatoire par défaut.
  3. Écrire la protection empêchant toute suppression sur `repairs` et `repair_notes`.
  4. Écrire le trigger de mise à jour automatique de `updated_at` sur les réparations.
  5. Écrire le trigger sur `auth.users` créant automatiquement la ligne `profiles` correspondante, au
     rôle `employee` et à l'état `pending`.
  6. Écrire la contrainte « au moins un moyen de contact » sur `clients`.
  7. Appliquer les migrations et vérifier chaque contrainte par une tentative d'écriture invalide.
  8. Créer un utilisateur à la main depuis le tableau de bord Supabase et vérifier que sa ligne
     `profiles` apparaît automatiquement.
- **Critères d'acceptance :**
  - [ ] Associer à une réparation un vélo n'appartenant pas à son client est refusé par la base, et le
        refus provient d'une contrainte, non d'un contrôle applicatif.
  - [ ] Chaque réparation reçoit un jeton public généré aléatoirement, unique, et distinct de son
        identifiant interne.
  - [ ] Toute tentative de suppression sur `repairs` ou `repair_notes` est refusée au niveau de la
        base, quel que soit le rôle.
  - [ ] Modifier une colonne d'une réparation actualise sa date de dernière modification par
        déclencheur, sans intervention du code applicatif.
  - [ ] Créer un utilisateur dans Supabase Auth crée automatiquement sa ligne `profiles`, au rôle
        `employee` et à l'état `pending`.
  - [ ] Un client sans aucun moyen de contact est refusé par la base.
  - [ ] Supprimer l'auteur d'une note laisse la note en place sans auteur, plutôt que de supprimer la note.
- **Terminé quand :** Les règles d'intégrité du modèle sont garanties par la base et vérifiées une à
  une par une tentative d'écriture invalide.

### Story 0.9 — Activer et écrire les politiques de sécurité (RLS)
- **Epic :** Epic 0 — Fondations
- **Dépend de :** Story 0.7
- **Objectif :** Verrouiller chaque table pour que la base refuse elle-même tout accès non autorisé,
  même si une requête contourne l'application.
- **Contexte :** C'est le morceau le plus sensible du projet — toutes les politiques figurent dans
  `05-architecture-shard/06-securite-rls.md`. **Règle structurante : toute politique doit appeler
  `is_active_member()`, jamais se contenter de `auth.uid() is not null`** — un compte `pending` ou
  `rejected` possède une session Supabase parfaitement valide et pourrait sinon interroger l'API
  directement (risque R4). La fonction helper doit être écrite en **PL/pgSQL et non en SQL** :
  PostgreSQL intègre les fonctions SQL simples dans la requête appelante, ce qui leur fait perdre leur
  contexte privilégié et ramène la récursion infinie 42P17 sur `profiles`.
- **Tâches :**
  1. Écrire la fonction `is_active_member()` en PL/pgSQL et `SECURITY DEFINER`.
  2. Activer la RLS sur les cinq tables métier, en refus par défaut.
  3. Écrire les politiques table par table et action par action, selon l'architecture ; chacune
     appelle `is_active_member()`.
  4. Envelopper les appels de fonction dans `(select …)` pour la performance, selon la seconde règle
     de l'architecture.
  5. Écrire le fichier SQL de vérification des politiques : pour chaque profil type — anonyme,
     `pending`, `rejected`, `active`, `admin` — compter les lignes lisibles sur chaque table et
     comparer à l'attendu.
  6. Appliquer les migrations et exécuter le fichier de vérification.
- **Critères d'acceptance :**
  - [ ] La RLS est activée sur `profiles`, `clients`, `bikes`, `repairs` et `repair_notes`, et une
        table sans politique explicite ne retourne aucune ligne.
  - [ ] Chaque politique appelle la fonction vérifiant que le profil est actif ; aucune ne se contente
        de vérifier la présence d'une session.
  - [ ] Un compte `pending` muni d'une session valide obtient zéro ligne sur chaque table métier en
        interrogeant directement l'API, et aucune écriture n'est acceptée.
  - [ ] Un compte `rejected` muni d'une session valide obtient zéro ligne sur chaque table métier.
  - [ ] Un visiteur anonyme muni de la clé publique obtient zéro ligne sur chaque table métier.
  - [ ] Un compte `active` voit toutes les réparations de l'atelier, sans cloisonnement par réparateur,
        ainsi que les clients, les vélos et les notes internes.
  - [ ] Un employé ne peut modifier ni son propre rôle ni son propre état.
  - [ ] Un administrateur consulte la liste des profils et modifie l'état d'un employé sans produire
        d'erreur de récursion infinie.
  - [ ] Le fichier de vérification des politiques s'exécute et signale tout écart avec l'attendu.
- **Terminé quand :** Chaque table est protégée par des politiques vérifiant l'état actif du profil, et
  le fichier de vérification confirme les comptages attendus pour les cinq profils types.

> Un défaut ici ne produit **aucune erreur visible** : la base retourne simplement trop de lignes. Ni
> la revue de code, ni TypeScript, ni un test d'interface ne l'attrapent. Le fichier de vérification
> est la seule preuve possible — il est rejoué à chaque phase ajoutant une table ou une politique.

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

### Story 1.1 — Se connecter
- **Epic :** Epic 1 — Accès à l'application
- **Dépend de :** Story 0.9, Story 0.11
- **Objectif :** Permettre à un utilisateur interne de s'authentifier avec son adresse e-mail et son
  mot de passe pour accéder à l'espace de travail de l'atelier.
- **Contexte :** Écran de connexion décrit dans `04-ux-design-shard/` § 6.1 ; les messages d'erreur
  sont repris **littéralement** du § 12. Le flux figure dans
  `05-architecture-shard/07-flux-principaux.md` § Connexion d'un employé. Les comptes de test
  proviennent du seed de la story 0.11. Le message d'échec est volontairement ambigu : il ne doit
  jamais révéler si une adresse existe.
- **Tâches :**
  1. Créer l'écran de connexion avec les champs adresse e-mail et mot de passe.
  2. Brancher la soumission sur Supabase Auth via le client approprié.
  3. Rediriger l'utilisateur authentifié vers la liste des réparations.
  4. Gérer les états : chargement, erreur d'identifiants, champ obligatoire manquant.
  5. Empêcher la double soumission en passant le bouton en état occupé dès le premier clic.
  6. Ajouter les liens « Mot de passe oublié » et vers l'inscription employé.
- **Critères d'acceptance :**
  - [ ] Un compte à l'état `active` se connecte et arrive sur la liste des réparations, son nom et son
        rôle apparaissant dans le menu Compte.
  - [ ] Une adresse ou un mot de passe erroné produit « Adresse e-mail ou mot de passe incorrect. »,
        message identique que l'adresse existe ou non.
  - [ ] L'adresse saisie est conservée dans le formulaire après un échec.
  - [ ] Soumettre sans adresse e-mail affiche un message sous le champ concerné et y déplace le focus.
  - [ ] Cliquer deux fois sur « Se connecter » ne déclenche qu'une seule tentative.
  - [ ] Les liens « Mot de passe oublié » et vers l'inscription employé sont proposés.
  - [ ] Fermer puis rouvrir l'onglet du navigateur conserve la session.
- **Terminé quand :** Un compte actif du seed se connecte, atteint l'espace interne, et un identifiant
  erroné produit le message ambigu prévu.

### Story 1.2 — Restreindre l'accès aux comptes actifs
- **Epic :** Epic 1 — Accès à l'application
- **Dépend de :** Story 0.9, Story 1.1
- **Objectif :** Garantir que seuls les comptes à l'état `active` accèdent à l'espace interne, en
  interface comme au niveau des données.
- **Contexte :** C'est la story pivot de la sécurité applicative. Un compte `pending` ou `rejected`
  obtient une **session Supabase parfaitement valide** : seule l'application et les politiques RLS lui
  refusent l'accès (voir `03-stack-shard/07-auth-et-validation.md`, risque R4). Écrans d'attente et
  d'accès refusé dans `04-ux-design-shard/` § 6.1 et § 6.6, messages au § 12.
- **Tâches :**
  1. Vérifier l'état du profil dans le middleware et dans les Server Components de l'espace interne.
  2. Créer l'écran d'attente de validation, avec « Se déconnecter » pour seule action.
  3. Créer l'écran de refus avec son message distinct.
  4. Protéger les routes de l'espace interne contre l'accès direct par URL, sans affichage transitoire
     du contenu.
  5. Réserver les routes d'administration au rôle `admin`.
  6. Vérifier que le changement d'état par l'administrateur est pris en compte au rechargement, sans
     reconnexion.
- **Critères d'acceptance :**
  - [ ] Un profil `pending` authentifié voit « Votre compte est en attente de validation par
        l'administrateur de l'atelier. », sans qu'aucune donnée métier ne lui soit transmise.
  - [ ] Un profil `rejected` voit « Votre demande d'accès n'a pas été acceptée. Contactez
        l'administrateur de l'atelier. ».
  - [ ] Un profil `active` accède à la liste des réparations.
  - [ ] Saisir directement l'adresse d'une fiche avec un profil `pending` redirige vers l'écran
        d'attente, sans que le contenu apparaisse même brièvement.
  - [ ] Une requête directe à l'API avec la session d'un compte `pending` ou `rejected` retourne zéro
        ligne sur chaque table métier et n'accepte aucune écriture.
  - [ ] Un compte activé en cours de session accède à l'espace interne au simple rechargement.
  - [ ] Un compte passé à `rejected` en cours de session voit son action refusée et est redirigé hors
        de l'espace interne.
  - [ ] Un employé accédant à l'adresse de la gestion des employés voit « Vous n'avez pas accès à cette
        page. » avec l'action « Retour aux réparations », sans qu'aucune donnée de profil ne lui soit
        transmise.
- **Terminé quand :** Les trois états de compte produisent chacun le comportement attendu, en interface
  comme par requête directe à l'API.

### Story 1.3 — Se déconnecter
- **Epic :** Epic 1 — Accès à l'application
- **Dépend de :** Story 1.1
- **Objectif :** Permettre de fermer sa session depuis n'importe quelle page, pour protéger l'accès
  depuis un poste partagé de l'atelier.
- **Contexte :** Action présente dans le menu Compte de la barre supérieure (voir
  `04-ux-design-shard/` § 5 navigation). La confirmation de sortie sur formulaire non enregistré relève
  des actions sensibles du § 8.
- **Tâches :**
  1. Ajouter « Se déconnecter » au menu Compte, présent sur toutes les pages internes.
  2. Fermer la session Supabase et rediriger vers l'écran de connexion.
  3. Invalider l'accès aux pages internes après déconnexion, y compris par retour arrière du
     navigateur.
  4. Demander confirmation lorsqu'un formulaire non enregistré est en cours de saisie.
- **Critères d'acceptance :**
  - [ ] Se déconnecter depuis n'importe quelle page interne ferme la session et redirige vers l'écran
        de connexion.
  - [ ] Après déconnexion, le retour arrière ou la saisie d'une adresse interne redirige vers la
        connexion, sans afficher aucune donnée de la session précédente.
  - [ ] Se déconnecter avec un formulaire non enregistré affiche « Des modifications ne sont pas
        enregistrées. Quitter quand même ? ».
- **Terminé quand :** La session est réellement close, y compris face au retour arrière du navigateur.

### Story 1.4 — Réinitialiser un mot de passe oublié
- **Epic :** Epic 1 — Accès à l'application
- **Dépend de :** Story 1.1
- **Objectif :** Permettre à un utilisateur de redéfinir son mot de passe depuis l'écran de connexion,
  sans solliciter l'administrateur.
- **Contexte :** Mécanisme de réinitialisation Supabase (voir `03-stack-shard/07-auth-et-validation.md`
  § Réinitialisation). Écrans et messages dans `04-ux-design-shard/` § 6.1 et § 12. ⚠️ Le quota SMTP
  mutualisé de Supabase est limité et peut être épuisé en séance : la limite doit être documentée
  auprès de D-G (risque R16). Comme pour la connexion, le message de retour ne doit jamais révéler
  l'existence d'un compte.
- **Tâches :**
  1. Créer l'écran de demande de réinitialisation depuis le lien de la page de connexion.
  2. Déclencher l'envoi du lien à usage unique et à durée limitée via Supabase.
  3. Créer l'écran de définition du nouveau mot de passe atteint par le lien reçu.
  4. Afficher les règles de longueur avant toute saisie.
  5. Gérer le lien expiré ou déjà utilisé.
  6. Documenter auprès de D-G la limite du quota SMTP mutualisé.
- **Critères d'acceptance :**
  - [ ] Demander une réinitialisation affiche « Si un compte existe pour cette adresse, un lien de
        réinitialisation vient d'être envoyé. » et un lien à usage unique est envoyé.
  - [ ] Le message est strictement identique pour une adresse inexistante ; rien ne permet de déduire
        qu'un compte existe.
  - [ ] Définir un nouveau mot de passe depuis le lien le modifie ; l'ancien ne fonctionne plus.
  - [ ] Les règles de longueur sont affichées avant la saisie, et un mot de passe trop court produit
        « Le mot de passe doit contenir au moins 8 caractères. ».
  - [ ] Une confirmation différente du nouveau mot de passe affiche une erreur au niveau du champ
        concerné et n'enregistre rien.
  - [ ] Un lien expiré ou déjà utilisé produit « Ce lien de réinitialisation n'est plus valide.
        Demandez-en un nouveau. » avec un lien vers l'écran de demande.
  - [ ] Un compte `pending` ou `rejected` dont le mot de passe est réinitialisé reste refusé à la
        connexion, avec le message correspondant à son état.
- **Terminé quand :** Un utilisateur retrouve l'accès à son compte par e-mail, et le parcours ne révèle
  jamais l'existence d'une adresse.

### Story 1.5 — Consulter et modifier mon compte
- **Epic :** Epic 1 — Accès à l'application
- **Dépend de :** Story 1.1
- **Objectif :** Permettre à un utilisateur de consulter ses informations et de changer son mot de
  passe.
- **Contexte :** Page « Mon compte » décrite dans `04-ux-design-shard/` § 6.4, atteinte depuis le menu
  Compte. Cette page ne porte **aucun réglage d'application** : le produit n'a pas de préférences
  utilisateur.
- **Tâches :**
  1. Créer la page « Mon compte » atteinte depuis le menu Compte.
  2. Y afficher le nom, l'adresse e-mail, le rôle et la date d'inscription.
  3. Ajouter le formulaire de changement de mot de passe, exigeant le mot de passe actuel.
  4. Gérer l'erreur de mot de passe actuel incorrect.
- **Critères d'acceptance :**
  - [ ] La page affiche le nom, l'adresse e-mail, le rôle et la date d'inscription de l'utilisateur.
  - [ ] La seule action proposée est « Modifier mon mot de passe ».
  - [ ] Changer son mot de passe affiche « Mot de passe modifié. » et le nouveau permet de se connecter.
  - [ ] Un mot de passe actuel incorrect affiche une erreur et ne modifie rien.
  - [ ] Aucun réglage d'application ne figure sur la page, et ni le rôle ni l'état du compte ne sont
        modifiables.
- **Terminé quand :** Un utilisateur consulte ses informations et change son mot de passe depuis
  l'application.

### Story 1.6 — Créer les composants transverses partagés
- **Epic :** Epic 1 — Accès à l'application
- **Dépend de :** Story 0.1, Story 1.1
- **Objectif :** Livrer les composants d'interface communs avant les écrans métier, pour que la
  Definition of Done soit outillée dès la première story fonctionnelle.
- **Contexte :** Fondations visuelles, système de statuts, formulaires, états particuliers et
  accessibilité dans `04-ux-design-shard/` § 6bis, § 7, § 8, § 10 et § 11. Sans cet outillage préalable,
  chaque écran réinventerait son état vide et son message de confirmation, et la cohérence serait
  perdue dès le troisième écran. C'est ce qui rend la Definition of Done (`06-plan.md` § 3) applicable
  plutôt que contournée faute d'outil.
- **Tâches :**
  1. Créer la mise en page de l'espace interne : barre supérieure, navigation, mot-symbole, menu
     Compte, lien « Aller au contenu ».
  2. Créer le composant de bandeau de retour, temporaire et annoncé aux lecteurs d'écran.
  3. Créer le composant unique de pastille de statut, portant libellé, icône et forme.
  4. Créer les trois variantes de bouton — primaire, secondaire, danger — avec l'état occupé.
  5. Créer le composant de champ de formulaire avec sa gestion d'erreur et son association au message.
  6. Créer les composants de squelette de chargement et d'état vide.
  7. Créer la modale de confirmation accessible, avec piégeage du focus.
- **Critères d'acceptance :**
  - [ ] La barre supérieure affiche le mot-symbole, les entrées Réparations, Clients, Employés pour
        l'administrateur, et le menu Compte ; l'entrée active est signalée par le gras, un soulignement
        et l'attribut de page courante.
  - [ ] Le lien « Aller au contenu » est le premier élément focusable.
  - [ ] Un bandeau temporaire de 4 secondes affiche le message d'une action et l'annonce dans une
        région vocalisée.
  - [ ] Un statut affiché dans la liste, le détail, le filtre ou la page publique emprunte le même
        composant et reste distinguable des six autres sans percevoir la couleur.
  - [ ] Les boutons appartiennent aux trois seules variantes primaire, secondaire et danger, font au
        moins 44 pixels de haut, et conservent leur largeur en état occupé.
  - [ ] Un champ en erreur change de bordure, affiche son message en dessous et y est associé pour les
        technologies d'assistance ; le focus va au premier champ en erreur à la soumission.
  - [ ] Une navigation en cours affiche un squelette aux dimensions du contenu réel, jamais une page
        blanche.
  - [ ] Une modale piège le focus tant qu'elle est ouverte, et Échap la ferme en rendant le focus à son
        déclencheur.
- **Terminé quand :** Les composants transverses existent et sont utilisés par les écrans de connexion
  et d'attente, prêts à outiller tous les écrans métier.

---

## Epic 2 — Réparations, clients et vélos

Le domaine central du produit, et le plus incertain : il porte le modèle relationnel
client–vélo–réparation et la contrainte qui les lie.

### Story 2.1 — Créer une réparation
- **Epic :** Epic 2 — Réparations, clients et vélos
- **Dépend de :** Story 0.9, Story 1.2, Story 1.6
- **Objectif :** Permettre à un employé d'enregistrer au comptoir une réparation complète — client,
  vélo, problème, réparateur, statut initial — en une seule opération.
- **Contexte :** Formulaire décrit dans `04-ux-design-shard/` § 6.2. La création passe par la **RPC
  `create_repair`** qui garantit l'atomicité : trois appels JS successifs laisseraient des données
  partielles en cas d'échec (voir `05-architecture-shard/07-flux-principaux.md` § Création d'une
  réparation). Cette story couvre le formulaire complet en une tranche verticale ; la réutilisation
  d'un client ou d'un vélo existant fait l'objet des stories 2.2 et 2.3. La création doit tenir en
  90 secondes au comptoir (brief § 6.3).
- **Tâches :**
  1. Créer l'écran « Nouvelle réparation » avec ses étapes client, vélo, problème, réparateur et statut.
  2. Écrire la RPC de création atomique en base.
  3. Créer la Server Action appelant la RPC, avec validation Zod des entrées.
  4. Désactiver l'étape vélo tant qu'aucun client n'est choisi.
  5. Restreindre la liste des réparateurs aux profils `active`.
  6. Proposer « Vélo déposé » comme statut initial par défaut, en excluant les statuts terminaux.
  7. Rediriger vers la fiche créée et afficher la confirmation.
- **Critères d'acceptance :**
  - [ ] Créer une réparation complète l'enregistre avec ses dates, lui attribue un jeton public unique,
        redirige vers sa fiche et affiche « Réparation créée. ».
  - [ ] Le statut initial proposé est « Vélo déposé » ; un autre statut est choisissable, mais
        « Restitué » et « Annulé » ne sont pas proposés.
  - [ ] L'étape « Vélo » est désactivée tant qu'aucun client n'est choisi et affiche « Choisissez
        d'abord un client ».
  - [ ] Soumettre sans nom de client affiche « Le nom du client est obligatoire. » au niveau du champ,
        ne crée rien, et conserve toute la saisie.
  - [ ] Soumettre sans client affiche « Choisissez un client ou créez-en un nouveau. » ; sans vélo,
        « Choisissez un vélo ou enregistrez-en un nouveau pour ce client. ».
  - [ ] Associer un vélo n'appartenant pas au client choisi, en contournant l'interface, est refusé par
        le serveur **et** par la base.
  - [ ] Seuls les profils `active` figurent dans la liste des réparateurs ; assigner un profil non actif
        est refusé par le serveur.
  - [ ] Un statut absent des sept valeurs est refusé par le serveur **et** par la base.
  - [ ] Le formulaire ne demande au client que son nom, son téléphone et son adresse e-mail — aucune
        adresse postale, date de naissance ni commentaire.
  - [ ] Un échec en cours de création ne laisse aucun client, vélo ni réparation partiels en base.
  - [ ] Cliquer deux fois sur « Créer la réparation » ne crée qu'une seule réparation.
  - [ ] Un utilisateur non authentifié ou non actif se voit refuser l'action côté serveur, les
        politiques RLS empêchant toute écriture.
- **Terminé quand :** Un employé enregistre une réparation de bout en bout au comptoir en moins de
  90 secondes, et aucun échec ne laisse de données partielles.

### Story 2.2 — Réutiliser un client existant
- **Epic :** Epic 2 — Réparations, clients et vélos
- **Dépend de :** Story 2.1
- **Objectif :** Permettre de retrouver un client déjà enregistré plutôt que de le ressaisir, pour ne
  pas créer de doublon et conserver son historique.
- **Contexte :** Pattern **chercher-ou-créer** décrit dans `04-ux-design-shard/` § 6.2 et
  `05-architecture-shard/10-recherche-filtres.md` § Recherche d'un client existant. Sans cette story,
  un même client est recréé à chaque visite : au bout de six mois, « Dupont Martin », « M. Dupont » et
  « dupont martin » coexistent, la recherche devient inutilisable et l'historique par vélo disparaît.
  La dégradation est **irréversible** (risque R6).
- **Tâches :**
  1. Ajouter le champ de recherche de client en tête de l'étape client.
  2. Écrire la requête de recherche côté serveur, tolérante à la casse et aux espaces, sans casser
     l'usage des index trigrammes.
  3. Ne déclencher la recherche qu'à partir de trois caractères, avec indicateur discret.
  4. Afficher pour chaque résultat le téléphone et le nombre de réparations.
  5. Garder « + Nouveau client » immédiatement accessible, ouvrant les champs sans changer de page.
  6. Avertir lorsqu'un nom très proche existe déjà.
- **Critères d'acceptance :**
  - [ ] Saisir « dupo » propose « Martin Dupont » avec son téléphone et son nombre de réparations ; le
        sélectionner renseigne le client sans ressaisie.
  - [ ] Moins de trois caractères ne déclenche aucune recherche ; au-delà, un indicateur apparaît et le
        nombre de résultats est annoncé aux technologies d'assistance.
  - [ ] La recherche fonctionne en minuscules, avec espaces superflus, ou sur une partie du téléphone.
  - [ ] Sans résultat, « + Nouveau client » reste accessible et ouvre les champs nom, téléphone et
        e-mail sans perte de saisie.
  - [ ] Créer un client au nom très proche d'un existant affiche « Un client au nom similaire existe
        déjà. Vérifiez avant de créer un doublon. », sans empêcher de poursuivre.
  - [ ] Le filtrage est réalisé par la base ; l'ensemble des clients n'est jamais chargé pour être
        filtré dans le navigateur.
  - [ ] Sélectionner un client existant puis créer la réparation n'enregistre aucun nouveau client.
- **Terminé quand :** Un client déjà venu est retrouvé et réutilisé sans ressaisie, et un nom proche
  déclenche un avertissement.

### Story 2.3 — Réutiliser un vélo existant du client
- **Epic :** Epic 2 — Réparations, clients et vélos
- **Dépend de :** Story 2.2
- **Objectif :** Permettre de sélectionner un vélo déjà enregistré pour le client choisi, afin de
  conserver l'historique des interventions sur ce vélo.
- **Contexte :** Un vélo appartient à **un seul client** : un vélo revendu doit être recréé sous son
  nouveau propriétaire (brief § 7). La liste des vélos est donc toujours restreinte au client
  sélectionné, ce que garantit la contrainte de la story 0.8.
- **Tâches :**
  1. Charger la liste des vélos du client sélectionné à l'étape vélo.
  2. Recharger cette liste lorsque le client change, en abandonnant la sélection précédente.
  3. Proposer « + Nouveau vélo » ouvrant les champs marque, modèle et commentaire.
  4. Rattacher le vélo créé au client sélectionné.
- **Critères d'acceptance :**
  - [ ] Un client possédant deux vélos ne voit proposer que ces deux vélos, aucun vélo d'un autre client
        n'apparaissant.
  - [ ] Sélectionner un vélo existant et créer la réparation la rattache à ce vélo sans en enregistrer
        de nouveau.
  - [ ] « + Nouveau vélo » ouvre les champs marque, modèle et commentaire, et le vélo créé est rattaché
        au client sélectionné.
  - [ ] Changer de client recharge la liste des vélos et abandonne le vélo précédemment sélectionné.
  - [ ] Les réparations précédentes d'un vélo restent consultables depuis la fiche du client.
- **Terminé quand :** Un vélo déjà connu est réutilisé sans ressaisie et son historique reste accessible.

### Story 2.4 — Consulter le détail d'une réparation
- **Epic :** Epic 2 — Réparations, clients et vélos
- **Dépend de :** Story 2.1, Story 1.6
- **Objectif :** Réunir sur un seul écran toutes les informations d'une réparation, pour répondre
  immédiatement à une question sur ce vélo.
- **Contexte :** Écran de détail décrit dans `04-ux-design-shard/` § 6.2, format des dates au § 12. Le
  statut et son action de changement doivent être atteignables **sans défilement**, quelle que soit la
  taille de l'écran : c'est le geste le plus fréquent de l'atelier.
- **Tâches :**
  1. Créer la page de détail d'une réparation.
  2. Afficher le statut, le client et ses coordonnées, le vélo, le problème, le réparateur, la date de
     dépôt et la date de dernière modification avec son auteur.
  3. Placer le bloc de statut de sorte qu'il soit visible sans défilement à toutes les tailles.
  4. Formater la date de dépôt en absolu et la date de modification en relatif avec info-bulle.
  5. Gérer la réparation inexistante.
- **Critères d'acceptance :**
  - [ ] La fiche affiche le statut courant, le client et ses coordonnées, le vélo, le problème signalé,
        le réparateur, la date de dépôt et la date de dernière modification avec son auteur.
  - [ ] Le statut et son action de changement sont visibles sans défilement, quelle que soit la taille
        de l'écran.
  - [ ] La date de dépôt est en format absolu ; la date de modification en relatif, avec la date
        complète en info-bulle.
  - [ ] Ouvrir l'adresse d'une réparation inexistante affiche « Cette page n'existe pas. » avec
        « Retour aux réparations ».
  - [ ] Un utilisateur non authentifié ou non actif ne reçoit aucune information de la fiche.
- **Terminé quand :** Un employé ouvre une fiche et trouve toutes les informations du vélo sans avoir à
  défiler pour atteindre le statut.

### Story 2.5 — Modifier une réparation
- **Epic :** Epic 2 — Réparations, clients et vélos
- **Dépend de :** Story 2.4
- **Objectif :** Permettre de corriger les informations d'une réparation après un diagnostic ou une
  erreur de saisie.
- **Contexte :** Écran de modification dans `04-ux-design-shard/` § 6.2. Le client et le vélo n'y sont
  **pas modifiables** : leur correction passe par la fiche client (story 2.9). Le statut non plus : il
  se change depuis le bloc dédié du détail (story 3.1). Une réparation `returned` ou `cancelled` est
  verrouillée.
- **Tâches :**
  1. Créer l'écran de modification d'une réparation.
  2. Afficher le client, le vélo et le statut en lecture seule, avec un renvoi vers la fiche client.
  3. Enregistrer les modifications via une Server Action validée.
  4. Masquer l'action de modification sur une réparation close et la refuser côté serveur.
  5. Conserver la saisie et proposer « Réessayer » en cas d'échec réseau.
- **Critères d'acceptance :**
  - [ ] Modifier le problème signalé et enregistrer affiche « Modifications enregistrées. » et actualise
        la date de dernière modification et son auteur.
  - [ ] Le client et le vélo sont affichés mais non modifiables ; leur correction renvoie vers la fiche
        client.
  - [ ] Le statut est affiché en lecture seule, sa modification n'étant possible que depuis le bloc de
        statut du détail.
  - [ ] Une réparation « Restitué » ou « Annulé » ne propose pas l'action de modification, et une
        requête de modification est refusée par le serveur.
  - [ ] Un échec réseau affiche « Connexion perdue. Vos informations sont conservées, réessayez. »,
        conserve toute la saisie et propose « Réessayer ».
- **Terminé quand :** Une fiche se corrige sans risque de perte de saisie, et une fiche close ne se
  modifie plus.

### Story 2.6 — Affecter un réparateur
- **Epic :** Epic 2 — Réparations, clients et vélos
- **Dépend de :** Story 2.4
- **Objectif :** Permettre de désigner ou de changer le réparateur responsable d'une réparation.
- **Contexte :** Action présente sur la fiche de détail (`04-ux-design-shard/` § 6.2), messages au § 12.
  Une réparation ne porte qu'**un seul** réparateur responsable, et seuls les profils `active` sont
  assignables.
- **Tâches :**
  1. Ajouter l'action « Réassigner » sur la fiche de détail.
  2. Charger la liste des profils `active` uniquement.
  3. Enregistrer l'affectation via une Server Action vérifiant l'état du profil cible.
  4. Masquer l'action sur une réparation close.
- **Critères d'acceptance :**
  - [ ] Réassigner une réparation l'attribue au réparateur choisi, affiche « Réparation assignée à
        {nom}. » et actualise la date de dernière modification.
  - [ ] La réparation ne porte qu'un seul réparateur responsable ; le précédent n'apparaît plus.
  - [ ] Seuls les profils `active` sont proposés, et assigner un profil non actif est refusé par le
        serveur.
  - [ ] Une réparation « Restitué » ou « Annulé » ne propose pas l'action de réassignation.
- **Terminé quand :** Chacun sait qui prend en charge le vélo, et un profil inactif ne peut jamais être
  assigné.

### Story 2.7 — Ajouter une note interne
- **Epic :** Epic 2 — Réparations, clients et vélos
- **Dépend de :** Story 2.4
- **Objectif :** Permettre de consigner une observation sur une réparation, transmise à l'équipe sans
  dépendre de la présence de son auteur.
- **Contexte :** Fil de notes décrit dans `04-ux-design-shard/` § 6.2. Les notes sont **immuables** :
  ni modification ni suppression après publication, garanti en base par la story 0.8. Une note ne
  concerne jamais le client : elle n'apparaît pas sur la page publique et **n'actualise pas** la date de
  dernière modification de la réparation, sans quoi le client croirait à une progression.
- **Tâches :**
  1. Ajouter le champ de saisie et l'action « Ajouter la note » sur la fiche de détail.
  2. Enregistrer la note avec son auteur et son horodatage via une Server Action.
  3. Afficher le fil, la plus récente en tête, chacune avec auteur et date.
  4. Replier au-delà de cinq notes, avec une action de dépliage indiquant le total.
  5. Refuser une note vide ou composée uniquement d'espaces.
  6. Garantir que l'ajout d'une note n'actualise pas `updated_at` de la réparation.
- **Critères d'acceptance :**
  - [ ] Ajouter une note l'enregistre avec le nom de son auteur et sa date, l'affiche en tête du fil, et
        affiche « Note ajoutée. ».
  - [ ] Deux notes d'auteurs différents coexistent, la plus récente en haut, chacune avec son auteur et
        sa date.
  - [ ] Aucune action de modification ni de suppression n'est proposée sur une note publiée, et une
        requête de suppression est refusée par la base.
  - [ ] Une note vide ou composée d'espaces est refusée et rien n'est enregistré.
  - [ ] Une réparation portant douze notes en affiche cinq, l'action « Afficher les 12 notes » dépliant
        le reste.
  - [ ] Aucune note n'apparaît sur la page publique, ni dans le contenu transmis au navigateur, même
        masquée visuellement.
  - [ ] Ajouter une note n'actualise pas la date de dernière modification de la réparation.
  - [ ] Un utilisateur non authentifié ou non actif se voit refuser l'action côté serveur.
- **Terminé quand :** L'équipe échange des observations sur une réparation sans que le client en voie
  jamais la trace ni ne croie à une progression.

> L'avant-dernier critère se vérifie en inspectant le contenu transmis au navigateur, pas seulement le
> rendu visuel : une note masquée par du style reste une fuite.

### Story 2.8 — Consulter la liste des clients
- **Epic :** Epic 2 — Réparations, clients et vélos
- **Dépend de :** Story 2.1, Story 1.6
- **Objectif :** Permettre de parcourir et rechercher les clients de l'atelier, pour retrouver
  quelqu'un et corriger une coordonnée.
- **Contexte :** Écran décrit dans `04-ux-design-shard/` § 6.3, listes vides au § 10. Aucune création de
  client depuis cette liste : **un client naît uniquement du formulaire de réparation**, ce qui
  garantit le pattern chercher-ou-créer et évite les fiches orphelines.
- **Tâches :**
  1. Créer la page « Clients » atteinte depuis la navigation.
  2. Afficher nom, téléphone, e-mail, nombre de vélos, nombre de réparations et date de dernière
     réparation.
  3. Ordonner par date de dernière réparation décroissante.
  4. Ajouter la recherche côté serveur.
  5. Décliner la liste en cartes sous 768 px et en tableau au-delà.
  6. Paginer à 25 résultats et refléter la vue dans l'adresse.
- **Critères d'acceptance :**
  - [ ] Chaque client affiche son nom, son téléphone, son e-mail, son nombre de vélos, son nombre de
        réparations et la date de sa dernière réparation.
  - [ ] L'ordre par défaut est la date de dernière réparation décroissante.
  - [ ] Aucune action de création de client ne figure sur cette liste.
  - [ ] La recherche filtre les clients côté serveur.
  - [ ] Sans aucun client, « Aucun client enregistré pour l'instant. » s'affiche avec l'action « Créer
        une réparation ».
  - [ ] Sous 768 px la liste s'affiche en cartes empilées, au-delà en tableau, l'ordre d'importance des
        informations étant identique.
  - [ ] Naviguer en deuxième page avec une recherche active reflète la vue dans l'adresse et la restaure
        à l'identique après rechargement.
- **Terminé quand :** Un employé retrouve un client par la recherche et la vue survit à un rechargement.

### Story 2.9 — Consulter et modifier une fiche client
- **Epic :** Epic 2 — Réparations, clients et vélos
- **Dépend de :** Story 2.8
- **Objectif :** Permettre de consulter un client, ses vélos et son historique, et de corriger ses
  informations.
- **Contexte :** Fiche client dans `04-ux-design-shard/` § 6.3. C'est le **seul emplacement** où les
  vélos sont atteignables : aucune entrée de navigation propre ne leur est dédiée. Un vélo ne change
  jamais de propriétaire (brief § 7). La contrainte « au moins un moyen de contact » est garantie en
  base par la story 0.8.
- **Tâches :**
  1. Créer la page de fiche client.
  2. Afficher les coordonnées, la liste des vélos et l'historique des réparations, de la plus récente à
     la plus ancienne, chacune avec sa pastille et cliquable.
  3. Ajouter la modification des coordonnées, avec validation des formats.
  4. Ajouter la modification d'un vélo, sans possibilité de le rattacher à un autre client.
  5. Refuser la suppression simultanée du téléphone et de l'e-mail.
- **Critères d'acceptance :**
  - [ ] La fiche affiche les coordonnées, les vélos et l'historique des réparations, les plus récentes
        en premier, chacune avec sa pastille de statut et cliquable vers son détail.
  - [ ] Aucune entrée de navigation ne mène aux vélos : ils ne sont atteignables que depuis une fiche
        client.
  - [ ] Modifier les coordonnées affiche « Coordonnées enregistrées. » et la nouvelle valeur apparaît
        sur la fiche et dans les réparations du client.
  - [ ] Modifier la marque ou le modèle d'un vélo se répercute sur les réparations concernant ce vélo.
  - [ ] Aucune action ne permet de rattacher un vélo à un autre client.
  - [ ] Une adresse e-mail mal formée affiche « Cette adresse e-mail n'est pas valide. Exemple :
        martin.dupont@exemple.fr » ; un téléphone mal formé, « Ce numéro de téléphone n'est pas valide.
        Exemple : 06 12 34 56 78 » ; et rien n'est enregistré.
  - [ ] Supprimer à la fois le téléphone et l'e-mail est refusé, un message indiquant qu'au moins un
        moyen de contact est requis.
- **Terminé quand :** Les coordonnées d'un client se corrigent et son historique complet est consultable
  depuis sa fiche.

---

## Epic 3 — Workflow des statuts

Faire évoluer une réparation le long de son cycle de vie, avec les verrous que le métier impose.

### Story 3.1 — Modifier le statut d'une réparation
- **Epic :** Epic 3 — Workflow des statuts
- **Dépend de :** Story 2.4, Story 1.6
- **Objectif :** Permettre de faire évoluer le statut d'une réparation en deux gestes, pour refléter son
  avancement sans ralentir le travail.
- **Contexte :** Les sept statuts et leurs transitions dans
  `05-architecture-shard/05-statuts-et-regles-metier.md` § 9. Transitions **libres**, retour arrière
  compris, sauf verrouillage après un statut terminal. C'est le geste le plus fréquent de
  l'application : s'il demande plus de deux gestes, les réparateurs cesseront de tenir les statuts à
  jour et tout le bénéfice du produit disparaît (risque R5).
- **Tâches :**
  1. Ajouter l'action « Changer le statut » au bloc de statut de la fiche.
  2. Proposer tous les statuts sauf celui en cours.
  3. Écrire la Server Action validant la valeur contre la liste fermée et vérifiant les permissions.
  4. Actualiser la date de dernière modification et son auteur.
  5. Annoncer le changement dans une région vocalisée.
  6. Revalider les écrans concernés pour que la liste et la page publique reflètent le changement.
- **Critères d'acceptance :**
  - [ ] Passer de « Vélo déposé » à « Diagnostic » change le statut, affiche « Statut mis à jour :
        Diagnostic. », actualise la date de modification et son auteur, et fait du nouveau statut
        l'élément visuel principal de la fiche.
  - [ ] La réparation ne possède qu'un seul statut courant ; l'ancien n'apparaît plus comme état actuel.
  - [ ] Repasser de « Prêt à récupérer » à « Réparation en cours » est accepté ; le menu propose tous
        les statuts sauf celui en cours.
  - [ ] Passer d'un statut non terminal à un autre est immédiat, sans modale de confirmation.
  - [ ] Une valeur absente des sept statuts est refusée par le serveur **et** par la base.
  - [ ] Le changement est annoncé dans une région vocalisée par les lecteurs d'écran.
  - [ ] Un collègue rechargeant la fiche ou la liste voit le nouveau statut et la nouvelle date.
  - [ ] Un client ouvrant son lien voit le nouveau statut, son explication et la date actualisée.
  - [ ] Un utilisateur non authentifié ou non actif se voit refuser l'action côté serveur.
- **Terminé quand :** Un réparateur change un statut en deux gestes et le changement se répercute
  partout, y compris sur le suivi client.

### Story 3.2 — Clôturer une réparation restituée
- **Epic :** Epic 3 — Workflow des statuts
- **Dépend de :** Story 3.1
- **Objectif :** Marquer une réparation comme restituée et verrouiller alors la fiche, pour figer
  l'historique de l'intervention.
- **Contexte :** « Restitué » est un statut **terminal** : il verrouille la fiche définitivement (voir
  `05-architecture-shard/05-statuts-et-regles-metier.md` § Transitions autorisées). C'est l'une des
  actions sensibles listées par `04-ux-design-shard/` § 8, donc l'une des seules à demander
  confirmation.
- **Tâches :**
  1. Ajouter la modale de confirmation au passage vers « Restitué ».
  2. Remplacer le bouton de changement de statut par le message de clôture sur une fiche restituée.
  3. Masquer les actions de modification et de réassignation.
  4. Garantir le verrouillage côté serveur et en base.
  5. Exclure les réparations restituées de l'onglet « En cours ».
- **Critères d'acceptance :**
  - [ ] Sélectionner « Restitué » affiche « Marquer cette réparation comme restituée ? Le statut ne
        pourra plus être modifié ensuite. » avec « Annuler » et « Marquer comme restituée ».
  - [ ] Une fiche restituée remplace le bouton de statut par « Cette réparation est clôturée. Le statut
        ne peut plus être modifié. » et ne propose ni modification ni réassignation.
  - [ ] Une requête tentant de changer le statut d'une réparation restituée est refusée par le serveur
        **et** par la base.
  - [ ] La fiche reste accessible en lecture avec ses notes internes, n'est pas supprimée, et son lien
        de suivi reste accessible au client.
  - [ ] Les réparations restituées ne figurent pas dans l'onglet « En cours » mais restent accessibles
        depuis « Toutes » et par le filtre de statut.
  - [ ] L'action « Annuler la réparation » n'est pas proposée sur une réparation restituée.
- **Terminé quand :** Une réparation restituée est définitivement figée, en interface comme en base, et
  reste consultable.

### Story 3.3 — Annuler une réparation
- **Epic :** Epic 3 — Workflow des statuts
- **Dépend de :** Story 3.1
- **Objectif :** Permettre de clore une fiche ouverte par erreur, pour qu'elle cesse d'encombrer la
  liste de travail.
- **Contexte :** Le statut « Annulé » existe parce qu'**aucune réparation ne peut être supprimée**
  (brief § 2.1). Contrairement à « Restitué », il est réversible : une fiche annulée par erreur peut
  être rouverte. Action sensible au sens de `04-ux-design-shard/` § 8, présentée en variante danger.
- **Tâches :**
  1. Ajouter l'action « Annuler la réparation » en variante danger, à l'écart des actions courantes.
  2. Ajouter sa modale de confirmation.
  3. Exclure les réparations annulées de l'onglet « En cours ».
  4. Permettre la réouverture par un changement de statut.
  5. Distinguer visuellement « Annulé » par son libellé, son icône et sa forme de pastille.
  6. Adapter la page publique d'une réparation annulée.
- **Critères d'acceptance :**
  - [ ] Cliquer sur « Annuler la réparation » affiche « Annuler cette réparation ? Elle sortira des
        réparations en cours. Vous pourrez la rouvrir si nécessaire. » ; après confirmation le statut
        devient « Annulé » et « Réparation annulée. » s'affiche.
  - [ ] L'action est présentée en variante danger et placée à l'écart des actions courantes.
  - [ ] Les réparations annulées ne figurent pas dans l'onglet « En cours » mais restent accessibles par
        le filtre de statut, où « Annulé » figure en dernier.
  - [ ] Une réparation annulée reste consultable avec ses notes internes, et aucune suppression n'est
        possible quel que soit le rôle.
  - [ ] Changer le statut d'une réparation annulée vers « Diagnostic » est accepté et la fait
        réapparaître dans les réparations en cours.
  - [ ] La pastille « Annulé » porte son libellé, une croix cerclée et un trait barré, et reste
        distinguable de « Restitué » et « Vélo déposé » sans percevoir la couleur.
  - [ ] La page publique d'une réparation annulée remplace la frise par la pastille « Annulé » et son
        explication, sans afficher de frise partiellement complétée.
- **Terminé quand :** Une fiche ouverte par erreur sort de la liste de travail sans être supprimée, et
  peut être rouverte.

> Le statut « Annulé » n'est pas un confort. Aucune fiche ne pouvant être supprimée, sans lui une
> réparation ouverte par erreur resterait indéfiniment en « Vélo déposé » dans la liste de travail. Le
> défaut apparaîtrait dès la première semaine d'exploitation.

---

## Epic 4 — Suivi public

La proposition de valeur du produit et sa principale surface de risque. Une erreur ici n'est pas un
défaut d'affichage : c'est une fuite de données personnelles.

### Story 4.1 — Consulter l'avancement de sa réparation
- **Epic :** Epic 4 — Suivi public
- **Dépend de :** Story 0.9, Story 3.1
- **Objectif :** Permettre au client de consulter l'état de son vélo depuis le lien reçu de l'atelier,
  sans compte et sans téléphoner.
- **Contexte :** Page publique décrite dans `04-ux-design-shard/` § 6.5. La sécurité repose sur une
  **projection structurelle** : la fonction `get_public_repair()` ne retourne que les champs autorisés,
  et le rôle `anon` n'a **aucun accès direct** aux tables (voir
  `05-architecture-shard/06-securite-rls.md` § La fonction). Exposer un champ supplémentaire exigerait
  de modifier cette fonction — c'est ce qui rend la fuite structurellement improbable plutôt que
  conventionnellement évitée (risque R3).
- **Tâches :**
  1. Écrire la fonction `get_public_repair()` avec son type de retour figé.
  2. Créer la route `/suivi/[token]` appelant cette fonction.
  3. Afficher le mot-symbole, le vélo, le statut, son explication en langage courant, la date de mise à
     jour et la frise de progression.
  4. Construire la frise sur les six étapes du parcours nominal, « Annulé » exclu.
  5. Afficher le message public lorsqu'il existe, sans emplacement vide sinon.
  6. Vérifier l'étanchéité du contenu transmis au navigateur.
- **Critères d'acceptance :**
  - [ ] Ouvrir son lien sans être authentifié affiche le mot-symbole, le vélo, le statut, son explication
        en langage courant, la date de dernière mise à jour et la frise de progression.
  - [ ] Aucune note interne, aucun nom d'employé, aucune coordonnée client et aucune autre réparation
        n'apparaît, ni dans le contenu transmis au navigateur même masqué visuellement.
  - [ ] La page appelle une fonction dédiée ne retournant que les champs autorisés ; le rôle anonyme n'a
        aucun accès direct aux tables métier.
  - [ ] Aucune action de modification n'est proposée, et toute tentative à partir du jeton est refusée
        par le serveur.
  - [ ] Aucun lien vers l'espace interne n'est proposé et rien n'indique son existence.
  - [ ] Depuis un téléphone, le statut est lisible sans zoom ni défilement horizontal, le corps de texte
        fait au moins 16 pixels, et la page reste utilisable jusqu'à 400 % d'agrandissement.
  - [ ] La frise situe le statut courant parmi les six étapes du parcours nominal, « Annulé » n'y
        figurant pas, et une ligne de texte indique l'étape courante.
  - [ ] La date de dernière mise à jour est absolue et complète, jamais relative.
  - [ ] Un message public rédigé s'affiche ; en son absence, aucun emplacement vide n'apparaît.
  - [ ] Une réparation « Restitué » reste consultable et affiche son statut avec son explication.
  - [ ] Modifier le jeton dans l'adresse pour viser une autre réparation affiche le message neutre de
        suivi introuvable.
  - [ ] La page ne se met pas à jour d'elle-même et rien ne présente l'information comme étant en direct.
- **Terminé quand :** Un client voit l'état de son vélo depuis son téléphone, et l'inspection du contenu
  transmis ne révèle aucune donnée interne.

### Story 4.2 — Afficher un message neutre sur un lien invalide
- **Epic :** Epic 4 — Suivi public
- **Dépend de :** Story 4.1
- **Objectif :** Faire comprendre au client qu'un lien ne fonctionne pas, sans jamais révéler pourquoi.
- **Contexte :** Réponse neutre décrite dans `04-ux-design-shard/05-formulaires-et-etats.md` § Accès
  refusé et lien invalide. Un message différencié — « ce lien n'existe pas » contre « ce lien a
  expiré » — transformerait le jeton en outil d'énumération : c'est le cœur de la story.
- **Tâches :**
  1. Créer la page de suivi introuvable.
  2. Servir le même message pour un jeton inexistant, mal formé ou devenu inaccessible.
  3. Conserver le mot-symbole et n'offrir aucun lien vers l'espace interne.
  4. Vérifier qu'aucune différence de code de réponse ne permet de déduire l'existence d'une réparation.
- **Critères d'acceptance :**
  - [ ] Un jeton ne correspondant à aucune réparation affiche « Ce suivi n'est pas disponible. Vérifiez
        le lien reçu de l'atelier ou contactez-le directement. ».
  - [ ] Un jeton vide ou mal formé affiche le même message, sans aucune erreur technique ni trace à
        l'écran.
  - [ ] Le message est strictement identique pour un jeton inexistant, mal formé ou inaccessible, et
        rien ne permet de distinguer ces situations.
  - [ ] La page conserve le mot-symbole, ne propose aucun lien vers l'espace interne, et n'utilise pas
        le message de la page introuvable interne.
  - [ ] Appeler successivement un jeton valide et un jeton inexistant ne révèle aucune différence
        exploitable de code de réponse.
- **Terminé quand :** Les trois causes d'échec produisent une réponse rigoureusement indiscernable.

### Story 4.3 — Copier le lien de suivi
- **Epic :** Epic 4 — Suivi public
- **Dépend de :** Story 2.4, Story 4.1
- **Objectif :** Permettre à un employé de copier le lien de suivi en un clic depuis la fiche.
- **Contexte :** Bloc du lien de suivi décrit dans `04-ux-design-shard/` § 6.2. La transmission au
  client est **manuelle** : l'envoi automatisé est hors périmètre (brief § 3.3). Si ce geste n'est pas
  immédiat au comptoir, le suivi client ne sera pas utilisé et le bénéfice principal du produit
  disparaît (risque R7).
- **Tâches :**
  1. Afficher le lien de suivi dans un bloc dédié de la fiche, tronqué si nécessaire.
  2. Ajouter l'action « Copier le lien » plaçant le lien complet dans le presse-papiers.
  3. Afficher la confirmation de copie.
- **Critères d'acceptance :**
  - [ ] Cliquer sur « Copier le lien » place le lien complet dans le presse-papiers et affiche « Lien de
        suivi copié. ».
  - [ ] Le lien est affiché, tronqué si nécessaire, et l'action de copie est atteignable sans défilement
        supplémentaire depuis ce bloc.
  - [ ] Ouvrir le lien copié dans une fenêtre non authentifiée affiche la page publique de cette
        réparation.
  - [ ] Un utilisateur non authentifié ou non actif ne se voit proposer aucune action de copie du lien
        d'une autre réparation.
- **Terminé quand :** Un employé copie le lien en un clic et le lien copié ouvre bien la bonne page
  publique.

### Story 4.4 — Transmettre le lien de suivi au client
- **Epic :** Epic 4 — Suivi public
- **Dépend de :** Story 4.3
- **Objectif :** Rendre immédiat, au comptoir, l'envoi du lien au client par SMS ou par e-mail, en
  plaçant la coordonnée et le lien à portée sur la fiche.
- **Contexte :** Cette story comble le seul trou qui rendrait le produit inopérant sur son cas d'usage
  principal : la page publique existerait et personne ne la consulterait, faute d'avoir reçu son
  adresse. Un jeton n'est ni dictable au téléphone ni recopiable à la main : on ne l'énonce pas, on
  l'envoie (brief § 3.3). L'application **n'envoie rien elle-même** — l'envoi automatisé est hors
  périmètre — mais elle doit rendre le geste immédiat.
- **Tâches :**
  1. Ajouter la mention guidant le geste sous le bloc du lien.
  2. Afficher le téléphone et l'adresse e-mail du client sur la fiche, copiables.
  3. Gérer le cas d'un client sans aucune coordonnée.
  4. Vérifier de bout en bout qu'un lien reçu ouvre bien la bonne page.
- **Critères d'acceptance :**
  - [ ] Le bloc du lien est accompagné de « Collez ce lien dans un SMS ou un e-mail au client. », et
        aucune action ne laisse croire que l'application envoie elle-même le message.
  - [ ] Le téléphone et l'adresse e-mail du client, lorsqu'ils sont renseignés, sont visibles et
        copiables sans changer de page.
  - [ ] Un client sans téléphone ni e-mail affiche « Ce client n'a ni téléphone ni e-mail : le lien ne
        peut pas lui être envoyé. », la copie du lien restant possible.
  - [ ] Le lien reçu et ouvert depuis un téléphone affiche la page publique correspondant bien à la
        réparation déposée.
- **Terminé quand :** Le geste d'envoi est réalisable au comptoir en quelques secondes, et un client
  reçoit et ouvre effectivement son lien.

### Story 4.5 — Rédiger un message public destiné au client
- **Epic :** Epic 4 — Suivi public
- **Dépend de :** Story 2.4, Story 4.1
- **Objectif :** Permettre d'adresser au client un court message que le statut seul ne porte pas.
- **Contexte :** Champ décrit dans `04-ux-design-shard/` § 6.5. Il doit être **explicitement identifié
  comme visible par le client** et clairement distinct du champ de note interne : les confondre
  exposerait une note interne au client.
- **Tâches :**
  1. Ajouter le champ de message public sur la fiche, distinct et signalé comme visible du client.
  2. Enregistrer sa valeur via une Server Action.
  3. Répercuter le message sur la page publique, sans emplacement vide en son absence.
  4. Masquer la modification sur une réparation close.
- **Critères d'acceptance :**
  - [ ] Saisir un message public et l'enregistrer affiche « Modifications enregistrées. » et le message
        apparaît sur la page publique de suivi.
  - [ ] Sans message rédigé, la page publique n'affiche aucun emplacement vide à cet effet.
  - [ ] Modifier ou vider le message se répercute sur la page publique ; un message vidé n'apparaît plus.
  - [ ] Le champ est explicitement identifié comme visible par le client et distinct du champ de note
        interne.
  - [ ] Une réparation « Restitué » ou « Annulé » ne propose pas la modification du message public.
  - [ ] Un utilisateur non authentifié ou non actif se voit refuser l'action côté serveur.
- **Terminé quand :** Un employé adresse une précision au client, visible sur sa page de suivi, sans
  jamais confondre ce champ avec une note interne.

### Story 4.6 — Imprimer le ticket d'atelier portant le QR code de la fiche
- **Epic :** Epic 4 — Suivi public
- **Dépend de :** Story 2.4
- **Objectif :** Produire un ticket à accrocher au vélo, portant un QR code vers sa fiche interne, pour
  retrouver la bonne réparation d'un scan en atelier.
- **Contexte :** Le ticket est un support **interne** : il n'est pas remis au client et ne porte **pas**
  le lien public. Le QR code encode l'adresse de la fiche interne, protégée comme toute route de
  l'espace interne (voir `05-architecture-shard/07-flux-principaux.md` § Ticket d'atelier et QR code
  interne). La bibliothèque de génération de QR code est la seule dépendance supplémentaire autorisée
  par la stack pour cet usage.
- **Tâches :**
  1. Ajouter l'action « Imprimer le ticket d'atelier » sur la fiche.
  2. Créer la mise en page d'impression, en petit format.
  3. Générer le QR code localement, encodant l'adresse de la fiche interne.
  4. Y porter le nom du client, le vélo et la date de dépôt.
- **Critères d'acceptance :**
  - [ ] Imprimer le ticket produit un feuillet de petit format comportant le nom du client, le vélo, la
        date de dépôt et un QR code.
  - [ ] Scanner le QR code en étant authentifié et actif ouvre la fiche interne de cette réparation et
        permet d'en changer le statut sans étape intermédiaire.
  - [ ] Scanner le QR code sans être authentifié affiche la page de connexion, sans qu'aucune donnée de
        la réparation ne soit visible.
  - [ ] Le ticket ne comporte aucune note interne ni le lien public de suivi.
  - [ ] La génération du QR code n'envoie l'adresse de la fiche à aucun service externe.
- **Terminé quand :** Un réparateur scanne le ticket accroché à un vélo et arrive directement sur la
  fiche interne correspondante.

---

## Epic 5 — Consultation et recherche

Retrouver une réparation en quelques secondes, quel que soit le volume.

### Story 5.1 — Consulter la liste des réparations
- **Epic :** Epic 5 — Consultation et recherche
- **Dépend de :** Story 3.1, Story 1.6
- **Objectif :** Afficher toutes les réparations de l'atelier sur un écran, pour savoir en un coup d'œil
  où en est l'activité.
- **Contexte :** Liste décrite dans `04-ux-design-shard/` § 6.2, deux mises en page au § 10. Un
  **composant unique** produit les deux rendus — cartes empilées sous 768 px, tableau au-delà — avec le
  même ordre d'importance des informations. Pas de défilement infini : une pagination à 25 résultats,
  utilisable au clavier.
- **Tâches :**
  1. Créer la page de liste des réparations.
  2. Écrire la requête serveur avec ses jointures, sans casser l'usage des index.
  3. Afficher statut, client, vélo, réparateur et date de dernière modification, plus les compteurs.
  4. Ordonner par date de dernière modification décroissante.
  5. Décliner le rendu en cartes et en tableau depuis un composant unique.
  6. Paginer à 25 résultats avec contrôles accessibles au clavier.
  7. Rendre toute la ligne ou la carte cliquable, sur au moins 44 pixels de haut.
- **Critères d'acceptance :**
  - [ ] Chaque ligne affiche le statut, le client, le vélo, le réparateur et la date de dernière
        modification, et un compteur indique le nombre total et le nombre en cours.
  - [ ] L'onglet « Toutes » montre les réparations de tous les réparateurs, sans cloisonnement.
  - [ ] L'ordre par défaut est la date de dernière modification décroissante.
  - [ ] Sous 768 px la liste s'affiche en cartes, au-delà en tableau, l'ordre d'importance étant
        identique, et toute la ligne ou la carte est cliquable sur au moins 44 pixels de haut.
  - [ ] Au-delà de 25 réparations, « Précédent », « Suivant » et la page courante sont proposés, sans
        défilement infini, et la pagination est utilisable au clavier.
  - [ ] Sans aucune réparation, « Aucune réparation enregistrée pour l'instant. » s'affiche avec
        l'action « Créer une réparation ».
  - [ ] L'action « Nouvelle réparation » est visible en tête de page, hors du menu compact, y compris
        sur mobile.
  - [ ] Recharger la liste après la modification d'un collègue affiche la valeur à jour, sans donnée
        obsolète servie depuis un cache.
  - [ ] Un profil non actif ne reçoit aucune réparation.
- **Terminé quand :** Un employé voit l'activité de l'atelier sur un écran, dans les deux mises en page,
  avec des données toujours fraîches.

### Story 5.2 — Rechercher une réparation
- **Epic :** Epic 5 — Consultation et recherche
- **Dépend de :** Story 5.1
- **Objectif :** Retrouver une réparation par le nom du client ou par le vélo, en quelques secondes au
  comptoir.
- **Contexte :** Recherche décrite dans `04-ux-design-shard/` § 6.2 ; la requête et les index
  trigrammes dans `05-architecture-shard/10-recherche-filtres.md` § 18. Le filtrage est **toujours
  côté serveur** : charger toutes les réparations pour filtrer dans le navigateur casserait la montée
  en charge et exposerait des données au-delà du besoin.
- **Tâches :**
  1. Ajouter le champ de recherche en tête de liste.
  2. Écrire la requête serveur avec jointures `!inner`, tolérante à la casse et aux espaces.
  3. Afficher le nombre de résultats.
  4. Gérer l'absence de résultat avec l'action d'effacement.
  5. Ajouter le raccourci clavier plaçant le focus dans le champ.
- **Critères d'acceptance :**
  - [ ] Saisir « Dupont » n'affiche que les réparations dont le client correspond, et le nombre de
        résultats est indiqué.
  - [ ] Saisir « Btwin » fait apparaître la réparation concernant un vélo de cette marque.
  - [ ] La recherche fonctionne en minuscules et avec des espaces superflus.
  - [ ] Sans résultat, « Aucune réparation ne correspond à votre recherche. » s'affiche, le terme reste
        dans le champ, et « Effacer les filtres » est proposé.
  - [ ] Le filtrage est réalisé par la base ; l'ensemble des réparations n'est jamais chargé pour être
        filtré dans le navigateur.
  - [ ] Appuyer sur « / » depuis la liste place le focus dans le champ de recherche.
- **Terminé quand :** Une réparation se retrouve par client ou par vélo en quelques secondes, filtrage
  effectué en base.

### Story 5.3 — Filtrer les réparations
- **Epic :** Epic 5 — Consultation et recherche
- **Dépend de :** Story 5.1
- **Objectif :** Restreindre la liste par statut et par réparateur, combinables avec la recherche.
- **Contexte :** Filtres décrits dans `04-ux-design-shard/` § 6.2, ordre des statuts au § 7. Les options
  de statut suivent **l'ordre du workflow**, jamais l'ordre alphabétique : l'ordre alphabétique n'a
  aucun sens métier et ralentit la lecture.
- **Tâches :**
  1. Ajouter les filtres par statut et par réparateur.
  2. Ordonner les options de statut selon le workflow, « Annulé » en dernier.
  3. Combiner les filtres avec la recherche dans la même requête serveur.
  4. Ajouter « Effacer les filtres » avec le décompte des filtres actifs.
  5. Exclure les statuts terminaux de l'onglet « En cours ».
- **Critères d'acceptance :**
  - [ ] Sélectionner « Réparation en cours » n'affiche que les réparations à ce statut, le compteur
        reflétant le nombre de résultats.
  - [ ] Sélectionner un réparateur n'affiche que les réparations dont il est responsable.
  - [ ] Les options du filtre de statut suivent l'ordre du workflow, jamais l'ordre alphabétique, et
        « Annulé » figure en dernier.
  - [ ] Un filtre actif combiné à une recherche produit des résultats respectant simultanément les deux.
  - [ ] « Effacer les filtres » n'apparaît que si au moins un filtre est actif, affiche leur décompte,
        et rétablit la liste complète.
  - [ ] L'onglet « En cours » exclut « Restitué » et « Annulé », qui restent atteignables par le filtre
        de statut.
- **Terminé quand :** Un employé isole les réparations d'un statut et d'un réparateur donnés, en
  combinant avec la recherche.

### Story 5.4 — Consulter mes réparations
- **Epic :** Epic 5 — Consultation et recherche
- **Dépend de :** Story 5.1
- **Objectif :** Ouvrir directement les réparations assignées à l'utilisateur, pour commencer sa journée
  sur son propre travail.
- **Contexte :** Trois onglets de portée décrits dans `04-ux-design-shard/` § 6.2. La vue par défaut
  diffère selon le rôle : « Mes réparations » pour l'employé, « En cours » pour l'administrateur, qui
  supervise l'activité plutôt que d'exécuter.
- **Tâches :**
  1. Ajouter les trois onglets « Mes réparations », « En cours » et « Toutes ».
  2. Appliquer la vue par défaut selon le rôle.
  3. Restreindre « Mes réparations » aux réparations assignées, closes exclues.
  4. Combiner la portée avec la recherche et les filtres.
  5. Gérer l'absence de réparation assignée.
- **Critères d'acceptance :**
  - [ ] Trois onglets sont proposés, l'onglet actif étant signalé par le gras, un soulignement et
        l'attribut de page courante.
  - [ ] Un employé accédant à la liste sans préciser de portée arrive sur « Mes réparations ».
  - [ ] Un administrateur arrive sur « En cours ».
  - [ ] « Mes réparations » n'affiche que les réparations dont l'utilisateur est responsable, closes
        exclues.
  - [ ] Sans réparation assignée, « Aucune réparation ne vous est assignée. » s'affiche avec « Voir
        toutes les réparations ».
  - [ ] Appliquer une recherche ou un filtre depuis « Mes réparations » produit des résultats respectant
        simultanément la portée et les critères.
- **Terminé quand :** Chaque rôle arrive sur la vue qui le concerne, et la portée se combine aux autres
  critères.

### Story 5.5 — Trier les réparations
- **Epic :** Epic 5 — Consultation et recherche
- **Dépend de :** Story 5.1
- **Objectif :** Permettre d'ordonner la liste selon la colonne choisie, sur l'ensemble des résultats.
- **Contexte :** Tri décrit dans `04-ux-design-shard/` § 6.2, accessibilité des tableaux au § 11. Le tri
  est appliqué **par la base**, pas sur la page affichée : trier seulement la page courante donnerait
  un résultat faux dès la deuxième page. Les en-têtes n'existant pas en rendu mobile, un sélecteur les
  remplace.
- **Tâches :**
  1. Rendre triables les en-têtes client, statut, réparateur et date de dernière modification.
  2. Appliquer le tri dans la requête serveur, sur l'ensemble des résultats.
  3. Inverser le sens au second clic et signaler la colonne triée.
  4. Porter l'attribut de tri destiné aux technologies d'assistance.
  5. Proposer un sélecteur « Trier par » en rendu mobile.
- **Critères d'acceptance :**
  - [ ] Cliquer sur l'en-tête « Client » trie par nom croissant, un indicateur signalant la colonne et
        son sens.
  - [ ] Un second clic sur le même en-tête inverse le sens.
  - [ ] Les colonnes client, statut, réparateur et date de dernière modification sont triables, la
        colonne triée portant l'attribut de tri pour les technologies d'assistance.
  - [ ] Sous 768 px, un sélecteur « Trier par » est proposé.
  - [ ] Le tri est appliqué par la base et porte sur l'ensemble des résultats, pas seulement sur la page
        affichée.
- **Terminé quand :** La liste s'ordonne selon quatre critères, sur l'ensemble des résultats et dans les
  deux rendus.

### Story 5.6 — Retrouver une vue par son adresse
- **Epic :** Epic 5 — Consultation et recherche
- **Dépend de :** Story 5.2, Story 5.3, Story 5.4, Story 5.5
- **Objectif :** Faire survivre une vue filtrée à un rechargement et la rendre partageable.
- **Contexte :** Persistance dans l'URL décrite dans `04-ux-design-shard/` § 6.2. Aucun état n'est
  conservé dans le navigateur : l'adresse **est** l'état. C'est ce qui rend la vue partageable à un
  collègue et cohérente avec le retour arrière.
- **Tâches :**
  1. Refléter portée, recherche, filtres, tri et pagination dans les paramètres de l'adresse.
  2. Reconstruire la vue depuis l'adresse au chargement.
  3. Traiter les valeurs invalides en retombant sur les valeurs par défaut.
  4. Vérifier la cohérence du retour arrière du navigateur.
- **Critères d'acceptance :**
  - [ ] Appliquer une portée, une recherche, des filtres, un tri et une pagination fait apparaître
        chacun de ces paramètres dans l'adresse.
  - [ ] Recharger la page restaure la vue à l'identique, sans qu'aucun état conservé dans le navigateur
        ne soit nécessaire.
  - [ ] Transmettre l'adresse à un collègue actif lui donne la même vue, les données restant limitées à
        ce que son profil autorise.
  - [ ] Le retour arrière du navigateur ramène à la vue précédente.
  - [ ] Une valeur de filtre, de tri ou de page invalide affiche la liste avec les valeurs par défaut,
        sans erreur technique.
- **Terminé quand :** Une vue filtrée se recharge et se partage à l'identique par sa seule adresse.

---

## Epic 6 — Inscription et gestion des employés

Permettre l'arrivée d'un nouvel employé sans intervention en base. Fonction d'administration
ponctuelle, sollicitée à l'arrivée d'un employé, elle ne bloque aucun autre epic — les comptes de
développement provenant du seed.

### Story 6.1 — S'inscrire comme employé
- **Epic :** Epic 6 — Inscription et gestion des employés
- **Dépend de :** Story 1.2, Story 0.10
- **Objectif :** Permettre à un nouvel employé de créer un compte pour demander l'accès à l'application.
- **Contexte :** Écran d'inscription dans `04-ux-design-shard/` § 6.1. La confirmation d'e-mail est
  **désactivée** : la barrière d'entrée est la validation par l'administrateur, pas la vérification
  d'adresse (voir `03-stack-shard/07-auth-et-validation.md`). Le rôle et l'état ne proviennent
  **jamais** du formulaire : le trigger de la story 0.8 les impose à `employee` et `pending`.
- **Tâches :**
  1. Créer l'écran d'inscription avec les champs nom, adresse e-mail et mot de passe.
  2. Créer le compte via Supabase Auth, le profil étant créé par le trigger.
  3. Rediriger vers l'écran d'attente de validation.
  4. Afficher les règles de mot de passe avant toute saisie.
  5. Traiter l'adresse déjà utilisée par un message ne révélant pas l'existence du compte.
  6. Empêcher la double soumission.
- **Critères d'acceptance :**
  - [ ] Une inscription valide crée le compte d'authentification et un profil au rôle `employee` et à
        l'état `pending`, redirige vers l'écran d'attente, et ne donne pas accès à l'espace interne.
  - [ ] Aucun e-mail de confirmation d'adresse ne conditionne l'inscription.
  - [ ] Une adresse déjà utilisée affiche « Si un compte existe pour cette adresse, vous pouvez vous
        connecter ou réinitialiser votre mot de passe. », ne crée aucun profil, et conserve la saisie.
  - [ ] Soumettre sans nom affiche un message au niveau du champ, les autres champs conservant leur
        valeur.
  - [ ] Une adresse mal formée affiche « Cette adresse e-mail n'est pas valide. Exemple :
        martin.dupont@exemple.fr » sans envoyer de requête au serveur.
  - [ ] Les règles de longueur du mot de passe sont affichées avant la saisie, et un mot de passe trop
        court produit « Le mot de passe doit contenir au moins 8 caractères. ».
  - [ ] Cliquer deux fois sur « Créer mon compte » ne crée qu'un seul compte.
  - [ ] Une requête forçant le rôle `admin` ou l'état `active` est ignorée par le serveur ; aucun profil
        n'est créé avec ces valeurs.
- **Terminé quand :** Un nouvel employé s'inscrit, atterrit sur l'écran d'attente, et aucune requête
  forgée ne lui donne d'accès.

### Story 6.2 — Consulter les comptes de l'atelier
- **Epic :** Epic 6 — Inscription et gestion des employés
- **Dépend de :** Story 6.1, Story 1.2
- **Objectif :** Donner à l'administrateur la vue des demandes en attente, des employés actifs et des
  demandes refusées.
- **Contexte :** Écran décrit dans `04-ux-design-shard/` § 6.4. Les trois groupes sont présentés **dans
  cet ordre** : les demandes en attente sont ce qui appelle une action. Les actions figurent
  directement dans la ligne, sans ouvrir de fiche.
- **Tâches :**
  1. Créer la page « Employés », réservée au rôle `admin`.
  2. Présenter les trois groupes dans l'ordre : en attente, actifs, refusés.
  3. Afficher nom, adresse et date de demande pour les demandes ; nom, adresse et rôle pour les actifs.
  4. Placer les actions directement dans la ligne.
  5. Masquer l'entrée de navigation pour les employés.
- **Critères d'acceptance :**
  - [ ] L'écran présente, dans cet ordre, les demandes en attente, les employés actifs et les demandes
        refusées.
  - [ ] Chaque demande affiche le nom, l'adresse e-mail et la date de demande ; chaque employé actif son
        nom, son adresse et son rôle.
  - [ ] « Accepter » et « Refuser » sont visibles directement dans la ligne, sans ouvrir de fiche.
  - [ ] Sans demande en attente, « Aucune demande d'inscription en attente. » s'affiche.
  - [ ] L'entrée « Employés » ne figure pas dans la navigation d'un employé, et l'accès direct à son
        adresse affiche « Vous n'avez pas accès à cette page. ».
- **Terminé quand :** L'administrateur voit d'un coup d'œil qui attend, qui accède et qui a été refusé.

### Story 6.3 — Accepter une demande d'inscription
- **Epic :** Epic 6 — Inscription et gestion des employés
- **Dépend de :** Story 6.2
- **Objectif :** Permettre à l'administrateur de valider une inscription et d'ouvrir l'accès à
  l'employé.
- **Contexte :** L'acceptation est **réversible** : elle ne demande donc aucune confirmation,
  contrairement au refus (voir `04-ux-design-shard/` § 8 actions sensibles). Le changement d'état doit
  être pris en compte au simple rechargement de la page de l'employé, sans reconnexion.
- **Tâches :**
  1. Ajouter l'action « Accepter l'employé » dans la ligne.
  2. Écrire la Server Action passant l'état à `active`, réservée au rôle `admin`.
  3. Déplacer la ligne vers le groupe des employés actifs.
  4. Vérifier la prise en compte au rechargement côté employé.
- **Critères d'acceptance :**
  - [ ] Accepter une demande passe l'état à `active`, la fait disparaître des demandes en attente,
        l'ajoute aux employés actifs, et affiche « {nom} a maintenant accès à l'application. ».
  - [ ] Aucune modale de confirmation n'apparaît, l'action étant réversible.
  - [ ] Un employé accepté ayant une session ouverte sur l'écran d'attente accède à la liste des
        réparations au simple rechargement, sans se reconnecter.
  - [ ] Un employé appelant l'action d'acceptation en contournant l'interface se la voit refuser par le
        serveur, la base refusant également la modification de l'état d'un autre profil.
- **Terminé quand :** Un employé accepté accède à l'application sans avoir à se reconnecter.

### Story 6.4 — Refuser une demande d'inscription
- **Epic :** Epic 6 — Inscription et gestion des employés
- **Dépend de :** Story 6.2
- **Objectif :** Permettre de rejeter une demande tout en conservant la trace de la décision.
- **Contexte :** Le compte refusé n'est **pas supprimé** : il conserve la trace de la décision et permet
  une réactivation ultérieure (story 6.5). Le refus est une action sensible : il demande confirmation
  (`04-ux-design-shard/` § 8).
- **Tâches :**
  1. Ajouter l'action « Refuser la demande » dans la ligne.
  2. Ajouter sa modale de confirmation nominative.
  3. Écrire la Server Action passant l'état à `rejected`, réservée au rôle `admin`.
  4. Déplacer la ligne vers le groupe des demandes refusées.
- **Critères d'acceptance :**
  - [ ] Refuser une demande affiche « Refuser la demande de {nom} ? Cette personne ne pourra pas accéder
        à l'application. » ; après confirmation l'état passe à `rejected` et « Demande refusée. »
        s'affiche.
  - [ ] Le compte apparaît dans le groupe des demandes refusées et n'est pas supprimé.
  - [ ] Le titulaire d'un compte refusé qui se connecte voit « Votre demande d'accès n'a pas été
        acceptée. Contactez l'administrateur de l'atelier. », et aucune donnée métier ne lui est
        transmise, y compris par requête directe.
  - [ ] Un employé appelant l'action de refus en contournant l'interface se la voit refuser par le
        serveur.
- **Terminé quand :** Une demande refusée ferme effectivement l'accès et la décision reste tracée.

### Story 6.5 — Réactiver un compte refusé
- **Epic :** Epic 6 — Inscription et gestion des employés
- **Dépend de :** Story 6.4
- **Objectif :** Permettre de rendre son accès à un compte refusé, pour corriger un refus prononcé par
  erreur.
- **Contexte :** Sans cette story, un employé refusé par erreur n'a **aucun moyen** de récupérer son
  accès : il ne peut pas se réinscrire, son adresse existant déjà. Comme l'acceptation, la réactivation
  est réversible et ne demande donc pas de confirmation.
- **Tâches :**
  1. Ajouter l'action « Réactiver le compte » sur les demandes refusées.
  2. Écrire la Server Action passant l'état à `active`, réservée au rôle `admin`.
  3. Déplacer la ligne vers les employés actifs.
- **Critères d'acceptance :**
  - [ ] Réactiver un compte refusé passe son état à `active`, l'ajoute aux employés actifs, et affiche
        « {nom} a de nouveau accès à l'application. ».
  - [ ] Le titulaire se connecte avec ses identifiants d'origine, sans nouvelle inscription.
  - [ ] Aucune modale de confirmation n'apparaît, l'action étant réversible.
  - [ ] Un employé appelant l'action de réactivation en contournant l'interface se la voit refuser par
        le serveur.
- **Terminé quand :** Un refus prononcé par erreur se corrige sans que l'employé ait à se réinscrire.

### Story 6.6 — Promouvoir ou rétrograder un utilisateur
- **Epic :** Epic 6 — Inscription et gestion des employés
- **Dépend de :** Story 6.3
- **Objectif :** Permettre de modifier le rôle d'un utilisateur interne, sans jamais laisser l'atelier
  sans administrateur actif.
- **Contexte :** La protection du dernier administrateur est garantie **à trois niveaux** : interface,
  serveur et base (voir `05-architecture-shard/06-securite-rls.md`). Sans elle, une rétrogradation
  malheureuse rendrait l'application définitivement ingérable — plus personne ne pourrait valider une
  inscription ni promouvoir qui que ce soit.
- **Tâches :**
  1. Ajouter les actions de promotion et de rétrogradation sur les employés actifs.
  2. Écrire la Server Action de changement de rôle, réservée au rôle `admin`.
  3. Refuser toute opération laissant l'application sans administrateur actif, avec son message.
  4. Étendre la protection aux opérations de refus et de désactivation.
  5. Garantir la contrainte en base.
- **Critères d'acceptance :**
  - [ ] Promouvoir un employé actif modifie son rôle, et il accède à la gestion des employés à son
        prochain rechargement.
  - [ ] Rétrograder un administrateur, alors qu'un autre administrateur actif existe, modifie son rôle
        et fait disparaître « Employés » de sa navigation.
  - [ ] Le seul administrateur actif ne peut pas se rétrograder : l'opération est refusée avec un
        message expliquant qu'au moins un administrateur actif doit subsister.
  - [ ] Une opération de refus ou de désactivation visant le dernier administrateur actif est refusée
        avec le même message.
  - [ ] Une requête forgée tentant une rétrogradation laissant l'application sans administrateur actif
        est refusée par le serveur **et** par la base.
  - [ ] Un employé appelant l'action de changement de rôle se la voit refuser côté serveur.
- **Terminé quand :** Les rôles se partagent librement, sans qu'aucun chemin ne puisse laisser l'atelier
  sans administrateur.

---

## Epic 7 — Conformité, finition et mise en service

Traiter ce qui ne peut sincèrement se faire qu'à la fin, une fois tous les écrans existants. Cet epic
ne contient **aucun rattrapage** de responsive, d'états d'interface ou de permissions : ces points
relèvent de la Definition of Done et ont été livrés avec chaque story.

### Story 7.1 — Anonymiser un client
- **Epic :** Epic 7 — Conformité, finition et mise en service
- **Dépend de :** Story 2.9, Story 4.1
- **Objectif :** Permettre à l'administrateur d'effacer les données identifiantes d'un client à sa
  demande, sans supprimer l'historique des réparations.
- **Contexte :** L'anonymisation est la **seule** voie qui réconcilie le droit à l'effacement avec la
  règle « aucune réparation n'est supprimée » (brief § 10). La fonction `anonymize_client()` est décrite
  dans `05-architecture-shard/11-rgpd.md`. Le téléphone reçoit une valeur neutre plutôt que `NULL`,
  pour ne pas violer la contrainte « au moins un moyen de contact ». L'opération est **irréversible**.
- **Tâches :**
  1. Écrire la fonction d'anonymisation en base.
  2. Ajouter l'action « Anonymiser ce client » sur la fiche client, réservée au rôle `admin`.
  3. Ajouter sa modale de confirmation en variante danger, rappelant l'irréversibilité.
  4. Neutraliser les liens de suivi des réparations du client.
  5. Afficher un bandeau d'anonymisation avec sa date sur la fiche.
- **Critères d'acceptance :**
  - [ ] Cliquer sur « Anonymiser ce client » affiche une modale de variante danger rappelant que le nom
        sera remplacé par « Client anonymisé », que le téléphone et l'e-mail seront effacés, qu'aucune
        réparation ne sera supprimée, et que l'action est irréversible.
  - [ ] Confirmer remplace le nom par « Client anonymisé » suivi d'un suffixe, vide l'adresse e-mail et
        remplace le téléphone par une valeur sentinelle non identifiante, partout où ces champs
        apparaissent ; affiche « Client anonymisé. » ; fait apparaître un bandeau daté sur la fiche.
  - [ ] Les réparations du client restent consultables avec leurs données techniques, leurs statuts et
        leurs notes internes, aucune n'ayant été supprimée.
  - [ ] Ouvrir un ancien lien de suivi d'un client anonymisé affiche le message neutre de suivi
        indisponible, sans transmettre aucune donnée le concernant.
  - [ ] Un employé actif ne se voit pas proposer l'action, et son appel direct est refusé côté serveur.
  - [ ] Aucune action de l'application ne permet de restaurer les coordonnées d'origine.
- **Terminé quand :** Une demande d'effacement est honorée sans qu'aucune fiche de réparation ne
  disparaisse.

### Story 7.2 — Afficher la mention d'information sur les données personnelles
- **Epic :** Epic 7 — Conformité, finition et mise en service
- **Dépend de :** Story 4.1
- **Objectif :** Informer le client des données détenues sur lui et de la manière de les faire effacer.
- **Contexte :** Mention accessible depuis la page publique (`04-ux-design-shard/` § 6.5, pied de page).
  Son contenu est fixé par le brief § 10 : finalité, responsable de traitement, durée de conservation
  de trois ans, droits et moyen de contact.
- **Tâches :**
  1. Créer la page de mention d'information.
  2. Y porter la finalité, le responsable de traitement, la durée de conservation, les droits et le
     moyen de contact.
  3. Ajouter le lien discret en pied de la page publique.
  4. Conserver le mot-symbole sans lien vers l'espace interne.
- **Critères d'acceptance :**
  - [ ] Un lien discret vers la mention figure en pied de la page de suivi.
  - [ ] La mention indique la finalité du traitement, le responsable de traitement, la durée de
        conservation, les droits du client et un moyen de contact.
  - [ ] La durée de conservation de trois ans après la dernière réparation y figure.
  - [ ] La page conserve le mot-symbole et ne propose aucun lien vers l'espace interne.
- **Terminé quand :** Un client sait quelles données l'atelier détient et comment exercer ses droits.

### Story 7.3 — Exclure la page publique de l'indexation
- **Epic :** Epic 7 — Conformité, finition et mise en service
- **Dépend de :** Story 4.1
- **Objectif :** Empêcher que les pages de suivi apparaissent dans un moteur de recherche.
- **Contexte :** Sans cette directive, le nom d'un client et son vélo pourraient devenir publiquement
  consultables par simple recherche (brief risque R4). La protection est double : directive de
  non-indexation, et aucun lien vers une page de suivi depuis une page publiquement accessible.
- **Tâches :**
  1. Poser la directive de non-indexation sur la page publique de suivi.
  2. La poser également sur la page de suivi introuvable.
  3. Vérifier qu'aucune adresse de suivi ne figure dans les fichiers de référencement.
  4. Vérifier qu'aucun lien vers une page de suivi n'existe depuis une page publique.
- **Critères d'acceptance :**
  - [ ] La page publique de suivi porte une directive de non-indexation.
  - [ ] La page de suivi introuvable porte la même directive.
  - [ ] Aucune adresse de suivi ne figure dans les fichiers de référencement du site.
  - [ ] Aucun lien vers une page de suivi n'existe depuis une page publiquement accessible.
- **Terminé quand :** Aucune page de suivi n'est atteignable par un moteur de recherche.

### Story 7.4 — Afficher les pages d'erreur
- **Epic :** Epic 7 — Conformité, finition et mise en service
- **Dépend de :** Story 1.6, Story 4.2
- **Objectif :** Faire comprendre à l'utilisateur ce qui s'est passé lorsqu'une page est inaccessible.
- **Contexte :** Écrans d'erreur décrits dans `04-ux-design-shard/` § 6.6, journalisation dans
  `05-architecture-shard/09-validation-et-erreurs.md` § Journalisation. Le 404 public ne doit
  **jamais** reprendre le message du 404 interne : il trahirait l'existence d'un espace interne. Le
  jeton public et les coordonnées client ne sont jamais journalisés.
- **Tâches :**
  1. Créer les pages 403, 404 interne, 404 public et 500.
  2. Faire correspondre le 404 public au message neutre de lien invalide.
  3. Journaliser les erreurs serveur avec un identifiant de corrélation présenté à l'utilisateur.
  4. Exclure de la journalisation le jeton public et les coordonnées client.
- **Critères d'acceptance :**
  - [ ] Un employé accédant à une page réservée à l'administrateur voit « Vous n'avez pas accès à cette
        page. » avec « Retour aux réparations ».
  - [ ] Une adresse interne inexistante affiche « Cette page n'existe pas. » avec « Retour aux
        réparations ».
  - [ ] Une adresse publique inexistante affiche le message neutre de suivi indisponible, identique à
        celui d'un lien invalide, sans jamais reprendre le message interne ni trahir l'existence d'un
        espace interne.
  - [ ] Une erreur technique affiche « Une erreur est survenue de notre côté. » avec « Réessayer », sans
        aucune requête, trace technique ni information sur une ressource non autorisée à l'écran.
  - [ ] L'erreur est journalisée côté serveur avec son détail et un identifiant de corrélation présenté
        à l'utilisateur, ni le jeton public ni les coordonnées client n'étant journalisés.
- **Terminé quand :** Les quatre situations d'erreur produisent chacune leur écran, et le 404 public ne
  révèle rien de l'espace interne.

### Story 7.5 — Vérifier la conformité d'accessibilité
- **Epic :** Epic 7 — Conformité, finition et mise en service
- **Dépend de :** Toutes les stories produisant un écran
- **Objectif :** Vérifier à l'échelle de l'application entière ce qui ne s'observe pas écran par écran :
  continuité du parcours clavier, cohérence de la hiérarchie des titres, contrastes.
- **Contexte :** Exigences dans `04-ux-design-shard/` § 11, trois canaux d'information au § 7. Cette
  story est une **passe de vérification globale**, pas un rattrapage : chaque story a déjà satisfait le
  critère 6 de la Definition of Done (`06-plan.md` § 3).
- **Tâches :**
  1. Parcourir l'application entière au clavier seul.
  2. Mesurer les contrastes du texte, des bordures, des pastilles et des icônes.
  3. Afficher l'application en niveaux de gris et vérifier la distinction des sept statuts.
  4. Vérifier le zoom à 200 % en interne et 400 % sur la page publique.
  5. Vérifier la hiérarchie des titres et la déclaration de langue de chaque page.
  6. Mesurer les cibles tactiles et leur espacement.
  7. Vérifier les annonces dynamiques et le respect de la préférence de mouvement réduit.
- **Critères d'acceptance :**
  - [ ] Chaque action est atteignable et déclenchable au clavier seul, le focus restant visible en
        permanence avec un anneau contrasté, et « Aller au contenu » étant le premier élément focusable
        de l'espace interne.
  - [ ] Le texte courant atteint au moins 4,5:1 ; les bordures de champs, pastilles de statut et icônes
        porteuses de sens au moins 3:1.
  - [ ] En niveaux de gris, les sept statuts restent distinguables par libellé, icône et forme, et
        l'entrée de navigation active comme l'onglet actif restent identifiables.
  - [ ] À 200 % sur l'espace interne, aucune fonction n'est perdue et aucun défilement horizontal
        n'apparaît ; la page publique reste utilisable jusqu'à 400 %.
  - [ ] Chaque page porte un seul titre de premier niveau nommant l'écran, la hiérarchie des titres ne
        saute aucun niveau, et la langue française est déclarée.
  - [ ] Chaque cible interactive de l'espace interne atteint au moins 44 pixels de côté, deux cibles
        adjacentes étant espacées d'au moins 8 pixels.
  - [ ] Un changement de statut, une confirmation d'action ou une évolution du nombre de résultats est
        annoncé dans une région vocalisée.
  - [ ] Une préférence système de mouvement réduit neutralise toute transition de plus de
        200 millisecondes.
- **Terminé quand :** L'application entière se parcourt au clavier, se lit sans distinguer les couleurs,
  et supporte le zoom exigé.

### Story 7.6 — Recetter le parcours complet et basculer en production
- **Epic :** Epic 7 — Conformité, finition et mise en service
- **Dépend de :** Toutes les stories
- **Objectif :** Vérifier l'application de bout en bout puis l'ouvrir à l'atelier sur des données
  réelles.
- **Contexte :** Les treize critères d'acceptation du PRD § 11 constituent la recette. La **mesure de
  référence des appels** doit être réalisée *avant* la bascule : elle n'a aucun coût de développement
  et n'est plus réalisable après le lancement (brief § 6.3). Le seed n'est jamais exécuté en
  production.
- **Tâches :**
  1. Dérouler le parcours complet du dépôt à la restitution, sur téléphone et sur tablette.
  2. Rejouer un à un les treize critères d'acceptation du PRD et consigner chaque verdict par écrit.
  3. Chronométrer dix créations de fiche au comptoir.
  4. Réaliser et consigner la mesure de référence du nombre d'appels de suivi sur une semaine.
  5. Appliquer les migrations sur le projet de production, sans exécuter le seed.
  6. Créer le premier administrateur réel.
  7. Trancher et consigner les arbitrages de mise en service.
- **Critères d'acceptance :**
  - [ ] Le parcours complet — création, envoi du lien, changements de statut, consultation client,
        restitution — se déroule sans blocage, depuis un téléphone et depuis une tablette.
  - [ ] Les treize critères d'acceptation du PRD sont rejoués un à un, chacun prononcé conforme ou non
        conforme par écrit.
  - [ ] Dix créations de fiche chronométrées au comptoir sont chacune réalisées en 90 secondes ou moins.
  - [ ] Le comptage des appels de suivi sur une semaine a été réalisé avant la bascule et consigné comme
        point de référence.
  - [ ] Les migrations ont été appliquées sur le projet de production, le script de données de
        démonstration n'y a pas été exécuté, un premier administrateur réel existe, et les comptes
        d'hébergement appartiennent à digital-artisan.
  - [ ] L'usage commercial de l'hébergement a été arbitré, la reprise ou non des réparations en cours
        décidée et consignée, la date d'arrêt du support papier fixée, et le nom applicatif définitif
        tranché ou explicitement reconduit.
- **Terminé quand :** L'atelier utilise l'application sur des données réelles et la mesure de référence
  des appels est enregistrée.
