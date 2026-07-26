# D-g — Brief de projet

> **Application de suivi des réparations pour atelier de vélos**

| | |
|---|---|
| **Client / commanditaire** | digital-artisan (D-G) |
| **Nom applicatif** | **D-g** — ⚠️ **nom provisoire**, à confirmer avant la mise en production |
| **Type de document** | Brief de projet — document racine de la chaîne documentaire |
| **Version** | 2.0 |
| **Statut** | Brouillon — en attente de validation par D-G |
| **Date** | 2026-07-26 |
| **Auteur** | À compléter |
| **Validé par** | À compléter — D-G |

**Nom provisoire.** Le nom **D-g** est retenu à titre provisoire pour l'ensemble des
documents et de l'interface. Il n'a pas été validé comme nom définitif. Toute
occurrence dans le code doit être centralisée dans une constante unique afin qu'un
changement de nom n'entraîne aucune modification structurelle.

**Documents dérivés.** Ce brief est le document racine : il ne référence aucun
document en amont, et tous les documents suivants en dépendent. Toute évolution du
périmètre défini ici doit être répercutée dans les documents ci-dessous.

| # | Document | Objet |
|---|---|---|
| 01 | **Brief** *(ce document)* | Contexte, périmètre, objectifs, contraintes, risques |
| 02 | PRD | Exigences fonctionnelles, règles métier, permissions, critères d'acceptation |
| 03 | Stack technique | Technologies retenues et cadre de développement |
| 04 | UX Design | Écrans, parcours et comportements d'interface |
| 05 | Architecture | Organisation technique, modèle de données, sécurité |
| 06 | Plan d'implémentation | Ordre de développement par phases |
| 07 | Epics & User Stories | Découpage exécutable du développement |

**Règle de préséance.** En cas de contradiction entre ce brief et un document dérivé,
le brief fait foi sur le **périmètre** et les **objectifs métier** ; le document
spécialisé fait foi sur son **domaine propre** (PRD pour les règles métier détaillées,
architecture pour les décisions techniques). Toute contradiction constatée doit être
tranchée et corrigée dans les deux documents, non contournée.

---

## 1. Contexte

Les petits ateliers de réparation de vélos gèrent souvent le suivi des interventions avec des outils très simples : fiches papier, tableau blanc, mémoire des réparateurs ou fichiers Excel. Ce fonctionnement est suffisant lorsque l'activité est faible, mais montre rapidement ses limites dès que plusieurs vélos sont en cours de réparation ou que plusieurs employés interviennent simultanément.

L'une des principales conséquences est la multiplication des sollicitations des clients, qui contactent régulièrement l'atelier pour connaître l'avancement de leur réparation. Ces interruptions nuisent à la productivité des réparateurs et rendent la communication dépendante de la disponibilité des personnes présentes.

L'objectif de cette application est d'apporter une réponse simple à ce problème : centraliser les réparations dans une interface unique et permettre au client de suivre l'avancement de son vélo de manière autonome.

Le présent projet est réalisé pour **digital-artisan** (ci-après « D-G »), commanditaire de l'application. L'application est destinée à un atelier unique ; la gestion multi-ateliers est hors périmètre (voir § 9 Hors périmètre). Le nom applicatif retenu à ce stade est **D-g** ; **ce nom est provisoire** et sera confirmé avant la mise en production. Tout élément d'interface l'utilisant doit rester centralisé et modifiable sans refonte.

---

## 2. Objectif du projet

Concevoir une application web permettant de gérer le cycle de vie d'une réparation, depuis le dépôt du vélo jusqu'à sa restitution.

L'application poursuit deux objectifs complémentaires :

- améliorer l'organisation interne de l'atelier ;
- offrir davantage de transparence au client.

Le projet est volontairement limité à ce périmètre afin de privilégier une solution simple, cohérente et facilement maintenable.

### 2.1 Cycle de vie d'une réparation

Le cycle de vie d'une réparation comporte sept étapes : *Vélo déposé*, *Diagnostic*, *En attente de pièce*, *Réparation en cours*, *Prêt à récupérer*, *Restitué*, *Annulé*. Ces libellés constituent le vocabulaire commun de l'atelier et du client ; ils sont visibles sur la page publique de suivi et doivent être validés par D-G avant développement.

Le statut *Annulé* clôt une fiche ouverte par erreur ou un vélo finalement jamais déposé. Il est nécessaire parce qu'une réparation ne peut jamais être supprimée (voir § 3.1) : sans lui, une fiche erronée resterait indéfiniment dans la liste de travail.

Les transitions entre statuts sont libres, y compris un retour en arrière, à l'exception du statut *Restitué* qui verrouille la fiche. Le détail des règles de transition figure au PRD § 8.

---

## 3. Public cible

L'application est destinée à un atelier unique de réparation de vélos comptant un ou plusieurs réparateurs.

Trois profils d'utilisateurs sont identifiés. Les descriptions ci-dessous précisent **qui** sont ces utilisateurs et **ce qui les motive**. Le détail des droits par rôle est défini dans le PRD, § 9 Permissions, qui en est la source unique.

### 3.1 Administrateur

Responsable de l'atelier. Il configure l'application, supervise son fonctionnement et arbitre les accès. Dans les faits, il est aussi réparateur : il utilise l'application comme un employé la plupart du temps, et ses droits d'administration ponctuellement.

Ce qu'il attend de l'outil : savoir à tout instant où en est l'activité de l'atelier, et maîtriser qui y accède.

Il gère les comptes employés, accepte ou refuse les demandes d'inscription, crée et modifie les réparations, et assigne une réparation à un employé.

Les réparations ne sont jamais supprimées, afin de préserver l'historique des interventions et de pouvoir répondre à une contestation client. Une fiche créée par erreur peut être annulée par un changement de statut (*Annulé*), non par une suppression.

### 3.2 Employé

Réparateur de l'atelier. Il participe au suivi quotidien des réparations et travaille souvent debout, les mains occupées, depuis une tablette ou un téléphone.

Ce qu'il attend de l'outil : mettre à jour un statut en deux gestes, sans friction, et retrouver rapidement une fiche.

Il crée les fiches de réparation, met à jour leur avancement et ajoute des notes internes.

Il consulte **toutes** les réparations de l'atelier, y compris celles assignées à un collègue ; l'application ne cloisonne pas les fiches entre réparateurs, la visibilité partagée étant l'un des objectifs du projet.

### 3.3 Client

Personne ayant confié son vélo à l'atelier. Il consulte depuis son téléphone, une à trois fois pendant la durée de la réparation, et ne connaît pas le vocabulaire de l'atelier.

Ce qu'il attend de l'outil : une réponse immédiate à « où en est mon vélo ? », sans appeler.

Le client n'utilise pas l'application comme un utilisateur authentifié et n'a aucune inscription à effectuer.

À la création de la réparation, l'application génère un lien de suivi unique et difficile à deviner. **La transmission de ce lien au client est manuelle dans cette version** : l'employé le copie depuis la fiche, puis le colle dans un **SMS ou un e-mail** qu'il envoie au client, selon la coordonnée dont l'atelier dispose. C'est la seule modalité praticable, un jeton de suivi n'étant ni dictable au téléphone, ni recopiable à la main : on ne l'énonce pas, on l'envoie. L'envoi automatique par SMS ou e-mail depuis l'application est hors périmètre (voir § 9 Hors périmètre).

Conséquence à prendre en compte dans la conception : la copie et l'envoi du lien doivent être **immédiats et sans friction** au comptoir, faute de quoi le suivi client ne sera pas utilisé.

---

## 4. Parties prenantes

| Rôle | Personne | Responsabilité décisionnelle |
|---|---|---|
| Commanditaire | digital-artisan (D-G) | Valide le périmètre, arbitre les demandes d'évolution, valide le nom applicatif définitif |
| Responsable de l'atelier | À compléter | Futur administrateur de l'application ; valide l'usage métier et les libellés de statuts ; réalise la recette fonctionnelle |
| Réalisateur | À compléter | Conception et développement ; propose les arbitrages techniques |
| Responsable de l'exploitation | À compléter | Assure la maintenance et le support après la mise en service |

Les cellules « À compléter » doivent être renseignées avec D-G avant la validation du brief. Un projet sans recetteur nommé n'a pas de critère d'acceptation opposable.

---

## 5. Proposition de valeur

### 5.1 Pour le client

Le client obtient une information fiable et disponible à tout moment.

Il peut consulter l'état de sa réparation sans devoir contacter l'atelier, ce qui améliore son expérience et renforce la confiance envers le réparateur.

### 5.2 Pour l'atelier

L'ensemble des réparations est centralisé dans un seul outil.

Chaque membre de l'équipe sait immédiatement :

- quel vélo est en cours de réparation ;
- qui en est responsable ;
- où en est l'intervention.

La communication interne est simplifiée et les demandes de suivi téléphonique diminuent.

---

## 6. Critères de succès

Le succès du projet est évalué trois mois après la mise en service.

### 6.1 Adoption interne — condition préalable

| Indicateur | Cible | Mesure |
|---|---|---|
| Réparations saisies dans l'outil | ≥ 90 % des vélos déposés | Comptage sur une semaine témoin, comparé au registre papier |
| Fiches dont le statut est mis à jour au moins une fois après création | ≥ 80 % | Requête sur la date de dernière modification |
| Employés utilisant l'outil chaque semaine | 100 % des employés actifs | Comptage des comptes ayant réalisé au moins une action |
| Suppression du support papier ou Excel de suivi | Effective | Constat en atelier |

### 6.2 Bénéfice client — objectif principal

| Indicateur | Cible | Mesure |
|---|---|---|
| Liens de suivi remis au client | ≥ 80 % des réparations | Déclaratif atelier ou compteur de copies du lien |
| Appels entrants « où en est mon vélo ? » | −50 % par rapport à la référence | Comptage manuel sur une semaine avant lancement, puis à 3 mois |
| Consultation effective du lien remis | ≥ 50 % des liens remis ouverts au moins une fois | Compteur de consultations sur la page publique |

### 6.3 Qualité de service

| Indicateur | Cible | Mesure |
|---|---|---|
| Temps de création d'une fiche au comptoir | ≤ 90 secondes | Chronométrage sur 10 dépôts |
| Disponibilité de l'application | ≥ 99 % sur le mois | Supervision de l'hébergeur |

**Mesure de référence obligatoire :** le comptage des appels de suivi sur une semaine doit être réalisé **avant** la mise en service. Sans cette mesure initiale, l'objectif principal du projet ne pourra pas être évalué. Cette mesure n'a aucun coût de développement et n'est plus réalisable après le lancement.

**Point d'arbitrage à porter à D-G.** Le compteur de consultations du lien public et le compteur de copies du lien sont de **nouvelles fonctionnalités**, absentes du PRD et exclues par « statistiques » en § 9 Hors périmètre. Deux options : les accepter (deux colonnes en base, coût marginal), ou retenir uniquement les mesures déclaratives et manuelles.

---

## 7. Fonctionnalités principales

L'application se concentre exclusivement sur le suivi des réparations.

Elle permet de :

- gérer les comptes administrateurs et employés ;
- accepter ou refuser une demande d'inscription, en conservant la trace de la décision ;
- enregistrer un client et ses vélos comme fiches réutilisables d'une réparation à l'autre ;
- rechercher un client ou un vélo existant lors de la création d'une réparation, afin d'éviter les doublons ;
- créer une fiche de réparation ;
- associer une réparation à un client et à un vélo ;
- affecter un réparateur ;
- faire évoluer le statut de la réparation ;
- ajouter des notes internes horodatées et attribuées à leur auteur ;
- consulter la liste des réparations en cours ;
- rechercher une réparation par client ou par vélo ;
- filtrer les réparations par statut et par réparateur ;
- copier le lien de suivi pour l'envoyer au client par SMS ou par e-mail depuis le comptoir ;
- imprimer un ticket d'atelier portant un QR code, à accrocher au vélo, qui ouvre la fiche interne de la réparation ;
- consulter l'avancement d'une réparation depuis le lien public, sans compte ;
- réinitialiser un mot de passe oublié ;
- anonymiser les données d'un client à sa demande, sans supprimer la fiche de réparation.

Un vélo appartient à un seul client : un vélo revendu à un autre propriétaire doit être recréé sous le nouveau client.

---

## 8. Contraintes et cadre du projet

### 8.1 Délais

⚠️ **Les échéances ci-dessous sont une hypothèse de travail réaliste, construite à partir de la charge estimée. Elles n'engagent personne tant qu'elles n'ont pas été validées avec D-G.**

| Jalon | Contenu | Échéance *(hypothèse)* |
|---|---|---|
| J0 — Validation du cadrage | Brief et PRD validés par D-G, arbitrages tranchés (voir § 11) | 11 septembre 2026 |
| J1 — Socle déployé | Projet initialisé, schéma de données et politiques de sécurité, authentification, déploiement en ligne | 16 octobre 2026 |
| J2 — Cœur métier | Gestion des employés, clients, vélos, réparations et statuts | 27 novembre 2026 |
| J3 — MVP complet | Liste, recherche et filtres, suivi public, finalisation | 22 janvier 2027 |
| J4 — Mise en service | Recette D-G, mesure de référence des appels, bascule en atelier | 6 février 2027 |

Ces dates supposent un rythme de deux séances de travail par semaine à partir de la mi-septembre 2026, avec une interruption de deux semaines fin décembre.

### 8.2 Charge et budget

⚠️ **Hypothèse à valider avec D-G. Aucun engagement n'est pris à ce stade.**

| Élément | Hypothèse |
|---|---|
| Charge de développement — nominal | **24 j.h** |
| Charge de développement — borne haute | **32 j.h** |
| Profil | Développeur junior encadré |
| Encadrement | ~48 séances de 3 h, soit environ 144 h d'accompagnement |
| Nature de l'engagement | À compléter avec D-G : forfait, régie ou projet interne |
| Maintenance après mise en service | À compléter avec D-G : personne responsable et volume prévu |

L'écart entre 24 et 32 j.h correspond à l'incertitude sur les politiques de sécurité au niveau base de données et sur la reprise éventuelle des écrans après les premiers retours d'usage.

### 8.3 Comptes et services

| Service | Usage | Propriétaire du compte |
|---|---|---|
| **GitHub** | Dépôt de code source, historique des versions | À compléter |
| **Supabase** | Base de données, authentification, stockage | À compléter |
| **Vercel** | Hébergement de l'application web | À compléter |

**Point à trancher avec D-G.** Les comptes doivent être créés au nom de digital-artisan, et non au nom personnel du réalisateur : sans cela, le transfert de propriété à la fin du projet devient laborieux et la continuité d'exploitation dépend d'une personne. À arbitrer avant l'ouverture des comptes, non après.

### 8.4 Contraintes techniques imposées

- Hébergement Vercel et Supabase, sur les offres gratuites ou d'entrée de gamme.
- Application web responsive, sans application mobile native.
- Navigateurs récents ; aucun support d'Internet Explorer.
- Langue unique : français.

### 8.5 Contraintes d'exploitation

- L'application est utilisée au comptoir, souvent en présence du client : la création d'une fiche doit rester rapide.
- Aucun administrateur système n'est disponible côté atelier : l'exploitation doit se limiter à l'usage de l'interface.

---

## 9. Hors périmètre

Les fonctionnalités suivantes ne font volontairement pas partie du projet :

- gestion des devis ;
- facturation ;
- paiement en ligne ;
- gestion du stock ;
- prise de rendez-vous ;
- gestion commerciale ;
- statistiques avancées ;
- gestion comptable ;
- notifications SMS ou e-mail automatiques ;
- **gestion multi-ateliers** (voir hypothèse H1) ;
- historique détaillé des modifications ;
- internationalisation de l'interface.

L'e-mail de réinitialisation de mot de passe ne relève pas des notifications exclues ci-dessus : il s'agit d'un mécanisme technique d'authentification, non d'une notification métier.

Ces éléments pourront être envisagés dans une version ultérieure. Ils ne sont pas nécessaires pour répondre au besoin prioritaire de l'atelier : le suivi des réparations.

---

## 10. Données personnelles

L'application enregistre des données personnelles de clients : nom, téléphone et adresse e-mail. À ce titre, l'atelier est responsable de traitement.

Décisions retenues pour cette version :

- **Finalité** : suivi des réparations et information du client sur l'avancement. Aucun usage commercial ou marketing.
- **Minimisation** : seuls le nom et un moyen de contact sont demandés. Aucune adresse postale, aucune date de naissance.
- **Conservation** : les fiches de réparation sont conservées trois ans après la restitution du vélo, durée alignée sur la garantie légale de conformité.
- **Droit à l'effacement** : sur demande, les données identifiantes d'un client sont **anonymisées** (nom, téléphone et e-mail remplacés par une valeur neutre). La fiche de réparation et son historique technique sont conservés. Cette opération est réservée à l'administrateur.
- **Page publique** : elle n'affiche que les informations strictement nécessaires au suivi et est exclue de l'indexation par les moteurs de recherche.
- **Information des personnes** : une mention d'information est affichée sur la page publique de suivi.

L'anonymisation plutôt que la suppression est la seule voie qui réconcilie le droit à l'effacement avec la règle « aucune suppression de réparation ». Elle implique une fonctionnalité dédiée, réservée à l'administrateur, à inscrire au backlog.

---

## 11. Risques identifiés

| # | Risque | Probabilité | Impact | Mesure prévue |
|---|---|---|---|---|
| R1 | Les réparateurs n'alimentent pas l'outil : les statuts ne sont pas mis à jour, le client voit une information périmée et rappelle malgré tout. | Élevée | Critique — annule le bénéfice du projet | Changement de statut en un geste depuis la liste ; formation au comptoir ; suivi de l'indicateur « fiches mises à jour ». |
| R2 | Double saisie : l'atelier maintient en parallèle son support papier ou Excel. | Élevée | Majeur — l'outil devient une charge nette | Fixer une date d'arrêt du support précédent ; ne pas maintenir les deux au-delà de deux semaines. |
| R3 | Le lien de suivi n'atteint pas le client faute de canal automatisé. | Élevée | Critique | Envoi du lien par SMS ou e-mail intégré au geste de dépôt (copie en un clic, puis envoi depuis le téléphone ou la messagerie de l'atelier) ; mesure du taux de remise. |
| R4 | Le lien public est transmis à un tiers ou indexé par un moteur de recherche, exposant le nom du client et de son vélo. | Moyenne | Majeur — incident de données personnelles | Jeton aléatoire long ; `noindex` sur la page publique ; affichage minimal des données personnelles. |
| R5 | Le premier compte administrateur ne peut être créé, aucun mécanisme n'étant décrit dans les documents fonctionnels. | Moyenne | Bloquant au démarrage | Procédure d'amorçage du premier administrateur spécifiée au PRD § 7 et couverte par une story dédiée. |
| R6 | Le nom applicatif provisoire D-g est diffusé et devient difficile à changer. | Moyenne | Mineur | Nom centralisé dans une constante unique ; décision de nom définitif avant la mise en service. |
| R7 | Les clients et les vélos sont recréés à chaque visite, générant des doublons qui rendent la recherche inutilisable. | Élevée | Majeur — dégradation irréversible des données | Recherche d'un client ou d'un vélo existant imposée avant toute création (§ 7). |
| R8 | Les comptes d'hébergement sont ouverts au nom personnel du réalisateur, rendant le transfert de propriété difficile. | Moyenne | Majeur — dépendance à une personne | Ouverture des comptes au nom de digital-artisan dès le départ (§ 8.3). |

---

## 12. Hypothèses

Les hypothèses suivantes sont posées faute de validation à ce stade. Leur remise en cause modifierait le périmètre.

- **H1 — Un seul atelier est concerné.** L'application est déployée pour un atelier unique. Il n'existe aucune notion d'atelier dans les données : le nom, le logo et les coordonnées de l'atelier sont fixés à la configuration de l'application. La gestion multi-ateliers est hors périmètre et invaliderait le modèle de données actuel.
- **H2 — L'effectif reste inférieur à dix employés.**
- **H3 — Le volume reste inférieur à quelques dizaines de réparations simultanées.**
- **H4 — Les réparateurs disposent d'un accès à un ordinateur, une tablette ou un téléphone dans l'atelier.**
- **H5 — Le client dispose d'un numéro de téléphone mobile ou d'une adresse e-mail** permettant de lui envoyer le lien de suivi. Un client qui n'a ni l'un ni l'autre ne peut pas recevoir de lien et continue d'appeler l'atelier ; cette part n'est pas estimée.
- **H6 — Les données saisies concernent uniquement l'activité de réparation**, à l'exclusion de toute donnée sensible au sens du RGPD.
- **H7 — Les délais et la charge du § 8 sont des hypothèses de travail**, non des engagements. Ils doivent être confirmés ou révisés avec D-G avant le lancement du développement.

---

## 13. Modalité de réalisation

Le projet est réalisé dans un cadre de montée en compétences : sa conception et son développement servent également de support d'apprentissage au développement d'une application web moderne (authentification, rôles, CRUD, relations entre données, gestion des états, sécurité, interface).

Cette modalité influence la **manière de construire** le produit :

- progression par incréments fonctionnels livrables un à un ;
- préférence pour des solutions directes plutôt que pour des abstractions anticipées ;
- documentation des choix structurants.

Elle n'influence pas le **périmètre fonctionnel** ni le niveau d'exigence attendu. Le produit livré doit être exploitable en conditions réelles par l'atelier.

En cas d'arbitrage, l'ordre de priorité est : **1. besoin de l'atelier, 2. qualité et sécurité, 3. valeur d'apprentissage.**

---

## 14. Glossaire

| Terme | Définition |
|---|---|
| **Réparation** | Objet central de l'application : une intervention sur un vélo, du dépôt à la restitution. Terme à préférer. |
| **Fiche de réparation** | Synonyme de *réparation*, employé pour désigner sa représentation à l'écran. |
| **Intervention** | Synonyme de *réparation*. À éviter dans les documents et l'interface. |
| **Réparateur** | Métier exercé dans l'atelier. Correspond au rôle applicatif **Employé**. |
| **Employé** | Rôle applicatif d'un utilisateur interne non administrateur. |
| **Administrateur** | Rôle applicatif disposant en plus des droits de gestion des comptes. |
| **Statut** | État courant d'une réparation, parmi les sept étapes du § 2.1. Une réparation n'a qu'un seul statut à la fois. |
| **Lien de suivi** | URL publique remise au client, donnant accès en lecture seule à sa seule réparation. |
| **Jeton public** | Chaîne aléatoire contenue dans le lien de suivi, distincte de l'identifiant interne de la réparation. |
| **Note interne** | Message horodaté rédigé par un utilisateur interne au sujet d'une réparation. Jamais visible du client. |
| **Atelier** | L'atelier unique pour lequel l'application est déployée. N'est pas une donnée de l'application (voir H1). |
| **D-G** | digital-artisan, commanditaire du projet. |
| **D-g** | Nom applicatif provisoire du produit. |
