# Statuts et permissions

> **Document :** PRD — Exigences produit (02) — projet digital-artisan (D-G), application D-g
> **Partie :** 5 / 9 · [Retour à l'index](./index.md)
> **Contenu :** Les sept statuts d'une réparation et leur sémantique, les règles de transition et de verrouillage (RM-13 à RM-15, RM-24), puis le tableau des permissions par rôle et la note d'arbitrage sur l'alignement avec le brief (sections 8 et 9).

---

# 8. Workflow des statuts

Une réparation évolue selon un cycle simple, comportant **sept statuts**.

| Statut | Sémantique |
|---|---|
| **Vélo déposé** | Le vélo est physiquement à l'atelier, aucun travail n'a commencé. Statut initial par défaut. |
| **Diagnostic** | Le réparateur examine le vélo pour identifier les interventions nécessaires. |
| **En attente de pièce** | Le diagnostic est fait, une pièce manque et a été commandée ou est attendue. |
| **Réparation en cours** | Le travail est engagé sur le vélo. |
| **Prêt à récupérer** | La réparation est terminée, le vélo attend son propriétaire. |
| **Restitué** | Le vélo a été rendu au client. Statut terminal : la fiche est verrouillée. |
| **Annulé** | La réparation n'aura pas lieu : fiche ouverte par erreur, vélo jamais déposé, ou renoncement du client. Statut terminal au même titre que *Restitué*. |

**RM-13 — Transitions de statut.**
Toute transition entre les statuts est autorisée, y compris un retour à un statut antérieur, **à l'exception** des transitions au départ du statut terminal **Restitué**.

**RM-14 — Verrouillage après restitution.**
Une réparation au statut **Restitué** ne peut plus changer de statut ni être modifiée. Elle reste consultable en lecture seule, ainsi que son lien public ([RM-11](./06-regles-metier.md#10-règles-métier)). Une erreur de saisie sur une réparation restituée nécessite la création d'une nouvelle réparation.

Le statut **Annulé** n'entraîne, à l'inverse, aucun verrouillage : une réparation annulée par erreur peut être rouverte par un simple changement de statut ([RM-24](#10-règles-métier)). C'est cette réversibilité qui permet à *Annulé* de servir de filet de rattrapage pour une fiche ouverte par erreur, sans intervention en base.

**RM-15 — Statut initial.**
Une réparation est créée au statut **Vélo déposé** par défaut. L'employé peut choisir un autre statut initial à la création, à l'exclusion des statuts terminaux.

**RM-24 — Sémantique du statut Annulé.**
Le statut **Annulé** est le seul moyen de clore une fiche qui n'aboutira pas, aucune suppression n'étant possible ([RM-12](./06-regles-metier.md#10-règles-métier)). Les réparations annulées sont exclues par défaut de la liste de travail et restent accessibles par le filtre de statut ([FEAT-REP-10](./04-fonctionnalites.md#74-gestion-des-réparations)). Contrairement à **Restitué**, il n'entraîne aucun verrouillage ([RM-14](#8-workflow-des-statuts)) : une fiche annulée par erreur peut être rouverte par un changement de statut.

Une réparation possède un seul statut courant.

---

# 9. Permissions

| Action | Réf. | Admin | Employé | Client |
|---|---|:--:|:--:|:--:|
| Se connecter | FEAT-AUT-02 | ✅ | ✅ | ❌ |
| Réinitialiser son mot de passe | FEAT-AUT-04 | ✅ | ✅ | ❌ |
| Créer une réparation | FEAT-REP-01 | ✅ | ✅ | ❌ |
| Modifier une réparation (description, client, vélo) | FEAT-REP-02 | ✅ | ✅ | ❌ |
| **Supprimer une réparation** | RM-12 | ❌ | ❌ | ❌ |
| Affecter un réparateur | FEAT-REP-05 | ✅ | ✅ | ❌ |
| Modifier un statut | FEAT-REP-06 | ✅ | ✅ | ❌ |
| Ajouter une note interne | FEAT-REP-07 | ✅ | ✅ | ❌ |
| Consulter toutes les réparations | FEAT-REP-04 | ✅ | ✅ | ❌ |
| Rechercher et filtrer les réparations | FEAT-REP-08..11 | ✅ | ✅ | ❌ |
| Enregistrer et modifier un client ou un vélo | FEAT-CLI-01..03 | ✅ | ✅ | ❌ |
| Rédiger le message public destiné au client | FEAT-REP-15 | ✅ | ✅ | ❌ |
| Copier le lien de suivi pour l'envoyer au client | FEAT-SUI-04 | ✅ | ✅ | ❌ |
| Imprimer le ticket d'atelier portant le QR code | FEAT-SUI-07 | ✅ | ✅ | ❌ |
| Gérer les employés | FEAT-EMP-01..04 | ✅ | ❌ | ❌ |
| Valider ou refuser une inscription | FEAT-EMP-02, FEAT-EMP-03 | ✅ | ❌ | ❌ |
| Promouvoir ou rétrograder un utilisateur | FEAT-EMP-05 | ✅ | ❌ | ❌ |
| Anonymiser un client | FEAT-RGPD-01 | ✅ | ❌ | ❌ |
| Consulter une réparation via le lien public | FEAT-SUI-01 | ✅ | ✅ | ✅ |

La dernière ligne est ✅ pour tous les rôles : un lien public est par nature accessible à quiconque le possède. Le tableau décrit ce que chaque rôle **peut** faire, non ce qu'il a besoin de faire.

> **Note d'arbitrage (alignement avec 01-brief).** La version 1 du brief attribuait la suppression des réparations et l'assignation à l'administrateur seul, et limitait la visibilité de l'employé aux « réparations auxquelles il a accès ». Ces points sont tranchés ainsi et répercutés dans le brief version 2 : (a) aucune suppression n'est possible pour quiconque ([RM-12](./06-regles-metier.md#10-règles-métier)), la traçabilité des interventions primant sur le confort de correction ; (b) tous les utilisateurs internes actifs voient toutes les réparations, conformément à l'objectif de visibilité partagée ([§ 2](./01-vision-et-problematique.md#2-problématique)) — cloisonner irait contre la raison d'être du produit ; (c) l'assignation est ouverte aux employés, la taille d'équipe visée ne justifiant pas de la réserver à l'administrateur.
