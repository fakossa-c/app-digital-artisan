> Story extraite de `docs/07-epics-stories.md`. À exécuter dans l'ordre. Prérequis : voir « Dépend de ».

### Story 7.5 — Vérifier la conformité d'accessibilité
- **Epic :** Epic 7 — Conformité, finition et mise en service
- **Dépend de :** Toutes les stories produisant un écran
- **Objectif :** Vérifier à l'échelle de l'application entière ce qui ne s'observe pas écran par écran :
  continuité du parcours clavier, cohérence de la hiérarchie des titres, contrastes.
- **Contexte :** Exigences dans `04-ux-design-shard/` § 11, trois canaux d'information au § 7. Cette
  story est une **passe de vérification globale**, pas un rattrapage : chaque story a déjà satisfait le
  critère 6 de la Definition of Done (`06-plan.md` § 3).
- **Tâches :**
  1. Parcourir l'application entière au clavier seul.
  2. Mesurer les contrastes du texte, des bordures, des pastilles et des icônes.
  3. Afficher l'application en niveaux de gris et vérifier la distinction des sept statuts.
  4. Vérifier le zoom à 200 % en interne et 400 % sur la page publique.
  5. Vérifier la hiérarchie des titres et la déclaration de langue de chaque page.
  6. Mesurer les cibles tactiles et leur espacement.
  7. Vérifier les annonces dynamiques et le respect de la préférence de mouvement réduit.
- **Critères d'acceptance :**
  - [ ] Chaque action est atteignable et déclenchable au clavier seul, le focus restant visible en
        permanence avec un anneau contrasté, et « Aller au contenu » étant le premier élément focusable
        de l'espace interne.
  - [ ] Le texte courant atteint au moins 4,5:1 ; les bordures de champs, pastilles de statut et icônes
        porteuses de sens au moins 3:1.
  - [ ] En niveaux de gris, les sept statuts restent distinguables par libellé, icône et forme, et
        l'entrée de navigation active comme l'onglet actif restent identifiables.
  - [ ] À 200 % sur l'espace interne, aucune fonction n'est perdue et aucun défilement horizontal
        n'apparaît ; la page publique reste utilisable jusqu'à 400 %.
  - [ ] Chaque page porte un seul titre de premier niveau nommant l'écran, la hiérarchie des titres ne
        saute aucun niveau, et la langue française est déclarée.
  - [ ] Chaque cible interactive de l'espace interne atteint au moins 44 pixels de côté, deux cibles
        adjacentes étant espacées d'au moins 8 pixels.
  - [ ] Un changement de statut, une confirmation d'action ou une évolution du nombre de résultats est
        annoncé dans une région vocalisée.
  - [ ] Une préférence système de mouvement réduit neutralise toute transition de plus de
        200 millisecondes.
- **Terminé quand :** L'application entière se parcourt au clavier, se lit sans distinguer les couleurs,
  et supporte le zoom exigé.
