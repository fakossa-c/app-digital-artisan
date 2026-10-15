# Stack technique — index

| | |
|---|---|
| **Projet** | digital-artisan (D-G) |
| **Application** | **D-g** — nom provisoire |
| **Document parent** | `03-stack.md` — version 2.0, statut « stack figée » |
| **Date** | 2026-07-26 |
| **Original** | archivé dans [`../_archive/03-stack.md`](../_archive/03-stack.md) |
| **Découpage** | 11 parties · 669 lignes de contenu |

## Le rôle de ce document

La stack définit **avec quels outils l'application est construite** : les technologies retenues, leurs versions exactes, les dépendances interdites, la chaîne de livraison, les environnements, les quotas des services gratuits et les onze décisions techniques actées.

Elle ne définit ni ce que fait le produit (PRD), ni comment le code est organisé et sécurisé (architecture), ni l'ordre de développement (plan et backlog). En cas de question sur *quelle version installer* ou *quel outil employer*, la réponse est ici. Cette stack est figée : les documents en aval expliquent comment elle est utilisée, sans la remettre en cause.

---

## Les onze morceaux

| Fichier | Contenu | Quand le consulter |
|---|---|---|
| [`01-objectif-et-vue-ensemble.md`](./01-objectif-et-vue-ensemble.md) | En-tête, sections 1 et 2 : principes de choix des outils, tableau besoin → technologie | Pour une **vue d'ensemble en trente secondes**, ou pour savoir quelle technologie couvre un besoin donné |
| [`02-versions-epinglees.md`](./02-versions-epinglees.md) | Section 3 : **tableau des versions** outil par outil avec justification, `packageManager` et `engines`, **dépendances écartées du socle** | Avant d'**installer ou de mettre à jour un paquet**. Le morceau le plus consulté : il dit quelle version poser et laquelle ne jamais installer |
| [`03-application-et-langage.md`](./03-application-et-langage.md) | Sections 4 et 5 : Next.js et l'App Router, TypeScript strict, **génération des types Supabase** | Pour savoir ce que couvre l'application unique, ou **régénérer `database.types.ts`** après une migration |
| [`04-interface.md`](./04-interface.md) | Section 6 : organisation des composants React, composants serveur par défaut, **Tailwind v4 configuré en CSS** | Pour créer un composant, ou **diagnostiquer un thème Tailwind ignoré** (le piège `tailwind.config.js`) |
| [`05-backend-et-donnees.md`](./05-backend-et-donnees.md) | Section 7 : services Supabase, **tableau des deux clients** et leurs emplacements, ce que stocke PostgreSQL | Pour savoir **quel client Supabase importer** selon le contexte d'exécution. Le point de configuration le plus délicat de la stack |
| [`06-migrations.md`](./06-migrations.md) | Section 8 : Supabase CLI, séquence de commandes, règles fermes, `seed.sql` | Pour **créer une migration** ou vérifier ce qui est interdit (modifier le schéma via l'interface web) |
| [`07-auth-et-validation.md`](./07-auth-et-validation.md) | Sections 9 et 10 : Supabase Auth, **piège du compte `pending` avec session valide**, confirmation d'e-mail désactivée, Zod | Pour implémenter l'authentification, comprendre pourquoi la RLS doit vérifier `active`, ou **écrire un schéma de validation** |
| [`08-hebergement-et-deploiement.md`](./08-hebergement-et-deploiement.md) | Sections 11 à 14 : Vercel, **variables d'environnement**, règle sur la `service_role key`, Git et GitHub, chaîne de livraison, deux projets Supabase | Pour **configurer une variable d'environnement**, nommer une branche, ou savoir quel projet Supabase cible un déploiement |
| [`09-qualite-et-journalisation.md`](./09-qualite-et-journalisation.md) | Sections 15 et 16 : ESLint et Prettier, **fichier `ci.yml` complet**, protection de branche, absence de tests, journalisation des erreurs | Pour **monter la CI**, comprendre pourquoi il n'y a pas de tests, ou journaliser une erreur sans fuite |
| [`10-couts-et-comptes.md`](./10-couts-et-comptes.md) | Section 17 : quotas du tier gratuit Supabase et **mise en pause à 7 jours**, plan Hobby Vercel, propriété des comptes, nommage des ressources, sauvegardes | Quand **l'application semble cassée sans raison** (projet en pause), ou avant de parler budget et livraison avec le client |
| [`11-dependances-et-decisions.md`](./11-dependances-et-decisions.md) | Sections 18 à 21 : critères d'ajout d'une dépendance, **tableau des 11 décisions actées**, stack retenue, **registre des 9 dettes techniques** | Avant d'**ajouter une bibliothèque**, ou pour savoir **pourquoi un choix a été fait** avant de proposer de le changer |

---

## Où trouver quoi

Index par sujet. Chaque entrée pointe vers le fichier et la section qui portent la réponse.

### Versions et dépendances

| Je cherche… | C'est ici |
|---|---|
| Quelle version de Next.js installer | [`02-versions-epinglees.md`](./02-versions-epinglees.md#3-versions-épinglées) |
| Quelle version de Node.js et comment elle est fixée | [`02-versions-epinglees.md`](./02-versions-epinglees.md#3-versions-épinglées) |
| Quel gestionnaire de paquets | [`02-versions-epinglees.md`](./02-versions-epinglees.md#3-versions-épinglées) |
| Pourquoi `@supabase/ssr` et pas `auth-helpers` | [`02-versions-epinglees.md`](./02-versions-epinglees.md#dépendances-explicitement-écartées-du-socle) |
| Pourquoi ni Prisma ni Drizzle | [`02-versions-epinglees.md`](./02-versions-epinglees.md#dépendances-explicitement-écartées-du-socle) |
| Pourquoi ni shadcn/ui ni MUI | [`02-versions-epinglees.md`](./02-versions-epinglees.md#dépendances-explicitement-écartées-du-socle) |
| Pourquoi ni Redux ni Zustand | [`02-versions-epinglees.md`](./02-versions-epinglees.md#dépendances-explicitement-écartées-du-socle) |
| Si j'ai le droit d'ajouter une bibliothèque | [`11-dependances-et-decisions.md`](./11-dependances-et-decisions.md#18-dépendances-autorisées) |
| Pourquoi Zod plutôt que Valibot | [`07-auth-et-validation.md`](./07-auth-et-validation.md#10-validation-des-données) |
| Pourquoi ESLint plutôt que Biome | [`09-qualite-et-journalisation.md`](./09-qualite-et-journalisation.md#outillage-retenu) |

### Configuration et code

| Je cherche… | C'est ici |
|---|---|
| Comment régénérer les types Supabase | [`03-application-et-langage.md`](./03-application-et-langage.md#génération-des-types-supabase) |
| Quand régénérer `database.types.ts` et faut-il le versionner | [`03-application-et-langage.md`](./03-application-et-langage.md#génération-des-types-supabase) |
| Quel client Supabase importer dans une Server Action | [`05-backend-et-donnees.md`](./05-backend-et-donnees.md#les-deux-clients-supabase) |
| Où se trouvent les fabriques de clients Supabase | [`05-backend-et-donnees.md`](./05-backend-et-donnees.md#les-deux-clients-supabase) |
| Pourquoi mon thème Tailwind est ignoré | [`04-interface.md`](./04-interface.md#tailwind-css) |
| Où se configure Tailwind v4 | [`04-interface.md`](./04-interface.md#tailwind-css) |
| Comment créer une nouvelle migration | [`06-migrations.md`](./06-migrations.md#outillage) |
| Si je peux modifier le schéma depuis l'interface Supabase | [`06-migrations.md`](./06-migrations.md#règles-fermes) |
| Où écrire les politiques RLS | [`06-migrations.md`](./06-migrations.md#règles-fermes) |
| Où placer les schémas de validation | [`07-auth-et-validation.md`](./07-auth-et-validation.md#10-validation-des-données) |
| Pourquoi la RLS doit vérifier `active` et non la session | [`07-auth-et-validation.md`](./07-auth-et-validation.md#supabase-auth) |
| Si la confirmation d'e-mail est activée | [`07-auth-et-validation.md`](./07-auth-et-validation.md#confirmation-de-mail--désactivée-pour-le-mvp) |

### Déploiement et environnements

| Je cherche… | C'est ici |
|---|---|
| La `service_role key` est-elle provisionnée | [`08-hebergement-et-deploiement.md`](./08-hebergement-et-deploiement.md#règle-ferme-sur-la-clé-service_role) |
| Quelles variables d'environnement définir et sur quelle cible | [`08-hebergement-et-deploiement.md`](./08-hebergement-et-deploiement.md#variables-denvironnement) |
| Comment nommer une branche de travail | [`08-hebergement-et-deploiement.md`](./08-hebergement-et-deploiement.md#git) |
| Le format attendu des messages de commit | [`08-hebergement-et-deploiement.md`](./08-hebergement-et-deploiement.md#git) |
| Sur quel projet Supabase pointe un déploiement de preview | [`08-hebergement-et-deploiement.md`](./08-hebergement-et-deploiement.md#14-gestion-des-environnements) |
| Les étapes entre le commit et la production | [`08-hebergement-et-deploiement.md`](./08-hebergement-et-deploiement.md#13-chaîne-de-livraison) |
| Le contenu du fichier de CI GitHub Actions | [`09-qualite-et-journalisation.md`](./09-qualite-et-journalisation.md#intégration-continue) |
| Comment empêcher une fusion quand la CI échoue | [`09-qualite-et-journalisation.md`](./09-qualite-et-journalisation.md#protection-de-branche) |
| Pourquoi pas de hooks pre-commit | [`09-qualite-et-journalisation.md`](./09-qualite-et-journalisation.md#protection-de-branche) |
| Sur quel environnement s'exécute `seed.sql` | [`06-migrations.md`](./06-migrations.md#données-de-démonstration) |

### Exploitation, coûts et décisions

| Je cherche… | C'est ici |
|---|---|
| Pourquoi l'application ne répond plus après une pause | [`10-couts-et-comptes.md`](./10-couts-et-comptes.md#limites-du-tier-gratuit-supabase) |
| Combien de projets Supabase le plan gratuit autorise | [`10-couts-et-comptes.md`](./10-couts-et-comptes.md#limites-du-tier-gratuit-supabase) |
| Si le plan Vercel Hobby suffit pour un usage réel | [`10-couts-et-comptes.md`](./10-couts-et-comptes.md#vercel) |
| Qui possède les comptes GitHub, Vercel et Supabase | [`10-couts-et-comptes.md`](./10-couts-et-comptes.md#propriété-des-comptes) |
| Comment sont nommés le dépôt et les projets externes | [`10-couts-et-comptes.md`](./10-couts-et-comptes.md#nommage-des-ressources-externes) |
| Ce qu'un changement de nom applicatif impacterait | [`10-couts-et-comptes.md`](./10-couts-et-comptes.md#nommage-des-ressources-externes) |
| L'état des sauvegardes de la base | [`10-couts-et-comptes.md`](./10-couts-et-comptes.md#sauvegardes) |
| Y a-t-il des tests automatisés | [`09-qualite-et-journalisation.md`](./09-qualite-et-journalisation.md#tests-automatisés) |
| Comment journaliser une erreur, et ce qu'il ne faut jamais journaliser | [`09-qualite-et-journalisation.md`](./09-qualite-et-journalisation.md#16-journalisation-des-erreurs) |
| Le tableau des onze décisions techniques actées | [`11-dependances-et-decisions.md`](./11-dependances-et-decisions.md#19-décisions-techniques-actées) |
| La liste récapitulative de la stack figée | [`11-dependances-et-decisions.md`](./11-dependances-et-decisions.md#20-stack-retenue) |
| Le registre des dettes techniques assumées | [`11-dependances-et-decisions.md`](./11-dependances-et-decisions.md#21-limites-assumées-de-la-stack) |
| Pourquoi il n'y a pas de temps réel | [`11-dependances-et-decisions.md`](./11-dependances-et-decisions.md#21-limites-assumées-de-la-stack) |

---

## Documents frères

| Document | Rôle | Forme |
|---|---|---|
| [`../01-brief.md`](../01-brief.md) | Contexte, public cible, jalons, risques | Fichier unique |
| [`../02-PRD-shard/index.md`](../02-PRD-shard/index.md) | Exigences `FEAT-*`, règles métier `RM-*`, critères `AC-*` | **9 morceaux** |
| [`../04-ux-design-shard/index.md`](../04-ux-design-shard/index.md) | Écrans, parcours, fondations visuelles, contenu rédactionnel | **7 morceaux** |
| [`../05-architecture-shard/index.md`](../05-architecture-shard/index.md) | Schéma de données, politiques RLS, flux techniques, décisions | **12 morceaux** |
| [`../06-plan.md`](../06-plan.md) | Ordonnancement en 9 phases, Definition of Done, jalons | Fichier unique |
| [`../07-epics-stories.md`](../07-epics-stories.md) | Les 54 stories et leurs critères d'acceptance | Fichier unique + `../stories/` |

**Règle de préséance.** Ce document fait foi sur les technologies, leurs versions et la chaîne de livraison. Sur le schéma de base de données et les politiques de sécurité, l'architecture prime ; sur les exigences fonctionnelles, le PRD prime.
