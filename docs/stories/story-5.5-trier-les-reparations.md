> Story extraite de `docs/07-epics-stories.md`. À exécuter dans l'ordre. Prérequis : voir « Dépend de ».

### Story 5.5 — Trier les réparations
- **Epic :** Epic 5 — Consultation et recherche
- **Dépend de :** Story 5.1
- **Objectif :** Permettre d'ordonner la liste selon la colonne choisie, sur l'ensemble des résultats.
- **Contexte :** Tri décrit dans `04-ux-design-shard/` § 6.2, accessibilité des tableaux au § 11. Le tri
  est appliqué **par la base**, pas sur la page affichée : trier seulement la page courante donnerait
  un résultat faux dès la deuxième page. Les en-têtes n'existant pas en rendu mobile, un sélecteur les
  remplace.
- **Tâches :**
  1. Rendre triables les en-têtes client, statut, réparateur et date de dernière modification.
  2. Appliquer le tri dans la requête serveur, sur l'ensemble des résultats.
  3. Inverser le sens au second clic et signaler la colonne triée.
  4. Porter l'attribut de tri destiné aux technologies d'assistance.
  5. Proposer un sélecteur « Trier par » en rendu mobile.
- **Critères d'acceptance :**
  - [ ] Cliquer sur l'en-tête « Client » trie par nom croissant, un indicateur signalant la colonne et
        son sens.
  - [ ] Un second clic sur le même en-tête inverse le sens.
  - [ ] Les colonnes client, statut, réparateur et date de dernière modification sont triables, la
        colonne triée portant l'attribut de tri pour les technologies d'assistance.
  - [ ] Sous 768 px, un sélecteur « Trier par » est proposé.
  - [ ] Le tri est appliqué par la base et porte sur l'ensemble des résultats, pas seulement sur la page
        affichée.
- **Terminé quand :** La liste s'ordonne selon quatre critères, sur l'ensemble des résultats et dans les
  deux rendus.
