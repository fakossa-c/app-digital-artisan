# UX Design — index

| | |
|---|---|
| **Projet** | digital-artisan (D-G) |
| **Application** | **D-g** — nom provisoire |
| **Document parent** | `04-ux-design.md` — version 0.2, statut « Validé pour développement » |
| **Date** | 2026-07-26 |
| **Original** | archivé dans [`../_archive/04-ux-design.md`](../_archive/04-ux-design.md) |
| **Découpage** | 7 parties · 945 lignes de contenu |

> **Renumérotation appliquée.** Le document d'origine comportait une section « 6bis. Fondations
> visuelles » placée **avant** la section 6. La série a été renumérotée proprement : les fondations
> visuelles deviennent la **section 6**, les écrans la **section 7**, et les sections suivantes sont
> décalées d'un rang jusqu'à la **section 14**. Tous les renvois internes ont été mis à jour.
> C'est la seule modification apportée au texte ; aucun contenu n'a été réécrit.

## Le rôle de ce document

L'UX Design définit **ce que l'utilisateur voit et fait** : les écrans, les parcours, la hiérarchie de l'information, les fondations visuelles, le système de statuts, les règles d'accessibilité et les libellés exacts de l'interface.

Il ne définit ni le schéma de base de données, ni les routes serveur, ni l'ordre de développement. Trois de ses sections — fondations visuelles, système de statuts et vocabulaire figé — sont **fermées et exhaustives** : tout écart y est une erreur d'implémentation, pas une liberté d'interprétation.

---

## Les sept morceaux

| Fichier | Contenu | Quand le consulter |
|---|---|---|
| [`01-principes-et-parcours.md`](./01-principes-et-parcours.md) | Sections 1 à 5 : objectif UX, cinq principes, expérience par type d'utilisateur, structure en deux espaces, navigation interne | Pour comprendre **à qui s'adresse un écran** et ce qu'il doit permettre, ou pour placer une entrée dans la barre de navigation |
| [`02-fondations-visuelles.md`](./02-fondations-visuelles.md) | Section 6 : marque D-g, **palette de couleurs avec ratios de contraste**, typographie, espacement, formes, icônes, boutons, champs | Pour **choisir une couleur, une taille, un rayon ou une variante de bouton**. Source de vérité fermée : toute valeur absente d'ici ne doit pas apparaître |
| [`03-ecrans.md`](./03-ecrans.md) | Section 7 : les **dix-huit écrans** avec wireframes — authentification, liste et détail des réparations, création chercher-ou-créer, clients, employés, espace public, erreurs | Pour **construire un écran**. Le plus gros morceau : il contient les maquettes ASCII et les règles fermes de chaque formulaire |
| [`04-systeme-statuts.md`](./04-systeme-statuts.md) | Section 8 : les **sept statuts** avec couleurs, contrastes, icônes et formes de pastille, anatomie, transitions, frise publique, mode sombre | Pour **afficher un statut** où que ce soit : liste, détail, filtre ou page publique. Les trois canaux d'information sont obligatoires |
| [`05-formulaires-et-etats.md`](./05-formulaires-et-etats.md) | Sections 9 et 10 : comportement des formulaires, **liste fermée des quatre actions à confirmation**, états de chargement, listes vides, erreur, réseau perdu | Pour savoir **si une action demande une confirmation**, ou quoi afficher quand une liste est vide ou le réseau perdu |
| [`06-responsive-et-accessibilite.md`](./06-responsive-et-accessibilite.md) | Sections 11 et 12 : point de rupture 768 px, usages mobile / tablette / ordinateur, **exigences WCAG 2.2 AA chiffrées**, raccourcis clavier | Pour **adapter un écran à un format** ou vérifier une exigence d'accessibilité avant de livrer |
| [`07-contenu-redactionnel.md`](./07-contenu-redactionnel.md) | Sections 13 et 14 : règles de rédaction, **vocabulaire figé**, ton par espace, format des dates, **tous les messages d'erreur et de confirmation**, limites | Pour **écrire le moindre texte visible** : libellé de bouton, message d'erreur, confirmation. Les formulations sont à reprendre littéralement |

---

## Où trouver quoi

Index par sujet. Chaque entrée pointe vers le fichier et la section qui portent la réponse.

### Identité visuelle et composants

| Je cherche… | C'est ici |
|---|---|
| Le code hexadécimal d'une couleur d'interface | [`02-fondations-visuelles.md`](./02-fondations-visuelles.md#couleurs-de-base) |
| La couleur d'accent des actions primaires (`#1D4ED8`) | [`02-fondations-visuelles.md`](./02-fondations-visuelles.md#couleurs-de-base) |
| Les trois variantes de bouton et leur usage | [`02-fondations-visuelles.md`](./02-fondations-visuelles.md#boutons) |
| La hauteur minimale d'un bouton ou d'un champ (44 px) | [`02-fondations-visuelles.md`](./02-fondations-visuelles.md#boutons) |
| L'échelle typographique et les graisses autorisées | [`02-fondations-visuelles.md`](./02-fondations-visuelles.md#typographie) |
| L'échelle d'espacement (4, 8, 12, 16, 24, 32, 48) | [`02-fondations-visuelles.md`](./02-fondations-visuelles.md#espacement) |
| Les rayons de bordure par type d'élément | [`02-fondations-visuelles.md`](./02-fondations-visuelles.md#formes) |
| Quel jeu d'icônes utiliser, et à quelle taille | [`02-fondations-visuelles.md`](./02-fondations-visuelles.md#iconographie) |
| Comment afficher le nom D-g, et où | [`02-fondations-visuelles.md`](./02-fondations-visuelles.md#marque-d-g) |
| L'aspect d'un champ en erreur | [`02-fondations-visuelles.md`](./02-fondations-visuelles.md#champs-de-formulaire) |
| Si le mode sombre est au programme | [`02-fondations-visuelles.md`](./02-fondations-visuelles.md#mode-sombre) |

### Statuts

| Je cherche… | C'est ici |
|---|---|
| La liste des sept statuts avec leurs libellés français | [`04-systeme-statuts.md`](./04-systeme-statuts.md#8-système-de-statuts) |
| La couleur et l'icône d'un statut donné | [`04-systeme-statuts.md`](./04-systeme-statuts.md#8-système-de-statuts) |
| L'explication d'un statut destinée au client | [`04-systeme-statuts.md`](./04-systeme-statuts.md#8-système-de-statuts) |
| Les dimensions exactes d'une pastille de statut | [`04-systeme-statuts.md`](./04-systeme-statuts.md#anatomie-de-la-pastille) |
| Pourquoi la couleur seule ne suffit jamais | [`04-systeme-statuts.md`](./04-systeme-statuts.md#8-système-de-statuts) |
| Quelles transitions de statut l'interface autorise | [`04-systeme-statuts.md`](./04-systeme-statuts.md#transitions) |
| Ce qu'affiche une réparation restituée à la place du bouton | [`04-systeme-statuts.md`](./04-systeme-statuts.md#transitions) |
| La frise de progression de la page publique | [`04-systeme-statuts.md`](./04-systeme-statuts.md#frise-de-progression-de-la-page-publique) |
| Dans quel ordre trier les options du filtre par statut | [`04-systeme-statuts.md`](./04-systeme-statuts.md#statuts-et-filtres) |
| Les équivalents de couleur en mode sombre | [`04-systeme-statuts.md`](./04-systeme-statuts.md#équivalents-mode-sombre) |

### Écrans et parcours

| Je cherche… | C'est ici |
|---|---|
| Le wireframe de la liste des réparations | [`03-ecrans.md`](./03-ecrans.md#72--réparations) |
| Le wireframe du détail d'une réparation | [`03-ecrans.md`](./03-ecrans.md#72--réparations) |
| Les trois onglets de portée et leur paramètre d'URL | [`03-ecrans.md`](./03-ecrans.md#72--réparations) |
| Les règles de tri, de pagination et de persistance dans l'URL | [`03-ecrans.md`](./03-ecrans.md#72--réparations) |
| Le formulaire de création et le pattern chercher-ou-créer | [`03-ecrans.md`](./03-ecrans.md#72--réparations) |
| Comment se comporte le fil de notes internes | [`03-ecrans.md`](./03-ecrans.md#72--réparations) |
| Ce que contient le ticket d'atelier et son QR code | [`03-ecrans.md`](./03-ecrans.md#72--réparations) |
| Comment le lien de suivi est transmis au client | [`03-ecrans.md`](./03-ecrans.md#72--réparations) |
| Les écrans d'authentification et d'inscription | [`03-ecrans.md`](./03-ecrans.md#71--espace-dauthentification) |
| L'écran « compte en attente de validation » | [`03-ecrans.md`](./03-ecrans.md#71--espace-dauthentification) |
| La fiche client et l'anonymisation | [`03-ecrans.md`](./03-ecrans.md#73--clients-et-vélos) |
| L'écran de gestion des employés | [`03-ecrans.md`](./03-ecrans.md#74--employés) |
| La page publique de suivi et son wireframe | [`03-ecrans.md`](./03-ecrans.md#75--espace-public) |
| Ce qui ne doit **jamais** apparaître sur la page publique | [`03-ecrans.md`](./03-ecrans.md#75--espace-public) |
| Les quatre écrans d'erreur (403, 404 interne, 404 public, 500) | [`03-ecrans.md`](./03-ecrans.md#76--écrans-derreur) |
| Le contenu de la barre de navigation | [`01-principes-et-parcours.md`](./01-principes-et-parcours.md#5-navigation-interne) |
| Ce que voit un administrateur et ce que voit un employé | [`01-principes-et-parcours.md`](./01-principes-et-parcours.md#3-expérience-par-utilisateur) |

### Comportements et états

| Je cherche… | C'est ici |
|---|---|
| Si une action demande une confirmation | [`05-formulaires-et-etats.md`](./05-formulaires-et-etats.md#actions-sensibles) |
| Le texte exact d'une modale de confirmation | [`05-formulaires-et-etats.md`](./05-formulaires-et-etats.md#actions-sensibles) |
| Ce que doit faire un formulaire en cas d'erreur | [`05-formulaires-et-etats.md`](./05-formulaires-et-etats.md#9-formulaires-et-actions-sensibles) |
| Quoi afficher pendant un chargement (et quand ne rien afficher) | [`05-formulaires-et-etats.md`](./05-formulaires-et-etats.md#chargement) |
| Le message d'une liste vide, selon le contexte | [`05-formulaires-et-etats.md`](./05-formulaires-et-etats.md#listes-vides) |
| Que faire quand le réseau est perdu | [`05-formulaires-et-etats.md`](./05-formulaires-et-etats.md#réseau-perdu) |

### Responsive et accessibilité

| Je cherche… | C'est ici |
|---|---|
| Le point de rupture unique (768 px) | [`06-responsive-et-accessibilite.md`](./06-responsive-et-accessibilite.md#11-responsive-design) |
| Ce qui change entre mobile, tablette et ordinateur | [`06-responsive-et-accessibilite.md`](./06-responsive-et-accessibilite.md#11-responsive-design) |
| Le tableau complet des exigences WCAG chiffrées | [`06-responsive-et-accessibilite.md`](./06-responsive-et-accessibilite.md#12-accessibilité) |
| La taille de cible minimale et pourquoi 44 px et non 24 | [`06-responsive-et-accessibilite.md`](./06-responsive-et-accessibilite.md#12-accessibilité) |
| L'aspect de l'anneau de focus | [`06-responsive-et-accessibilite.md`](./06-responsive-et-accessibilite.md#12-accessibilité) |
| Les deux seuls raccourcis clavier du produit | [`06-responsive-et-accessibilite.md`](./06-responsive-et-accessibilite.md#raccourcis-clavier) |
| Comment annoncer un changement de statut aux lecteurs d'écran | [`06-responsive-et-accessibilite.md`](./06-responsive-et-accessibilite.md#12-accessibilité) |

### Textes de l'interface

| Je cherche… | C'est ici |
|---|---|
| Le message d'erreur exact d'une situation donnée | [`07-contenu-redactionnel.md`](./07-contenu-redactionnel.md#messages-derreur) |
| Le message de confirmation exact après une action | [`07-contenu-redactionnel.md`](./07-contenu-redactionnel.md#messages-de-confirmation) |
| Quel mot employer : réparation, fiche ou dossier ? | [`07-contenu-redactionnel.md`](./07-contenu-redactionnel.md#vocabulaire-figé) |
| Comment formuler un libellé de bouton | [`07-contenu-redactionnel.md`](./07-contenu-redactionnel.md#règles-transverses) |
| Le format d'affichage d'une date, selon l'écran | [`07-contenu-redactionnel.md`](./07-contenu-redactionnel.md#format-des-dates) |
| Pourquoi la page publique n'affiche jamais de date relative | [`07-contenu-redactionnel.md`](./07-contenu-redactionnel.md#format-des-dates) |
| Le ton à adopter en interne et côté client | [`07-contenu-redactionnel.md`](./07-contenu-redactionnel.md#ton-par-espace) |
| Les mots interdits côté client | [`07-contenu-redactionnel.md`](./07-contenu-redactionnel.md#règles-transverses) |

---

## Documents frères

| Document | Rôle | Forme |
|---|---|---|
| [`../01-brief.md`](../01-brief.md) | Contexte, public cible, jalons, risques | Fichier unique |
| [`../02-PRD-shard/index.md`](../02-PRD-shard/index.md) | Exigences `FEAT-*`, règles métier `RM-*`, critères `AC-*` | **9 morceaux** |
| [`../03-stack-shard/index.md`](../03-stack-shard/index.md) | Technologies et versions figées | **11 morceaux** |
| [`../05-architecture-shard/index.md`](../05-architecture-shard/index.md) | Schéma de données, politiques RLS, flux techniques | **12 morceaux** |
| [`../06-plan.md`](../06-plan.md) | Ordonnancement en 9 phases, Definition of Done, jalons | Fichier unique |
| [`../07-epics-stories-shard/index.md`](../07-epics-stories-shard/index.md) | Les 50 user stories et leurs critères d'acceptation | **11 morceaux** |

### Table de conversion de l'ancienne numérotation

Les documents amont et aval — PRD, architecture, plan et backlog — citent ce document selon **l'ancienne numérotation**, antérieure au découpage. Leur texte n'a pas été modifié. Voici la correspondance :

| Ils écrivent… | …lire ici |
|---|---|
| UX § 1 à § 5 | inchangé — [`01-principes-et-parcours.md`](./01-principes-et-parcours.md) |
| UX § 6bis | **§ 6** — [`02-fondations-visuelles.md`](./02-fondations-visuelles.md) |
| UX § 6, § 6.1 à § 6.6 | **§ 7, § 7.1 à § 7.6** — [`03-ecrans.md`](./03-ecrans.md) |
| UX § 7 | **§ 8** — [`04-systeme-statuts.md`](./04-systeme-statuts.md) |
| UX § 8 | **§ 9** — [`05-formulaires-et-etats.md`](./05-formulaires-et-etats.md) |
| UX § 9 | **§ 10** — [`05-formulaires-et-etats.md`](./05-formulaires-et-etats.md#10-états-particuliers) |
| UX § 10 | **§ 11** — [`06-responsive-et-accessibilite.md`](./06-responsive-et-accessibilite.md) |
| UX § 11 | **§ 12** — [`06-responsive-et-accessibilite.md`](./06-responsive-et-accessibilite.md#12-accessibilité) |
| UX § 12 | **§ 13** — [`07-contenu-redactionnel.md`](./07-contenu-redactionnel.md) |
| UX § 13 | **§ 14** — [`07-contenu-redactionnel.md`](./07-contenu-redactionnel.md#14-limites-du-document) |

**Règle de préséance.** Ce document fait foi sur les écrans, les libellés et les comportements d'interface. Sur le schéma de données et la sécurité, l'architecture prime ; sur les objectifs produit, le PRD prime.
