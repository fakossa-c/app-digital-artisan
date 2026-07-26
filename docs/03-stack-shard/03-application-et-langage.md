# Application web et langage

> **Document :** Stack technique (03) — projet digital-artisan (D-G), application D-g
> **Partie :** 3 / 11 · [Retour à l'index](./index.md)
> **Contenu :** Le rôle de Next.js et de son App Router, le périmètre de l'application unique, l'usage de TypeScript en mode strict, et la procédure de génération des types Supabase depuis la base (sections 4 et 5).

---

## 4. Application web

### Next.js

Next.js constitue le framework principal de l’application.

Il prend en charge :

- les pages publiques et privées ;
- le rendu des interfaces React ;
- la navigation ;
- les traitements exécutés côté serveur ;
- les actions déclenchées depuis les formulaires ;
- la communication sécurisée avec Supabase.

L’application utilise l’App Router de Next.js.

Une seule application Next.js regroupe :

- l’espace public de suivi client ;
- l’authentification ;
- l’espace employé ;
- l’espace administrateur.

Aucun backend Next.js séparé ne doit être créé. Les fonctionnalités serveur nécessaires sont intégrées directement à l’application.

---

## 5. Langage

### TypeScript

L’ensemble du projet est développé en TypeScript, en mode `strict`.

Le typage doit couvrir :

- les composants ;
- les propriétés des composants ;
- les formulaires ;
- les données retournées par Supabase ;
- les rôles utilisateurs ;
- les statuts de réparation ;
- les fonctions exécutées côté serveur.

Le recours à `any` doit rester exceptionnel.

### Génération des types Supabase

Les types du schéma ne sont **jamais écrits à la main** : ils sont générés depuis la base.

```bash
pnpm exec supabase gen types typescript --linked > src/types/database.types.ts
```

Script correspondant, pour supprimer toute excuse :

```json
"scripts": {
  "db:types": "supabase gen types typescript --linked > src/types/database.types.ts"
}
```

Règles associées :

- le fichier `src/types/database.types.ts` est **versionné** dans Git : il sert de contrat lisible en revue de pull request ;
- il est **régénéré après chaque migration**, dans le **même commit** que la migration qui l’a rendue nécessaire ;
- il n’est **jamais édité à la main** — toute correction passe par une migration.

Les types énumérés PostgreSQL (`repair_status`, `user_role`, `user_status`) produisent des unions TypeScript exploitables directement dans le code : c’est la raison pour laquelle l’architecture retient des `enum` plutôt que des contraintes `CHECK`.
