> Story extraite de `docs/07-epics-stories.md`. À exécuter dans l'ordre. Prérequis : voir « Dépend de ».

### Story 3.1 — Modifier le statut d'une réparation
- **Epic :** Epic 3 — Workflow des statuts
- **Dépend de :** Story 2.4, Story 1.6
- **Objectif :** Permettre de faire évoluer le statut d'une réparation en deux gestes, pour refléter son
  avancement sans ralentir le travail.
- **Contexte :** Les sept statuts et leurs transitions dans
  `05-architecture-shard/05-statuts-et-regles-metier.md` § 9. Transitions **libres**, retour arrière
  compris, sauf verrouillage après un statut terminal. C'est le geste le plus fréquent de
  l'application : s'il demande plus de deux gestes, les réparateurs cesseront de tenir les statuts à
  jour et tout le bénéfice du produit disparaît (risque R5).
- **Tâches :**
  1. Ajouter l'action « Changer le statut » au bloc de statut de la fiche.
  2. Proposer tous les statuts sauf celui en cours.
  3. Écrire la Server Action validant la valeur contre la liste fermée et vérifiant les permissions.
  4. Actualiser la date de dernière modification et son auteur.
  5. Annoncer le changement dans une région vocalisée.
  6. Revalider les écrans concernés pour que la liste et la page publique reflètent le changement.
- **Critères d'acceptance :**
  - [ ] Passer de « Vélo déposé » à « Diagnostic » change le statut, affiche « Statut mis à jour :
        Diagnostic. », actualise la date de modification et son auteur, et fait du nouveau statut
        l'élément visuel principal de la fiche.
  - [ ] La réparation ne possède qu'un seul statut courant ; l'ancien n'apparaît plus comme état actuel.
  - [ ] Repasser de « Prêt à récupérer » à « Réparation en cours » est accepté ; le menu propose tous
        les statuts sauf celui en cours.
  - [ ] Passer d'un statut non terminal à un autre est immédiat, sans modale de confirmation.
  - [ ] Une valeur absente des sept statuts est refusée par le serveur **et** par la base.
  - [ ] Le changement est annoncé dans une région vocalisée par les lecteurs d'écran.
  - [ ] Un collègue rechargeant la fiche ou la liste voit le nouveau statut et la nouvelle date.
  - [ ] Un client ouvrant son lien voit le nouveau statut, son explication et la date actualisée.
  - [ ] Un utilisateur non authentifié ou non actif se voit refuser l'action côté serveur.
- **Terminé quand :** Un réparateur change un statut en deux gestes et le changement se répercute
  partout, y compris sur le suivi client.
