# Critères d'acceptation

> **Document :** PRD — Exigences produit (02) — projet digital-artisan (D-G), application D-g
> **Partie :** 7 / 9 · [Retour à l'index](./index.md)
> **Contenu :** Les treize critères d'acceptation `AC-01` à `AC-13`, rédigés au format Étant donné / Quand / Alors, avec l'exigence que chacun couvre (section 11).

---

# 11. Critères d'acceptation

Le produit est considéré comme fonctionnel lorsque l'ensemble des critères ci-dessous est vérifié.

**AC-01 — Validation d'un employé** *(couvre FEAT-EMP-02)*
**Étant donné** un administrateur connecté et une inscription au statut « en attente »
**Quand** il clique sur « Accepter l'employé »
**Alors** l'état du compte passe à « actif », la demande disparaît de la liste des demandes en attente, l'employé apparaît dans la liste des employés actifs, et un message de confirmation s'affiche.

**AC-02 — Blocage d'un compte non validé** *(couvre RM-01)*
**Étant donné** un employé dont le compte est « en attente » ou « refusé »
**Quand** il se connecte avec des identifiants corrects
**Alors** il n'accède à aucune page de l'espace interne, ne peut lire aucune donnée de réparation ou de client par quelque moyen que ce soit, et voit un message indiquant que son compte est en attente de validation.

**AC-03 — Création d'une réparation** *(couvre FEAT-REP-01, RM-03, RM-17)*
**Étant donné** un employé actif, un client existant et un vélo appartenant à ce client
**Quand** il soumet le formulaire de création avec la description du problème et un réparateur responsable
**Alors** la réparation est créée au statut « Vélo déposé », un jeton public unique lui est attribué, et l'utilisateur est redirigé vers la fiche créée où le lien de suivi est copiable et le ticket d'atelier imprimable.

**AC-04 — Cycle de vie complet** *(couvre FEAT-REP-06, RM-13, RM-14)*
**Étant donné** une réparation au statut « Vélo déposé »
**Quand** un employé la fait passer successivement par « Diagnostic », « Réparation en cours », « Prêt à récupérer » puis « Restitué »
**Alors** chaque transition est enregistrée, la date et l'auteur de dernière modification sont actualisés à chaque changement, et la fiche reste consultable au statut « Restitué » sans possibilité de nouveau changement de statut.

**AC-05 — Étanchéité du suivi public** *(couvre RM-09, RM-10, FEAT-SUI-02)*
**Étant donné** un lien public de suivi valide
**Quand** un visiteur non authentifié l'ouvre
**Alors** la page affiche uniquement le vélo, le statut, son explication, le message public éventuel et la date de dernière mise à jour ; aucune note interne, aucune coordonnée d'un autre client, aucun nom d'employé et aucune autre réparation ne sont accessibles, y compris dans le code source de la page.
*Critère prioritaire : c'est le seul qui teste la principale surface de risque du produit.*

**AC-06 — Fraîcheur des données** *(couvre RM-16)*
**Étant donné** deux employés A et B connectés, consultant la même réparation
**Quand** A modifie le statut, **puis** que B rafraîchit ou rouvre la fiche
**Alors** B voit le nouveau statut et la nouvelle date de dernière modification.

**AC-07 — Lien public invalide** *(couvre FEAT-SUI-03)*
**Étant donné** un jeton public inexistant ou malformé
**Quand** un visiteur ouvre l'URL correspondante
**Alors** un message neutre indique que le suivi est introuvable, sans révéler si le jeton a existé ni aucune autre information.

**AC-08 — Recherche et filtres** *(couvre FEAT-REP-08 à FEAT-REP-11)*
**Étant donné** une base contenant au moins vingt réparations réparties sur plusieurs clients, vélos, statuts et réparateurs
**Quand** un employé saisit le nom d'un client dans la recherche, puis applique un filtre de statut
**Alors** la liste affiche uniquement les réparations correspondant simultanément aux deux critères, et un indicateur permet de lever les filtres en un geste.

**AC-09 — Réutilisation d'un client existant** *(couvre FEAT-REP-12, RM-17)*
**Étant donné** un client déjà enregistré possédant un vélo
**Quand** un employé crée une nouvelle réparation et saisit le début du nom de ce client
**Alors** le client existant lui est proposé, sa sélection restreint la liste des vélos proposés à ceux de ce client, et aucun doublon n'est créé.

**AC-10 — Réinitialisation du mot de passe** *(couvre FEAT-AUT-04)*
**Étant donné** un utilisateur actif ayant oublié son mot de passe
**Quand** il demande une réinitialisation depuis l'écran de connexion et suit le lien reçu par e-mail
**Alors** il définit un nouveau mot de passe, peut se connecter avec, et l'ancien mot de passe ne fonctionne plus.

**AC-11 — Protection du dernier administrateur** *(couvre RM-22)*
**Étant donné** une application ne comptant qu'un seul administrateur actif
**Quand** celui-ci tente de se rétrograder en employé
**Alors** l'opération est refusée et un message explique qu'au moins un administrateur actif doit subsister.

**AC-12 — Annulation d'une réparation** *(couvre RM-24, RM-12)*
**Étant donné** une réparation ouverte par erreur
**Quand** un employé la passe au statut « Annulé »
**Alors** la fiche disparaît de la liste de travail par défaut, reste accessible via le filtre de statut, n'est pas supprimée, et ne peut plus changer de statut.

**AC-13 — Anonymisation d'un client** *(couvre FEAT-RGPD-01, RM-21)*
**Étant donné** un client ayant demandé l'effacement de ses données et disposant de réparations passées
**Quand** un administrateur déclenche l'anonymisation de sa fiche
**Alors** son nom, son téléphone et son e-mail sont remplacés par des valeurs neutres partout où ils apparaissent, ses réparations et leurs données techniques restent consultables, et aucune fiche n'est supprimée.
