> Story extraite de `docs/07-epics-stories.md`. À exécuter dans l'ordre. Prérequis : voir « Dépend de ».

### Story 1.3 — Se déconnecter
- **Epic :** Epic 1 — Accès à l'application
- **Dépend de :** Story 1.1
- **Objectif :** Permettre de fermer sa session depuis n'importe quelle page, pour protéger l'accès
  depuis un poste partagé de l'atelier.
- **Contexte :** Action présente dans le menu Compte de la barre supérieure (voir
  `04-ux-design-shard/` § 5 navigation). La confirmation de sortie sur formulaire non enregistré relève
  des actions sensibles du § 8.
- **Tâches :**
  1. Ajouter « Se déconnecter » au menu Compte, présent sur toutes les pages internes.
  2. Fermer la session Supabase et rediriger vers l'écran de connexion.
  3. Invalider l'accès aux pages internes après déconnexion, y compris par retour arrière du
     navigateur.
  4. Demander confirmation lorsqu'un formulaire non enregistré est en cours de saisie.
- **Critères d'acceptance :**
  - [ ] Se déconnecter depuis n'importe quelle page interne ferme la session et redirige vers l'écran
        de connexion.
  - [ ] Après déconnexion, le retour arrière ou la saisie d'une adresse interne redirige vers la
        connexion, sans afficher aucune donnée de la session précédente.
  - [ ] Se déconnecter avec un formulaire non enregistré affiche « Des modifications ne sont pas
        enregistrées. Quitter quand même ? ».
- **Terminé quand :** La session est réellement close, y compris face au retour arrière du navigateur.
