> Story extraite de `docs/07-epics-stories.md`. À exécuter dans l'ordre. Prérequis : voir « Dépend de ».

### Story 2.5 — Modifier une réparation
- **Epic :** Epic 2 — Réparations, clients et vélos
- **Dépend de :** Story 2.4
- **Objectif :** Permettre de corriger les informations d'une réparation après un diagnostic ou une
  erreur de saisie.
- **Contexte :** Écran de modification dans `04-ux-design-shard/` § 6.2. Le client et le vélo n'y sont
  **pas modifiables** : leur correction passe par la fiche client (story 2.9). Le statut non plus : il
  se change depuis le bloc dédié du détail (story 3.1). Une réparation `returned` ou `cancelled` est
  verrouillée.
- **Tâches :**
  1. Créer l'écran de modification d'une réparation.
  2. Afficher le client, le vélo et le statut en lecture seule, avec un renvoi vers la fiche client.
  3. Enregistrer les modifications via une Server Action validée.
  4. Masquer l'action de modification sur une réparation close et la refuser côté serveur.
  5. Conserver la saisie et proposer « Réessayer » en cas d'échec réseau.
- **Critères d'acceptance :**
  - [ ] Modifier le problème signalé et enregistrer affiche « Modifications enregistrées. » et actualise
        la date de dernière modification et son auteur.
  - [ ] Le client et le vélo sont affichés mais non modifiables ; leur correction renvoie vers la fiche
        client.
  - [ ] Le statut est affiché en lecture seule, sa modification n'étant possible que depuis le bloc de
        statut du détail.
  - [ ] Une réparation « Restitué » ou « Annulé » ne propose pas l'action de modification, et une
        requête de modification est refusée par le serveur.
  - [ ] Un échec réseau affiche « Connexion perdue. Vos informations sont conservées, réessayez. »,
        conserve toute la saisie et propose « Réessayer ».
- **Terminé quand :** Une fiche se corrige sans risque de perte de saisie, et une fiche close ne se
  modifie plus.
