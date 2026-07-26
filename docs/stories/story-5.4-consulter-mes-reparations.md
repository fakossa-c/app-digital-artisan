> Story extraite de `docs/07-epics-stories.md`. À exécuter dans l'ordre. Prérequis : voir « Dépend de ».

### Story 5.4 — Consulter mes réparations
- **Epic :** Epic 5 — Consultation et recherche
- **Dépend de :** Story 5.1
- **Objectif :** Ouvrir directement les réparations assignées à l'utilisateur, pour commencer sa journée
  sur son propre travail.
- **Contexte :** Trois onglets de portée décrits dans `04-ux-design-shard/` § 6.2. La vue par défaut
  diffère selon le rôle : « Mes réparations » pour l'employé, « En cours » pour l'administrateur, qui
  supervise l'activité plutôt que d'exécuter.
- **Tâches :**
  1. Ajouter les trois onglets « Mes réparations », « En cours » et « Toutes ».
  2. Appliquer la vue par défaut selon le rôle.
  3. Restreindre « Mes réparations » aux réparations assignées, closes exclues.
  4. Combiner la portée avec la recherche et les filtres.
  5. Gérer l'absence de réparation assignée.
- **Critères d'acceptance :**
  - [ ] Trois onglets sont proposés, l'onglet actif étant signalé par le gras, un soulignement et
        l'attribut de page courante.
  - [ ] Un employé accédant à la liste sans préciser de portée arrive sur « Mes réparations ».
  - [ ] Un administrateur arrive sur « En cours ».
  - [ ] « Mes réparations » n'affiche que les réparations dont l'utilisateur est responsable, closes
        exclues.
  - [ ] Sans réparation assignée, « Aucune réparation ne vous est assignée. » s'affiche avec « Voir
        toutes les réparations ».
  - [ ] Appliquer une recherche ou un filtre depuis « Mes réparations » produit des résultats respectant
        simultanément la portée et les critères.
- **Terminé quand :** Chaque rôle arrive sur la vue qui le concerne, et la portée se combine aux autres
  critères.
