> Story extraite de `docs/07-epics-stories.md`. À exécuter dans l'ordre. Prérequis : voir « Dépend de ».

### Story 6.6 — Promouvoir ou rétrograder un utilisateur
- **Epic :** Epic 6 — Inscription et gestion des employés
- **Dépend de :** Story 6.3
- **Objectif :** Permettre de modifier le rôle d'un utilisateur interne, sans jamais laisser l'atelier
  sans administrateur actif.
- **Contexte :** La protection du dernier administrateur est garantie **à trois niveaux** : interface,
  serveur et base (voir `05-architecture-shard/06-securite-rls.md`). Sans elle, une rétrogradation
  malheureuse rendrait l'application définitivement ingérable — plus personne ne pourrait valider une
  inscription ni promouvoir qui que ce soit.
- **Tâches :**
  1. Ajouter les actions de promotion et de rétrogradation sur les employés actifs.
  2. Écrire la Server Action de changement de rôle, réservée au rôle `admin`.
  3. Refuser toute opération laissant l'application sans administrateur actif, avec son message.
  4. Étendre la protection aux opérations de refus et de désactivation.
  5. Garantir la contrainte en base.
- **Critères d'acceptance :**
  - [ ] Promouvoir un employé actif modifie son rôle, et il accède à la gestion des employés à son
        prochain rechargement.
  - [ ] Rétrograder un administrateur, alors qu'un autre administrateur actif existe, modifie son rôle
        et fait disparaître « Employés » de sa navigation.
  - [ ] Le seul administrateur actif ne peut pas se rétrograder : l'opération est refusée avec un
        message expliquant qu'au moins un administrateur actif doit subsister.
  - [ ] Une opération de refus ou de désactivation visant le dernier administrateur actif est refusée
        avec le même message.
  - [ ] Une requête forgée tentant une rétrogradation laissant l'application sans administrateur actif
        est refusée par le serveur **et** par la base.
  - [ ] Un employé appelant l'action de changement de rôle se la voit refuser côté serveur.
- **Terminé quand :** Les rôles se partagent librement, sans qu'aucun chemin ne puisse laisser l'atelier
  sans administrateur.

---

## Epic 7 — Conformité, finition et mise en service

Traiter ce qui ne peut sincèrement se faire qu'à la fin, une fois tous les écrans existants. Cet epic
ne contient **aucun rattrapage** de responsive, d'états d'interface ou de permissions : ces points
relèvent de la Definition of Done et ont été livrés avec chaque story.
