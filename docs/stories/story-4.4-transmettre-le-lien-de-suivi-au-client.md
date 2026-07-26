> Story extraite de `docs/07-epics-stories.md`. À exécuter dans l'ordre. Prérequis : voir « Dépend de ».

### Story 4.4 — Transmettre le lien de suivi au client
- **Epic :** Epic 4 — Suivi public
- **Dépend de :** Story 4.3
- **Objectif :** Rendre immédiat, au comptoir, l'envoi du lien au client par SMS ou par e-mail, en
  plaçant la coordonnée et le lien à portée sur la fiche.
- **Contexte :** Cette story comble le seul trou qui rendrait le produit inopérant sur son cas d'usage
  principal : la page publique existerait et personne ne la consulterait, faute d'avoir reçu son
  adresse. Un jeton n'est ni dictable au téléphone ni recopiable à la main : on ne l'énonce pas, on
  l'envoie (brief § 3.3). L'application **n'envoie rien elle-même** — l'envoi automatisé est hors
  périmètre — mais elle doit rendre le geste immédiat.
- **Tâches :**
  1. Ajouter la mention guidant le geste sous le bloc du lien.
  2. Afficher le téléphone et l'adresse e-mail du client sur la fiche, copiables.
  3. Gérer le cas d'un client sans aucune coordonnée.
  4. Vérifier de bout en bout qu'un lien reçu ouvre bien la bonne page.
- **Critères d'acceptance :**
  - [ ] Le bloc du lien est accompagné de « Collez ce lien dans un SMS ou un e-mail au client. », et
        aucune action ne laisse croire que l'application envoie elle-même le message.
  - [ ] Le téléphone et l'adresse e-mail du client, lorsqu'ils sont renseignés, sont visibles et
        copiables sans changer de page.
  - [ ] Un client sans téléphone ni e-mail affiche « Ce client n'a ni téléphone ni e-mail : le lien ne
        peut pas lui être envoyé. », la copie du lien restant possible.
  - [ ] Le lien reçu et ouvert depuis un téléphone affiche la page publique correspondant bien à la
        réparation déposée.
- **Terminé quand :** Le geste d'envoi est réalisable au comptoir en quelques secondes, et un client
  reçoit et ouvre effectivement son lien.
