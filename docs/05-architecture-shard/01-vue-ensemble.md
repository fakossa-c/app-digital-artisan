# Vue d’ensemble et principes

> **Document :** Architecture technique (05) — projet digital-artisan (D-G), application D-g
> **Partie :** 1 / 12 · [Retour à l’index](./index.md)
> **Contenu :** L’en-tête du document et sa table des matières d’origine, l’objectif, les conventions de nommage, la vue d’ensemble en couches, la répartition des responsabilités entre navigateur, Next.js et Supabase, les principes d’architecture et les quatre domaines fonctionnels (sections 1 à 5).

---

# Architecture technique

**Projet :** digital-artisan (D-G)
**Application :** D-g *(nom provisoire)*
**Document :** Architecture technique
**Version :** 2.0
**Statut :** Arrêtée — sert de référence à l’implémentation
**Date de dernière mise à jour :** 2026-07-26

**S’appuie sur :** `docs/01-brief.md`, `docs/02-PRD.md`, `docs/03-stack.md`, `docs/04-ux-design.md`
**Documents en aval :** `docs/06-plan.md`, `docs/07-epics-stories.md`

> Ce document définit l’organisation technique, le modèle de données, les règles de sécurité
> et les flux principaux de l’application. Il ne définit ni les objectifs produit (PRD),
> ni les écrans (UX Design), ni l’ordre de développement (Plan d’implémentation).

---

## Table des matières

1. [Objectif du document](#1-objectif-du-document)
2. [Vue d’ensemble](#2-vue-densemble)
3. [Répartition des responsabilités](#3-répartition-des-responsabilités)
4. [Principes d’architecture](#4-principes-darchitecture)
5. [Organisation fonctionnelle](#5-organisation-fonctionnelle)
6. [Structure de l’application Next.js](#6-structure-de-lapplication-nextjs)
7. [Modèle de données](#7-modèle-de-données)
8. [Schéma PostgreSQL — DDL complet](#8-schéma-postgresql--ddl-complet)
9. [Gestion des statuts](#9-gestion-des-statuts)
10. [Règles métier principales](#10-règles-métier-principales)
11. [Permissions et politiques RLS](#11-permissions-et-politiques-rls)
12. [Sécurité du suivi public](#12-sécurité-du-suivi-public)
13. [Flux principaux](#13-flux-principaux)
14. [Migrations, seed et vérification](#14-migrations-seed-et-vérification)
15. [Validation des données](#15-validation-des-données)
16. [Gestion des erreurs et journalisation](#16-gestion-des-erreurs-et-journalisation)
17. [Gestion des accès publics](#17-gestion-des-accès-publics)
18. [Recherche et filtres](#18-recherche-et-filtres)
19. [Conformité RGPD](#19-conformité-rgpd)
20. [Évolutivité](#20-évolutivité)
21. [Décisions structurantes](#21-décisions-structurantes)
22. [Limites du document](#22-limites-du-document)

---

## 1. Objectif du document

L’application **D-g** (nom provisoire) est développée pour **digital-artisan (D-G)**. Elle permet à un atelier de réparation de vélos de suivre ses interventions, du dépôt à la restitution, et d’offrir à ses clients une page de suivi consultable sans compte.

Ce document décrit l’organisation technique de l’application et la répartition des responsabilités entre le navigateur, Next.js, Vercel et Supabase.

L’architecture doit répondre aux besoins définis dans le PRD tout en restant :

* adaptée à un MVP ;
* sécurisée ;
* maintenable ;
* suffisamment évolutive pour les extensions réalistes du produit.

Elle ne cherche pas à anticiper une architecture complexe ou distribuée.

**Périmètre mono-atelier.** L’application sert **un seul atelier**. La gestion multi-ateliers est hors périmètre (PRD §13). Il n’existe donc **aucune entité Atelier** dans le modèle de données : l’appartenance à l’atelier est implicite — posséder un profil `active` suffit à en être membre. Le nom et l’identité visuelle de l’atelier, nécessaires à la page publique, relèvent de la configuration applicative (constantes ou variables d’environnement), pas d’une table.

### Conventions de nommage

| Ressource | Convention | Valeur retenue |
|---|---|---|
| Schéma PostgreSQL | `public` | Ne pas créer de schéma dédié : Supabase Auth, PostgREST et le générateur de types attendent `public`. Le gain de nommage ne compenserait pas la friction. |
| Préfixe de tables | aucun | `repairs`, pas `dg_repairs` : la base n’héberge que cette application. |
| Identifiants SQL et code | anglais | Les libellés français sont portés par l’interface, jamais par la base. |
| Projets Supabase | `d-g-dev`, `d-g-prod` | Voir `docs/03-stack.md` §14. |

Le nom applicatif étant **provisoire**, il n’apparaît nulle part dans le schéma de données.

---

## 2. Vue d’ensemble

L’application repose sur une architecture full-stack Next.js.

```text
Utilisateur
    │
    ▼
Navigateur
Interface et interactions locales
    │
    ▼
Application Next.js sur Vercel
Rendu, validation et logique métier
    │
    ▼
Supabase
Authentification, PostgreSQL et sécurité des données
```

La répartition générale est la suivante :

| Couche | Responsabilités principales |
| --- | --- |
| Navigateur | Afficher l’interface, gérer les interactions locales et soumettre les formulaires |
| Next.js sur Vercel | Rendre les pages, protéger les parcours internes, valider les entrées et orchestrer les opérations métier |
| Supabase Auth | Gérer les identités, les connexions et les sessions |
| Supabase PostgreSQL | Stocker les données, garantir leur intégrité et porter les opérations atomiques |
| Supabase RLS | Contrôler les accès aux données au niveau de la base |

---

## 3. Répartition des responsabilités

### Navigateur

Le navigateur prend en charge :

* l’affichage des pages ;
* les interactions avec les formulaires ;
* les filtres et comportements locaux simples ;
* l’envoi des actions utilisateur au serveur.

Il ne doit pas contenir les règles métier principales ni décider seul des autorisations.

Les informations sensibles ou réservées à l’équipe ne doivent jamais être intégrées à une page publique, même si elles sont visuellement masquées. L’architecture retenue pour le suivi public (§12) garantit ce principe **par construction** : les données internes ne quittent jamais la base, plutôt que d’être masquées au rendu.

---

### Next.js sur Vercel

Next.js constitue la couche applicative du produit.

Le code serveur Next.js est exécuté par Vercel. Il prend en charge :

* le rendu des pages ;
* la lecture de la session utilisateur ;
* la protection de l’espace interne ;
* la validation des données entrantes ;
* la vérification des permissions applicatives ;
* l’application des règles métier ;
* l’orchestration des appels à Supabase ;
* la gestion des redirections et des retours d’erreur.

Les mutations de l’espace interne passent principalement par des Server Actions.

Exemples :

* créer une réparation ;
* modifier une réparation ;
* changer son statut ;
* assigner un réparateur ;
* ajouter une note interne ;
* accepter ou refuser une inscription.

Les Server Actions restent des points d’entrée légers. Elles délèguent les traitements réutilisables à des fonctions métier dédiées.

```text
Server Action
    │
    ├── vérifie la session
    ├── valide les données (Zod)
    ├── vérifie les permissions
    └── appelle une fonction métier
```

La logique métier ne doit pas être placée directement dans les composants visuels.

---

### Supabase

Supabase fournit les services backend managés de l’application.

Il prend en charge :

* l’authentification ;
* les sessions ;
* la base de données PostgreSQL ;
* les relations entre les données ;
* les contraintes d’intégrité ;
* les politiques Row Level Security ;
* les opérations atomiques exposées en RPC.

Supabase constitue la dernière barrière de sécurité sur les données.

Les contrôles réalisés par Next.js améliorent l’expérience utilisateur et organisent la logique métier. Les contraintes PostgreSQL et les politiques RLS garantissent que les données restent protégées, même si une requête contourne l’interface prévue.

**Ce point est décisif et doit être compris littéralement.** Un compte `pending` ou `rejected` obtient une **session Supabase valide** : l’authentification réussit, seul l’accès applicatif Next.js lui est refusé. Muni de son jeton JWT et de la clé anonyme — publique par construction —, il peut interroger l’API PostgREST **directement**, sans jamais passer par Next.js :

```
GET https://<projet>.supabase.co/rest/v1/repairs?select=*
  Authorization: Bearer <jwt d'un compte rejected>
  apikey: <clé anon publique>
```

La protection assurée par Next.js n’a **jamais été une barrière de données** : c’est une barrière de navigation. Seules les politiques RLS protègent réellement les données. C’est la raison d’être de la règle structurante du §11.

---

## 4. Principes d’architecture

### Une seule application

Le projet comporte une seule application Next.js regroupant :

* l’authentification ;
* l’espace administrateur ;
* l’espace employé ;
* le suivi public des réparations.

Aucun backend Express, NestJS ou service API séparé n’est prévu.

---

### Séparation entre interface et logique métier

Les composants d’interface sont responsables de l’affichage et des interactions.

Les fonctions métier sont responsables des décisions applicatives.

Exemple :

```text
Composant de formulaire
    │
    ▼
Server Action
    │
    ▼
Fonction métier
    │
    ▼
Supabase
```

Cette séparation permet de modifier l’interface sans réécrire les règles métier.

---

### Sécurité en profondeur

Une opération sensible est contrôlée à plusieurs niveaux :

1. l’interface masque les actions non autorisées ;
2. Next.js vérifie l’identité et les permissions ;
3. Supabase RLS contrôle l’accès réel aux données ;
4. PostgreSQL applique les contraintes d’intégrité et les triggers.

Le masquage d’un bouton ne constitue jamais une mesure de sécurité suffisante.

---

### Pas d’abstraction prématurée

L’architecture doit rester directe.

Le projet n’introduit pas :

* de microservices ;
* de bus d’événements ;
* de système de files d’attente ;
* de couche repository générique ;
* d’API REST interne systématique ;
* de séparation artificielle entre frontend et backend ;
* d’entité Atelier ni de cloisonnement multi-tenant.

Ces éléments ne seront ajoutés que si une évolution réelle du produit les rend nécessaires.

**Nuance à ne pas confondre.** Ce principe proscrit les *couches génériques*, pas les *fonctions de base de données ciblées*. Les trois fonctions PostgreSQL retenues — helpers RLS (§11), suivi public (§12), création transactionnelle (§13) — répondent chacune à un problème que le code applicatif ne peut pas résoudre correctement. Elles constituent le minimum requis, pas un excès.

---

## 5. Organisation fonctionnelle

L’application est structurée autour de quatre domaines.

### Authentification

Responsable de :

* l’inscription des employés ;
* la connexion ;
* la déconnexion ;
* la réinitialisation du mot de passe oublié ;
* la récupération de la session ;
* la restriction d’accès aux comptes non validés.

---

### Employés

Responsable de :

* la consultation des inscriptions en attente ;
* l’acceptation d’un employé ;
* le refus d’une inscription ;
* la consultation des employés actifs ;
* la gestion des rôles et des états de compte.

---

### Réparations

Domaine central de l’application.

Responsable de :

* la recherche d’un client existant, ou sa création ;
* la création d’une réparation ;
* la consultation des réparations ;
* la modification des informations ;
* l’affectation d’un réparateur ;
* la modification du statut ;
* l’ajout de notes internes ;
* la recherche par client ou vélo ;
* le filtrage par statut ou réparateur.

---

### Suivi public

Responsable de :

* la consultation d’une réparation à partir d’un jeton public ;
* l’affichage du statut courant ;
* l’affichage de la dernière mise à jour ;
* l’affichage d’un éventuel message destiné au client ;
* la protection stricte des informations internes.

Cet espace ne nécessite aucune authentification. Sa surface d’exposition est réduite à **une seule fonction PostgreSQL** (§12).
