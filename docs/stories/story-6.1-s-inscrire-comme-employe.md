> Story extraite de `docs/07-epics-stories.md`. À exécuter dans l'ordre. Prérequis : voir « Dépend de ».

### Story 6.1 — S'inscrire comme employé
- **Epic :** Epic 6 — Inscription et gestion des employés
- **Dépend de :** Story 1.2, Story 0.10
- **Objectif :** Permettre à un nouvel employé de créer un compte pour demander l'accès à l'application.
- **Contexte :** Écran d'inscription dans `04-ux-design-shard/` § 6.1. La confirmation d'e-mail est
  **désactivée** : la barrière d'entrée est la validation par l'administrateur, pas la vérification
  d'adresse (voir `03-stack-shard/07-auth-et-validation.md`). Le rôle et l'état ne proviennent
  **jamais** du formulaire : le trigger de la story 0.8 les impose à `employee` et `pending`.
- **Tâches :**
  1. Créer l'écran d'inscription avec les champs nom, adresse e-mail et mot de passe.
  2. Créer le compte via Supabase Auth, le profil étant créé par le trigger.
  3. Rediriger vers l'écran d'attente de validation.
  4. Afficher les règles de mot de passe avant toute saisie.
  5. Traiter l'adresse déjà utilisée par un message ne révélant pas l'existence du compte.
  6. Empêcher la double soumission.
- **Critères d'acceptance :**
  - [ ] Une inscription valide crée le compte d'authentification et un profil au rôle `employee` et à
        l'état `pending`, redirige vers l'écran d'attente, et ne donne pas accès à l'espace interne.
  - [ ] Aucun e-mail de confirmation d'adresse ne conditionne l'inscription.
  - [ ] Une adresse déjà utilisée affiche « Si un compte existe pour cette adresse, vous pouvez vous
        connecter ou réinitialiser votre mot de passe. », ne crée aucun profil, et conserve la saisie.
  - [ ] Soumettre sans nom affiche un message au niveau du champ, les autres champs conservant leur
        valeur.
  - [ ] Une adresse mal formée affiche « Cette adresse e-mail n'est pas valide. Exemple :
        martin.dupont@exemple.fr » sans envoyer de requête au serveur.
  - [ ] Les règles de longueur du mot de passe sont affichées avant la saisie, et un mot de passe trop
        court produit « Le mot de passe doit contenir au moins 8 caractères. ».
  - [ ] Cliquer deux fois sur « Créer mon compte » ne crée qu'un seul compte.
  - [ ] Une requête forçant le rôle `admin` ou l'état `active` est ignorée par le serveur ; aucun profil
        n'est créé avec ces valeurs.
- **Terminé quand :** Un nouvel employé s'inscrit, atterrit sur l'écran d'attente, et aucune requête
  forgée ne lui donne d'accès.
