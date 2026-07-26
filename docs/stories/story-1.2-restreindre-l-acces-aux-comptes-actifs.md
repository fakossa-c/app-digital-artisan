> Story extraite de `docs/07-epics-stories.md`. À exécuter dans l'ordre. Prérequis : voir « Dépend de ».

### Story 1.2 — Restreindre l'accès aux comptes actifs
- **Epic :** Epic 1 — Accès à l'application
- **Dépend de :** Story 0.9, Story 1.1
- **Objectif :** Garantir que seuls les comptes à l'état `active` accèdent à l'espace interne, en
  interface comme au niveau des données.
- **Contexte :** C'est la story pivot de la sécurité applicative. Un compte `pending` ou `rejected`
  obtient une **session Supabase parfaitement valide** : seule l'application et les politiques RLS lui
  refusent l'accès (voir `03-stack-shard/07-auth-et-validation.md`, risque R4). Écrans d'attente et
  d'accès refusé dans `04-ux-design-shard/` § 6.1 et § 6.6, messages au § 12.
- **Tâches :**
  1. Vérifier l'état du profil dans le middleware et dans les Server Components de l'espace interne.
  2. Créer l'écran d'attente de validation, avec « Se déconnecter » pour seule action.
  3. Créer l'écran de refus avec son message distinct.
  4. Protéger les routes de l'espace interne contre l'accès direct par URL, sans affichage transitoire
     du contenu.
  5. Réserver les routes d'administration au rôle `admin`.
  6. Vérifier que le changement d'état par l'administrateur est pris en compte au rechargement, sans
     reconnexion.
- **Critères d'acceptance :**
  - [ ] Un profil `pending` authentifié voit « Votre compte est en attente de validation par
        l'administrateur de l'atelier. », sans qu'aucune donnée métier ne lui soit transmise.
  - [ ] Un profil `rejected` voit « Votre demande d'accès n'a pas été acceptée. Contactez
        l'administrateur de l'atelier. ».
  - [ ] Un profil `active` accède à la liste des réparations.
  - [ ] Saisir directement l'adresse d'une fiche avec un profil `pending` redirige vers l'écran
        d'attente, sans que le contenu apparaisse même brièvement.
  - [ ] Une requête directe à l'API avec la session d'un compte `pending` ou `rejected` retourne zéro
        ligne sur chaque table métier et n'accepte aucune écriture.
  - [ ] Un compte activé en cours de session accède à l'espace interne au simple rechargement.
  - [ ] Un compte passé à `rejected` en cours de session voit son action refusée et est redirigé hors
        de l'espace interne.
  - [ ] Un employé accédant à l'adresse de la gestion des employés voit « Vous n'avez pas accès à cette
        page. » avec l'action « Retour aux réparations », sans qu'aucune donnée de profil ne lui soit
        transmise.
- **Terminé quand :** Les trois états de compte produisent chacun le comportement attendu, en interface
  comme par requête directe à l'API.
