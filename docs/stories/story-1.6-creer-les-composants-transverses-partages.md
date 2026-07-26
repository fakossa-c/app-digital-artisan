> Story extraite de `docs/07-epics-stories.md`. À exécuter dans l'ordre. Prérequis : voir « Dépend de ».

### Story 1.6 — Créer les composants transverses partagés
- **Epic :** Epic 1 — Accès à l'application
- **Dépend de :** Story 0.1, Story 1.1
- **Objectif :** Livrer les composants d'interface communs avant les écrans métier, pour que la
  Definition of Done soit outillée dès la première story fonctionnelle.
- **Contexte :** Fondations visuelles, système de statuts, formulaires, états particuliers et
  accessibilité dans `04-ux-design-shard/` § 6bis, § 7, § 8, § 10 et § 11. Sans cet outillage préalable,
  chaque écran réinventerait son état vide et son message de confirmation, et la cohérence serait
  perdue dès le troisième écran. C'est ce qui rend la Definition of Done (`06-plan.md` § 3) applicable
  plutôt que contournée faute d'outil.
- **Tâches :**
  1. Créer la mise en page de l'espace interne : barre supérieure, navigation, mot-symbole, menu
     Compte, lien « Aller au contenu ».
  2. Créer le composant de bandeau de retour, temporaire et annoncé aux lecteurs d'écran.
  3. Créer le composant unique de pastille de statut, portant libellé, icône et forme.
  4. Créer les trois variantes de bouton — primaire, secondaire, danger — avec l'état occupé.
  5. Créer le composant de champ de formulaire avec sa gestion d'erreur et son association au message.
  6. Créer les composants de squelette de chargement et d'état vide.
  7. Créer la modale de confirmation accessible, avec piégeage du focus.
- **Critères d'acceptance :**
  - [ ] La barre supérieure affiche le mot-symbole, les entrées Réparations, Clients, Employés pour
        l'administrateur, et le menu Compte ; l'entrée active est signalée par le gras, un soulignement
        et l'attribut de page courante.
  - [ ] Le lien « Aller au contenu » est le premier élément focusable.
  - [ ] Un bandeau temporaire de 4 secondes affiche le message d'une action et l'annonce dans une
        région vocalisée.
  - [ ] Un statut affiché dans la liste, le détail, le filtre ou la page publique emprunte le même
        composant et reste distinguable des six autres sans percevoir la couleur.
  - [ ] Les boutons appartiennent aux trois seules variantes primaire, secondaire et danger, font au
        moins 44 pixels de haut, et conservent leur largeur en état occupé.
  - [ ] Un champ en erreur change de bordure, affiche son message en dessous et y est associé pour les
        technologies d'assistance ; le focus va au premier champ en erreur à la soumission.
  - [ ] Une navigation en cours affiche un squelette aux dimensions du contenu réel, jamais une page
        blanche.
  - [ ] Une modale piège le focus tant qu'elle est ouverte, et Échap la ferme en rendant le focus à son
        déclencheur.
- **Terminé quand :** Les composants transverses existent et sont utilisés par les écrans de connexion
  et d'attente, prêts à outiller tous les écrans métier.

---

## Epic 2 — Réparations, clients et vélos

Le domaine central du produit, et le plus incertain : il porte le modèle relationnel
client–vélo–réparation et la contrainte qui les lie.
