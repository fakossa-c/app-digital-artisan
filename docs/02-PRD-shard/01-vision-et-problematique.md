# Vision, problématique et objectifs

> **Document :** PRD — Exigences produit (02) — projet digital-artisan (D-G), application D-g
> **Partie :** 1 / 9 · [Retour à l'index](./index.md)
> **Contenu :** L'en-tête du document, la convention de référencement des identifiants, la vision du produit, la problématique de l'atelier, les cinq objectifs `OBJ-*` et leurs métriques de succès (sections 1 à 3).

---

# Product Requirements Document (PRD)

| | |
|---|---|
| **Client** | digital-artisan (D-G) |
| **Produit** | **D-g** — nom applicatif provisoire, à valider avant la mise en production |
| **Document** | PRD — Exigences produit |
| **Version** | 2.0 |
| **Statut** | En révision — en attente de validation par D-G |
| **Date** | 2026-07-26 |
| **Auteur** | À compléter |

**S'appuie sur :** `docs/01-brief.md` — Brief de projet (contexte, périmètre, parties prenantes, contraintes, risques, hypothèses, données personnelles). Le brief fait foi sur le périmètre et les objectifs métier ; ce PRD fait foi sur les règles métier détaillées, les permissions et les critères d'acceptation.

**Documents en aval :**

| Document | Rôle | Ce qu'il tire du PRD |
|---|---|---|
| `docs/03-stack-shard/` | Stack technique | Contraintes fonctionnelles et volumétrie (NFR-01) |
| `docs/04-ux-design-shard/` | UX Design | Parcours (§ 5), fonctionnalités (§ 7), statuts (§ 8) |
| `docs/05-architecture-shard/` | Architecture technique | Modèle de données (§ 6), permissions (§ 9), règles métier (§ 10) |
| `docs/06-plan.md` | Plan d'implémentation | Périmètre MVP (§ 13), dépendances fonctionnelles |
| `docs/07-epics-stories.md` | Epics & User Stories | Toutes les exigences FEAT, RM, AC et NFR, référencées par identifiant |

**Convention de référencement.** Chaque exigence porte un identifiant stable : `FEAT-<DOMAINE>-<NN>` pour les fonctionnalités, `RM-<NN>` pour les règles métier, `AC-<NN>` pour les critères d'acceptation, `NFR-<NN>` pour les exigences non fonctionnelles. Ces identifiants ne sont **jamais réutilisés** : une exigence retirée conserve son identifiant, marqué *(retirée)*. Les documents en aval y réfèrent par identifiant seul. Domaines des `FEAT` : `AUT` (authentification), `EMP` (gestion des employés), `REP` (gestion des réparations), `SUI` (suivi public), `CLI` (clients et vélos), `RGPD` (données personnelles).

**Révisions apportées au brief.** Ce PRD précise trois points que le brief version 1 laissait ambigus, désormais alignés dans les deux documents : (a) aucune suppression de réparation n'est possible, quel que soit le rôle (RM-12) ; (b) tous les utilisateurs internes actifs consultent toutes les réparations ; (c) l'assignation d'un réparateur est ouverte aux employés. Voir la note d'arbitrage sous [§ 9](./05-statuts-et-permissions.md#9-permissions).

---

# 1. Vision du produit

**D-g** est une plateforme web permettant à un atelier de réparation de vélos de centraliser le suivi de ses réparations, depuis le dépôt d'un vélo jusqu'à sa restitution au client.

*Le nom **D-g** est provisoire. Il désigne le produit dans les interfaces et la documentation, et sera confirmé ou remplacé avant la mise en production. Le projet est réalisé pour **digital-artisan** (D-G). Toute occurrence du nom dans le code doit être centralisée dans une constante unique.*

Le produit répond à un besoin unique : disposer d'un point de référence partagé par toute l'équipe et offrir au client un accès autonome à l'avancement de sa réparation.

L'application est volontairement conçue comme un **MVP (Minimum Viable Product)**. Elle ne cherche pas à couvrir l'ensemble des besoins d'un atelier (stock, facturation, rendez-vous, etc.), mais uniquement le suivi opérationnel des réparations.

Elle est déployée pour un **atelier unique** (brief, hypothèse H1). Le multi-atelier est hors périmètre ([§ 13](./09-perimetre-et-limites.md#13-hors-périmètre)) et il n'existe aucune entité Atelier dans le modèle de données.

---

# 2. Problématique

Dans les petits ateliers, les informations liées aux réparations sont souvent réparties entre des fiches papier, des tableaux, des fichiers Excel ou la mémoire des réparateurs.

Cette organisation entraîne plusieurs difficultés :

- les informations ne sont pas centralisées ;
- plusieurs employés peuvent manquer de visibilité sur une réparation ;
- les clients contactent régulièrement l'atelier pour demander où en est leur vélo ;
- le suivi dépend parfois de la présence du réparateur ayant pris en charge l'intervention.

L'application doit devenir la référence unique pour le suivi des réparations.

---

# 3. Objectifs du produit

| Réf. | Objectif |
|---|---|
| **OBJ-01** | Centraliser toutes les réparations dans une application unique |
| **OBJ-02** | Faciliter la collaboration entre plusieurs employés |
| **OBJ-03** | Permettre au client de consulter l'avancement de sa réparation sans contacter l'atelier |
| **OBJ-04** | Réduire les interruptions liées aux demandes de suivi |
| **OBJ-05** | Proposer une expérience simple, rapide et adaptée à un petit atelier |

## 3.1 Métriques de succès

| Objectif | Métrique | Cible à 3 mois |
|---|---|---|
| OBJ-01 | Part des réparations saisies dans l'application | 100 % |
| OBJ-04 | Appels clients hebdomadaires de demande de suivi (mesure déclarative) | −50 % par rapport à la mesure de référence |
| OBJ-03 | Part des liens de suivi ouverts au moins une fois | ≥ 60 % |
| OBJ-02 | Employés actifs se connectant au moins une fois par jour ouvré | 100 % |

Ces mesures sont déclaratives ou manuelles, cohérentes avec [§ 13](./09-perimetre-et-limites.md#13-hors-périmètre) qui exclut les statistiques. Elles n'imposent aucun développement. Le dispositif complet de mesure figure au brief § 6, y compris la **mesure de référence du volume d'appels à réaliser avant la mise en service**.
