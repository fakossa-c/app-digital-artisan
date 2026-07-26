> Story extraite de `docs/07-epics-stories.md`. À exécuter dans l'ordre. Prérequis : voir « Dépend de ».

### Story 7.1 — Anonymiser un client
- **Epic :** Epic 7 — Conformité, finition et mise en service
- **Dépend de :** Story 2.9, Story 4.1
- **Objectif :** Permettre à l'administrateur d'effacer les données identifiantes d'un client à sa
  demande, sans supprimer l'historique des réparations.
- **Contexte :** L'anonymisation est la **seule** voie qui réconcilie le droit à l'effacement avec la
  règle « aucune réparation n'est supprimée » (brief § 10). La fonction `anonymize_client()` est décrite
  dans `05-architecture-shard/11-rgpd.md`. Le téléphone reçoit une valeur neutre plutôt que `NULL`,
  pour ne pas violer la contrainte « au moins un moyen de contact ». L'opération est **irréversible**.
- **Tâches :**
  1. Écrire la fonction d'anonymisation en base.
  2. Ajouter l'action « Anonymiser ce client » sur la fiche client, réservée au rôle `admin`.
  3. Ajouter sa modale de confirmation en variante danger, rappelant l'irréversibilité.
  4. Neutraliser les liens de suivi des réparations du client.
  5. Afficher un bandeau d'anonymisation avec sa date sur la fiche.
- **Critères d'acceptance :**
  - [ ] Cliquer sur « Anonymiser ce client » affiche une modale de variante danger rappelant que le nom
        sera remplacé par « Client anonymisé », que le téléphone et l'e-mail seront effacés, qu'aucune
        réparation ne sera supprimée, et que l'action est irréversible.
  - [ ] Confirmer remplace le nom par « Client anonymisé » suivi d'un suffixe, vide l'adresse e-mail et
        remplace le téléphone par une valeur sentinelle non identifiante, partout où ces champs
        apparaissent ; affiche « Client anonymisé. » ; fait apparaître un bandeau daté sur la fiche.
  - [ ] Les réparations du client restent consultables avec leurs données techniques, leurs statuts et
        leurs notes internes, aucune n'ayant été supprimée.
  - [ ] Ouvrir un ancien lien de suivi d'un client anonymisé affiche le message neutre de suivi
        indisponible, sans transmettre aucune donnée le concernant.
  - [ ] Un employé actif ne se voit pas proposer l'action, et son appel direct est refusé côté serveur.
  - [ ] Aucune action de l'application ne permet de restaurer les coordonnées d'origine.
- **Terminé quand :** Une demande d'effacement est honorée sans qu'aucune fiche de réparation ne
  disparaisse.
