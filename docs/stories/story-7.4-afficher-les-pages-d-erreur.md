> Story extraite de `docs/07-epics-stories.md`. À exécuter dans l'ordre. Prérequis : voir « Dépend de ».

### Story 7.4 — Afficher les pages d'erreur
- **Epic :** Epic 7 — Conformité, finition et mise en service
- **Dépend de :** Story 1.6, Story 4.2
- **Objectif :** Faire comprendre à l'utilisateur ce qui s'est passé lorsqu'une page est inaccessible.
- **Contexte :** Écrans d'erreur décrits dans `04-ux-design-shard/` § 6.6, journalisation dans
  `05-architecture-shard/09-validation-et-erreurs.md` § Journalisation. Le 404 public ne doit
  **jamais** reprendre le message du 404 interne : il trahirait l'existence d'un espace interne. Le
  jeton public et les coordonnées client ne sont jamais journalisés.
- **Tâches :**
  1. Créer les pages 403, 404 interne, 404 public et 500.
  2. Faire correspondre le 404 public au message neutre de lien invalide.
  3. Journaliser les erreurs serveur avec un identifiant de corrélation présenté à l'utilisateur.
  4. Exclure de la journalisation le jeton public et les coordonnées client.
- **Critères d'acceptance :**
  - [ ] Un employé accédant à une page réservée à l'administrateur voit « Vous n'avez pas accès à cette
        page. » avec « Retour aux réparations ».
  - [ ] Une adresse interne inexistante affiche « Cette page n'existe pas. » avec « Retour aux
        réparations ».
  - [ ] Une adresse publique inexistante affiche le message neutre de suivi indisponible, identique à
        celui d'un lien invalide, sans jamais reprendre le message interne ni trahir l'existence d'un
        espace interne.
  - [ ] Une erreur technique affiche « Une erreur est survenue de notre côté. » avec « Réessayer », sans
        aucune requête, trace technique ni information sur une ressource non autorisée à l'écran.
  - [ ] L'erreur est journalisée côté serveur avec son détail et un identifiant de corrélation présenté
        à l'utilisateur, ni le jeton public ni les coordonnées client n'étant journalisés.
- **Terminé quand :** Les quatre situations d'erreur produisent chacune leur écran, et le 404 public ne
  révèle rien de l'espace interne.
