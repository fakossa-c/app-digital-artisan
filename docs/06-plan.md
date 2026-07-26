# Plan d'implémentation

| | |
|---|---|
| **Client / commanditaire** | digital-artisan (D-G) |
| **Application** | **D-g** — nom provisoire |
| **Document** | 06 — Plan d'implémentation |
| **Version** | 2.0 |
| **Statut** | En révision — en attente de validation par D-G |
| **Date** | 2026-07-26 |
| **Auteur** | À compléter |
| **Valideur** | digital-artisan (D-G) |

**S'appuie sur :** `docs/01-brief.md`, `docs/02-PRD-shard/`, `docs/03-stack-shard/`, `docs/04-ux-design-shard/`, `docs/05-architecture-shard/`.

**Document en aval :** `docs/07-epics-stories.md`, qui détaille chaque phase en stories exécutables, et `docs/stories/` qui en extrait un fichier par story.

**Ce que ce document tranche.** L'ordre de développement, la charge estimée, les jalons de démonstration, les critères de fin de phase et les risques. Il ne redéfinit ni les exigences (PRD), ni les écrans (UX), ni le schéma de données (architecture) : il ordonne leur réalisation.

---

## Table des matières

1. [Objectif et principe directeur](#1-objectif-et-principe-directeur)
2. [Vue d'ensemble du séquencement](#2-vue-densemble-du-séquencement)
3. [Definition of Done](#3-definition-of-done)
4. [Les neuf phases](#4-les-neuf-phases)
5. [Jalons de démonstration client](#5-jalons-de-démonstration-client)
6. [Charge et calendrier](#6-charge-et-calendrier)
7. [Position sur les tests](#7-position-sur-les-tests)
8. [Correspondance phase → epic → stories](#8-correspondance-phase--epic--stories)
9. [Registre des risques](#9-registre-des-risques)
10. [Ce qui n'est volontairement pas fait](#10-ce-qui-nest-volontairement-pas-fait)
11. [Hors périmètre du document](#11-hors-périmètre-du-document)

---

## 1. Objectif et principe directeur

Ce document définit l'ordre dans lequel les fonctionnalités sont développées, la charge que chaque phase représente, et les critères qui autorisent à passer à la suivante.

**Principe directeur : chaque phase produit une version démontrable de l'application.** Le découpage est fonctionnel, non technique — on ne livre pas « la base de données », puis « les API », puis « le front », mais des capacités d'usage successives. La seule exception assumée est la phase P1b, qui pose le schéma de données : elle n'est pas démontrable par un écran, mais elle conditionne la reproductibilité et la sécurité de tout le reste.

Trois arbitrages structurent ce séquencement, et ils s'écartent d'un ordre linéaire naïf :

| Arbitrage | Décision | Raison |
|---|---|---|
| **Retirer tôt les risques** | Le suivi public est développé en position 6, non en avant-dernier | C'est à la fois la valeur différenciante du produit (brief § 5.1) et la seule surface où un défaut est une fuite de données personnelles |
| **Montrer tôt la valeur** | Le cœur métier (réparations) arrive en position 4, avant la gestion des employés | Trois phases d'administration avant la première fiche de réparation seraient un temps long sans preuve visible pour D-G |
| **Ne jamais reporter le transverse** | Responsive, états d'interface, permissions et accessibilité sont une Definition of Done, pas une phase finale | Le responsive traité en dernier impose de réécrire les écrans ; la sécurité traitée en dernier est la première victime d'un retard |

### Principes de développement

- développer une seule story à la fois, dans l'ordre du backlog ;
- livrer une story complète — au sens de la Definition of Done — avant de commencer la suivante ;
- privilégier des incréments fonctionnels plutôt que techniques ;
- maintenir une application exécutable et déployée tout au long du développement ;
- valider chaque phase selon la Definition of Done avant de passer à la suivante.

---

## 2. Vue d'ensemble du séquencement

```text
P1   Initialisation                      ──► socle technique, comptes D-G, nommage
      │
P1b  Schéma de données et sécurité       ──► migrations, RLS fermée, seed, types TS
      │
P2   Connexion et accès                  ──► se connecter, se déconnecter, routes protégées
      │                                       ◆ JALON J1 — « Le socle tient »
P3   Cœur métier — réparations           ──► client, vélo, réparation, notes, affectation
      │
P4   Workflow des statuts                ──► changement d'état, verrouillage, annulation
      │                                       ◆ JALON J2 — « L'atelier saisit »
P5   Suivi public                        ──► jeton, /suivi/[token], envoi du lien, étanchéité
      │
P6   Liste, recherche, filtres et tri    ──► retrouver une réparation
      │                                       ◆ JALON J3 — « Le client suit »
P7   Inscription et gestion des employés ──► pending/active/rejected, validation admin
      │
P8   Finition et mise en production      ──► RGPD, accessibilité, recette, bascule
                                             ◆ JALON J4 — mise en service
```

**Lecture des dépendances.** La séquence est linéaire : chaque phase s'appuie sur les précédentes. Deux souplesses existent néanmoins, utiles si une phase se bloque :

- **P6 (liste et filtres)** ne dépend pas de **P5 (suivi public)** : les deux peuvent être interverties sans dommage. P5 est placée avant parce qu'elle porte plus de risque.
- **P7 (inscription et employés)** ne bloque aucune autre phase : les comptes nécessaires au développement sont créés par le seed de P1b. Elle peut être décalée si le calendrier se tend.

Les dépendances au niveau des stories figurent dans `docs/07-epics-stories.md`, chaque story déclarant ses prérequis, et sont récapitulées dans `docs/stories/README.md`.

---

## 3. Definition of Done

Cette section est la **source unique** des critères de fin. Elle n'est ni recopiée ni paraphrasée dans les phases : chaque phase y renvoie.

> **Une story est terminée lorsque les huit critères suivants sont vérifiés. Une phase est terminée lorsque toutes ses stories le sont.**
>
> 1. **Fonctionnel** — chaque critère d'acceptation de la story passe, démontré sur l'environnement de prévisualisation Vercel à partir du seed, sans manipulation en base ni explication orale.
> 2. **Sécurité** — toute nouvelle table porte ses politiques RLS actives, appelant `is_active_member()` et jamais `auth.uid() is not null` seul. Toute nouvelle Server Action vérifie la session, l'état `active` du profil et le rôle avant d'agir. Un test négatif est effectué : un utilisateur non autorisé tente l'action et échoue.
> 3. **Responsive** — chaque écran produit est utilisable de part et d'autre du point de rupture unique de 768 px (UX § 10), vérifié par redimensionnement effectif à 375 px, 768 px et 1280 px.
> 4. **États d'interface** — chaque écran manipulant des données couvre le chargement, la liste vide avec son message contextuel, l'erreur et l'accès refusé, selon les formulations de l'UX § 9 et § 12.
> 5. **Retours utilisateur** — chaque action produit une confirmation ou une erreur reprenant littéralement les libellés de l'UX § 12 ; le bouton passe en état occupé pendant l'enregistrement ; la double soumission est impossible ; les données saisies sont conservées en cas d'échec.
> 6. **Accessibilité** — cibles de 44 × 44 px minimum, focus visible, libellés associés aux champs, `aria-live` sur les changements d'état, aucune information portée par la seule couleur (UX § 11).
> 7. **Qualité du code** — `tsc --noEmit`, `pnpm lint` et `pnpm build` passent. Aucun `any` ajouté sans justification en commentaire. Les types Supabase sont régénérés dans le même commit que toute migration.
> 8. **Traçabilité et non-régression** — le travail est fusionné dans `main` via une pull request relue, la CI verte, et déployé. Le scénario de recette de la phase est rejoué, ainsi que ceux des phases précédentes.
>
> **Qui valide.** Critères 1 à 7 : le développeur, en autocontrôle, liste en main. Critère 8 : le relecteur de la pull request pour la partie traçabilité, le responsable technique pour la recette. Aux jalons J1 à J4, la validation fonctionnelle est prononcée par **digital-artisan (D-G)**.

**Pourquoi une DoD plutôt qu'une phase de finalisation.** Ces huit critères étaient, dans la version précédente de ce plan, une « Phase 8 — Finalisation » regroupant responsive, états de chargement, gestion d'erreurs et vérification des permissions. Les y laisser revenait à développer sept phases sans eux, puis à reprendre tous les écrans — et à faire de ces critères la variable d'ajustement du jour où le calendrier se tend. Ils sont désormais la condition de livraison de chaque story.

---

## 4. Les neuf phases

Chaque phase se termine lorsque la Definition of Done (§ 3) est satisfaite pour toutes ses stories.

---

### P1 — Initialisation du projet

**Objectif.** Disposer d'un projet exécutable en local et déployé en ligne, à partir du fork du dépôt de départ, déjà cloné en local avant cette phase.

**Livrables.**

- projet Next.js 16.2 initialisé en TypeScript strict, Tailwind 4.1 configuré en CSS (aucun `tailwind.config.js`), Node 24 et pnpm 10 fixés dans le dépôt ;
- branche `main` du fork protégée avec le job de CI en statut requis ;
- deux projets Supabase créés, `d-g-dev` et `d-g-prod` ;
- projet Vercel `d-g-suivi-reparations` lié au dépôt, variables d'environnement définies par cible, les prévisualisations pointant sur `d-g-dev` ;
- clients Supabase serveur, navigateur et middleware en place avec `@supabase/ssr` ;
- workflow GitHub Actions exécutant `tsc --noEmit`, `lint` et `build` sur chaque pull request ;
- nom applicatif centralisé dans une constante unique `APP_NAME`.

**Résultat attendu.** Une page d'accueil vide est accessible sur une URL de production, et toute pull request déclenche des contrôles bloquants.

---

### P1b — Schéma de données et sécurité

**Objectif.** Poser le modèle de données, la sécurité au niveau base et les données de démonstration, une fois pour toutes et de façon reproductible.

Cette phase n'existait pas dans la version précédente du plan. Son absence était le défaut le plus lourd : aucune phase ne créait les tables, qui seraient donc apparues à la volée depuis l'interface Supabase, hors migrations versionnées, et la RLS aurait échu à une hypothétique phase finale.

**Livrables.**

- migrations SQL versionnées dans `supabase/migrations/`, dans l'ordre défini par l'architecture : extensions, types énumérés (`user_role`, `user_status`, `repair_status` à sept valeurs), `profiles`, fonctions helper, `clients` et `bikes`, `repairs`, `repair_notes`, politiques RLS, fonction de suivi public, RPC de création, amorçage du premier administrateur ;
- fonction `is_active_member()` en PL/pgSQL et `SECURITY DEFINER`, appelée par **toutes** les policies sans exception ;
- RLS activée sur toutes les tables métier, en refus par défaut ;
- contrainte d'unicité sur le jeton public, clé étrangère composite garantissant qu'un vélo appartient au client de sa réparation, protection contre la suppression d'une réparation et d'une note ;
- trigger de mise à jour automatique de `updated_at` sur les réparations ;
- premier compte administrateur créé par migration d'amorçage, sans aucun mécanisme d'auto-promotion depuis l'application ;
- `supabase/seed.sql` produisant un administrateur, deux employés `active`, un employé `pending`, un employé `rejected`, une dizaine de clients incluant des noms volontairement proches pour éprouver la recherche, une quinzaine de vélos et une vingtaine de réparations réparties sur les sept statuts ;
- types TypeScript générés depuis le schéma et versionnés ;
- fichier SQL de vérification des policies, comparant pour chaque profil type le nombre de lignes lisibles à l'attendu.

**Résultat attendu.** Un développeur clone le dépôt, applique les migrations et le seed, et obtient une base identique à celle de tout autre poste. Une requête directe à l'API PostgREST avec le jeton d'un compte `pending` ou `rejected` retourne zéro ligne sur chaque table.

---

### P2 — Connexion et accès

**Objectif.** Ouvrir l'espace interne aux comptes actifs, et à eux seuls.

**Livrables.**

- écran de connexion avec les messages exacts de l'UX § 12, volontairement ambigus sur la cause d'un échec ;
- session persistée et renouvelée à chaque navigation par le middleware ;
- déconnexion depuis le menu Compte ;
- protection de l'espace interne : un compte `pending` atteint l'écran d'attente de validation, un compte `rejected` le message distinct correspondant, et le contenu d'une page interne n'apparaît à aucun moment, même brièvement ;
- réinitialisation du mot de passe oublié, avec un message de retour identique que l'adresse existe ou non ;
- page « Mon compte » et changement de mot de passe ;
- squelette de mise en page de l'espace interne : barre supérieure, navigation, mot-symbole D-g, lien d'évitement ;
- composants transverses partagés — bandeau de confirmation, message d'erreur, squelette de chargement, état vide, pastille de statut — qui outillent la Definition of Done pour toutes les phases suivantes.

**Note de séquencement.** L'inscription d'un employé n'est **pas** dans cette phase : elle est en P7. Les comptes nécessaires proviennent du seed. C'est ce qui permet d'atteindre le cœur métier une phase plus tôt.

**Résultat attendu.** Un employé du seed se connecte, atteint une page interne vide, se déconnecte. Un compte `pending` et un compte `rejected` échouent, chacun avec son message propre.

◆ **Jalon J1 — « Le socle tient »** (voir § 5).

---

### P3 — Cœur métier : réparations

**Objectif.** Permettre à l'atelier de créer et de tenir à jour une fiche de réparation complète.

C'est la phase la plus lourde du projet et la plus incertaine : elle porte le modèle relationnel client–vélo–réparation et la contrainte d'intégrité qui les lie.

**Livrables.**

- création d'une réparation selon le pattern *chercher-ou-créer* de l'UX § 6.2 : recherche du client avant toute création, vélos restreints au client choisi, création d'un client ou d'un vélo sans quitter le formulaire, avertissement en cas de nom similaire ;
- fiche de détail d'une réparation, statut et action de changement atteignables sans défilement ;
- modification d'une réparation, client et vélo affichés en lecture seule ;
- affectation et réaffectation d'un réparateur, restreintes aux profils actifs ;
- notes internes en fil horodaté, avec auteur, sans modification ni suppression après publication ;
- liste des clients, fiche client avec ses vélos et son historique de réparations, modification des coordonnées et des vélos.

**Résultat attendu.** Un employé enregistre une réparation de bout en bout au comptoir, en moins de 90 secondes, et retrouve le client à sa visite suivante sans créer de doublon.

---

### P4 — Workflow des statuts

**Objectif.** Faire évoluer une réparation le long de son cycle de vie, avec les verrous que le métier impose.

**Livrables.**

- changement de statut depuis la fiche et depuis la liste, en deux gestes ;
- sept statuts, représentés par les trois canaux d'information de l'UX § 7 — libellé, icône, forme de pastille — de façon identique partout ;
- transitions libres, à l'exception du statut terminal *Restitué* qui verrouille la fiche ; *Annulé* reste réversible, une fiche annulée par erreur pouvant être rouverte par un changement de statut ;
- confirmations sur le passage à *Restitué* et sur l'annulation, selon la liste fermée d'actions sensibles de l'UX § 8 ;
- mise à jour automatique de la date de dernière modification et enregistrement de son auteur. Il s'agit du champ `updated_at` et de l'auteur associé, **non** d'un historique des modifications, explicitement hors périmètre (PRD § 13) ;
- l'ajout d'une note interne ne modifie pas la date de dernière modification de la réparation : une note ne concerne pas le client et ne doit pas laisser croire à une progression sur la page publique.

**Résultat attendu.** Une réparation parcourt son cycle complet du dépôt à la restitution, et une fiche ouverte par erreur se clôt par *Annulé* sans être supprimée.

◆ **Jalon J2 — « L'atelier saisit »** (voir § 5).

---

### P5 — Suivi public

**Objectif.** Donner au client un accès autonome à l'avancement de sa réparation, et lui envoyer ce lien de façon praticable au comptoir.

Cette phase est remontée de l'avant-dernière position. Elle porte la proposition de valeur du projet et sa principale surface de risque : une erreur ici n'est pas un défaut d'affichage, c'est une fuite de données personnelles.

**Livrables.**

- route `/suivi/[token]` lisant la réparation par la fonction `get_public_repair`, qui projette structurellement les seuls champs autorisés — le rôle `anon` n'a aucun accès direct aux tables ;
- page publique conforme à l'UX § 6.5 : mot-symbole, vélo, statut et son explication en langage courant, message public éventuel, date de mise à jour en format long, frise de progression sur six étapes, mention d'information sur les données personnelles ;
- directive de non-indexation sur la page publique ;
- page de lien invalide, avec un message strictement identique que le jeton soit inexistant, malformé ou inaccessible ;
- copie du lien en un clic depuis la fiche, avec confirmation, en vue d'un envoi au client par SMS ou par e-mail ;
- ticket d'atelier imprimable, portant un QR code vers la fiche interne de la réparation et destiné à être accroché au vélo ;
- vérification d'étanchéité : aucune note interne, aucune coordonnée client, aucun nom d'employé, aucune autre réparation n'est présente dans le contenu transmis au navigateur, y compris masquée.

**Résultat attendu.** Un client reçoit son lien de suivi par SMS ou par e-mail et voit l'état de son vélo sur son téléphone, sans compte et sans zoom ; en atelier, le réparateur scanne le ticket accroché au vélo et arrive sur la fiche interne correspondante.

◆ **Jalon J3 — « Le client suit »** (voir § 5).

---

### P6 — Liste, recherche, filtres et tri

**Objectif.** Retrouver une réparation en quelques secondes, quel que soit le volume.

**Livrables.**

- liste des réparations en un composant unique et deux mises en page — cartes empilées sous 768 px, tableau au-delà — avec l'ordre d'importance identique dans les deux rendus ;
- trois onglets de portée : *Mes réparations* par défaut pour l'employé, *En cours* par défaut pour l'administrateur, *Toutes* ;
- recherche libre par client ou par vélo, insensible à la casse et aux espaces, exécutée côté serveur ;
- filtres par statut et par réparateur, combinables avec la recherche, avec le bouton d'effacement et son décompte ;
- tri par client, statut, réparateur et date de modification, avec `aria-sort` ; ordre par défaut sur la date de dernière modification décroissante ;
- pagination à 25 résultats par page, sans défilement infini ;
- persistance de la vue complète dans l'URL : portée, recherche, filtres, tri et page.

**Résultat attendu.** Sur les vingt réparations du seed, un employé isole en un geste les réparations d'un client donné à un statut donné, et retrouve la même vue après rechargement.

---

### P7 — Inscription et gestion des employés

**Objectif.** Permettre l'arrivée d'un nouvel employé sans intervention en base.

Cette phase est descendue de la deuxième à la septième position. C'est une fonction d'administration ponctuelle — sollicitée à l'arrivée d'un employé — et non un usage quotidien. Elle ne bloque aucune autre phase.

**Livrables.**

- inscription d'un employé, compte créé à l'état `pending`, rôle et état jamais issus du formulaire ;
- écran de confirmation d'attente de validation ;
- écran de gestion des employés en trois groupes — demandes en attente, employés actifs, demandes refusées — dans cet ordre ;
- acceptation et refus depuis la ligne, sans ouvrir de fiche ; confirmation sur le refus seul ;
- réactivation d'un compte refusé ;
- promotion et rétrogradation, avec refus explicite de toute opération laissant l'application sans administrateur actif ;
- prise en compte d'un changement d'état en cours de session, sans reconnexion.

**Résultat attendu.** Un nouvel employé s'inscrit, l'administrateur accepte sa demande, et l'employé accède à l'application au rechargement de sa page.

---

### P8 — Finition et mise en production

**Objectif.** Traiter ce qui ne peut sincèrement se faire qu'à la fin, une fois tous les écrans existants.

Cette phase ne contient **aucun rattrapage** de responsive, d'états d'interface ou de permissions : ces points relèvent de la Definition of Done et ont été livrés avec chaque story. Elle ne conserve que ce qui exige une vue d'ensemble.

**Livrables.**

- anonymisation d'un client par l'administrateur, avec sa modale de confirmation irréversible et l'invalidation des liens de suivi associés ;
- mention d'information sur les données personnelles, accessible depuis la page publique ;
- pages d'erreur 403, 404 interne, 404 public et 500, le 404 public ne trahissant jamais l'existence de l'espace interne ;
- revue d'accessibilité globale : parcours clavier complet, contrastes, zoom à 200 %, hiérarchie des titres, `prefers-reduced-motion` ;
- revue de cohérence visuelle inter-écrans contre les fondations de l'UX § 6bis et le vocabulaire figé du § 12 ;
- recette de bout en bout des treize critères d'acceptation du PRD § 11 sur données réalistes ;
- bascule en production : migrations appliquées sur `d-g-prod`, seed **non** exécuté, premier administrateur réel créé, arbitrage du plan Vercel au regard de l'usage commercial, mesure de référence du volume d'appels réalisée **avant** la mise en service.

**Résultat attendu.** L'atelier utilise l'application sur des données réelles, et la mesure de référence des appels est enregistrée.

◆ **Jalon J4 — mise en service** (voir § 5).

---

## 5. Jalons de démonstration client

Quatre jalons, ancrés sur les déploiements de prévisualisation Vercel — donc à coût quasi nul. Chacun pose une question précise à D-G, dont la réponse est consignée.

Les dates ci-dessous reprennent celles du brief § 8.1. ⚠️ **Ce sont des hypothèses de travail, non des engagements.** Elles supposent deux séances par semaine à partir de mi-septembre 2026 et une interruption de deux semaines fin décembre. Elles doivent être confirmées ou révisées avec D-G.

| Jalon | Contenu démontré | Question posée à D-G | Échéance *(hypothèse)* |
|---|---|---|---|
| **J0 — Validation du cadrage** | Aucun développement. Brief et PRD validés, arbitrages tranchés | Les sept statuts et leurs libellés sont-ils ceux de l'atelier ? Qui possède les comptes ? | 11 septembre 2026 |
| **J1 — « Le socle tient »** *(fin de P2)* | Connexion, déconnexion, blocage d'un compte non actif, application déployée | Les libellés et les messages de connexion sont-ils compréhensibles pour un réparateur non formé ? | 16 octobre 2026 |
| **J2 — « L'atelier saisit »** *(fin de P4)* | Créer une réparation au comptoir, la retrouver, changer son statut, annuler une fiche | Le formulaire suit-il l'ordre réel de l'accueil en atelier ? Tient-on les 90 secondes ? | 27 novembre 2026 |
| **J3 — « Le client suit »** *(fin de P6)* | D-G ouvre lui-même un lien de suivi sur son téléphone, après l'avoir reçu par SMS ou par e-mail | L'information est-elle suffisante pour supprimer l'appel téléphonique ? Le geste d'envoi est-il tenable au comptoir ? | 22 janvier 2027 |
| **J4 — Mise en service** *(fin de P8)* | Recette des treize critères du PRD § 11 sur données réalistes, bascule en atelier | Les treize critères sont-ils prononcés conformes ? | 6 février 2027 |

**Déroulé d'un jalon.** Démonstration courte, retours consignés par écrit, puis arbitrage explicite de chaque retour entre « corrigé maintenant » et « après le MVP ». Un retour non arbitré est un retour qui reviendra. En cas d'indisponibilité de D-G, la démonstration est faite en asynchrone via l'URL de prévisualisation, avec validation tacite sous cinq jours ouvrés.

**J2 mérite une préparation particulière.** C'est le jalon où D-G fournit une dizaine de cas réels anonymisés, qui viendront enrichir le seed et rendre J3 crédible.

---

## 6. Charge et calendrier

### Méthode assumée

Estimation **analogique par livrable**, calibrée sur un développeur **junior encadré** travaillant sur la stack figée du document 03. Une journée-homme (j.h) désigne une journée de travail effectif. Le ratio retenu est **1 séance de 3 h ≈ 0,5 j.h effectif** : le reste de la séance est explication, questions et reprises. Les estimations **incluent la Definition of Done**, ce qui les majore d'environ 25 % par rapport à un simple « ça marche ».

⚠️ **Ces chiffres ne sont pas une promesse de date.** Ils dimensionnent l'effort et servent de référence pour mesurer un écart.

### Charge par phase

| Phase | Charge | Séances (≈3 h) | Hypothèses | Incertitude |
|---|---:|---:|---|---|
| P1 Initialisation | 1,5 j.h | 3 | Comptes disponibles le jour J, propriété tranchée | ±60 % — dépend d'un tiers |
| P1b Schéma et sécurité | 3 j.h | 6 | DDL et policies fournis par l'architecture ; premier contact avec la RLS et les migrations | ±40 % — première rencontre avec la RLS |
| P2 Connexion et accès | 3 j.h | 6 | Comptes issus du seed ; inclut le mot de passe oublié et les composants transverses | ±30 % — chemin balisé |
| P3 Cœur métier | 6 j.h | 12 | Pattern chercher-ou-créer, notes en fil, écrans clients ; phase la plus lourde | ±40 % — cœur du produit |
| P4 Workflow des statuts | 2 j.h | 4 | Sept statuts, verrouillage terminal, trois canaux d'information | ±25 % — périmètre net |
| P5 Suivi public | 3 j.h | 6 | Inclut la copie du lien, le ticket d'atelier imprimable et la vérification d'étanchéité | ±50 % — surface de risque principale |
| P6 Liste, recherche, filtres, tri | 3,5 j.h | 7 | Onglets, pagination, persistance URL, deux rendus | ±30 % |
| P7 Inscription et employés | 2,5 j.h | 5 | Circuit `pending`/`active`/`rejected`, protection du dernier administrateur | ±30 % |
| P8 Finition et production | 2,5 j.h | 5 | Anonymisation, pages d'erreur, accessibilité, recette, bascule | ±50 % — dépend du volume de retours en J2 et J3 |
| **Total** | **≈ 27 j.h** | **≈ 54 séances** | | **±35 %, soit 18 à 36 j.h** |

### Lecture de la marge

Le total nominal est de **27 j.h**. Le brief § 8.2 retient **24 j.h nominal et 32 en borne haute** : l'écart tient à la Definition of Done, désormais chiffrée dans chaque phase, et aux stories ajoutées au backlog. C'est le chiffre de ce document qui fait foi sur la charge de développement ; le brief est à mettre à jour lors de sa prochaine révision avec D-G.

Le chiffre à communiquer si un engagement est demandé est la **borne haute**. Après la fin de P1b, l'estimation doit être refaite : la vélocité réelle observée sur les deux premières phases resserre l'incertitude globale à environ ±20 %.

### Arbitrage si le calendrier se tend

Si le nombre de séances disponibles est inférieur, l'arbitrage porte, dans cet ordre :

1. **P6** — un seul critère de filtre, pas de tri utilisateur, pas de pagination tant que le volume reste sous 50 réparations ;
2. **P7** — validation des inscriptions par une opération en base plutôt qu'en interface ;
3. **P8** — finition minimale, l'accessibilité restant non négociable.

L'arbitrage ne porte **jamais** sur P1b ni sur P5, qui portent la sécurité et l'étanchéité des données personnelles.

---

## 7. Position sur les tests

La stack (§ 15) a tranché : **aucun test automatisé dans le périmètre du MVP**, la validation reposant sur les critères d'acceptation du PRD vérifiés manuellement. Ce plan ne rouvre pas cette décision — imposer une pyramide de tests à un MVP pédagogique serait disproportionné. Il pose en revanche trois exigences non négociables, faute de quoi « validation manuelle » signifierait « aucune validation ».

**1. Portes de qualité automatiques, dès P1.** `tsc --noEmit`, `pnpm lint` et `pnpm build` sur chaque pull request, avec le job en statut requis sur la branche `main`. Sans la protection de branche effectivement cochée, la CI est décorative.

**2. Vérification des policies RLS, en P1b.** Un fichier SQL exécutable localement qui, pour chaque profil type — anonyme, `pending`, `rejected`, `active`, `admin` — tente une lecture sur chaque table et compare le nombre de lignes retournées à l'attendu. C'est le seul domaine où un défaut est silencieux : une policy trop permissive ne produit aucune erreur, elle retourne trop de lignes. Ni la revue de code, ni TypeScript, ni un test d'interface ne l'attrapent. Ce fichier est rejoué à chaque phase ajoutant une table ou une policy.

**3. Recette manuelle scriptée par phase.** Un scénario écrit, rejoué à chaque fin de phase, couvrant les critères du PRD § 11 déjà atteignables, plus ceux des phases précédentes au titre de la non-régression (critère 8 de la DoD). Coût marginal, valeur immédiate, et excellent support pédagogique.

Si des tests automatisés sont introduits ultérieurement, l'outillage est déjà arrêté par la stack : Vitest pour les fonctions métier, Playwright pour les parcours.

---

## 8. Correspondance phase → epic → stories

Le détail de chaque story figure dans `docs/07-epics-stories.md`.

| Phase | Epic | Stories |
|---|---|---|
| **P1** Initialisation | Epic 0 — Fondations | 0.1 à 0.6 |
| **P1b** Schéma et sécurité | Epic 0 — Fondations | 0.7 à 0.11 |
| **P2** Connexion et accès | Epic 1 — Accès à l'application | 1.1 à 1.6 |
| **P3** Cœur métier | Epic 2 — Réparations, clients et vélos | 2.1 à 2.9 |
| **P4** Workflow des statuts | Epic 3 — Workflow des statuts | 3.1, 3.2, 3.3 |
| **P5** Suivi public | Epic 4 — Suivi public | 4.1 à 4.6 |
| **P6** Liste et recherche | Epic 5 — Consultation et recherche | 5.1 à 5.6 |
| **P7** Inscription et employés | Epic 6 — Inscription et gestion des employés | 6.1 à 6.6 |
| **P8** Finition et production | Epic 7 — Conformité, finition et mise en service | 7.1 à 7.6 |
| | | **53 stories** |

Les epics sont numérotés **à partir de 0** : l'Epic 0 « Fondations » regroupe tout le socle —
initialisation du projet, comptes Supabase et Vercel, déploiement, schéma, sécurité et données de
démonstration. Il couvre donc les phases P1 et P1b à lui seul.

Le backlog ne porte plus d'estimation en points : chaque story déclare ses tâches, ses critères d'acceptance et sa condition de fin, et se donne telle quelle au développeur. La charge se mesure au niveau de la phase (§ 6), sur la vélocité réellement observée après P1b.

---

## 9. Registre des risques

À revoir à chaque jalon. Un risque dont la parade n'a pas de responsable nommé n'a pas de parade.

| # | Risque | Prob. | Impact | Parade | Responsable |
|---|---|:---:|:---:|---|---|
| **R2** | Mise en pause du projet Supabase gratuit après 7 jours d'inactivité, entre deux séances espacées | Élevée | Moyen | Procédure de réactivation documentée en P1 ; migrations et seed rejouables permettant de reconstruire à l'identique ; réactivation avant chaque séance | Développeur |
| **R3** | Fuite de données par le suivi public : notes internes, coordonnées client ou autre réparation accessibles via le jeton | Moyenne | **Critique** | P5 remontée en position 6 ; projection structurelle par `get_public_repair` plutôt que par convention ; aucun accès `anon` aux tables ; vérification d'étanchéité sur le contenu transmis ; revue de sécurité au jalon J3 | Développeur + relecteur |
| **R4** | Un compte `rejected` conserve une session valide et lit toute la base via l'API PostgREST | Moyenne | **Critique** | `is_active_member()` appelée dans toutes les policies sans exception, posée dès P1b ; fichier SQL de vérification rejoué à chaque phase | Développeur |
| **R5** | Les réparateurs n'alimentent pas l'outil : statuts non mis à jour, client informé d'un état périmé, appels maintenus | Élevée | **Critique** | Changement de statut en deux gestes depuis la liste (P4 et P6) ; formation au comptoir ; suivi de l'indicateur « fiches mises à jour » du brief § 6.1 | D-G + chef de projet |
| **R6** | Doublons de clients et de vélos, rendant la recherche inutilisable et l'historique par vélo inexploitable | Élevée | Majeur | Pattern chercher-ou-créer imposé dès P3, avant toute création ; avertissement sur nom similaire ; jamais de formulaire client partant d'une page blanche | Développeur |
| **R7** | Le lien de suivi n'atteint pas le client faute de canal automatisé | Élevée | **Critique** | Copie du lien en un clic livrée en P5, pas en option, et envoi par SMS ou e-mail au moment du dépôt inscrit dans le geste de comptoir ; recueil systématique d'un mobile ou d'un e-mail à la création du client ; geste d'envoi éprouvé au jalon J3 ; mesure du taux de remise | D-G + développeur |
| **R8** | Indisponibilité de D-G pour valider les jalons | Moyenne | Moyen | Jalons calés à l'avance ; démonstration asynchrone possible via l'URL de prévisualisation ; validation tacite sous 5 jours ouvrés | Chef de projet |
| **R9** | Absence de données réalistes : P6 et P5 indémontrables, recherche et filtres non éprouvés | Élevée | Moyen | Seed livré en P1b avec vingt réparations sur sept statuts et des noms volontairement proches ; complété avant J3 par des cas réels anonymisés fournis par l'atelier | Développeur + D-G |
| **R10** | Reprise de l'existant non décidée : réparations en cours sur fiches papier ou Excel au moment de la bascule | Moyenne | Moyen | Arbitrer avant J2. Recommandation : *big bang*, l'application ne prend que les nouvelles réparations, les anciennes finissent sur leur support. Décision consignée au jalon | Chef de projet + D-G |
| **R11** | Double saisie : l'atelier maintient son support papier en parallèle, l'outil devient une charge nette | Élevée | Majeur | Date d'arrêt du support précédent fixée avec D-G au jalon J4 ; ne pas maintenir les deux au-delà de deux semaines | D-G |
| **R12** | Dérive du périmètre : demandes d'ajout au fil des démonstrations (devis, notifications, statistiques) | Moyenne | Moyen | Registre des demandes tenu aux jalons ; réponse systématique « noté pour après le MVP » ; aucune entrée en cours de phase | Chef de projet |
| **R13** | Sous-estimation de P3, la phase la plus lourde et la plus incertaine | Moyenne | Élevé | Ré-estimation obligatoire à la fin de P1b sur la vélocité réelle ; découpage possible de P3 en deux sous-phases, réparation d'abord, écrans clients ensuite | Chef de projet |
| **R14** | Nom applicatif provisoire D-g figé en dur dans le code, les URL et le dépôt | Moyenne | Faible | Constante unique `APP_NAME` dès P1 ; identifiants techniques descriptifs et indépendants du nom commercial ; nom définitif tranché avant J4 | Développeur |
| **R15** | Régression silencieuse : une phase casse une fonctionnalité d'une phase antérieure | Élevée | Moyen | Critère 8 de la DoD — rejeu des scénarios de recette antérieurs ; portes `build`, `lint`, `tsc` bloquantes ; vérification SQL des policies | Développeur |
| **R16** | Quota SMTP mutualisé de Supabase épuisé, rendant la réinitialisation de mot de passe inopérante en séance | Moyenne | Faible | Limite documentée auprès de D-G dès P2 ; confirmation d'e-mail désactivée ; SMTP dédié inscrit au registre des dettes de la stack | Développeur |

---

## 10. Ce qui n'est volontairement pas fait

Distinct du § 11, qui borne le *document*, cette section borne le *produit livré*. Écrire ces renoncements les rend arbitrables au lieu de les laisser passer pour des oublis.

| Renoncement | Conséquence assumée | Levée envisagée |
|---|---|---|
| Aucun test automatisé, hors vérification SQL des policies | Les régressions ne sont détectées qu'à la recette manuelle | Vitest et Playwright, après le MVP |
| Aucun environnement de recette dédié | La recette se fait sur la prévisualisation Vercel, pointant sur `d-g-dev` | Troisième projet Supabase si le besoin apparaît |
| Aucune reprise de l'existant | Les réparations en cours au moment de la bascule finissent sur leur support d'origine | Saisie manuelle à chiffrer si D-G le demande |
| Aucun suivi d'erreurs centralisé | Une erreur survenue le week-end aura disparu des logs Vercel le lundi | Sentry, après le MVP |
| Aucune notification métier | Le client n'est prévenu d'aucun changement de statut ; il consulte son lien | SMTP dédié et notifications, après le MVP |
| Aucun mode sombre | L'atelier peu éclairé est traité par un contraste élevé en mode clair | Équivalents déjà pré-calculés dans l'UX § 7 |
| Aucune mise à jour temps réel | Un changement apparaît chez les autres employés à leur prochaine navigation | Supabase Realtime, décision de stack, après le MVP |
| Aucune limitation de débit sur `/suivi/[token]` | Risque de consommation de quota, non de confidentialité | Middleware ou pare-feu Vercel, après le MVP |

---

## 11. Hors périmètre du document

Ce plan ne définit pas :

- les choix techniques de la stack — `docs/03-stack-shard/` ;
- l'architecture logicielle, le schéma de données et les politiques de sécurité — `docs/05-architecture-shard/` ;
- les écrans, parcours et libellés — `docs/04-ux-design-shard/` ;
- les exigences fonctionnelles et les règles métier — `docs/02-PRD-shard/` ;
- le détail exécutable des stories, leurs critères d'acceptance et leurs dépendances — `docs/07-epics-stories.md`.

En cas de contradiction entre ce plan et un autre document, le document spécialisé fait foi sur son domaine propre ; ce plan fait foi sur l'ordre, la charge et les jalons.
