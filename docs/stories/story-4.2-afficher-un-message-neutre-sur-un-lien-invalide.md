> Story extraite de `docs/07-epics-stories.md`. À exécuter dans l'ordre. Prérequis : voir « Dépend de ».

### Story 4.2 — Afficher un message neutre sur un lien invalide
- **Epic :** Epic 4 — Suivi public
- **Dépend de :** Story 4.1
- **Objectif :** Faire comprendre au client qu'un lien ne fonctionne pas, sans jamais révéler pourquoi.
- **Contexte :** Réponse neutre décrite dans `04-ux-design-shard/05-formulaires-et-etats.md` § Accès
  refusé et lien invalide. Un message différencié — « ce lien n'existe pas » contre « ce lien a
  expiré » — transformerait le jeton en outil d'énumération : c'est le cœur de la story.
- **Tâches :**
  1. Créer la page de suivi introuvable.
  2. Servir le même message pour un jeton inexistant, mal formé ou devenu inaccessible.
  3. Conserver le mot-symbole et n'offrir aucun lien vers l'espace interne.
  4. Vérifier qu'aucune différence de code de réponse ne permet de déduire l'existence d'une réparation.
- **Critères d'acceptance :**
  - [ ] Un jeton ne correspondant à aucune réparation affiche « Ce suivi n'est pas disponible. Vérifiez
        le lien reçu de l'atelier ou contactez-le directement. ».
  - [ ] Un jeton vide ou mal formé affiche le même message, sans aucune erreur technique ni trace à
        l'écran.
  - [ ] Le message est strictement identique pour un jeton inexistant, mal formé ou inaccessible, et
        rien ne permet de distinguer ces situations.
  - [ ] La page conserve le mot-symbole, ne propose aucun lien vers l'espace interne, et n'utilise pas
        le message de la page introuvable interne.
  - [ ] Appeler successivement un jeton valide et un jeton inexistant ne révèle aucune différence
        exploitable de code de réponse.
- **Terminé quand :** Les trois causes d'échec produisent une réponse rigoureusement indiscernable.
