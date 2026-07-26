> Story extraite de `docs/07-epics-stories.md`. À exécuter dans l'ordre. Prérequis : voir « Dépend de ».

### Story 2.4 — Consulter le détail d'une réparation
- **Epic :** Epic 2 — Réparations, clients et vélos
- **Dépend de :** Story 2.1, Story 1.6
- **Objectif :** Réunir sur un seul écran toutes les informations d'une réparation, pour répondre
  immédiatement à une question sur ce vélo.
- **Contexte :** Écran de détail décrit dans `04-ux-design-shard/` § 6.2, format des dates au § 12. Le
  statut et son action de changement doivent être atteignables **sans défilement**, quelle que soit la
  taille de l'écran : c'est le geste le plus fréquent de l'atelier.
- **Tâches :**
  1. Créer la page de détail d'une réparation.
  2. Afficher le statut, le client et ses coordonnées, le vélo, le problème, le réparateur, la date de
     dépôt et la date de dernière modification avec son auteur.
  3. Placer le bloc de statut de sorte qu'il soit visible sans défilement à toutes les tailles.
  4. Formater la date de dépôt en absolu et la date de modification en relatif avec info-bulle.
  5. Gérer la réparation inexistante.
- **Critères d'acceptance :**
  - [ ] La fiche affiche le statut courant, le client et ses coordonnées, le vélo, le problème signalé,
        le réparateur, la date de dépôt et la date de dernière modification avec son auteur.
  - [ ] Le statut et son action de changement sont visibles sans défilement, quelle que soit la taille
        de l'écran.
  - [ ] La date de dépôt est en format absolu ; la date de modification en relatif, avec la date
        complète en info-bulle.
  - [ ] Ouvrir l'adresse d'une réparation inexistante affiche « Cette page n'existe pas. » avec
        « Retour aux réparations ».
  - [ ] Un utilisateur non authentifié ou non actif ne reçoit aucune information de la fiche.
- **Terminé quand :** Un employé ouvre une fiche et trouve toutes les informations du vélo sans avoir à
  défiler pour atteindre le statut.
