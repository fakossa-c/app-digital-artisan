> Story extraite de `docs/07-epics-stories.md`. À exécuter dans l'ordre. Prérequis : voir « Dépend de ».

### Story 6.5 — Réactiver un compte refusé
- **Epic :** Epic 6 — Inscription et gestion des employés
- **Dépend de :** Story 6.4
- **Objectif :** Permettre de rendre son accès à un compte refusé, pour corriger un refus prononcé par
  erreur.
- **Contexte :** Sans cette story, un employé refusé par erreur n'a **aucun moyen** de récupérer son
  accès : il ne peut pas se réinscrire, son adresse existant déjà. Comme l'acceptation, la réactivation
  est réversible et ne demande donc pas de confirmation.
- **Tâches :**
  1. Ajouter l'action « Réactiver le compte » sur les demandes refusées.
  2. Écrire la Server Action passant l'état à `active`, réservée au rôle `admin`.
  3. Déplacer la ligne vers les employés actifs.
- **Critères d'acceptance :**
  - [ ] Réactiver un compte refusé passe son état à `active`, l'ajoute aux employés actifs, et affiche
        « {nom} a de nouveau accès à l'application. ».
  - [ ] Le titulaire se connecte avec ses identifiants d'origine, sans nouvelle inscription.
  - [ ] Aucune modale de confirmation n'apparaît, l'action étant réversible.
  - [ ] Un employé appelant l'action de réactivation en contournant l'interface se la voit refuser par
        le serveur.
- **Terminé quand :** Un refus prononcé par erreur se corrige sans que l'employé ait à se réinscrire.
