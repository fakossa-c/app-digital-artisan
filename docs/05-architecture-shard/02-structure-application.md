# Structure de l’application Next.js

> **Document :** Architecture technique (05) — projet digital-artisan (D-G), application D-g
> **Partie :** 2 / 12 · [Retour à l’index](./index.md)
> **Contenu :** L’arborescence de référence du dossier src/, l’articulation entre app/ et features/, les groupes de routes et le point d’attention sur l’emplacement de middleware.ts (section 6).

---

## 6. Structure de l’application Next.js

Le code applicatif est placé dans `src/`, ce qui l’isole des fichiers de configuration de la racine. **Une seule arborescence** fait référence :

```text
src/
├── app/                     # App Router — points d'entrée uniquement
│   ├── (auth)/
│   │   ├── connexion/
│   │   ├── inscription/
│   │   └── mot-de-passe-oublie/
│   ├── (internal)/
│   │   ├── reparations/
│   │   ├── employes/
│   │   └── compte/
│   ├── suivi/
│   │   └── [token]/
│   └── layout.tsx
│
├── middleware.ts            # rafraîchissement de session, protection des routes
│
├── components/              # composants transverses
│
├── features/                # un dossier par domaine (§5)
│   ├── auth/
│   ├── employees/
│   ├── repairs/
│   └── tracking/
│
├── lib/
│   ├── supabase/            # fabriques de clients serveur / navigateur
│   ├── validation/          # schémas Zod (§15)
│   └── permissions/         # vérifications applicatives (§10)
│
└── types/
    └── database.types.ts    # généré depuis Supabase, jamais édité à la main
```

Les groupes de routes `(auth)` et `(internal)` séparent les pages d’authentification, l’espace interne protégé et l’espace public sans apparaître dans les URL.

**Articulation entre `app/` et `features/` :** les composants et fonctions métier vivent dans `features/`. Les fichiers de `app/` restent des points d’entrée fins — page, layout, Server Action — cohérent avec le §3 (« les Server Actions restent des points d’entrée légers »).

**Point d’attention sur `middleware.ts`.** Avec la convention `src/`, le middleware se place dans **`src/middleware.ts`**, jamais à la racine du projet. Placé à la racine alors que le code est dans `src/`, il est **silencieusement ignoré** : aucune erreur n’est levée, mais le rafraîchissement de session cesse et l’espace interne n’est plus protégé.

Cette structure définit une organisation par domaine sans imposer un découpage excessif.
