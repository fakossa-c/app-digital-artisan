# Qualité du code et journalisation

> **Document :** Stack technique (03) — projet digital-artisan (D-G), application D-g
> **Partie :** 9 / 11 · [Retour à l'index](./index.md)
> **Contenu :** L'outillage ESLint et Prettier, le fichier de workflow GitHub Actions, la protection de branche sur `main`, la décision de ne pas écrire de tests automatisés dans le MVP, et les règles de journalisation des erreurs (sections 15 et 16).

---

## 15. Qualité du code

### Outillage retenu

**ESLint (via `eslint-config-next`) + Prettier.** C’est le choix par défaut de l’écosystème Next.js, le mieux documenté pour un public en formation.

Biome, plus rapide et unifiant lint et formatage, a été écarté pour cette seule raison pédagogique : sa documentation croisée avec Next.js reste plus mince.

Le plugin `prettier-plugin-tailwindcss` trie automatiquement les classes Tailwind, ce qui évite des discussions inutiles en revue.

### Intégration continue

Les contrôles sont exécutés par GitHub Actions à chaque pull request :

```yaml
# .github/workflows/ci.yml
name: CI
on: [pull_request]
jobs:
  quality:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v5
      - uses: pnpm/action-setup@v4
      - uses: actions/setup-node@v5
        with:
          node-version: 24
          cache: pnpm
      - run: pnpm install --frozen-lockfile
      - run: pnpm exec tsc --noEmit
      - run: pnpm lint
      - run: pnpm build
```

### Protection de branche

La branche `main` est protégée : *Settings → Branches → Require status checks to pass before merging*, avec le job `quality` en statut requis.

**Sans cette case cochée, la CI est décorative.** C’est cette configuration — et non la discipline humaine — qui garantit qu’une modification ne peut pas être fusionnée lorsque la compilation échoue, que le contrôle TypeScript échoue, ou que des erreurs de linting bloquantes sont présentes.

**Hooks pre-commit : écartés explicitement.** Ils ralentissent la boucle de retour et sont contournables (`--no-verify`). La CI est la barrière qui compte.

### Tests automatisés

**Décision : aucun test automatisé dans le périmètre du MVP.** La validation repose sur les critères d’acceptation du [PRD §11](../02-PRD-shard/07-criteres-acceptation.md#11-critères-dacceptation), vérifiés manuellement.

Une seule exception recommandée par l’architecture : un fichier SQL de vérification des politiques RLS ([`docs/05-architecture-shard/`](../05-architecture-shard/08-migrations-et-seed.md#vérification-des-politiques-rls), §14). Une policy défaillante ne provoque aucune erreur visible — elle retourne trop de lignes, silencieusement. Ni la revue de code, ni le contrôle TypeScript, ni un test d’interface ne l’attrapent.

Si des tests sont introduits ultérieurement, l’outillage retenu sera **Vitest** pour les fonctions métier et **Playwright** pour les parcours de bout en bout. Cette décision est prise d’avance pour éviter un débat, pas pour être appliquée dans le MVP.

---

## 16. Journalisation des erreurs

**Décision : `console.error` côté serveur, consulté dans les Runtime Logs de Vercel.** Aucun service externe n’est introduit dans le MVP.

Règles :

- journaliser l’erreur technique **complète** côté serveur ; ne jamais la renvoyer à l’interface ;
- utiliser un format structuré (JSON) avec un **identifiant de corrélation** renvoyé à l’utilisateur (« Une erreur est survenue. Référence : `a3f9c2` ») : coût quasi nul, gain de débogage réel ;
- **ne jamais journaliser le jeton public de suivi** (il donne accès à la fiche) ni les coordonnées des clients.

**Limite assumée.** Les Runtime Logs du plan Hobby de Vercel ont une **rétention courte** et ne sont pas requêtables sur la durée : une erreur survenue le week-end aura disparu le lundi. Sentry serait le choix professionnel — hors périmètre du MVP, inscrit au registre des dettes ([§17](./10-couts-et-comptes.md#17-coûts-quotas-et-propriété-des-comptes)).
