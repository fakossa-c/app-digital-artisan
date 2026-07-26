> Story extraite de `docs/07-epics-stories.md`. À exécuter dans l'ordre. Prérequis : voir « Dépend de ».

### Story 4.1 — Consulter l'avancement de sa réparation
- **Epic :** Epic 4 — Suivi public
- **Dépend de :** Story 0.9, Story 3.1
- **Objectif :** Permettre au client de consulter l'état de son vélo depuis le lien reçu de l'atelier,
  sans compte et sans téléphoner.
- **Contexte :** Page publique décrite dans `04-ux-design-shard/` § 6.5. La sécurité repose sur une
  **projection structurelle** : la fonction `get_public_repair()` ne retourne que les champs autorisés,
  et le rôle `anon` n'a **aucun accès direct** aux tables (voir
  `05-architecture-shard/06-securite-rls.md` § La fonction). Exposer un champ supplémentaire exigerait
  de modifier cette fonction — c'est ce qui rend la fuite structurellement improbable plutôt que
  conventionnellement évitée (risque R3).
- **Tâches :**
  1. Écrire la fonction `get_public_repair()` avec son type de retour figé.
  2. Créer la route `/suivi/[token]` appelant cette fonction.
  3. Afficher le mot-symbole, le vélo, le statut, son explication en langage courant, la date de mise à
     jour et la frise de progression.
  4. Construire la frise sur les six étapes du parcours nominal, « Annulé » exclu.
  5. Afficher le message public lorsqu'il existe, sans emplacement vide sinon.
  6. Vérifier l'étanchéité du contenu transmis au navigateur.
- **Critères d'acceptance :**
  - [ ] Ouvrir son lien sans être authentifié affiche le mot-symbole, le vélo, le statut, son explication
        en langage courant, la date de dernière mise à jour et la frise de progression.
  - [ ] Aucune note interne, aucun nom d'employé, aucune coordonnée client et aucune autre réparation
        n'apparaît, ni dans le contenu transmis au navigateur même masqué visuellement.
  - [ ] La page appelle une fonction dédiée ne retournant que les champs autorisés ; le rôle anonyme n'a
        aucun accès direct aux tables métier.
  - [ ] Aucune action de modification n'est proposée, et toute tentative à partir du jeton est refusée
        par le serveur.
  - [ ] Aucun lien vers l'espace interne n'est proposé et rien n'indique son existence.
  - [ ] Depuis un téléphone, le statut est lisible sans zoom ni défilement horizontal, le corps de texte
        fait au moins 16 pixels, et la page reste utilisable jusqu'à 400 % d'agrandissement.
  - [ ] La frise situe le statut courant parmi les six étapes du parcours nominal, « Annulé » n'y
        figurant pas, et une ligne de texte indique l'étape courante.
  - [ ] La date de dernière mise à jour est absolue et complète, jamais relative.
  - [ ] Un message public rédigé s'affiche ; en son absence, aucun emplacement vide n'apparaît.
  - [ ] Une réparation « Restitué » reste consultable et affiche son statut avec son explication.
  - [ ] Modifier le jeton dans l'adresse pour viser une autre réparation affiche le message neutre de
        suivi introuvable.
  - [ ] La page ne se met pas à jour d'elle-même et rien ne présente l'information comme étant en direct.
- **Terminé quand :** Un client voit l'état de son vélo depuis son téléphone, et l'inspection du contenu
  transmis ne révèle aucune donnée interne.
