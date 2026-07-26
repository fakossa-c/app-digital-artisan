# Dépendances, décisions et limites

> **Document :** Stack technique (03) — projet digital-artisan (D-G), application D-g
> **Partie :** 11 / 11 · [Retour à l'index](./index.md)
> **Contenu :** Les critères d'ajout d'une dépendance, le tableau des onze décisions techniques actées, la liste récapitulative de la stack figée, et le registre des neuf limites assumées avec leur levée envisagée (sections 18 à 21).

---

## 18. Dépendances autorisées

Une dépendance peut être ajoutée lorsqu’elle répond à un besoin précis, par exemple :

- gestion de dates ;
- affichage d’icônes ;
- génération de QR code pour le ticket d’atelier accroché au vélo.

Avant tout ajout, il faut vérifier que le besoin n’est pas déjà couvert par :

- Next.js ;
- React ;
- TypeScript ;
- Supabase ;
- PostgreSQL ;
- les API natives du navigateur.

Le projet doit éviter :

- les dépendances redondantes ;
- les abstractions prématurées ;
- les bibliothèques imposant une architecture disproportionnée ;
- l’ajout de services externes non nécessaires au MVP ;
- toute dépendance figurant dans la liste des exclusions de [§3](./02-versions-epinglees.md#dépendances-explicitement-écartées-du-socle).

---

## 19. Décisions techniques actées

Les onze arbitrages de la stack sont tranchés. Ils ne sont pas rouverts par les documents en aval.

| # | Décision | Choix retenu | Référence |
|---|---|---|---|
| 1 | Gestion des migrations | **Supabase CLI**, `supabase/migrations/` versionné, aucune modification via l’interface web | [§8](./06-migrations.md#8-migrations-de-base-de-données) |
| 2 | Nombre de projets Supabase | **2** : `d-g-dev` (local + preview) et `d-g-prod` (production) | [§14](./08-hebergement-et-deploiement.md#14-gestion-des-environnements) |
| 3 | Confirmation d’e-mail à l’inscription | **Désactivée** pour le MVP ; réactivation documentée comme dette | [§9](./07-auth-et-validation.md#confirmation-de-mail--désactivée-pour-le-mvp) |
| 4 | Bibliothèque de validation | **Zod v4**, schémas dans `src/lib/validation/` | [§10](./07-auth-et-validation.md#10-validation-des-données) |
| 5 | Outillage lint / format | **ESLint + Prettier** | [§15](./09-qualite-et-journalisation.md#15-qualité-du-code) |
| 6 | Application des règles de qualité | **CI GitHub Actions** + protection de branche sur `main` | [§15](./09-qualite-et-journalisation.md#protection-de-branche) |
| 7 | Génération du jeton public | **`gen_random_uuid()`** en valeur par défaut de colonne, avec contrainte `UNIQUE` | [`05-architecture-shard/`](../05-architecture-shard/04-schema-sql.md) §7 |
| 8 | `service_role key` | **Non provisionnée** | [§11](./08-hebergement-et-deploiement.md#règle-ferme-sur-la-clé-service_role) |
| 9 | Tests automatisés | **Hors périmètre** du MVP ; Vitest + Playwright nommés pour plus tard | [§15](./09-qualite-et-journalisation.md#tests-automatisés) |
| 10 | Journalisation des erreurs | **`console.error` + Runtime Logs Vercel**, rétention courte assumée | [§16](./09-qualite-et-journalisation.md#16-journalisation-des-erreurs) |
| 11 | Gestionnaire de paquets | **pnpm**, lockfile versionné, `packageManager` dans `package.json` | [§3](./02-versions-epinglees.md#3-versions-épinglées) |

---

## 20. Stack retenue

La stack de référence du projet est donc :

- Node.js 24 LTS et pnpm 10 ;
- Next.js 16.2 avec App Router ;
- React 19 ;
- TypeScript 5 en mode `strict` ;
- Tailwind CSS 4.1, configuré en CSS ;
- Supabase Database (PostgreSQL) ;
- Supabase Auth ;
- Supabase Row Level Security ;
- Supabase CLI pour les migrations et la génération des types ;
- `@supabase/ssr` et `@supabase/supabase-js` ;
- Zod 4 ;
- ESLint et Prettier ;
- GitHub Actions ;
- Vercel ;
- Git et GitHub.

Cette stack est **figée** pour le projet. Les documents suivants doivent expliquer comment elle est utilisée, sans remettre en cause les technologies retenues.

---

## 21. Limites assumées de la stack

Ce que la stack **ne couvre volontairement pas**, et qui constitue le registre des dettes techniques du projet :

| Limite | Conséquence | Levée envisagée |
|---|---|---|
| Aucun test automatisé (hors vérification RLS) | Les régressions ne sont détectées qu’à la relecture manuelle | Vitest + Playwright, hors MVP |
| Aucun suivi d’erreurs centralisé | Une erreur du week-end est perdue le lundi | Sentry, hors MVP |
| Aucun e-mail transactionnel métier | Le client n’est prévenu d’aucun changement de statut | SMTP dédié + notifications, hors MVP ([PRD §13](../02-PRD-shard/09-perimetre-et-limites.md#13-hors-périmètre)) |
| Confirmation d’e-mail désactivée | Une adresse non valide peut s’inscrire ; la barrière est le workflow `pending` → `active` | Réactivation + SMTP dédié en production |
| Plan gratuit Supabase | Mise en pause après 7 jours d’inactivité ; sauvegardes limitées | Plan payant si exploitation réelle |
| Plan Hobby Vercel | Usage commercial interdit ; rétention courte des logs | Plan Pro si exploitation réelle |
| Aucun temps réel | Un changement de statut n’apparaît chez les autres employés qu’à leur prochaine navigation | Supabase Realtime, décision de stack, hors MVP |
| Aucune limitation de débit sur `/suivi/[token]` | Risque de consommation de quota, non de confidentialité | Vercel Firewall ou middleware, hors MVP |
| Aucune gestion multi-ateliers | Le produit sert un atelier unique | Migration mécanique (`workshop_id`) si le besoin apparaît |

Un MVP se définit autant par ce qu’il exclut que par ce qu’il inclut. Chacune de ces lignes est une **décision**, pas un oubli.
