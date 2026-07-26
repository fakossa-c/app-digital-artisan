> Story extraite de `docs/07-epics-stories.md`. À exécuter dans l'ordre. Prérequis : voir « Dépend de ».

### Story 0.8 — Écrire les triggers et les contraintes d'intégrité
- **Epic :** Epic 0 — Fondations
- **Dépend de :** Story 0.7
- **Objectif :** Faire garantir par la base elle-même les règles que le code applicatif pourrait
  oublier : cohérence client–vélo, unicité du jeton public, non-suppression, date de modification
  automatique et création du profil à l'inscription.
- **Contexte :** La clé étrangère composite `UNIQUE (client_id, id)` sur `bikes` est expliquée dans
  `05-architecture-shard/05-statuts-et-regles-metier.md` § La clé étrangère composite. Le trigger
  `updated_at` est décrit dans `03-modele-donnees.md` § `updated_at` maintenue par trigger. La
  non-suppression relève de la défense en profondeur (§ La non-suppression). Le trigger sur
  `auth.users` créant le profil correspondant est décrit dans
  `07-flux-principaux.md` § Création du premier administrateur. **Une réparation n'est jamais
  supprimée** : c'est une décision structurante du projet (brief § 3.1).
- **Tâches :**
  1. Écrire la contrainte garantissant qu'un vélo appartient bien au client de sa réparation (clé
     étrangère composite).
  2. Écrire la contrainte d'unicité sur le jeton public et sa génération aléatoire par défaut.
  3. Écrire la protection empêchant toute suppression sur `repairs` et `repair_notes`.
  4. Écrire le trigger de mise à jour automatique de `updated_at` sur les réparations.
  5. Écrire le trigger sur `auth.users` créant automatiquement la ligne `profiles` correspondante, au
     rôle `employee` et à l'état `pending`.
  6. Écrire la contrainte « au moins un moyen de contact » sur `clients`.
  7. Appliquer les migrations et vérifier chaque contrainte par une tentative d'écriture invalide.
  8. Créer un utilisateur à la main depuis le tableau de bord Supabase et vérifier que sa ligne
     `profiles` apparaît automatiquement.
- **Critères d'acceptance :**
  - [ ] Associer à une réparation un vélo n'appartenant pas à son client est refusé par la base, et le
        refus provient d'une contrainte, non d'un contrôle applicatif.
  - [ ] Chaque réparation reçoit un jeton public généré aléatoirement, unique, et distinct de son
        identifiant interne.
  - [ ] Toute tentative de suppression sur `repairs` ou `repair_notes` est refusée au niveau de la
        base, quel que soit le rôle.
  - [ ] Modifier une colonne d'une réparation actualise sa date de dernière modification par
        déclencheur, sans intervention du code applicatif.
  - [ ] Créer un utilisateur dans Supabase Auth crée automatiquement sa ligne `profiles`, au rôle
        `employee` et à l'état `pending`.
  - [ ] Un client sans aucun moyen de contact est refusé par la base.
  - [ ] Supprimer l'auteur d'une note laisse la note en place sans auteur, plutôt que de supprimer la note.
- **Terminé quand :** Les règles d'intégrité du modèle sont garanties par la base et vérifiées une à
  une par une tentative d'écriture invalide.
