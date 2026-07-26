# DESIGN.md

# Design System

## Vision

Design system minimaliste, moderne et orienté lisibilité.

- Palette principalement neutre (blancs, gris, anthracite)
- Une seule couleur d'accent : **bleu indigo**
- Faible profondeur (ombres légères)
- Coins légèrement arrondis (`6px`)
- Typographie sobre et professionnelle
- Compatible Light & Dark Mode

---

# Couleurs

## Light Theme

| Token | Valeur | Usage |
|-------|--------|-------|
| Background | Blanc | Fond principal |
| Foreground | Gris foncé | Texte |
| Card | Blanc | Cartes |
| Popover | Blanc | Menus |
| Primary | Indigo | Actions principales |
| Secondary | Gris très clair | Boutons secondaires |
| Muted | Gris très clair | Zones discrètes |
| Accent | Bleu clair | Hover / sélection |
| Destructive | Rouge | Erreurs |
| Border | Gris clair | Bordures |
| Input | Gris clair | Champs |
| Ring | Indigo | Focus |

### Palette

- Primary : `oklch(0.6231 0.1880 259.8145)`
- Accent : `oklch(0.9514 0.0250 236.8242)`
- Secondary : `oklch(0.9670 0.0029 264.5419)`
- Border : `oklch(0.9276 0.0058 264.5313)`

---

## Dark Theme

Interface sombre neutre.

- Fond : gris anthracite
- Cartes : légèrement plus claires
- Accent identique
- Contraste élevé

Palette :

- Background : `oklch(0.2046 0 0)`
- Card : `oklch(0.2686 0 0)`
- Foreground : `oklch(0.9219 0 0)`
- Primary : `oklch(0.6231 0.1880 259.8145)`

---

# Typographie

## Police principale

Inter

Utilisée pour :

- interface
- boutons
- formulaires
- tableaux
- navigation

---

## Serif

Source Serif 4

Réservée aux contenus éditoriaux.

---

## Monospace

JetBrains Mono

Pour :

- code
- terminal
- logs

---

# Rayon

Rayon de base :

`6px`

Échelle :

- Small : 2px
- Medium : 4px
- Large : 6px
- XL : 10px

---

# Ombres

Très discrètes.

Objectif :

Créer une hiérarchie sans effet "material".

Échelle :

- XS
- SM
- MD
- LG
- XL
- 2XL

Toutes utilisent une faible opacité (~10%).

---

# Espacement

Base :

`4px`

Toute la grille est basée sur des multiples de 4.

Exemples :

- 4
- 8
- 12
- 16
- 24
- 32
- 48
- 64

---

# Couleurs des graphiques

Palette monochrome bleue.

1. Indigo
2. Bleu soutenu
3. Bleu moyen
4. Bleu foncé
5. Indigo sombre

---

# Sidebar

Version claire :

- fond très clair
- accent bleu
- texte gris foncé

Version sombre :

- fond anthracite
- texte clair
- accent bleu

---

# Composants

## Bouton principal

- fond Primary
- texte blanc
- radius 6px

---

## Bouton secondaire

- fond Secondary
- texte gris
- hover Accent

---

## Card

- fond Card
- ombre légère
- bordure Border
- radius 6px

---

## Inputs

- fond Input
- bordure Border
- focus Ring

---

## Popover

Même style que les cartes.

---

## États

### Hover

Utiliser Accent.

### Focus

Utiliser Ring.

### Disabled

Utiliser Muted.

### Error

Utiliser Destructive.

---

# Bordures

Toutes les bordures utilisent :

`Border`

Épaisseur :

1px

---

# Contraste

Objectifs :

- lisibilité maximale
- très peu de couleurs
- hiérarchie créée par :
  - l'espacement
  - la typographie
  - les ombres
  - les surfaces

---

# Style général

Le système est inspiré de :

- Tailwind CSS
- shadcn/ui
- Linear
- Vercel
- Notion

Principes :

- minimal
- professionnel
- rapide à lire
- sans surcharge visuelle
- couleurs limitées
- interface discrète
- accent unique bleu
- compatible Light / Dark