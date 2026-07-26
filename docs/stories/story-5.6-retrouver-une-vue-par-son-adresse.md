> Story extraite de `docs/07-epics-stories.md`. À exécuter dans l'ordre. Prérequis : voir « Dépend de ».

### Story 5.6 — Retrouver une vue par son adresse
- **Epic :** Epic 5 — Consultation et recherche
- **Dépend de :** Story 5.2, Story 5.3, Story 5.4, Story 5.5
- **Objectif :** Faire survivre une vue filtrée à un rechargement et la rendre partageable.
- **Contexte :** Persistance dans l'URL décrite dans `04-ux-design-shard/` § 6.2. Aucun état n'est
  conservé dans le navigateur : l'adresse **est** l'état. C'est ce qui rend la vue partageable à un
  collègue et cohérente avec le retour arrière.
- **Tâches :**
  1. Refléter portée, recherche, filtres, tri et pagination dans les paramètres de l'adresse.
  2. Reconstruire la vue depuis l'adresse au chargement.
  3. Traiter les valeurs invalides en retombant sur les valeurs par défaut.
  4. Vérifier la cohérence du retour arrière du navigateur.
- **Critères d'acceptance :**
  - [ ] Appliquer une portée, une recherche, des filtres, un tri et une pagination fait apparaître
        chacun de ces paramètres dans l'adresse.
  - [ ] Recharger la page restaure la vue à l'identique, sans qu'aucun état conservé dans le navigateur
        ne soit nécessaire.
  - [ ] Transmettre l'adresse à un collègue actif lui donne la même vue, les données restant limitées à
        ce que son profil autorise.
  - [ ] Le retour arrière du navigateur ramène à la vue précédente.
  - [ ] Une valeur de filtre, de tri ou de page invalide affiche la liste avec les valeurs par défaut,
        sans erreur technique.
- **Terminé quand :** Une vue filtrée se recharge et se partage à l'identique par sa seule adresse.

---

## Epic 6 — Inscription et gestion des employés

Permettre l'arrivée d'un nouvel employé sans intervention en base. Fonction d'administration
ponctuelle, sollicitée à l'arrivée d'un employé, elle ne bloque aucun autre epic — les comptes de
développement provenant du seed.
