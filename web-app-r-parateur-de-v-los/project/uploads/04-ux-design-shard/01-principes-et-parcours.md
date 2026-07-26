# Principes et parcours

> **Document :** UX Design (04) — projet digital-artisan (D-G), application D-g
> **Partie :** 1 / 7 · [Retour à l’index](./index.md)
> **Contenu :** L’en-tête du document, l’objectif UX, les cinq principes d’expérience, l’expérience attendue par type d’utilisateur, la structure en deux espaces et la navigation interne (sections 1 à 5).

---

# UX Design

**Projet :** digital-artisan (D-G)
**Application :** D-g
**Version :** 0.2
**Statut :** Validé pour développement
**Date :** 2026-07-26

**S'appuie sur :** `docs/01-brief.md`, `docs/02-PRD.md`
**Documents en aval :** `docs/05-architecture.md`, `docs/06-plan.md`, `docs/07-epics-stories.md`

**Portée :** écrans, parcours, hiérarchie de l'information, fondations visuelles,
système de statuts, accessibilité, contenu rédactionnel.
**Hors portée :** schéma de base de données, routes serveur, organisation du code,
ordre de développement, découpage en stories.

**Cadre produit rappelé :** l'application sert **un seul atelier**. Il n'existe aucune
notion de multi-atelier, aucune entité « Atelier », aucun paramétrage de marque.
L'identité affichée est celle de l'application, la même pour tous les utilisateurs.

---

## 1. Objectif UX

L'expérience doit permettre à chaque utilisateur de comprendre immédiatement :

- où il se trouve ;
- ce qu'il peut faire ;
- quelle est la prochaine action utile.

L'application doit rester simple, rapide et rassurante. Elle ne cherche pas à reproduire un logiciel de gestion complet, mais à rendre le suivi des réparations évident pour l'atelier comme pour le client.

Les choix UX privilégient :

- un nombre limité d'écrans ;
- des actions explicites ;
- une navigation courte ;
- une interface utilisable sur ordinateur, tablette et mobile ;
- une présentation centrée sur l'état des réparations.

---

## 2. Principes d'expérience

### Simplicité

Chaque écran doit répondre à un besoin principal.

L'utilisateur ne doit pas avoir à parcourir plusieurs pages pour effectuer une action courante.

### Visibilité de l'information

Le statut d'une réparation, le réparateur assigné et la dernière mise à jour doivent être immédiatement identifiables.

### Cohérence

Les mêmes termes, couleurs, composants et comportements doivent être utilisés dans toute l'application. Cette exigence est rendue vérifiable par la [§ 6 (fondations visuelles)](./02-fondations-visuelles.md), la [§ 8 (système de statuts)](./04-systeme-statuts.md) et la [§ 13 (vocabulaire figé)](./07-contenu-redactionnel.md#vocabulaire-figé) : tout écart à ces trois sections est une erreur d'implémentation.

### Prévention des erreurs

Les actions sensibles doivent être clairement distinguées des actions courantes ([§ 9](./05-formulaires-et-etats.md)).

Les formulaires doivent signaler les erreurs au plus près du champ concerné.

### Priorité au mobile

Le client consultera probablement son suivi depuis un téléphone. L'espace public doit donc être particulièrement lisible sur petit écran.

L'espace interne doit rester utilisable sur tablette et ordinateur.

---

## 3. Expérience par utilisateur

### Administrateur

L'administrateur doit pouvoir :

- visualiser rapidement l'ensemble des réparations ;
- identifier les réparations en attente ou bloquées ;
- accéder à la gestion des employés ;
- valider une inscription sans parcourir plusieurs écrans ;
- créer, modifier ou réassigner une réparation ;
- anonymiser un client à sa demande ([§ 7, écran dédié](./03-ecrans.md#73--clients-et-vélos)).

Son interface doit donner une vision globale sans devenir un tableau de bord analytique. Sa vue par défaut sur la liste des réparations est l'onglet **En cours**.

---

### Employé

L'employé doit pouvoir :

- retrouver une réparation rapidement ;
- voir les réparations qui lui sont assignées ;
- modifier un statut en quelques secondes ;
- ajouter une note interne ;
- créer une nouvelle fiche depuis n'importe quel écran principal.

L'expérience doit limiter les manipulations afin de ne pas ralentir le travail en atelier. Sa vue par défaut sur la liste des réparations est l'onglet **Mes réparations** ([§ 7](./03-ecrans.md#72--réparations)).

---

### Client

Le client ne doit pas avoir à créer de compte ni à comprendre le fonctionnement interne de l'application.

En ouvrant son lien, il doit immédiatement voir :

- le vélo concerné ;
- le statut actuel ;
- une explication simple du statut ;
- la date de dernière mise à jour ;
- les informations utiles communiquées par l'atelier.

Le client ne voit ni les notes internes, ni les informations liées aux employés, ni les autres réparations.

---

## 4. Structure générale

L'application est organisée en deux espaces distincts.

### Espace interne

Réservé aux administrateurs et aux employés authentifiés.

Il comprend :

- les réparations — écran central du produit ;
- les clients et vélos, **consultables en liste et modifiables**, mais toujours **créés depuis le formulaire de réparation** : on n'enregistre jamais un client sans motif de réparation ;
- la gestion des employés, pour l'administrateur ;
- le compte de l'utilisateur et la déconnexion.

Il n'existe pas d'écran de paramétrage : l'application n'a rien à configurer.

### Espace public

Accessible uniquement depuis le lien de suivi d'une réparation.

Il présente les informations destinées au client, sans navigation vers l'espace interne. Cette page est exclue de l'indexation par les moteurs de recherche.

---

## 5. Navigation interne

La navigation principale reste courte. Elle contient exactement :

- **Réparations** — entrée par défaut ;
- **Clients** ;
- **Employés** — visible uniquement par l'administrateur ;
- **Compte** — menu déroulant en fin de barre, contenant le nom, le rôle, « Mon compte » et « Se déconnecter ».

La liste des vélos n'a pas d'entrée propre : elle s'atteint depuis une fiche client.

L'action « Nouvelle réparation » est visible directement depuis la liste des réparations, en tête de page, à droite du titre.

Sur mobile, la navigation est regroupée dans un menu compact, mais **Réparations** reste atteignable en un geste ; l'action « Nouvelle réparation » reste visible hors du menu.

**Barre supérieure de l'espace interne :**

```
┌──────────────────────────────────────────────────────────────────┐
│  D-g     Réparations   Clients   Employés            Compte ▾    │
└──────────────────────────────────────────────────────────────────┘
```

L'entrée active est signalée par le libellé en gras **et** un soulignement de 2 px `#1D4ED8` **et** `aria-current="page"` — jamais par la couleur seule.

