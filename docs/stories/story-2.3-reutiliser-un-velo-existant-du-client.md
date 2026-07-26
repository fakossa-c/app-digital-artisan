> Story extraite de `docs/07-epics-stories.md`. À exécuter dans l'ordre. Prérequis : voir « Dépend de ».

### Story 2.3 — Réutiliser un vélo existant du client
- **Epic :** Epic 2 — Réparations, clients et vélos
- **Dépend de :** Story 2.2
- **Objectif :** Permettre de sélectionner un vélo déjà enregistré pour le client choisi, afin de
  conserver l'historique des interventions sur ce vélo.
- **Contexte :** Un vélo appartient à **un seul client** : un vélo revendu doit être recréé sous son
  nouveau propriétaire (brief § 7). La liste des vélos est donc toujours restreinte au client
  sélectionné, ce que garantit la contrainte de la story 0.8.
- **Tâches :**
  1. Charger la liste des vélos du client sélectionné à l'étape vélo.
  2. Recharger cette liste lorsque le client change, en abandonnant la sélection précédente.
  3. Proposer « + Nouveau vélo » ouvrant les champs marque, modèle et commentaire.
  4. Rattacher le vélo créé au client sélectionné.
- **Critères d'acceptance :**
  - [ ] Un client possédant deux vélos ne voit proposer que ces deux vélos, aucun vélo d'un autre client
        n'apparaissant.
  - [ ] Sélectionner un vélo existant et créer la réparation la rattache à ce vélo sans en enregistrer
        de nouveau.
  - [ ] « + Nouveau vélo » ouvre les champs marque, modèle et commentaire, et le vélo créé est rattaché
        au client sélectionné.
  - [ ] Changer de client recharge la liste des vélos et abandonne le vélo précédemment sélectionné.
  - [ ] Les réparations précédentes d'un vélo restent consultables depuis la fiche du client.
- **Terminé quand :** Un vélo déjà connu est réutilisé sans ressaisie et son historique reste accessible.
