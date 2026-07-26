> Story extraite de `docs/07-epics-stories.md`. À exécuter dans l'ordre. Prérequis : voir « Dépend de ».

### Story 2.2 — Réutiliser un client existant
- **Epic :** Epic 2 — Réparations, clients et vélos
- **Dépend de :** Story 2.1
- **Objectif :** Permettre de retrouver un client déjà enregistré plutôt que de le ressaisir, pour ne
  pas créer de doublon et conserver son historique.
- **Contexte :** Pattern **chercher-ou-créer** décrit dans `04-ux-design-shard/` § 6.2 et
  `05-architecture-shard/10-recherche-filtres.md` § Recherche d'un client existant. Sans cette story,
  un même client est recréé à chaque visite : au bout de six mois, « Dupont Martin », « M. Dupont » et
  « dupont martin » coexistent, la recherche devient inutilisable et l'historique par vélo disparaît.
  La dégradation est **irréversible** (risque R6).
- **Tâches :**
  1. Ajouter le champ de recherche de client en tête de l'étape client.
  2. Écrire la requête de recherche côté serveur, tolérante à la casse et aux espaces, sans casser
     l'usage des index trigrammes.
  3. Ne déclencher la recherche qu'à partir de trois caractères, avec indicateur discret.
  4. Afficher pour chaque résultat le téléphone et le nombre de réparations.
  5. Garder « + Nouveau client » immédiatement accessible, ouvrant les champs sans changer de page.
  6. Avertir lorsqu'un nom très proche existe déjà.
- **Critères d'acceptance :**
  - [ ] Saisir « dupo » propose « Martin Dupont » avec son téléphone et son nombre de réparations ; le
        sélectionner renseigne le client sans ressaisie.
  - [ ] Moins de trois caractères ne déclenche aucune recherche ; au-delà, un indicateur apparaît et le
        nombre de résultats est annoncé aux technologies d'assistance.
  - [ ] La recherche fonctionne en minuscules, avec espaces superflus, ou sur une partie du téléphone.
  - [ ] Sans résultat, « + Nouveau client » reste accessible et ouvre les champs nom, téléphone et
        e-mail sans perte de saisie.
  - [ ] Créer un client au nom très proche d'un existant affiche « Un client au nom similaire existe
        déjà. Vérifiez avant de créer un doublon. », sans empêcher de poursuivre.
  - [ ] Le filtrage est réalisé par la base ; l'ensemble des clients n'est jamais chargé pour être
        filtré dans le navigateur.
  - [ ] Sélectionner un client existant puis créer la réparation n'enregistre aucun nouveau client.
- **Terminé quand :** Un client déjà venu est retrouvé et réutilisé sans ressaisie, et un nom proche
  déclenche un avertissement.
