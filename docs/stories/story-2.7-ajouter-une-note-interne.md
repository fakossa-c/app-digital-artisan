> Story extraite de `docs/07-epics-stories.md`. À exécuter dans l'ordre. Prérequis : voir « Dépend de ».

### Story 2.7 — Ajouter une note interne
- **Epic :** Epic 2 — Réparations, clients et vélos
- **Dépend de :** Story 2.4
- **Objectif :** Permettre de consigner une observation sur une réparation, transmise à l'équipe sans
  dépendre de la présence de son auteur.
- **Contexte :** Fil de notes décrit dans `04-ux-design-shard/` § 6.2. Les notes sont **immuables** :
  ni modification ni suppression après publication, garanti en base par la story 0.8. Une note ne
  concerne jamais le client : elle n'apparaît pas sur la page publique et **n'actualise pas** la date de
  dernière modification de la réparation, sans quoi le client croirait à une progression.
- **Tâches :**
  1. Ajouter le champ de saisie et l'action « Ajouter la note » sur la fiche de détail.
  2. Enregistrer la note avec son auteur et son horodatage via une Server Action.
  3. Afficher le fil, la plus récente en tête, chacune avec auteur et date.
  4. Replier au-delà de cinq notes, avec une action de dépliage indiquant le total.
  5. Refuser une note vide ou composée uniquement d'espaces.
  6. Garantir que l'ajout d'une note n'actualise pas `updated_at` de la réparation.
- **Critères d'acceptance :**
  - [ ] Ajouter une note l'enregistre avec le nom de son auteur et sa date, l'affiche en tête du fil, et
        affiche « Note ajoutée. ».
  - [ ] Deux notes d'auteurs différents coexistent, la plus récente en haut, chacune avec son auteur et
        sa date.
  - [ ] Aucune action de modification ni de suppression n'est proposée sur une note publiée, et une
        requête de suppression est refusée par la base.
  - [ ] Une note vide ou composée d'espaces est refusée et rien n'est enregistré.
  - [ ] Une réparation portant douze notes en affiche cinq, l'action « Afficher les 12 notes » dépliant
        le reste.
  - [ ] Aucune note n'apparaît sur la page publique, ni dans le contenu transmis au navigateur, même
        masquée visuellement.
  - [ ] Ajouter une note n'actualise pas la date de dernière modification de la réparation.
  - [ ] Un utilisateur non authentifié ou non actif se voit refuser l'action côté serveur.
- **Terminé quand :** L'équipe échange des observations sur une réparation sans que le client en voie
  jamais la trace ni ne croie à une progression.

> L'avant-dernier critère se vérifie en inspectant le contenu transmis au navigateur, pas seulement le
> rendu visuel : une note masquée par du style reste une fuite.
