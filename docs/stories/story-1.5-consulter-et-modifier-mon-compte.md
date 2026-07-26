> Story extraite de `docs/07-epics-stories.md`. À exécuter dans l'ordre. Prérequis : voir « Dépend de ».

### Story 1.5 — Consulter et modifier mon compte
- **Epic :** Epic 1 — Accès à l'application
- **Dépend de :** Story 1.1
- **Objectif :** Permettre à un utilisateur de consulter ses informations et de changer son mot de
  passe.
- **Contexte :** Page « Mon compte » décrite dans `04-ux-design-shard/` § 6.4, atteinte depuis le menu
  Compte. Cette page ne porte **aucun réglage d'application** : le produit n'a pas de préférences
  utilisateur.
- **Tâches :**
  1. Créer la page « Mon compte » atteinte depuis le menu Compte.
  2. Y afficher le nom, l'adresse e-mail, le rôle et la date d'inscription.
  3. Ajouter le formulaire de changement de mot de passe, exigeant le mot de passe actuel.
  4. Gérer l'erreur de mot de passe actuel incorrect.
- **Critères d'acceptance :**
  - [ ] La page affiche le nom, l'adresse e-mail, le rôle et la date d'inscription de l'utilisateur.
  - [ ] La seule action proposée est « Modifier mon mot de passe ».
  - [ ] Changer son mot de passe affiche « Mot de passe modifié. » et le nouveau permet de se connecter.
  - [ ] Un mot de passe actuel incorrect affiche une erreur et ne modifie rien.
  - [ ] Aucun réglage d'application ne figure sur la page, et ni le rôle ni l'état du compte ne sont
        modifiables.
- **Terminé quand :** Un utilisateur consulte ses informations et change son mot de passe depuis
  l'application.
