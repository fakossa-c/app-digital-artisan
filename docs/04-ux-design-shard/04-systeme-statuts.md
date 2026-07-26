# Système de statuts

> **Document :** UX Design (04) — projet digital-artisan (D-G), application D-g
> **Partie :** 4 / 7 · [Retour à l’index](./index.md)
> **Contenu :** Les sept statuts avec leurs libellés, couleurs, contrastes, icônes et formes de pastille, l’anatomie de la pastille, les règles de transition, la frise de progression publique et les équivalents en mode sombre (section 8).

---

## 8. Système de statuts

Sept statuts. Ils sont représentés de façon identique dans toute l'application : liste, détail, filtre, page publique.

**Trois canaux d'information indépendants**, pour que la couleur ne soit jamais le seul moyen de comprendre :

1. le **libellé texte**, toujours présent — jamais de pastille sans mot ;
2. l'**icône**, distincte pour chaque statut, aucune forme réutilisée ;
3. la **forme** de la pastille — pleine, pointillée, avec point d'accent, atténuée, barrée.

Un utilisateur en niveaux de gris distingue les sept statuts par le texte et l'icône. Un utilisateur daltonien distingue « Prêt à récupérer » de « Restitué » par la double coche et l'atténuation, pas par la nuance de vert ; et « Annulé » de « Restitué » par le gris neutre, la croix et le trait barré.

| Statut (technique) | Libellé FR | Fond / texte | Contraste texte | Bordure (≥ 3:1) | Icône | Forme de pastille | Explication client |
|---|---|---|:---:|:---:|:---:|---|---|
| `deposited` | **Vélo déposé** | `#F1F5F9` / `#334155` | **9,45:1** | `#64748B` — 4,34:1 | Boîte (`package`) | Bordure pleine | Le vélo a bien été enregistré par l'atelier. |
| `diagnosis` | **Diagnostic** | `#EFF6FF` / `#1E40AF` | **8,01:1** | `#2563EB` — 4,75:1 | Loupe (`search`) | Bordure pleine | L'atelier évalue les travaux nécessaires. |
| `waiting_for_part` | **En attente de pièce** | `#FFFBEB` / `#78350F` | **8,75:1** | `#D97706` — 3,07:1 | Pause (`pause`) | Bordure **pointillée** — signale l'attente | La réparation est suspendue jusqu'à réception d'une pièce. |
| `in_progress` | **Réparation en cours** | `#F5F3FF` / `#5B21B6` | **8,19:1** | `#7C3AED` — 5,20:1 | Clé à molette (`wrench`) | Bordure pleine | Un réparateur intervient actuellement sur votre vélo. |
| `ready_for_pickup` | **Prêt à récupérer** | `#F0FDF4` / `#166534` | **6,81:1** | `#16A34A` — 3,15:1 | Coche (`check-circle`) | Bordure pleine **+ point d'accent** — appelle une action | Votre vélo est prêt, vous pouvez venir le récupérer. |
| `returned` | **Restitué** | `#ECFDF5` / `#065F46` | **7,29:1** | `#059669` — 3,58:1 | Double coche (`check-check`) | Pastille **atténuée** — cycle clos | Votre vélo vous a été rendu. Merci de votre confiance. |
| `cancelled` | **Annulé** | `#F4F4F5` / `#52525B` | **7,03:1** | `#71717A` — 4,40:1 | Croix cerclée (`x-circle`) | Pastille **barrée** — libellé en `line-through`, sans couleur d'accent | La réparation n'a pas eu lieu. |

Ratios calculés selon la formule WCAG 2.x. Le texte de chaque pastille dépasse 6:1 ; la bordure de 1,5 px assure le contraste non textuel ≥ 3:1, ce qui garantit que la pastille reste perceptible sans lire son texte.

**Choix de la couleur d'« Annulé ».** Gris **neutre** `#F4F4F5` / `#52525B` (famille zinc), volontairement distinct du gris **bleuté** de « Vélo déposé » (`#F1F5F9`, famille slate) et du vert de « Restitué ». « Restitué » est une fin heureuse, « Annulé » une fin sans objet : le statut ne doit ni féliciter, ni alarmer. Le trait barré et la croix cerclée le distinguent seuls, sans recours à la couleur.

### Anatomie de la pastille

```
┌──────────────────────────────┐
│ ⏸  En attente de pièce       │   hauteur 28 px, rayon 14 px
└──────────────────────────────┘   padding 4 / 12 px, texte 14 px semibold
     ↑ icône 16 px, aria-hidden      bordure 1,5 px
```

L'icône est décorative (`aria-hidden="true"`) puisque le libellé la double. Jamais d'icône seule sans texte accessible.

### Transitions

Toutes les transitions sont **libres**, dans les deux sens, à une exception près : une réparation passée à **« Restitué » est verrouillée** et n'accepte plus aucun changement de statut. En atelier, les allers-retours sont fréquents (un diagnostic révèle un second problème, une pièce arrive et s'avère fausse) : un workflow rigide se retournerait contre l'utilisateur.

L'interface reflète ce verrouillage : sur une réparation restituée, le bouton **Changer le statut** est remplacé par le texte « Cette réparation est clôturée. Le statut ne peut plus être modifié. »

« Annulé » n'est pas verrouillé : une fiche annulée par erreur se réouvre.

### Frise de progression de la page publique

Les six statuts du parcours nominal en ligne — « Annulé » n'y figure pas —, position courante marquée par le remplissage **et** par le texte :

```
 ●───●───●───○───○───○
Déposé          Récupérable

Étape 3 sur 6 : En attente de pièce
```

La ligne de texte sous la frise n'est pas décorative : c'est le seul contenu lisible par un lecteur d'écran, la frise elle-même portant `aria-hidden="true"`.

Sur une réparation annulée, la frise est **remplacée** — jamais complétée — par la pastille « Annulé » et son explication client.

### Statuts et filtres

Dans le filtre par statut, les options sont ordonnées selon l'ordre du workflow ci-dessus, jamais par ordre alphabétique. « Annulé » figure en dernier.

### Équivalents mode sombre

Préparés, hors périmètre MVP. Texte de pastille sur fond `#0F172A` :

`#CBD5E1` (12,02:1) · `#93C5FD` (9,90:1) · `#FCD34D` (12,38:1) · `#C4B5FD` (9,67:1) · `#86EFAC` (12,71:1) · `#6EE7B7` (11,71:1) · `#D4D4D8` (12,08:1, pour « Annulé »).
