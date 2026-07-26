> Story extraite de `docs/07-epics-stories.md`. À exécuter dans l'ordre. Prérequis : voir « Dépend de ».

### Story 4.3 — Copier le lien de suivi
- **Epic :** Epic 4 — Suivi public
- **Dépend de :** Story 2.4, Story 4.1
- **Objectif :** Permettre à un employé de copier le lien de suivi en un clic depuis la fiche.
- **Contexte :** Bloc du lien de suivi décrit dans `04-ux-design-shard/` § 6.2. La transmission au
  client est **manuelle** : l'envoi automatisé est hors périmètre (brief § 3.3). Si ce geste n'est pas
  immédiat au comptoir, le suivi client ne sera pas utilisé et le bénéfice principal du produit
  disparaît (risque R7).
- **Tâches :**
  1. Afficher le lien de suivi dans un bloc dédié de la fiche, tronqué si nécessaire.
  2. Ajouter l'action « Copier le lien » plaçant le lien complet dans le presse-papiers.
  3. Afficher la confirmation de copie.
- **Critères d'acceptance :**
  - [ ] Cliquer sur « Copier le lien » place le lien complet dans le presse-papiers et affiche « Lien de
        suivi copié. ».
  - [ ] Le lien est affiché, tronqué si nécessaire, et l'action de copie est atteignable sans défilement
        supplémentaire depuis ce bloc.
  - [ ] Ouvrir le lien copié dans une fenêtre non authentifiée affiche la page publique de cette
        réparation.
  - [ ] Un utilisateur non authentifié ou non actif ne se voit proposer aucune action de copie du lien
        d'une autre réparation.
- **Terminé quand :** Un employé copie le lien en un clic et le lien copié ouvre bien la bonne page
  publique.
