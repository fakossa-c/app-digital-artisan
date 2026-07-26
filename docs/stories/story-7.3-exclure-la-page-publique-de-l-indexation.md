> Story extraite de `docs/07-epics-stories.md`. À exécuter dans l'ordre. Prérequis : voir « Dépend de ».

### Story 7.3 — Exclure la page publique de l'indexation
- **Epic :** Epic 7 — Conformité, finition et mise en service
- **Dépend de :** Story 4.1
- **Objectif :** Empêcher que les pages de suivi apparaissent dans un moteur de recherche.
- **Contexte :** Sans cette directive, le nom d'un client et son vélo pourraient devenir publiquement
  consultables par simple recherche (brief risque R4). La protection est double : directive de
  non-indexation, et aucun lien vers une page de suivi depuis une page publiquement accessible.
- **Tâches :**
  1. Poser la directive de non-indexation sur la page publique de suivi.
  2. La poser également sur la page de suivi introuvable.
  3. Vérifier qu'aucune adresse de suivi ne figure dans les fichiers de référencement.
  4. Vérifier qu'aucun lien vers une page de suivi n'existe depuis une page publique.
- **Critères d'acceptance :**
  - [ ] La page publique de suivi porte une directive de non-indexation.
  - [ ] La page de suivi introuvable porte la même directive.
  - [ ] Aucune adresse de suivi ne figure dans les fichiers de référencement du site.
  - [ ] Aucun lien vers une page de suivi n'existe depuis une page publiquement accessible.
- **Terminé quand :** Aucune page de suivi n'est atteignable par un moteur de recherche.
