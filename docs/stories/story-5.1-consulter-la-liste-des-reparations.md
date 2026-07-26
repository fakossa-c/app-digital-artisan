> Story extraite de `docs/07-epics-stories.md`. À exécuter dans l'ordre. Prérequis : voir « Dépend de ».

### Story 5.1 — Consulter la liste des réparations
- **Epic :** Epic 5 — Consultation et recherche
- **Dépend de :** Story 3.1, Story 1.6
- **Objectif :** Afficher toutes les réparations de l'atelier sur un écran, pour savoir en un coup d'œil
  où en est l'activité.
- **Contexte :** Liste décrite dans `04-ux-design-shard/` § 6.2, deux mises en page au § 10. Un
  **composant unique** produit les deux rendus — cartes empilées sous 768 px, tableau au-delà — avec le
  même ordre d'importance des informations. Pas de défilement infini : une pagination à 25 résultats,
  utilisable au clavier.
- **Tâches :**
  1. Créer la page de liste des réparations.
  2. Écrire la requête serveur avec ses jointures, sans casser l'usage des index.
  3. Afficher statut, client, vélo, réparateur et date de dernière modification, plus les compteurs.
  4. Ordonner par date de dernière modification décroissante.
  5. Décliner le rendu en cartes et en tableau depuis un composant unique.
  6. Paginer à 25 résultats avec contrôles accessibles au clavier.
  7. Rendre toute la ligne ou la carte cliquable, sur au moins 44 pixels de haut.
- **Critères d'acceptance :**
  - [ ] Chaque ligne affiche le statut, le client, le vélo, le réparateur et la date de dernière
        modification, et un compteur indique le nombre total et le nombre en cours.
  - [ ] L'onglet « Toutes » montre les réparations de tous les réparateurs, sans cloisonnement.
  - [ ] L'ordre par défaut est la date de dernière modification décroissante.
  - [ ] Sous 768 px la liste s'affiche en cartes, au-delà en tableau, l'ordre d'importance étant
        identique, et toute la ligne ou la carte est cliquable sur au moins 44 pixels de haut.
  - [ ] Au-delà de 25 réparations, « Précédent », « Suivant » et la page courante sont proposés, sans
        défilement infini, et la pagination est utilisable au clavier.
  - [ ] Sans aucune réparation, « Aucune réparation enregistrée pour l'instant. » s'affiche avec
        l'action « Créer une réparation ».
  - [ ] L'action « Nouvelle réparation » est visible en tête de page, hors du menu compact, y compris
        sur mobile.
  - [ ] Recharger la liste après la modification d'un collègue affiche la valeur à jour, sans donnée
        obsolète servie depuis un cache.
  - [ ] Un profil non actif ne reçoit aucune réparation.
- **Terminé quand :** Un employé voit l'activité de l'atelier sur un écran, dans les deux mises en page,
  avec des données toujours fraîches.
