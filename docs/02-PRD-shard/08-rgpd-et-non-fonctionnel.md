# Données personnelles et exigences non fonctionnelles

> **Document :** PRD — Exigences produit (02) — projet digital-artisan (D-G), application D-g
> **Partie :** 8 / 9 · [Retour à l'index](./index.md)
> **Contenu :** Les quatre règles RGPD `RM-18` à `RM-21` (base légale, information, conservation, droit à l'effacement) et les huit exigences non fonctionnelles `NFR-01` à `NFR-08` : volumétrie, performance, navigateurs, terminaux, disponibilité, accessibilité, langue, confidentialité (sections 14 et 15).

---

# 14. Données personnelles et conservation

**RM-18 — Base légale.** Les données clients (nom, téléphone, e-mail) sont collectées pour l'exécution de la prestation de réparation. Leur saisie est réalisée par l'atelier lors du dépôt du vélo.

**RM-19 — Information du client.** Une mention d'information (finalité, responsable de traitement, droits, contact) est accessible depuis la page publique de suivi ([FEAT-RGPD-02](./04-fonctionnalites.md#76-données-personnelles)).

**RM-20 — Durée de conservation.** Les réparations et les données clients associées sont conservées 3 ans après la dernière réparation, puis anonymisées. Cette durée est alignée sur la garantie légale de conformité.

**RM-21 — Droit à l'effacement.** Sur demande du client, l'administrateur peut anonymiser une fiche client : nom, téléphone et e-mail sont remplacés par des valeurs neutres. L'anonymisation préserve l'historique des réparations sans supprimer aucune fiche, conformément à [RM-12](./06-regles-metier.md#10-règles-métier) ([FEAT-RGPD-01](./04-fonctionnalites.md#76-données-personnelles)).

L'anonymisation plutôt que la suppression est la seule solution qui réconcilie le droit à l'effacement avec la règle « jamais supprimées ». Le détail des décisions RGPD figure au brief § 10.

---

# 15. Exigences non fonctionnelles

**NFR-01 — Volumétrie.** L'application doit rester fluide jusqu'à 5 utilisateurs internes, 500 clients, 800 vélos et 2 000 réparations. Au-delà de 50 réparations affichées, la liste est paginée ([FEAT-REP-14](./04-fonctionnalites.md#74-gestion-des-réparations)).

**NFR-02 — Performance.** L'affichage de la liste des réparations et d'une fiche doit s'effectuer en moins de 2 secondes sur une connexion 4G standard.

**NFR-03 — Navigateurs.** Les deux dernières versions majeures de Chrome, Firefox, Safari et Edge, sur ordinateur et mobile. Aucun support d'Internet Explorer.

**NFR-04 — Terminaux.** L'espace interne est utilisable sur ordinateur et tablette (largeur ≥ 768 px). La page publique de suivi est optimisée pour mobile (largeur ≥ 320 px).

**NFR-05 — Disponibilité.** Aucun engagement contractuel ; la disponibilité est celle des services managés utilisés. L'objectif indicatif est de 99 % mensuel (brief § 6.3).

**NFR-06 — Accessibilité.** Contraste et navigation clavier conformes aux bonnes pratiques essentielles.

**NFR-07 — Langue.** L'interface est exclusivement en français. Aucun mécanisme d'internationalisation n'est mis en place ([§ 13](./09-perimetre-et-limites.md#13-hors-périmètre)).

**NFR-08 — Confidentialité par défaut.** Aucune donnée personnelle de client ne doit être accessible sans authentification, à l'exception des informations strictement listées en [FEAT-SUI-02](./04-fonctionnalites.md#75-suivi-client) pour le porteur d'un lien de suivi valide.
