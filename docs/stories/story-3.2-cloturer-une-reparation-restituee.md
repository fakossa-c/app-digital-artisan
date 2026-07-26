> Story extraite de `docs/07-epics-stories.md`. À exécuter dans l'ordre. Prérequis : voir « Dépend de ».

### Story 3.2 — Clôturer une réparation restituée
- **Epic :** Epic 3 — Workflow des statuts
- **Dépend de :** Story 3.1
- **Objectif :** Marquer une réparation comme restituée et verrouiller alors la fiche, pour figer
  l'historique de l'intervention.
- **Contexte :** « Restitué » est un statut **terminal** : il verrouille la fiche définitivement (voir
  `05-architecture-shard/05-statuts-et-regles-metier.md` § Transitions autorisées). C'est l'une des
  actions sensibles listées par `04-ux-design-shard/` § 8, donc l'une des seules à demander
  confirmation.
- **Tâches :**
  1. Ajouter la modale de confirmation au passage vers « Restitué ».
  2. Remplacer le bouton de changement de statut par le message de clôture sur une fiche restituée.
  3. Masquer les actions de modification et de réassignation.
  4. Garantir le verrouillage côté serveur et en base.
  5. Exclure les réparations restituées de l'onglet « En cours ».
- **Critères d'acceptance :**
  - [ ] Sélectionner « Restitué » affiche « Marquer cette réparation comme restituée ? Le statut ne
        pourra plus être modifié ensuite. » avec « Annuler » et « Marquer comme restituée ».
  - [ ] Une fiche restituée remplace le bouton de statut par « Cette réparation est clôturée. Le statut
        ne peut plus être modifié. » et ne propose ni modification ni réassignation.
  - [ ] Une requête tentant de changer le statut d'une réparation restituée est refusée par le serveur
        **et** par la base.
  - [ ] La fiche reste accessible en lecture avec ses notes internes, n'est pas supprimée, et son lien
        de suivi reste accessible au client.
  - [ ] Les réparations restituées ne figurent pas dans l'onglet « En cours » mais restent accessibles
        depuis « Toutes » et par le filtre de statut.
  - [ ] L'action « Annuler la réparation » n'est pas proposée sur une réparation restituée.
- **Terminé quand :** Une réparation restituée est définitivement figée, en interface comme en base, et
  reste consultable.
