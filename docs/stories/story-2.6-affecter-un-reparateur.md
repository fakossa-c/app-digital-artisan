> Story extraite de `docs/07-epics-stories.md`. À exécuter dans l'ordre. Prérequis : voir « Dépend de ».

### Story 2.6 — Affecter un réparateur
- **Epic :** Epic 2 — Réparations, clients et vélos
- **Dépend de :** Story 2.4
- **Objectif :** Permettre de désigner ou de changer le réparateur responsable d'une réparation.
- **Contexte :** Action présente sur la fiche de détail (`04-ux-design-shard/` § 6.2), messages au § 12.
  Une réparation ne porte qu'**un seul** réparateur responsable, et seuls les profils `active` sont
  assignables.
- **Tâches :**
  1. Ajouter l'action « Réassigner » sur la fiche de détail.
  2. Charger la liste des profils `active` uniquement.
  3. Enregistrer l'affectation via une Server Action vérifiant l'état du profil cible.
  4. Masquer l'action sur une réparation close.
- **Critères d'acceptance :**
  - [ ] Réassigner une réparation l'attribue au réparateur choisi, affiche « Réparation assignée à
        {nom}. » et actualise la date de dernière modification.
  - [ ] La réparation ne porte qu'un seul réparateur responsable ; le précédent n'apparaît plus.
  - [ ] Seuls les profils `active` sont proposés, et assigner un profil non actif est refusé par le
        serveur.
  - [ ] Une réparation « Restitué » ou « Annulé » ne propose pas l'action de réassignation.
- **Terminé quand :** Chacun sait qui prend en charge le vélo, et un profil inactif ne peut jamais être
  assigné.
