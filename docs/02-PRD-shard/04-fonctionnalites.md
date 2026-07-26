# Fonctionnalités

> **Document :** PRD — Exigences produit (02) — projet digital-artisan (D-G), application D-g
> **Partie :** 4 / 9 · [Retour à l'index](./index.md)
> **Contenu :** Les trente-trois exigences fonctionnelles `FEAT-*`, réparties en six domaines : authentification, gestion des employés, gestion des clients et des vélos, gestion des réparations, suivi client et données personnelles (section 7).

---

# 7. Fonctionnalités

## 7.1 Authentification

**FEAT-AUT-01 — Inscription d'un employé.**
Toute personne peut créer un compte en renseignant une adresse e-mail et un mot de passe. Le compte est créé à l'état « en attente » et n'ouvre aucun accès avant validation ([RM-01](./06-regles-metier.md#10-règles-métier)).
*Vérifié par : [AC-02](./07-criteres-acceptation.md#11-critères-dacceptation).*

**FEAT-AUT-02 — Connexion.**
Un utilisateur dont le compte est actif peut se connecter avec son e-mail et son mot de passe et accéder à l'espace interne.
*Vérifié par : [AC-02](./07-criteres-acceptation.md#11-critères-dacceptation).*

**FEAT-AUT-03 — Déconnexion.**
Un utilisateur connecté peut mettre fin à sa session depuis n'importe quelle page de l'espace interne.

**FEAT-AUT-04 — Réinitialisation du mot de passe.**
Un utilisateur peut demander la réinitialisation de son mot de passe depuis l'écran de connexion. Un lien de réinitialisation à usage unique et à durée limitée lui est envoyé par e-mail. Ce flux s'appuie sur le mécanisme natif du fournisseur d'authentification et ne constitue pas une notification métier au sens du [§ 13](./09-perimetre-et-limites.md#13-hors-périmètre).

**FEAT-AUT-05 — Amorçage du premier administrateur.**
Le premier compte administrateur est créé lors de l'installation de l'application, par une opération d'initialisation réalisée hors de l'interface (script d'amorçage ou promotion manuelle en base). Aucun mécanisme d'auto-promotion n'est disponible depuis l'application.
*Cette dernière phrase interdit explicitement la faille « le premier inscrit devient administrateur ».*

---

## 7.2 Gestion des employés

**FEAT-EMP-01 — Consultation des demandes d'inscription.**
Un administrateur consulte la liste des comptes à l'état « en attente », avec leur date de demande.

**FEAT-EMP-02 — Acceptation d'une demande.**
Un administrateur fait passer un compte de l'état « en attente » à l'état « actif ». L'utilisateur accède alors à l'espace interne.
*Vérifié par : [AC-01](./07-criteres-acceptation.md#11-critères-dacceptation).*

**FEAT-EMP-03 — Refus d'une demande.**
Un administrateur fait passer un compte de l'état « en attente » à l'état « refusé ». Le compte est conservé pour tracer la décision et n'ouvre aucun accès.

**FEAT-EMP-04 — Consultation de la liste des employés.**
Un administrateur consulte la liste des comptes internes avec leur rôle et leur état.

**FEAT-EMP-05 — Promotion et rétrogradation.**
Un administrateur peut promouvoir un employé actif au rôle d'administrateur, et rétrograder un administrateur en employé, sous réserve de [RM-22](./06-regles-metier.md#10-règles-métier).

**FEAT-EMP-06 — Réactivation d'un compte refusé.**
Un administrateur peut faire repasser un compte de l'état « refusé » à l'état « actif », sans nouvelle inscription de l'employé ([RM-23](./06-regles-metier.md#10-règles-métier)).

---

## 7.3 Gestion des clients et des vélos

**FEAT-CLI-01 — Enregistrement d'un client.**
Un utilisateur interne actif enregistre un client en renseignant son nom et au moins un moyen de contact (téléphone ou e-mail).

**FEAT-CLI-02 — Enregistrement d'un vélo.**
Un utilisateur interne actif enregistre un vélo en le rattachant à un client propriétaire ([RM-17](./06-regles-metier.md#10-règles-métier)) et en renseignant sa marque, son modèle et un commentaire libre facultatif.

**FEAT-CLI-03 — Modification d'un client ou d'un vélo.**
Un utilisateur interne actif peut corriger les informations d'un client ou d'un vélo existant.

---

## 7.4 Gestion des réparations

**FEAT-REP-01 — Création d'une réparation.**
Un utilisateur interne actif peut créer une fiche de réparation en renseignant un client, un vélo appartenant à ce client ([RM-17](./06-regles-metier.md#10-règles-métier)), la description du problème et un réparateur responsable. La réparation est créée au statut « Vélo déposé » par défaut ([RM-15](./05-statuts-et-permissions.md#8-workflow-des-statuts)) et se voit attribuer un jeton public unique ([RM-10](./06-regles-metier.md#10-règles-métier)).
*Vérifié par : [AC-03](./07-criteres-acceptation.md#11-critères-dacceptation). Origine : 01-brief § 7.*

**FEAT-REP-02 — Modification d'une réparation.**
Un utilisateur interne actif peut modifier la description du problème, le client et le vélo associés à une réparation, tant que celle-ci n'est pas au statut « Restitué » ([RM-14](./05-statuts-et-permissions.md#8-workflow-des-statuts)).

**FEAT-REP-03 — Consultation d'une réparation.**
Un utilisateur interne actif consulte la fiche complète d'une réparation, y compris ses notes internes.

**FEAT-REP-04 — Consultation de la liste des réparations.**
Un utilisateur interne actif consulte la liste de toutes les réparations de l'atelier, sans cloisonnement par réparateur.

**FEAT-REP-05 — Affectation d'un réparateur.**
Un utilisateur interne actif peut désigner ou changer le réparateur responsable d'une réparation. Une réparation possède un seul réparateur responsable à un instant donné ([RM-07](./06-regles-metier.md#10-règles-métier)).

**FEAT-REP-06 — Modification du statut d'une réparation.**
Un utilisateur interne actif peut changer le statut courant d'une réparation, dans les limites définies par [RM-13 et RM-14](./05-statuts-et-permissions.md#8-workflow-des-statuts).
*Vérifié par : [AC-04](./07-criteres-acceptation.md#11-critères-dacceptation).*

**FEAT-REP-07 — Ajout d'une note interne.**
Un utilisateur interne actif peut ajouter une note à une réparation. La note enregistre son auteur et sa date de création, et n'est plus modifiable ensuite. Les notes ne sont jamais visibles du client ([RM-09](./06-regles-metier.md#10-règles-métier)).

**FEAT-REP-08 — Recherche par client.**
Un utilisateur interne actif peut retrouver les réparations d'un client à partir de son nom.

**FEAT-REP-09 — Recherche par vélo.**
Un utilisateur interne actif peut retrouver les réparations d'un vélo à partir de sa marque ou de son modèle.

**FEAT-REP-10 — Filtre par statut.**
Un utilisateur interne actif peut restreindre la liste des réparations à un ou plusieurs statuts.

**FEAT-REP-11 — Filtre par réparateur.**
Un utilisateur interne actif peut restreindre la liste des réparations à un réparateur responsable donné.

**FEAT-REP-12 — Réutilisation d'un client ou d'un vélo existant.**
Lors de la création d'une réparation, l'employé recherche d'abord le client parmi les clients existants ; il n'en crée un nouveau que si la recherche est infructueuse. Le même principe s'applique aux vélos, dont la liste proposée est restreinte au client sélectionné.
*Cette exigence prévient les doublons, qui dégradent les données de façon irréversible (brief, risque R7).*

**FEAT-REP-13 — Tri de la liste.**
La liste des réparations est triée par date de dernière modification décroissante par défaut. L'utilisateur peut inverser le tri.

**FEAT-REP-14 — Pagination de la liste.**
Au-delà de 50 réparations affichées, la liste est paginée ([NFR-01](./08-rgpd-et-non-fonctionnel.md#15-exigences-non-fonctionnelles)).

**FEAT-REP-15 — Message public destiné au client.**
Un utilisateur interne actif peut rédiger ou modifier un message court destiné au client sur une réparation. Ce message est affiché sur la page publique de suivi ([RM-25](./06-regles-metier.md#10-règles-métier)).

---

## 7.5 Suivi client

**FEAT-SUI-01 — Lien public de suivi.**
Chaque réparation possède une URL publique unique, construite à partir d'un jeton aléatoire distinct de son identifiant interne. Le lien donne un accès en lecture seule à cette seule réparation ([RM-10](./06-regles-metier.md#10-règles-métier)).
*Vérifié par : [AC-05, AC-07](./07-criteres-acceptation.md#11-critères-dacceptation).*

**FEAT-SUI-02 — Contenu de la page publique.**
La page publique affiche exclusivement : le vélo concerné (marque et modèle), le statut actuel et son explication en langage courant, le message public destiné au client s'il existe, et la date de dernière mise à jour. Le client ne peut effectuer aucune modification.
*Vérifié par : [AC-05](./07-criteres-acceptation.md#11-critères-dacceptation).*

**FEAT-SUI-03 — Lien invalide.**
Un jeton inexistant ou malformé affiche un message neutre indiquant que le suivi est introuvable, sans révéler si le jeton a existé.
*Vérifié par : [AC-07](./07-criteres-acceptation.md#11-critères-dacceptation).*

**FEAT-SUI-04 — Remise du lien de suivi au client.**
Depuis la fiche de réparation, un utilisateur interne peut copier le lien public de suivi en un clic, puis le coller dans un **SMS ou un e-mail** qu'il adresse au client depuis le téléphone ou la messagerie de l'atelier, selon la coordonnée disponible. C'est le seul canal de transmission au client. L'envoi automatisé depuis l'application est hors périmètre ([§ 13](./09-perimetre-et-limites.md#13-hors-périmètre)).
*L'envoi écrit n'est pas un confort : un jeton de suivi n'est ni dictable au téléphone ni recopiable à la main, ce qui rend l'envoi par SMS ou e-mail la seule modalité praticable au comptoir.*

**FEAT-SUI-05 — Identité de l'atelier sur la page publique.**
L'application est déployée pour un atelier unique. Le nom de l'atelier, son logo et ses coordonnées sont fixés à la configuration de l'application (variables d'environnement ou constantes), sans entité Atelier en base de données. La page publique de suivi affiche ces éléments afin que le client identifie immédiatement l'atelier concerné. Le nom du produit (**D-g**, provisoire) n'y est pas mis en avant : le client doit identifier son atelier, pas l'outil. Le multi-atelier est hors périmètre ([§ 13](./09-perimetre-et-limites.md#13-hors-périmètre)).

**FEAT-SUI-06 — Exclusion de l'indexation.**
La page publique de suivi est exclue de l'indexation par les moteurs de recherche ([RM-26](./06-regles-metier.md#10-règles-métier)).

**FEAT-SUI-07 — Ticket d'atelier avec QR code.**
Depuis la fiche de réparation, un utilisateur interne peut imprimer un **ticket d'atelier** de petit format, portant un **QR code** qui ouvre la **fiche interne** de cette réparation. Le ticket s'accroche au vélo : le réparateur le scanne en atelier et arrive directement sur la bonne fiche pour en changer le statut, sans avoir à la rechercher. Ce ticket est un support interne : il n'est pas remis au client. Le QR code pointant vers une route de l'espace interne, un scan par une personne non authentifiée aboutit à l'écran de connexion et ne divulgue aucune donnée ([RM-01](./06-regles-metier.md#10-règles-métier)).

---

## 7.6 Données personnelles

**FEAT-RGPD-01 — Anonymisation d'un client.**
Un administrateur peut anonymiser une fiche client : le nom, le téléphone et l'e-mail sont remplacés par des valeurs neutres. Les réparations rattachées sont conservées avec leurs données techniques ([RM-21](./08-rgpd-et-non-fonctionnel.md#14-données-personnelles-et-conservation)).

**FEAT-RGPD-02 — Mention d'information.**
Une mention d'information (finalité, responsable de traitement, droits, contact) est accessible depuis la page publique de suivi ([RM-19](./08-rgpd-et-non-fonctionnel.md#14-données-personnelles-et-conservation)).
