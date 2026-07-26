> Story extraite de `docs/07-epics-stories.md`. À exécuter dans l'ordre. Prérequis : voir « Dépend de ».

### Story 6.2 — Consulter les comptes de l'atelier
- **Epic :** Epic 6 — Inscription et gestion des employés
- **Dépend de :** Story 6.1, Story 1.2
- **Objectif :** Donner à l'administrateur la vue des demandes en attente, des employés actifs et des
  demandes refusées.
- **Contexte :** Écran décrit dans `04-ux-design-shard/` § 6.4. Les trois groupes sont présentés **dans
  cet ordre** : les demandes en attente sont ce qui appelle une action. Les actions figurent
  directement dans la ligne, sans ouvrir de fiche.
- **Tâches :**
  1. Créer la page « Employés », réservée au rôle `admin`.
  2. Présenter les trois groupes dans l'ordre : en attente, actifs, refusés.
  3. Afficher nom, adresse et date de demande pour les demandes ; nom, adresse et rôle pour les actifs.
  4. Placer les actions directement dans la ligne.
  5. Masquer l'entrée de navigation pour les employés.
- **Critères d'acceptance :**
  - [ ] L'écran présente, dans cet ordre, les demandes en attente, les employés actifs et les demandes
        refusées.
  - [ ] Chaque demande affiche le nom, l'adresse e-mail et la date de demande ; chaque employé actif son
        nom, son adresse et son rôle.
  - [ ] « Accepter » et « Refuser » sont visibles directement dans la ligne, sans ouvrir de fiche.
  - [ ] Sans demande en attente, « Aucune demande d'inscription en attente. » s'affiche.
  - [ ] L'entrée « Employés » ne figure pas dans la navigation d'un employé, et l'accès direct à son
        adresse affiche « Vous n'avez pas accès à cette page. ».
- **Terminé quand :** L'administrateur voit d'un coup d'œil qui attend, qui accède et qui a été refusé.
