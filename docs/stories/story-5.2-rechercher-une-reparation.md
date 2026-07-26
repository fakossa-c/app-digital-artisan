> Story extraite de `docs/07-epics-stories.md`. À exécuter dans l'ordre. Prérequis : voir « Dépend de ».

### Story 5.2 — Rechercher une réparation
- **Epic :** Epic 5 — Consultation et recherche
- **Dépend de :** Story 5.1
- **Objectif :** Retrouver une réparation par le nom du client ou par le vélo, en quelques secondes au
  comptoir.
- **Contexte :** Recherche décrite dans `04-ux-design-shard/` § 6.2 ; la requête et les index
  trigrammes dans `05-architecture-shard/10-recherche-filtres.md` § 18. Le filtrage est **toujours
  côté serveur** : charger toutes les réparations pour filtrer dans le navigateur casserait la montée
  en charge et exposerait des données au-delà du besoin.
- **Tâches :**
  1. Ajouter le champ de recherche en tête de liste.
  2. Écrire la requête serveur avec jointures `!inner`, tolérante à la casse et aux espaces.
  3. Afficher le nombre de résultats.
  4. Gérer l'absence de résultat avec l'action d'effacement.
  5. Ajouter le raccourci clavier plaçant le focus dans le champ.
- **Critères d'acceptance :**
  - [ ] Saisir « Dupont » n'affiche que les réparations dont le client correspond, et le nombre de
        résultats est indiqué.
  - [ ] Saisir « Btwin » fait apparaître la réparation concernant un vélo de cette marque.
  - [ ] La recherche fonctionne en minuscules et avec des espaces superflus.
  - [ ] Sans résultat, « Aucune réparation ne correspond à votre recherche. » s'affiche, le terme reste
        dans le champ, et « Effacer les filtres » est proposé.
  - [ ] Le filtrage est réalisé par la base ; l'ensemble des réparations n'est jamais chargé pour être
        filtré dans le navigateur.
  - [ ] Appuyer sur « / » depuis la liste place le focus dans le champ de recherche.
- **Terminé quand :** Une réparation se retrouve par client ou par vélo en quelques secondes, filtrage
  effectué en base.
