# Fondations visuelles

> **Document :** UX Design (04) — projet digital-artisan (D-G), application D-g
> **Partie :** 2 / 7 · [Retour à l’index](./index.md)
> **Contenu :** La seule source de vérité visuelle : marque D-g, palette de couleurs avec ratios de contraste, typographie, espacement, formes, iconographie, variantes de boutons, champs de formulaire et position sur le mode sombre (section 6).

---

## 6. Fondations visuelles

La stack n'impose aucune bibliothèque de composants. Les valeurs ci-dessous constituent donc la seule source de vérité visuelle : elles sont exhaustives et fermées. Toute valeur absente de cette section ne doit pas apparaître dans l'interface.

### Marque D-g

Pour le MVP, l'identité est **celle de l'application, non paramétrable**. L'atelier étant unique, « l'identité visuelle de l'atelier » et l'identité D-g sont une seule et même chose.

- **Mot-symbole typographique**, pas de logo graphique : `D-g` composé dans la police de l'interface, `font-semibold`, couleur `#0F172A`. Un mot-symbole se remplace en une ligne de code le jour où la marque est figée.
- **Espace interne** : dans la barre supérieure, à gauche, 20 px, cliquable vers la liste des réparations.
- **Page publique** : en-tête centré au-dessus du contenu, 24 px, non cliquable — le client n'a nulle part où aller.
- **Titres de page** (`<title>`) : `Réparations — D-g` en interne, `Suivi de votre réparation — D-g` en public.
- Le nom est isolé dans une **constante unique** (`APP_NAME`) : un renommage ne doit toucher aucun écran.

### Couleurs de base

Ratios calculés selon la formule WCAG 2.x.

| Rôle | Valeur | Usage | Contraste |
|---|---|---|---|
| Texte principal | `#0F172A` | titres, valeurs | 17,85:1 sur blanc — AAA |
| Texte secondaire | `#475569` | libellés, métadonnées | 7,58:1 sur blanc — AAA |
| Fond application | `#F8FAFC` | fond de page interne | — |
| Surfaces | `#FFFFFF` | cartes, tableaux, formulaires | — |
| Bordures | `#E2E8F0` | séparateurs, contours de champs | non textuel |
| Accent / action | `#1D4ED8` | boutons primaires, liens | 6,70:1 avec texte blanc — AAA |
| Focus | `#2563EB` | anneau de focus | 5,17:1 sur blanc — au-delà des 3:1 requis |
| Danger | `#B91C1C` | refuser, annuler, anonymiser | 6,47:1 avec texte blanc — AAA |

Les couleurs des sept statuts figurent en [§ 8](./04-systeme-statuts.md) et n'ont pas d'autre usage.

### Typographie

Une seule famille, native : `ui-sans-serif, system-ui`. Aucune police à charger, aucun coût réseau, rendu correct sur la tablette d'atelier.

Échelle : 12 / 14 / 16 / 20 / 24 / 32 px. **Corps de texte à 16 px minimum**, sur la page publique comme en interne ; 14 px réservé aux métadonnées ; 12 px réservé aux libellés de colonnes. Graisses : 400 (courant), 500 (libellés), 600 (titres, boutons). Pas de graisse 700, pas d'italique.

### Espacement

Échelle de 4 px : 4, 8, 12, 16, 24, 32, 48. Aucune autre valeur.

### Formes

Rayon de bordure : 8 px (boutons, champs, cartes), 14 px (pastilles de statut), 12 px (modales). Ombres : une seule, discrète, sur les cartes et les modales. Pas de dégradé.

### Iconographie

Un seul jeu, monochrome, trait 1,5–2 px : **Lucide**, cohérent avec la dépendance « affichage d'icônes » déjà autorisée par la stack. Taille 16 px dans les pastilles, 20 px dans les boutons et la navigation.

Toute icône porteuse de sens est **doublée d'un texte visible**. Une icône seule n'existe que si elle est purement décorative, et elle porte alors `aria-hidden="true"`.

### Boutons

Hauteur **44 px minimum** ([§ 12](./06-responsive-et-accessibilite.md)), rayon 8 px, texte 16 px semibold, padding horizontal 16 px. Trois variantes, pas une quatrième :

| Variante | Fond | Texte | Bordure | Usage |
|---|---|---|---|---|
| Primaire | `#1D4ED8` | `#FFFFFF` | — | une seule par écran : l'action attendue |
| Secondaire | `#FFFFFF` | `#0F172A` | 1 px `#CBD5E1` | actions courantes |
| Danger | `#B91C1C` | `#FFFFFF` | — | refuser, annuler une réparation, anonymiser |

Un bouton en cours de soumission conserve sa largeur, change de libellé (« Enregistrement… »), passe en `disabled` et `aria-busy="true"`.

### Champs de formulaire

Hauteur 44 px, bordure 1 px `#CBD5E1` (contraste non textuel ≥ 3:1), fond blanc, libellé au-dessus du champ — jamais de libellé flottant ni de simple texte d'aide en guise de libellé. Champ en erreur : bordure `#B91C1C` 2 px, message en dessous, `aria-invalid="true"` et `aria-describedby` vers le message.

### Mode sombre

**Hors périmètre MVP.** L'atelier peu éclairé est traité par un contraste élevé en mode clair — tous les ratios retenus dépassent 6:1. Les équivalents sombres des statuts sont néanmoins pré-calculés en [§ 8](./04-systeme-statuts.md#équivalents-mode-sombre) pour qu'une V2 n'ait rien à réinventer.
