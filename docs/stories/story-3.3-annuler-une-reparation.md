> Story extraite de `docs/07-epics-stories.md`. À exécuter dans l'ordre. Prérequis : voir « Dépend de ».

### Story 3.3 — Annuler une réparation
- **Epic :** Epic 3 — Workflow des statuts
- **Dépend de :** Story 3.1
- **Objectif :** Permettre de clore une fiche ouverte par erreur, pour qu'elle cesse d'encombrer la
  liste de travail.
- **Contexte :** Le statut « Annulé » existe parce qu'**aucune réparation ne peut être supprimée**
  (brief § 2.1). Contrairement à « Restitué », il est réversible : une fiche annulée par erreur peut
  être rouverte. Action sensible au sens de `04-ux-design-shard/` § 8, présentée en variante danger.
- **Tâches :**
  1. Ajouter l'action « Annuler la réparation » en variante danger, à l'écart des actions courantes.
  2. Ajouter sa modale de confirmation.
  3. Exclure les réparations annulées de l'onglet « En cours ».
  4. Permettre la réouverture par un changement de statut.
  5. Distinguer visuellement « Annulé » par son libellé, son icône et sa forme de pastille.
  6. Adapter la page publique d'une réparation annulée.
- **Critères d'acceptance :**
  - [ ] Cliquer sur « Annuler la réparation » affiche « Annuler cette réparation ? Elle sortira des
        réparations en cours. Vous pourrez la rouvrir si nécessaire. » ; après confirmation le statut
        devient « Annulé » et « Réparation annulée. » s'affiche.
  - [ ] L'action est présentée en variante danger et placée à l'écart des actions courantes.
  - [ ] Les réparations annulées ne figurent pas dans l'onglet « En cours » mais restent accessibles par
        le filtre de statut, où « Annulé » figure en dernier.
  - [ ] Une réparation annulée reste consultable avec ses notes internes, et aucune suppression n'est
        possible quel que soit le rôle.
  - [ ] Changer le statut d'une réparation annulée vers « Diagnostic » est accepté et la fait
        réapparaître dans les réparations en cours.
  - [ ] La pastille « Annulé » porte son libellé, une croix cerclée et un trait barré, et reste
        distinguable de « Restitué » et « Vélo déposé » sans percevoir la couleur.
  - [ ] La page publique d'une réparation annulée remplace la frise par la pastille « Annulé » et son
        explication, sans afficher de frise partiellement complétée.
- **Terminé quand :** Une fiche ouverte par erreur sort de la liste de travail sans être supprimée, et
  peut être rouverte.

> Le statut « Annulé » n'est pas un confort. Aucune fiche ne pouvant être supprimée, sans lui une
> réparation ouverte par erreur resterait indéfiniment en « Vélo déposé » dans la liste de travail. Le
> défaut apparaîtrait dès la première semaine d'exploitation.

---

## Epic 4 — Suivi public

La proposition de valeur du produit et sa principale surface de risque. Une erreur ici n'est pas un
défaut d'affichage : c'est une fuite de données personnelles.
