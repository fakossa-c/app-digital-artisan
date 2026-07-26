> Story extraite de `docs/07-epics-stories.md`. À exécuter dans l'ordre. Prérequis : voir « Dépend de ».

### Story 1.4 — Réinitialiser un mot de passe oublié
- **Epic :** Epic 1 — Accès à l'application
- **Dépend de :** Story 1.1
- **Objectif :** Permettre à un utilisateur de redéfinir son mot de passe depuis l'écran de connexion,
  sans solliciter l'administrateur.
- **Contexte :** Mécanisme de réinitialisation Supabase (voir `03-stack-shard/07-auth-et-validation.md`
  § Réinitialisation). Écrans et messages dans `04-ux-design-shard/` § 6.1 et § 12. ⚠️ Le quota SMTP
  mutualisé de Supabase est limité et peut être épuisé en séance : la limite doit être documentée
  auprès de D-G (risque R16). Comme pour la connexion, le message de retour ne doit jamais révéler
  l'existence d'un compte.
- **Tâches :**
  1. Créer l'écran de demande de réinitialisation depuis le lien de la page de connexion.
  2. Déclencher l'envoi du lien à usage unique et à durée limitée via Supabase.
  3. Créer l'écran de définition du nouveau mot de passe atteint par le lien reçu.
  4. Afficher les règles de longueur avant toute saisie.
  5. Gérer le lien expiré ou déjà utilisé.
  6. Documenter auprès de D-G la limite du quota SMTP mutualisé.
- **Critères d'acceptance :**
  - [ ] Demander une réinitialisation affiche « Si un compte existe pour cette adresse, un lien de
        réinitialisation vient d'être envoyé. » et un lien à usage unique est envoyé.
  - [ ] Le message est strictement identique pour une adresse inexistante ; rien ne permet de déduire
        qu'un compte existe.
  - [ ] Définir un nouveau mot de passe depuis le lien le modifie ; l'ancien ne fonctionne plus.
  - [ ] Les règles de longueur sont affichées avant la saisie, et un mot de passe trop court produit
        « Le mot de passe doit contenir au moins 8 caractères. ».
  - [ ] Une confirmation différente du nouveau mot de passe affiche une erreur au niveau du champ
        concerné et n'enregistre rien.
  - [ ] Un lien expiré ou déjà utilisé produit « Ce lien de réinitialisation n'est plus valide.
        Demandez-en un nouveau. » avec un lien vers l'écran de demande.
  - [ ] Un compte `pending` ou `rejected` dont le mot de passe est réinitialisé reste refusé à la
        connexion, avec le message correspondant à son état.
- **Terminé quand :** Un utilisateur retrouve l'accès à son compte par e-mail, et le parcours ne révèle
  jamais l'existence d'une adresse.
