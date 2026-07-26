> Story extraite de `docs/07-epics-stories.md`. À exécuter dans l'ordre. Prérequis : voir « Dépend de ».

### Story 1.1 — Se connecter
- **Epic :** Epic 1 — Accès à l'application
- **Dépend de :** Story 0.9, Story 0.11
- **Objectif :** Permettre à un utilisateur interne de s'authentifier avec son adresse e-mail et son
  mot de passe pour accéder à l'espace de travail de l'atelier.
- **Contexte :** Écran de connexion décrit dans `04-ux-design-shard/` § 6.1 ; les messages d'erreur
  sont repris **littéralement** du § 12. Le flux figure dans
  `05-architecture-shard/07-flux-principaux.md` § Connexion d'un employé. Les comptes de test
  proviennent du seed de la story 0.11. Le message d'échec est volontairement ambigu : il ne doit
  jamais révéler si une adresse existe.
- **Tâches :**
  1. Créer l'écran de connexion avec les champs adresse e-mail et mot de passe.
  2. Brancher la soumission sur Supabase Auth via le client approprié.
  3. Rediriger l'utilisateur authentifié vers la liste des réparations.
  4. Gérer les états : chargement, erreur d'identifiants, champ obligatoire manquant.
  5. Empêcher la double soumission en passant le bouton en état occupé dès le premier clic.
  6. Ajouter les liens « Mot de passe oublié » et vers l'inscription employé.
- **Critères d'acceptance :**
  - [ ] Un compte à l'état `active` se connecte et arrive sur la liste des réparations, son nom et son
        rôle apparaissant dans le menu Compte.
  - [ ] Une adresse ou un mot de passe erroné produit « Adresse e-mail ou mot de passe incorrect. »,
        message identique que l'adresse existe ou non.
  - [ ] L'adresse saisie est conservée dans le formulaire après un échec.
  - [ ] Soumettre sans adresse e-mail affiche un message sous le champ concerné et y déplace le focus.
  - [ ] Cliquer deux fois sur « Se connecter » ne déclenche qu'une seule tentative.
  - [ ] Les liens « Mot de passe oublié » et vers l'inscription employé sont proposés.
  - [ ] Fermer puis rouvrir l'onglet du navigateur conserve la session.
- **Terminé quand :** Un compte actif du seed se connecte, atteint l'espace interne, et un identifiant
  erroné produit le message ambigu prévu.
