> Story extraite de `docs/07-epics-stories.md`. À exécuter dans l'ordre. Prérequis : voir « Dépend de ».

### Story 6.4 — Refuser une demande d'inscription
- **Epic :** Epic 6 — Inscription et gestion des employés
- **Dépend de :** Story 6.2
- **Objectif :** Permettre de rejeter une demande tout en conservant la trace de la décision.
- **Contexte :** Le compte refusé n'est **pas supprimé** : il conserve la trace de la décision et permet
  une réactivation ultérieure (story 6.5). Le refus est une action sensible : il demande confirmation
  (`04-ux-design-shard/` § 8).
- **Tâches :**
  1. Ajouter l'action « Refuser la demande » dans la ligne.
  2. Ajouter sa modale de confirmation nominative.
  3. Écrire la Server Action passant l'état à `rejected`, réservée au rôle `admin`.
  4. Déplacer la ligne vers le groupe des demandes refusées.
- **Critères d'acceptance :**
  - [ ] Refuser une demande affiche « Refuser la demande de {nom} ? Cette personne ne pourra pas accéder
        à l'application. » ; après confirmation l'état passe à `rejected` et « Demande refusée. »
        s'affiche.
  - [ ] Le compte apparaît dans le groupe des demandes refusées et n'est pas supprimé.
  - [ ] Le titulaire d'un compte refusé qui se connecte voit « Votre demande d'accès n'a pas été
        acceptée. Contactez l'administrateur de l'atelier. », et aucune donnée métier ne lui est
        transmise, y compris par requête directe.
  - [ ] Un employé appelant l'action de refus en contournant l'interface se la voit refuser par le
        serveur.
- **Terminé quand :** Une demande refusée ferme effectivement l'accès et la décision reste tracée.
