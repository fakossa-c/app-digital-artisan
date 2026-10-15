# Versions épinglées

> **Document :** Stack technique (03) — projet digital-artisan (D-G), application D-g
> **Partie :** 2 / 11 · [Retour à l'index](./index.md)
> **Contenu :** Le tableau des versions retenues outil par outil avec leur justification, la fixation de Node et du gestionnaire de paquets dans le dépôt, et la liste des dépendances explicitement écartées du socle (section 3).

---

## 3. Versions épinglées

État de l’art vérifié au 26 juillet 2026. La version **mineure** est une décision du projet ; les correctifs peuvent flotter (`^`).

| Outil | Version retenue | Justification |
|---|---|---|
| **Node.js** | `24.x` (Active LTS) | Active LTS jusqu’en avril 2028. Node 22 est en Maintenance LTS ; Node 26 n’entre en LTS qu’en octobre 2026. Fixée via `engines`. |
| **pnpm** | `10.x` | Rapide, économe en disque, strict sur les dépendances fantômes. Un seul gestionnaire pour tout le projet, lockfile versionné. |
| **Next.js** | `16.2.x` (Active LTS) | Dernière version stable de la ligne LTS. App Router mature, Server Actions stabilisées. Ne pas viser 16.3 canary. |
| **React** | `19.x` | Imposée par Next.js 16 : aucune décision à prendre. |
| **TypeScript** | `5.x` (dernière stable) | Mode `strict` obligatoire, cohérent avec l’exigence de [§5](./03-application-et-langage.md#5-langage) (`any` exceptionnel). |
| **Tailwind CSS** | `4.1.x` | v4 stable. Configuration en CSS via `@theme`, **sans** `tailwind.config.js`. Installation via `@tailwindcss/postcss`. |
| **@supabase/supabase-js** | `2.x` | Client JavaScript officiel. |
| **@supabase/ssr** | `0.x` (dernière stable) | **Paquet officiel pour Next.js App Router.** Gère les cookies de session côté serveur. |
| **supabase** (CLI) | dernière stable, en `devDependency` | Migrations versionnées et génération des types. En dépendance de développement plutôt qu’en installation globale, pour aligner la version entre tous les postes. |
| **zod** | `4.x` | Validation serveur systématique exigée par l’architecture. Inférence de types native. |
| **eslint** + **eslint-config-next** | alignées sur Next.js 16 | Configuration par défaut de l’écosystème, la mieux documentée pour un public en formation. |
| **prettier** + **prettier-plugin-tailwindcss** | dernières stables | Formatage cohérent ; le plugin trie automatiquement les classes Tailwind. |

Fixation de la version de Node et du gestionnaire de paquets dans le dépôt :

```json
// package.json
{
  "packageManager": "pnpm@10.15.0",
  "engines": { "node": ">=24.0.0 <25" }
}
```

### Dépendances explicitement écartées du socle

À ne pas réintroduire par copier-coller depuis un tutoriel :

| Dépendance | Raison de l’exclusion |
|---|---|
| `@supabase/auth-helpers-nextjs` et tous les `@supabase/auth-helpers-*` | **Dépréciés depuis avril 2024** (dernière version 0.15.0, aucune maintenance). Remplacés par `@supabase/ssr`. Ils restent massivement présents dans les tutoriels et les réponses d’IA : leur installation est une erreur, pas une variante. |
| Bibliothèques de composants (shadcn/ui, MUI…) | Cohérent avec [§7](./05-backend-et-donnees.md#7-backend-et-données) : aucun socle visuel imposé dans le MVP. *(La règle est énoncée en [§6 — Interface utilisateur](./04-interface.md#6-interface-utilisateur).)* |
| Bibliothèques de gestion d’état global (Redux, Zustand…) | Server Components et `useState` suffisent à ce périmètre. |
| ORM (Prisma, Drizzle…) | Le client Supabase typé couvre le besoin ; un ORM dupliquerait la source de vérité du schéma. |
