> Story extraite de `docs/07-epics-stories.md`. À exécuter dans l'ordre. Prérequis : voir « Dépend de ».

### Story 6.3 — Accepter une demande d'inscription
- **Epic :** Epic 6 — Inscription et gestion des employés
- **Dépend de :** Story 6.2
- **Objectif :** Permettre à l'administrateur de valider une inscription et d'ouvrir l'accès à
  l'employé.
- **Contexte :** L'acceptation est **réversible** : elle ne demande donc aucune confirmation,
  contrairement au refus (voir `04-ux-design-shard/` § 8 actions sensibles). Le changement d'état doit
  être pris en compte au simple rechargement de la page de l'employé, sans reconnexion.
- **Tâches :**
  1. Ajouter l'action « Accepter l'employé » dans la ligne.
  2. Écrire la Server Action passant l'état à `active`, réservée au rôle `admin`.
  3. Déplacer la ligne vers le groupe des employés actifs.
  4. Vérifier la prise en compte au rechargement côté employé.
- **Critères d'acceptance :**
  - [ ] Accepter une demande passe l'état à `active`, la fait disparaître des demandes en attente,
        l'ajoute aux employés actifs, et affiche « {nom} a maintenant accès à l'application. ».
  - [ ] Aucune modale de confirmation n'apparaît, l'action étant réversible.
  - [ ] Un employé accepté ayant une session ouverte sur l'écran d'attente accède à la liste des
        réparations au simple rechargement, sans se reconnecter.
  - [ ] Un employé appelant l'action d'acceptation en contournant l'interface se la voit refuser par le
        serveur, la base refusant également la modification de l'état d'un autre profil.
- **Terminé quand :** Un employé accepté accède à l'application sans avoir à se reconnecter.
