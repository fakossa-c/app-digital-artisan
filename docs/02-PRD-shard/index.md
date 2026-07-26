# Exigences produit (PRD) — index

| | |
|---|---|
| **Projet** | digital-artisan (D-G) |
| **Application** | **D-g** — nom provisoire |
| **Document parent** | `02-PRD.md` — version 2.0, statut « En révision » |
| **Date** | 2026-07-26 |
| **Original** | archivé dans [`../_archive/02-PRD.md`](../_archive/02-PRD.md) |
| **Découpage** | 9 parties · 665 lignes de contenu |

## Le rôle de ce document

Le PRD définit **ce que le produit doit faire** : les objectifs, les profils utilisateurs et leurs parcours, les objets métier, les trente-trois fonctionnalités `FEAT-*`, les vingt-sept règles métier `RM-*`, les permissions par rôle et les treize critères d'acceptation `AC-*` qui valident la livraison.

Il ne définit ni les technologies (stack), ni le schéma de base de données ou les politiques de sécurité (architecture), ni les écrans et libellés (UX Design), ni l'ordre de développement (plan et backlog). En cas de question sur *ce qui est attendu du produit* ou *qui a le droit de faire quoi*, la réponse est ici.

---

## Les neuf morceaux

| Fichier | Contenu | Quand le consulter |
|---|---|---|
| [`01-vision-et-problematique.md`](./01-vision-et-problematique.md) | En-tête, convention de référencement des identifiants, sections 1 à 3 : vision du produit, problématique de l'atelier, cinq objectifs `OBJ-*` et métriques de succès | Pour comprendre **pourquoi le produit existe**, ce que signifie un identifiant `FEAT-`/`RM-`/`AC-`/`NFR-`, ou quelle cible chiffrée mesure un objectif |
| [`02-utilisateurs-et-parcours.md`](./02-utilisateurs-et-parcours.md) | Sections 4 et 5 : les trois profils `PERS-01` à `PERS-03` avec contextes d'usage, et les six parcours (amorçage, inscription, mot de passe, création, suivi, clôture) | Pour savoir **dans quelles conditions réelles un écran sera utilisé**, ou dérouler un parcours de bout en bout avant de le concevoir |
| [`03-objets-metier.md`](./03-objets-metier.md) | Section 6 : les cinq objets — utilisateur, client, vélo, réparation, note interne — leurs informations et relations | Pour savoir **quelles informations porte un objet** et pourquoi, avant d'aller lire le schéma SQL de l'architecture |
| [`04-fonctionnalites.md`](./04-fonctionnalites.md) | Section 7 : **toutes les exigences `FEAT-*`** en six domaines — `AUT`, `EMP`, `CLI`, `REP`, `SUI`, `RGPD` | Pour **lire l'énoncé exact d'une fonctionnalité** citée par un autre document, ou vérifier ce qu'une story doit livrer |
| [`05-statuts-et-permissions.md`](./05-statuts-et-permissions.md) | Sections 8 et 9 : les sept statuts et leur sémantique, RM-13 à RM-15 et RM-24, le **tableau des permissions** par rôle, la note d'arbitrage avec le brief | Pour savoir **si une transition de statut est permise** ou **si un rôle a le droit d'effectuer une action** |
| [`06-regles-metier.md`](./06-regles-metier.md) | Section 10 : le **tableau des vingt-sept règles `RM-01` à `RM-27`** | Pour **lire le texte exact d'une règle métier** référencée ailleurs par son seul identifiant |
| [`07-criteres-acceptation.md`](./07-criteres-acceptation.md) | Section 11 : les treize critères `AC-01` à `AC-13` au format Étant donné / Quand / Alors | Pour **vérifier qu'une fonctionnalité est terminée**, ou écrire le scénario de recette d'une story |
| [`08-rgpd-et-non-fonctionnel.md`](./08-rgpd-et-non-fonctionnel.md) | Sections 14 et 15 : règles RGPD `RM-18` à `RM-21`, exigences `NFR-01` à `NFR-08` | Pour une question de **conformité, de volumétrie, de performance, de navigateur ou d'accessibilité** |
| [`09-perimetre-et-limites.md`](./09-perimetre-et-limites.md) | Sections 12 et 13 : contraintes de réalisation, ordre de priorité des arbitrages, **liste du hors périmètre** | Pour vérifier si une demande est **dans ou hors du MVP** avant de l'estimer ou de la développer |

---

## Où trouver quoi

Index par sujet. Chaque entrée pointe vers le fichier et la section qui portent la réponse.

### Fonctionnalités et exigences

| Je cherche… | C'est ici |
|---|---|
| L'énoncé d'une exigence `FEAT-*` précise | [`04-fonctionnalites.md`](./04-fonctionnalites.md#7-fonctionnalités) |
| Ce que signifie le préfixe `AUT`, `EMP`, `REP`, `SUI`, `CLI` ou `RGPD` | [`01-vision-et-problematique.md`](./01-vision-et-problematique.md#product-requirements-document-prd) |
| Comment est créé le tout premier administrateur | [`04-fonctionnalites.md`](./04-fonctionnalites.md#71-authentification) |
| Ce que contient exactement la page publique de suivi | [`04-fonctionnalites.md`](./04-fonctionnalites.md#75-suivi-client) |
| Comment le lien de suivi parvient au client | [`04-fonctionnalites.md`](./04-fonctionnalites.md#75-suivi-client) |
| À quoi sert le ticket d'atelier et son QR code | [`04-fonctionnalites.md`](./04-fonctionnalites.md#75-suivi-client) |
| Ce qu'affiche la page publique quand le jeton est invalide | [`04-fonctionnalites.md`](./04-fonctionnalites.md#75-suivi-client) |
| Comment éviter les doublons de clients à la création | [`04-fonctionnalites.md`](./04-fonctionnalites.md#74-gestion-des-réparations) |
| À partir de combien de réparations la liste est paginée | [`08-rgpd-et-non-fonctionnel.md`](./08-rgpd-et-non-fonctionnel.md#15-exigences-non-fonctionnelles) |
| Comment la liste des réparations est triée par défaut | [`04-fonctionnalites.md`](./04-fonctionnalites.md#74-gestion-des-réparations) |
| Ce qu'un administrateur peut faire qu'un employé ne peut pas | [`05-statuts-et-permissions.md`](./05-statuts-et-permissions.md#9-permissions) |

### Statuts, permissions et règles métier

| Je cherche… | C'est ici |
|---|---|
| La liste des sept statuts et leur signification | [`05-statuts-et-permissions.md`](./05-statuts-et-permissions.md#8-workflow-des-statuts) |
| Qui peut modifier un statut | [`05-statuts-et-permissions.md`](./05-statuts-et-permissions.md#9-permissions) |
| Peut-on repasser de « Restitué » à « Diagnostic » | [`05-statuts-et-permissions.md`](./05-statuts-et-permissions.md#8-workflow-des-statuts) |
| Pourquoi le statut « Annulé » existe et ce qu'il implique | [`05-statuts-et-permissions.md`](./05-statuts-et-permissions.md#8-workflow-des-statuts) |
| Le texte exact de la règle RM-14 (verrouillage) | [`05-statuts-et-permissions.md`](./05-statuts-et-permissions.md#8-workflow-des-statuts) |
| Le texte exact d'une règle `RM-*` quelconque | [`06-regles-metier.md`](./06-regles-metier.md#10-règles-métier) |
| Qui peut supprimer une réparation | [`06-regles-metier.md`](./06-regles-metier.md#10-règles-métier) |
| Pourquoi un vélo doit appartenir au client de la réparation (RM-17) | [`06-regles-metier.md`](./06-regles-metier.md#10-règles-métier) |
| Ce qui protège le dernier administrateur actif (RM-22) | [`06-regles-metier.md`](./06-regles-metier.md#10-règles-métier) |
| Si un compte refusé peut être réactivé | [`06-regles-metier.md`](./06-regles-metier.md#10-règles-métier) |
| Pourquoi il n'y a pas de mise à jour temps réel (RM-16) | [`06-regles-metier.md`](./06-regles-metier.md#10-règles-métier) |
| Ce que le client voit et ne voit jamais (RM-09, RM-10) | [`06-regles-metier.md`](./06-regles-metier.md#10-règles-métier) |
| Pourquoi la page publique n'est pas indexée (RM-26) | [`06-regles-metier.md`](./06-regles-metier.md#10-règles-métier) |
| Pourquoi les employés voient toutes les réparations | [`05-statuts-et-permissions.md`](./05-statuts-et-permissions.md#9-permissions) |

### Utilisateurs, parcours et objets

| Je cherche… | C'est ici |
|---|---|
| Les trois états d'un compte utilisateur | [`03-objets-metier.md`](./03-objets-metier.md#61-utilisateur) |
| Dans quelles conditions physiques travaille un réparateur | [`02-utilisateurs-et-parcours.md`](./02-utilisateurs-et-parcours.md#42-employé) |
| Le parcours complet de création d'une réparation | [`02-utilisateurs-et-parcours.md`](./02-utilisateurs-et-parcours.md#54-création-dune-réparation) |
| Ce qui se passe entre l'inscription et l'accès effectif | [`02-utilisateurs-et-parcours.md`](./02-utilisateurs-et-parcours.md#52-inscription-dun-employé) |
| Ce que contient une note interne et pourquoi elle est immuable | [`03-objets-metier.md`](./03-objets-metier.md#65-note-interne) |
| Pourquoi les notes sont une collection et non un champ texte | [`03-objets-metier.md`](./03-objets-metier.md#65-note-interne) |
| Quelles informations porte une réparation | [`03-objets-metier.md`](./03-objets-metier.md#64-réparation) |
| Le minimum requis pour enregistrer un client | [`04-fonctionnalites.md`](./04-fonctionnalites.md#73-gestion-des-clients-et-des-vélos) |
| À quoi sert le message public destiné au client | [`06-regles-metier.md`](./06-regles-metier.md#10-règles-métier) |

### Validation, conformité et périmètre

| Je cherche… | C'est ici |
|---|---|
| Le scénario de recette d'une fonctionnalité | [`07-criteres-acceptation.md`](./07-criteres-acceptation.md#11-critères-dacceptation) |
| Le critère prioritaire du produit (étanchéité du suivi public) | [`07-criteres-acceptation.md`](./07-criteres-acceptation.md#11-critères-dacceptation) |
| Comment anonymiser un client et ce que cela préserve | [`08-rgpd-et-non-fonctionnel.md`](./08-rgpd-et-non-fonctionnel.md#14-données-personnelles-et-conservation) |
| Combien de temps les données sont conservées | [`08-rgpd-et-non-fonctionnel.md`](./08-rgpd-et-non-fonctionnel.md#14-données-personnelles-et-conservation) |
| La volumétrie cible (utilisateurs, clients, vélos, réparations) | [`08-rgpd-et-non-fonctionnel.md`](./08-rgpd-et-non-fonctionnel.md#15-exigences-non-fonctionnelles) |
| Les navigateurs et largeurs d'écran supportés | [`08-rgpd-et-non-fonctionnel.md`](./08-rgpd-et-non-fonctionnel.md#15-exigences-non-fonctionnelles) |
| Si une fonctionnalité demandée est hors MVP | [`09-perimetre-et-limites.md`](./09-perimetre-et-limites.md#13-hors-périmètre) |
| Pourquoi l'e-mail de mot de passe oublié n'est pas une notification exclue | [`09-perimetre-et-limites.md`](./09-perimetre-et-limites.md#13-hors-périmètre) |
| L'ordre de priorité en cas d'arbitrage | [`09-perimetre-et-limites.md`](./09-perimetre-et-limites.md#12-contraintes) |
| Pourquoi le multi-atelier est exclu | [`09-perimetre-et-limites.md`](./09-perimetre-et-limites.md#13-hors-périmètre) |

---

## Documents frères

| Document | Rôle | Forme |
|---|---|---|
| [`../01-brief.md`](../01-brief.md) | Contexte, public cible, jalons, risques | Fichier unique |
| [`../03-stack-shard/index.md`](../03-stack-shard/index.md) | Technologies et versions figées | **11 morceaux** |
| [`../04-ux-design-shard/index.md`](../04-ux-design-shard/index.md) | Écrans, parcours, fondations visuelles, contenu rédactionnel | **7 morceaux** |
| [`../05-architecture-shard/index.md`](../05-architecture-shard/index.md) | Schéma de données, politiques RLS, flux techniques, décisions | **12 morceaux** |
| [`../06-plan.md`](../06-plan.md) | Ordonnancement en 9 phases, Definition of Done, jalons | Fichier unique |
| [`../07-epics-stories.md`](../07-epics-stories.md) | Les 54 stories et leurs critères d'acceptance | Fichier unique + `../stories/` |

> **Numérotation restaurée lors du découpage.** Les sous-sections des sections 4 à 7 étaient des titres
> non numérotés (`## Administrateur`, `## Client`, `## Authentification`…), au même niveau que les sections
> elles-mêmes. Elles sont désormais numérotées et placées un niveau plus bas : § 4.1 à 4.3 pour les profils,
> § 5.1 à 5.6 pour les parcours, § 6.1 à 6.5 pour les objets, § 7.1 à 7.6 pour les domaines fonctionnels.
> Les numéros de section de premier niveau (§ 1 à § 15) sont inchangés : les renvois « § 4 », « § 9 »,
> « § 13 » des autres documents restent valides.

**Règle de préséance.** Ce document fait foi sur les règles métier détaillées, les permissions et les critères d'acceptation. Le brief fait foi sur le périmètre et les objectifs métier ; l'architecture fait foi sur le schéma et la sécurité technique ; l'UX Design fait foi sur les écrans et les libellés.
