# Règles métier

> **Document :** PRD — Exigences produit (02) — projet digital-artisan (D-G), application D-g
> **Partie :** 6 / 9 · [Retour à l'index](./index.md)
> **Contenu :** Le tableau complet des vingt-sept règles métier `RM-01` à `RM-27`, qui doivent toujours être respectées (section 10).

---

# 10. Règles métier

Les règles suivantes doivent toujours être respectées.

| Réf. | Règle |
|---|---|
| **RM-01** | Un employé doit être à l'état « actif » avant de pouvoir accéder à l'espace interne. Les états « en attente » et « refusé » n'ouvrent aucun accès, y compris aux données. |
| **RM-02** | Un administrateur peut gérer tous les employés, sous réserve de RM-22. |
| **RM-03** | Une réparation appartient à un seul client. |
| **RM-04** | Une réparation concerne un seul vélo. |
| **RM-05** | Un client peut posséder plusieurs réparations. |
| **RM-06** | Un vélo peut faire l'objet de plusieurs réparations au cours de sa vie. |
| **RM-07** | Une réparation possède un seul réparateur responsable à un instant donné. |
| **RM-08** | Une réparation possède un unique statut courant. |
| **RM-09** | Les notes internes ne sont accessibles qu'aux utilisateurs internes actifs. Elles ne sont jamais transmises à la page publique de suivi, y compris dans le code source de la page ou dans les données de rendu. |
| **RM-10** | Le lien public donne uniquement accès à la réparation concernée, en lecture seule. Le jeton est aléatoire et distinct de l'identifiant interne. |
| **RM-11** | Une réparation à un statut terminal (**Restitué**, **Annulé**) reste consultable, y compris depuis son lien public. Seul **Restitué** verrouille la fiche en écriture ([RM-14](#10-règles-métier)) ; **Annulé** reste réversible. |
| **RM-12** | Aucun utilisateur, quel que soit son rôle, ne peut supprimer une réparation. Cette règle est garantie au niveau applicatif et au niveau de la base de données. |
| **RM-13** | Transitions de statut — voir [§ 8](./05-statuts-et-permissions.md#8-workflow-des-statuts). |
| **RM-14** | Verrouillage après restitution — voir [§ 8](./05-statuts-et-permissions.md#8-workflow-des-statuts). |
| **RM-15** | Statut initial — voir [§ 8](./05-statuts-et-permissions.md#8-workflow-des-statuts). |
| **RM-16** | **Fraîcheur des données.** Toute consultation d'une réparation ou de la liste des réparations reflète l'état enregistré en base au moment de l'affichage. Aucune donnée n'est servie depuis un cache susceptible d'être obsolète. La mise à jour temps réel sans action de l'utilisateur est hors périmètre ([§ 13](./09-perimetre-et-limites.md#13-hors-périmètre)). |
| **RM-17** | **Propriété d'un vélo.** Un vélo appartient à un seul client. Le vélo associé à une réparation doit obligatoirement appartenir au client de cette réparation. Un vélo changeant de propriétaire est enregistré à nouveau sous le nouveau client. |
| **RM-18** à **RM-21** | Règles relatives aux données personnelles — voir [§ 14](./08-rgpd-et-non-fonctionnel.md#14-données-personnelles-et-conservation). |
| **RM-22** | **Dernier administrateur.** L'application doit toujours compter au moins un administrateur actif. Toute opération qui aboutirait à zéro administrateur actif (refus, désactivation, rétrogradation) est refusée avec un message explicite. |
| **RM-23** | **Réversibilité du refus.** Un administrateur peut réactiver un compte refusé (passage de « refusé » à « actif ») sans nouvelle inscription de l'employé. |
| **RM-24** | Sémantique du statut Annulé — voir [§ 8](./05-statuts-et-permissions.md#8-workflow-des-statuts). |
| **RM-25** | **Message public.** Le message destiné au client est facultatif, saisi par un utilisateur interne, et affiché tel quel sur la page publique. Il ne doit contenir aucune information interne ; sa relecture relève de la responsabilité de son auteur. |
| **RM-26** | **Non-indexation.** La page publique de suivi est servie avec une directive de non-indexation, afin qu'un lien partagé ne rende pas le nom du client et son vélo accessibles depuis un moteur de recherche. |
| **RM-27** | **Traçabilité de la dernière modification.** Chaque réparation conserve la date et l'auteur de sa dernière modification. L'historique complet des modifications est hors périmètre ([§ 13](./09-perimetre-et-limites.md#13-hors-périmètre)). |
