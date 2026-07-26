> Story extraite de `docs/07-epics-stories.md`. À exécuter dans l'ordre. Prérequis : voir « Dépend de ».

### Story 2.8 — Consulter la liste des clients
- **Epic :** Epic 2 — Réparations, clients et vélos
- **Dépend de :** Story 2.1, Story 1.6
- **Objectif :** Permettre de parcourir et rechercher les clients de l'atelier, pour retrouver
  quelqu'un et corriger une coordonnée.
- **Contexte :** Écran décrit dans `04-ux-design-shard/` § 6.3, listes vides au § 10. Aucune création de
  client depuis cette liste : **un client naît uniquement du formulaire de réparation**, ce qui
  garantit le pattern chercher-ou-créer et évite les fiches orphelines.
- **Tâches :**
  1. Créer la page « Clients » atteinte depuis la navigation.
  2. Afficher nom, téléphone, e-mail, nombre de vélos, nombre de réparations et date de dernière
     réparation.
  3. Ordonner par date de dernière réparation décroissante.
  4. Ajouter la recherche côté serveur.
  5. Décliner la liste en cartes sous 768 px et en tableau au-delà.
  6. Paginer à 25 résultats et refléter la vue dans l'adresse.
- **Critères d'acceptance :**
  - [ ] Chaque client affiche son nom, son téléphone, son e-mail, son nombre de vélos, son nombre de
        réparations et la date de sa dernière réparation.
  - [ ] L'ordre par défaut est la date de dernière réparation décroissante.
  - [ ] Aucune action de création de client ne figure sur cette liste.
  - [ ] La recherche filtre les clients côté serveur.
  - [ ] Sans aucun client, « Aucun client enregistré pour l'instant. » s'affiche avec l'action « Créer
        une réparation ».
  - [ ] Sous 768 px la liste s'affiche en cartes empilées, au-delà en tableau, l'ordre d'importance des
        informations étant identique.
  - [ ] Naviguer en deuxième page avec une recherche active reflète la vue dans l'adresse et la restaure
        à l'identique après rechargement.
- **Terminé quand :** Un employé retrouve un client par la recherche et la vue survit à un rechargement.
