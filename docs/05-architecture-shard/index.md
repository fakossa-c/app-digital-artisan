# Architecture technique — index

| | |
|---|---|
| **Projet** | digital-artisan (D-G) |
| **Application** | **D-g** — nom provisoire |
| **Document parent** | `05-architecture.md` — version 2.0, statut « Arrêtée » |
| **Date** | 2026-07-26 |
| **Original** | archivé dans [`../_archive/05-architecture.md`](../_archive/05-architecture.md) |
| **Découpage** | 12 parties · 1 949 lignes de contenu |

## Le rôle de ce document

L'architecture définit **comment l'application est construite** : la répartition des responsabilités entre Next.js et Supabase, le modèle de données et son DDL exécutable, les politiques de sécurité au niveau des lignes, les flux techniques et les vingt-six décisions structurantes.

Elle ne définit ni les objectifs produit (PRD), ni les écrans (UX Design), ni l'ordre de développement (plan et backlog). En cas de question technique sur *ce que fait la base* ou *qui a le droit de lire quoi*, la réponse est ici.

---

## Les douze morceaux

| Fichier | Contenu | Quand le consulter |
|---|---|---|
| [`01-vue-ensemble.md`](./01-vue-ensemble.md) | Sections 1 à 5 : objectif, conventions de nommage, vue en couches, responsabilités navigateur / Next.js / Supabase, principes, quatre domaines fonctionnels | Pour comprendre le découpage général, savoir **quelle couche porte quelle responsabilité**, ou vérifier une convention de nommage avant de créer une table ou un fichier |
| [`02-structure-application.md`](./02-structure-application.md) | Section 6 : arborescence `src/`, groupes de routes, articulation `app/` ↔ `features/`, emplacement de `middleware.ts` | Pour savoir **où placer un nouveau fichier**, créer une route, ou diagnostiquer un middleware qui ne s'exécute pas |
| [`03-modele-donnees.md`](./03-modele-donnees.md) | Section 7 : lecture fonctionnelle des cinq tables, champs et remarques, relations, `timestamptz`, `updated_at` par trigger | Pour comprendre **à quoi sert une table ou une colonne** et pourquoi elle existe, avant d'aller lire le DDL |
| [`04-schema-sql.md`](./04-schema-sql.md) | Section 8 : le **DDL complet exécutable** — extensions, enums, 5 tables, contraintes, 15 index, 9 triggers, privilèges — puis choix structurants et règles `ON DELETE` | Pour **écrire une requête SQL, créer une table, vérifier un type de colonne**, une contrainte `CHECK`, un index ou une règle de suppression |
| [`05-statuts-et-regles-metier.md`](./05-statuts-et-regles-metier.md) | Sections 9 et 10 : les sept statuts, transitions libres et verrouillage après restitution, tableau des règles métier, clé étrangère composite, non-suppression | Pour savoir **si une transition de statut est permise**, ou quelle règle métier est garantie en base et par quel mécanisme |
| [`06-securite-rls.md`](./06-securite-rls.md) | Sections 11 et 12 : règle `is_active_member()`, fonctions helper, piège `plpgsql`/`sql`, **toutes les politiques RLS**, options du suivi public, `get_public_repair()` | Pour **écrire ou déboguer une politique RLS**, comprendre qui accède à quoi, ou toucher à la page publique. Le morceau le plus sensible du projet |
| [`07-flux-principaux.md`](./07-flux-principaux.md) | Section 13 : connexion, mot de passe oublié, premier administrateur, **RPC `create_repair`**, changement de statut, consultation publique, ticket d'atelier | Pour **implémenter un parcours de bout en bout** et savoir dans quel ordre s'enchaînent Server Action, validation et écriture en base |
| [`08-migrations-et-seed.md`](./08-migrations-et-seed.md) | Section 14 : ordre des douze migrations, contenu du seed, plan de vérification RLS | Pour **créer une migration**, connaître son rang dans l'ordre, ou monter le jeu de données de démonstration |
| [`09-validation-et-erreurs.md`](./09-validation-et-erreurs.md) | Sections 15, 16, 17 : validation Zod, typologie des erreurs, journalisation avec identifiant de corrélation, jeton public, limitation de débit | Pour **valider une entrée de formulaire**, formater une erreur serveur, journaliser sans fuite, ou traiter le jeton de suivi |
| [`10-recherche-filtres.md`](./10-recherche-filtres.md) | Section 18 : filtrage côté serveur, jointures `!inner` et index trigrammes, pattern chercher-ou-créer | Pour **écrire la requête de la liste des réparations** ou la recherche de client sans casser l'usage des index |
| [`11-rgpd.md`](./11-rgpd.md) | Section 19 : anonymisation plutôt que suppression, fonction `anonymize_client()`, contrainte de contact, mesures complémentaires | Pour **implémenter l'anonymisation d'un client** ou répondre à une question de conformité |
| [`12-evolutivite-et-decisions.md`](./12-evolutivite-et-decisions.md) | Sections 20, 21, 22 : évolutions possibles, position sur le multi-atelier, **tableau des 26 décisions structurantes**, limites | Pour savoir **pourquoi un choix a été fait** et quelle alternative a été écartée, avant de proposer de le changer |

---

## Où trouver quoi

Index par sujet. Chaque entrée pointe vers le fichier et la section qui portent la réponse.

### Base de données et SQL

| Je cherche… | C'est ici |
|---|---|
| Le DDL complet, exécutable tel quel | [`04-schema-sql.md`](./04-schema-sql.md#8-schéma-postgresql--ddl-complet) |
| Le type exact d'une colonne (`status`, `public_token`, `role`…) | [`04-schema-sql.md`](./04-schema-sql.md#8-schéma-postgresql--ddl-complet) |
| Les trois types énumérés (`user_role`, `user_status`, `repair_status`) | [`04-schema-sql.md`](./04-schema-sql.md#8-schéma-postgresql--ddl-complet) |
| La liste des index et pourquoi ils existent | [`04-schema-sql.md`](./04-schema-sql.md#choix-structurants-du-schéma) |
| Les règles `ON DELETE` table par table | [`04-schema-sql.md`](./04-schema-sql.md#règles-on-delete) |
| Pourquoi des `uuid` et non des entiers séquentiels | [`04-schema-sql.md`](./04-schema-sql.md#choix-structurants-du-schéma) |
| Pourquoi `timestamptz` partout | [`03-modele-donnees.md`](./03-modele-donnees.md#types-temporels) |
| Comment `updated_at` est maintenue, et pourquoi pas en code | [`03-modele-donnees.md`](./03-modele-donnees.md#updated_at--maintenue-par-trigger) |
| À quoi sert la contrainte `UNIQUE (client_id, id)` sur `bikes` | [`05-statuts-et-regles-metier.md`](./05-statuts-et-regles-metier.md#la-clé-étrangère-composite) |
| Pourquoi les notes internes sont une table et non un champ texte | [`03-modele-donnees.md`](./03-modele-donnees.md#note-interne--repair_notes) |
| La contrainte « au moins un moyen de contact » | [`03-modele-donnees.md`](./03-modele-donnees.md#client--clients) |

### Sécurité et permissions

| Je cherche… | C'est ici |
|---|---|
| La politique RLS sur les réparations | [`06-securite-rls.md`](./06-securite-rls.md#politiques) |
| La règle la plus importante du document (`is_active_member()`) | [`06-securite-rls.md`](./06-securite-rls.md#règle-structurante--la-plus-importante-du-document) |
| Pourquoi `plpgsql` et jamais `sql` pour une fonction helper | [`06-securite-rls.md`](./06-securite-rls.md#pourquoi-plpgsql-et-non-sql--le-piège-dans-le-piège) |
| Comment éviter la récursion infinie 42P17 sur `profiles` | [`06-securite-rls.md`](./06-securite-rls.md#pourquoi-plpgsql-et-non-sql--le-piège-dans-le-piège) |
| Qui voit quoi, table par table et rôle par rôle | [`06-securite-rls.md`](./06-securite-rls.md#synthèse-par-table) |
| Pourquoi envelopper les appels de fonction dans `(select …)` | [`06-securite-rls.md`](./06-securite-rls.md#seconde-règle--performance) |
| Ce qu'un compte `pending` ou `rejected` peut réellement atteindre | [`01-vue-ensemble.md`](./01-vue-ensemble.md#supabase) |
| Comment la page publique est sécurisée, et les 4 options écartées | [`06-securite-rls.md`](./06-securite-rls.md#options-comparées) |
| La fonction `get_public_repair()` et son type de retour figé | [`06-securite-rls.md`](./06-securite-rls.md#la-fonction) |
| Pourquoi la `service_role key` est interdite sur la page publique | [`06-securite-rls.md`](./06-securite-rls.md#options-comparées) |
| Les propriétés du jeton public : format, génération, expiration, révocation | [`09-validation-et-erreurs.md`](./09-validation-et-erreurs.md#17-gestion-des-accès-publics) |
| Le risque de limitation de débit, nommé et accepté | [`09-validation-et-erreurs.md`](./09-validation-et-erreurs.md#limitation-de-débit--risque-nommé-et-accepté) |
| Comment garantir qu'une réparation n'est jamais supprimée | [`05-statuts-et-regles-metier.md`](./05-statuts-et-regles-metier.md#la-non-suppression-en-défense-en-profondeur) |

### Règles métier et statuts

| Je cherche… | C'est ici |
|---|---|
| La liste des sept statuts et leurs libellés | [`05-statuts-et-regles-metier.md`](./05-statuts-et-regles-metier.md#9-gestion-des-statuts) |
| Quelles transitions de statut sont autorisées | [`05-statuts-et-regles-metier.md`](./05-statuts-et-regles-metier.md#transitions-autorisées) |
| Ce qui reste possible après restitution d'un vélo | [`05-statuts-et-regles-metier.md`](./05-statuts-et-regles-metier.md#transitions-autorisées) |
| Pourquoi le statut « Annulé » existe | [`05-statuts-et-regles-metier.md`](./05-statuts-et-regles-metier.md#9-gestion-des-statuts) |
| Le tableau complet des règles métier et leur garantie en base | [`05-statuts-et-regles-metier.md`](./05-statuts-et-regles-metier.md#10-règles-métier-principales) |
| Comment garantir qu'un vélo appartient bien au client | [`05-statuts-et-regles-metier.md`](./05-statuts-et-regles-metier.md#la-clé-étrangère-composite) |

### Code, flux et implémentation

| Je cherche… | C'est ici |
|---|---|
| Où placer un nouveau fichier dans l'arborescence | [`02-structure-application.md`](./02-structure-application.md#6-structure-de-lapplication-nextjs) |
| Pourquoi `middleware.ts` doit être dans `src/` | [`02-structure-application.md`](./02-structure-application.md#6-structure-de-lapplication-nextjs) |
| Ce que doit contenir une Server Action | [`01-vue-ensemble.md`](./01-vue-ensemble.md#nextjs-sur-vercel) |
| Comment créer une réparation de façon atomique (RPC) | [`07-flux-principaux.md`](./07-flux-principaux.md#création-dune-réparation) |
| Pourquoi trois appels JS successifs ne conviennent pas | [`07-flux-principaux.md`](./07-flux-principaux.md#création-dune-réparation) |
| Le flux de connexion selon l'état du profil | [`07-flux-principaux.md`](./07-flux-principaux.md#connexion-dun-employé) |
| Comment est créé le tout premier administrateur | [`07-flux-principaux.md`](./07-flux-principaux.md#création-du-premier-administrateur) |
| Ce qu'il faut revalider après un changement de statut | [`07-flux-principaux.md`](./07-flux-principaux.md#modification-dun-statut) |
| Pourquoi il n'y a pas de temps réel | [`07-flux-principaux.md`](./07-flux-principaux.md#modification-dun-statut) |
| À quoi sert le QR code du ticket d'atelier | [`07-flux-principaux.md`](./07-flux-principaux.md#ticket-datelier-et-qr-code-interne) |
| Comment écrire la requête de recherche sans casser les index | [`10-recherche-filtres.md`](./10-recherche-filtres.md#18-recherche-et-filtres) |
| Le pattern chercher-ou-créer d'un client | [`10-recherche-filtres.md`](./10-recherche-filtres.md#recherche-dun-client-existant) |
| Comment valider les données d'un formulaire | [`09-validation-et-erreurs.md`](./09-validation-et-erreurs.md#15-validation-des-données) |
| Comment journaliser une erreur sans fuite de données | [`09-validation-et-erreurs.md`](./09-validation-et-erreurs.md#journalisation) |

### Exploitation, conformité et décisions

| Je cherche… | C'est ici |
|---|---|
| L'ordre des fichiers de migration | [`08-migrations-et-seed.md`](./08-migrations-et-seed.md#migrations) |
| Ce que contient le seed de démonstration | [`08-migrations-et-seed.md`](./08-migrations-et-seed.md#seed-de-démonstration) |
| Comment vérifier que les politiques RLS fonctionnent | [`08-migrations-et-seed.md`](./08-migrations-et-seed.md#vérification-des-politiques-rls) |
| Comment anonymiser un client (RGPD) | [`11-rgpd.md`](./11-rgpd.md#anonymisation-plutôt-que-suppression) |
| Pourquoi `phone` reçoit `'anonymise'` et non `NULL` | [`11-rgpd.md`](./11-rgpd.md#anonymisation-plutôt-que-suppression) |
| La durée de conservation des données | [`11-rgpd.md`](./11-rgpd.md#mesures-complémentaires) |
| Le tableau des 26 décisions structurantes | [`12-evolutivite-et-decisions.md`](./12-evolutivite-et-decisions.md#21-décisions-structurantes) |
| Pourquoi le multi-atelier est écarté et comment l'ajouter plus tard | [`12-evolutivite-et-decisions.md`](./12-evolutivite-et-decisions.md#20-évolutivité) |
| Ce que ce document ne définit pas | [`12-evolutivite-et-decisions.md`](./12-evolutivite-et-decisions.md#22-limites-du-document) |

---

## Documents frères

| Document | Rôle | Forme |
|---|---|---|
| [`../01-brief.md`](../01-brief.md) | Contexte, public cible, jalons, risques | Fichier unique |
| [`../02-PRD-shard/index.md`](../02-PRD-shard/index.md) | Exigences `FEAT-*`, règles métier `RM-*`, critères `AC-*` | **9 morceaux** |
| [`../03-stack-shard/index.md`](../03-stack-shard/index.md) | Technologies et versions figées | **11 morceaux** |
| [`../04-ux-design-shard/index.md`](../04-ux-design-shard/index.md) | Écrans, parcours, fondations visuelles, contenu rédactionnel | **7 morceaux** |
| [`../06-plan.md`](../06-plan.md) | Ordonnancement en 9 phases, Definition of Done, jalons | Fichier unique |
| [`../07-epics-stories.md`](../07-epics-stories.md) | Les 54 stories et leurs critères d'acceptance | Fichier unique + `../stories/` |

> **Renvois vers l'UX Design.** Ce document cite « UX §9 » (réponse neutre sur un lien invalide) selon
> l'ancienne numérotation UX. Le document UX ayant été renuméroté lors de son découpage, il faut lire
> **§ 10 — États particuliers**, dans
> [`../04-ux-design-shard/05-formulaires-et-etats.md`](../04-ux-design-shard/05-formulaires-et-etats.md#accès-refusé-et-lien-invalide).

**Règle de préséance.** Ce document fait foi sur le schéma, la sécurité et les flux techniques. Sur les objectifs produit, le PRD prime ; sur les écrans et les libellés, l'UX Design prime.
