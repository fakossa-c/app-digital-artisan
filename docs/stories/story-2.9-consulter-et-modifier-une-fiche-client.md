> Story extraite de `docs/07-epics-stories.md`. À exécuter dans l'ordre. Prérequis : voir « Dépend de ».

### Story 2.9 — Consulter et modifier une fiche client
- **Epic :** Epic 2 — Réparations, clients et vélos
- **Dépend de :** Story 2.8
- **Objectif :** Permettre de consulter un client, ses vélos et son historique, et de corriger ses
  informations.
- **Contexte :** Fiche client dans `04-ux-design-shard/` § 6.3. C'est le **seul emplacement** où les
  vélos sont atteignables : aucune entrée de navigation propre ne leur est dédiée. Un vélo ne change
  jamais de propriétaire (brief § 7). La contrainte « au moins un moyen de contact » est garantie en
  base par la story 0.8.
- **Tâches :**
  1. Créer la page de fiche client.
  2. Afficher les coordonnées, la liste des vélos et l'historique des réparations, de la plus récente à
     la plus ancienne, chacune avec sa pastille et cliquable.
  3. Ajouter la modification des coordonnées, avec validation des formats.
  4. Ajouter la modification d'un vélo, sans possibilité de le rattacher à un autre client.
  5. Refuser la suppression simultanée du téléphone et de l'e-mail.
- **Critères d'acceptance :**
  - [ ] La fiche affiche les coordonnées, les vélos et l'historique des réparations, les plus récentes
        en premier, chacune avec sa pastille de statut et cliquable vers son détail.
  - [ ] Aucune entrée de navigation ne mène aux vélos : ils ne sont atteignables que depuis une fiche
        client.
  - [ ] Modifier les coordonnées affiche « Coordonnées enregistrées. » et la nouvelle valeur apparaît
        sur la fiche et dans les réparations du client.
  - [ ] Modifier la marque ou le modèle d'un vélo se répercute sur les réparations concernant ce vélo.
  - [ ] Aucune action ne permet de rattacher un vélo à un autre client.
  - [ ] Une adresse e-mail mal formée affiche « Cette adresse e-mail n'est pas valide. Exemple :
        martin.dupont@exemple.fr » ; un téléphone mal formé, « Ce numéro de téléphone n'est pas valide.
        Exemple : 06 12 34 56 78 » ; et rien n'est enregistré.
  - [ ] Supprimer à la fois le téléphone et l'e-mail est refusé, un message indiquant qu'au moins un
        moyen de contact est requis.
- **Terminé quand :** Les coordonnées d'un client se corrigent et son historique complet est consultable
  depuis sa fiche.

---

## Epic 3 — Workflow des statuts

Faire évoluer une réparation le long de son cycle de vie, avec les verrous que le métier impose.
