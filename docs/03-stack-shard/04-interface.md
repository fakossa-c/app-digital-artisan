# Interface utilisateur

> **Document :** Stack technique (03) — projet digital-artisan (D-G), application D-g
> **Partie :** 4 / 11 · [Retour à l'index](./index.md)
> **Contenu :** L'organisation des composants React et la préférence pour les composants serveur, puis Tailwind CSS 4.1 avec le point de vigilance sur la configuration en CSS et l'absence de `tailwind.config.js` (section 6).

---

## 6. Interface utilisateur

### React

React est utilisé à travers Next.js pour construire l’interface.

Les composants doivent rester simples et organisés par responsabilité :

- composants de mise en page ;
- composants de formulaire ;
- composants d’affichage ;
- composants métier réutilisables.

Les composants serveur sont privilégiés par défaut. Les composants clients sont réservés aux interfaces nécessitant de l’interactivité dans le navigateur.

### Tailwind CSS

Tailwind CSS 4.1 est utilisé pour les styles.

Il permet :

- de construire rapidement l’interface ;
- de conserver une présentation cohérente ;
- d’éviter la multiplication de fichiers CSS ;
- de faciliter l’adaptation aux écrans mobiles.

**Point de vigilance sur la version 4.** Tailwind v4 s’installe via `@tailwindcss/postcss` et se configure **entièrement en CSS** :

```css
/* src/app/globals.css */
@import "tailwindcss";

@theme {
  /* personnalisation du thème ici */
}
```

Il n’existe **plus de `tailwind.config.js`**. Un fichier de configuration créé en suivant un tutoriel v3 serait silencieusement ignoré — c’est une source d’erreur fréquente et difficile à diagnostiquer.

Aucune bibliothèque complète de composants visuels n’est imposée dans le socle du projet. Elle ne pourra être ajoutée que si elle apporte un bénéfice pédagogique ou fonctionnel clairement identifié.
