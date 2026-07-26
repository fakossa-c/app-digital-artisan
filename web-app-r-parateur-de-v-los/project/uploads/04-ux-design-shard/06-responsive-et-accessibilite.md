# Responsive et accessibilité

> **Document :** UX Design (04) — projet digital-artisan (D-G), application D-g
> **Partie :** 6 / 7 · [Retour à l’index](./index.md)
> **Contenu :** Le point de rupture unique à 768 px et les usages par format, puis les exigences WCAG 2.2 AA chiffrées, les raccourcis clavier et la règle de vocabulaire (sections 11 et 12).

---

## 11. Responsive design

Un seul jeu d'écrans, adapté par CSS. Point de rupture unique : **768 px**.

### Mobile (< 768 px)

- consultation client — cas d'usage principal de l'espace public ;
- lecture des statuts ;
- mise à jour rapide d'une réparation ;
- listes en cartes empilées, formulaires sur une seule colonne ;
- navigation regroupée dans un menu compact, « Nouvelle réparation » restant visible.

### Tablette (≥ 768 px, tactile)

- usage en atelier, souvent avec des gants : toutes les cibles à 44 × 44 px minimum ;
- listes en tableau ;
- consultation et modification des fiches sans clavier.

### Ordinateur (≥ 1024 px)

- vue d'ensemble des réparations ;
- tableau avec en-têtes de colonne triables ;
- filtres et actions regroupés sur une seule ligne.

Il n'existe pas trois interfaces : le même composant se réorganise. Aucune fonctionnalité n'est réservée à un format.

---

## 12. Accessibilité

Niveau visé : **WCAG 2.2 niveau AA**, sur l'espace interne comme sur la page publique.

| Critère | Exigence chiffrée | Référence |
|---|---|---|
| Contraste texte | ≥ 4,5:1 pour le texte courant ; ≥ 3:1 pour le texte ≥ 24 px ou ≥ 19 px gras | 1.4.3 |
| Contraste non textuel | ≥ 3:1 pour les bordures de champs, les pastilles de statut et les icônes porteuses de sens | 1.4.11 |
| Taille de cible | **44 × 44 px minimum** pour toute cible interactive de l'espace interne ; espacement ≥ 8 px entre deux cibles adjacentes | 2.5.8 exige 24 px — exigence projet volontairement supérieure, l'atelier travaillant avec des gants sur tablette |
| Focus | anneau 3 px `#2563EB` + offset 2 px, jamais supprimé, visible sur tous les fonds, contraste ≥ 3:1 | 2.4.11 / 2.4.13 |
| Zoom | interface utilisable jusqu'à **200 %** sans perte de fonction ni défilement horizontal ; jusqu'à 400 % sur la page publique | 1.4.4 / 1.4.10 |
| Taille de texte | 16 px minimum pour le corps ; jamais en dessous de 14 px | — |
| Langue | `<html lang="fr">` sur toutes les pages | 3.1.1 |
| Titres | un seul `<h1>` par page — le nom de l'écran — et une hiérarchie sans saut de niveau | 1.3.1 |
| Changement de statut | annoncé dans une région `aria-live="polite"` : « Statut mis à jour : Réparation en cours. » | 4.1.3 |
| Erreurs de formulaire | liées au champ par `aria-describedby`, `aria-invalid="true"`, focus déplacé sur le premier champ en erreur | 3.3.1 / 3.3.3 |
| Tableaux | vrai `<table>` avec `<th scope="col">` ; colonne triée signalée par `aria-sort` | 1.3.1 |
| Navigation active | `aria-current="page"` sur l'entrée et l'onglet actifs, en plus du gras et du soulignement | — |
| Animation | toute transition > 200 ms neutralisée sous `prefers-reduced-motion: reduce` | 2.3.3 |
| Couleur seule | interdite comme unique porteur de sens — voir les trois canaux de la [§ 8](./04-systeme-statuts.md) | 1.4.1 |
| Lien d'évitement | « Aller au contenu » en premier élément focusable de l'espace interne | 2.4.1 |

### Raccourcis clavier

Deux, pas davantage — un système complet serait de la sur-ingénierie pour ce produit :

- `/` place le focus dans le champ de recherche ;
- `Échap` ferme une modale ou un menu déroulant, et rend le focus à l'élément déclencheur.

Toute modale piège le focus tant qu'elle est ouverte.

### Vocabulaire

Les textes utilisent un vocabulaire simple et évitent le jargon technique ([§ 13](./07-contenu-redactionnel.md)).
