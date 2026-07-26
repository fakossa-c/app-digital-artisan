> Story extraite de `docs/07-epics-stories.md`. À exécuter dans l'ordre. Prérequis : voir « Dépend de ».

### Story 5.3 — Filtrer les réparations
- **Epic :** Epic 5 — Consultation et recherche
- **Dépend de :** Story 5.1
- **Objectif :** Restreindre la liste par statut et par réparateur, combinables avec la recherche.
- **Contexte :** Filtres décrits dans `04-ux-design-shard/` § 6.2, ordre des statuts au § 7. Les options
  de statut suivent **l'ordre du workflow**, jamais l'ordre alphabétique : l'ordre alphabétique n'a
  aucun sens métier et ralentit la lecture.
- **Tâches :**
  1. Ajouter les filtres par statut et par réparateur.
  2. Ordonner les options de statut selon le workflow, « Annulé » en dernier.
  3. Combiner les filtres avec la recherche dans la même requête serveur.
  4. Ajouter « Effacer les filtres » avec le décompte des filtres actifs.
  5. Exclure les statuts terminaux de l'onglet « En cours ».
- **Critères d'acceptance :**
  - [ ] Sélectionner « Réparation en cours » n'affiche que les réparations à ce statut, le compteur
        reflétant le nombre de résultats.
  - [ ] Sélectionner un réparateur n'affiche que les réparations dont il est responsable.
  - [ ] Les options du filtre de statut suivent l'ordre du workflow, jamais l'ordre alphabétique, et
        « Annulé » figure en dernier.
  - [ ] Un filtre actif combiné à une recherche produit des résultats respectant simultanément les deux.
  - [ ] « Effacer les filtres » n'apparaît que si au moins un filtre est actif, affiche leur décompte,
        et rétablit la liste complète.
  - [ ] L'onglet « En cours » exclut « Restitué » et « Annulé », qui restent atteignables par le filtre
        de statut.
- **Terminé quand :** Un employé isole les réparations d'un statut et d'un réparateur donnés, en
  combinant avec la recherche.
