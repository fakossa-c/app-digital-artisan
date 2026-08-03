# Hébergement, versionnement et environnements

> **Document :** Stack technique (03) — projet digital-artisan (D-G), application D-g
> **Partie :** 8 / 11 · [Retour à l'index](./index.md)
> **Contenu :** L'hébergement Vercel, le tableau des variables d'environnement et la règle ferme sur la clé `service_role`, les conventions Git et GitHub, les huit étapes de la chaîne de livraison, et la séparation en deux projets Supabase (sections 11 à 14).

---

## 11. Hébergement et déploiement

### Vercel

Vercel héberge l’application Next.js.

La plateforme prend en charge :

- la compilation du projet ;
- l’hébergement ;
- les variables d’environnement, définissables **par cible** (Production / Preview / Development) ;
- les déploiements de production ;
- les aperçus associés aux branches et aux pull requests.

Le projet Supabase reste hébergé séparément par Supabase.

### Variables d’environnement

| Variable | Portée | Exposée au navigateur | Cible Vercel |
|---|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | client + serveur | Oui, sans risque | Production, Preview, Development |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | client + serveur | Oui, sans risque — la RLS protège les données | Production, Preview, Development |
| `SUPABASE_SERVICE_ROLE_KEY` | — | **Jamais** | **Non provisionnée** (voir ci-dessous) |

### Règle ferme sur la clé `service_role`

> La `service_role key` **contourne intégralement toutes les politiques RLS**. Elle n’est **pas nécessaire à ce MVP** : toutes les opérations, y compris le suivi public, passent par la clé anonyme et des politiques RLS appropriées. Aucune variable contenant une clé serveur ne doit porter le préfixe `NEXT_PUBLIC_`.

**Décision : la `service_role key` n’est pas provisionnée dans ce projet**, ni en local, ni sur Vercel, ni dans aucun fichier `.env`.

Ne pas avoir la clé est la meilleure protection contre son mésusage. Un développeur bloqué par une politique RLS trouvera en ligne des dizaines de réponses conseillant de l’employer « pour que ça marche » — ce qui annulerait d’un coup tout le modèle de sécurité en profondeur de l’architecture. **Si une opération semble exiger cette clé, c’est le signe qu’une politique RLS est à corriger, pas qu’il faut la contourner.**

Les secrets ne doivent jamais être ajoutés au dépôt GitHub ni exposés dans du code exécuté côté client. Le fichier `.env.local` est listé dans `.gitignore` ; un `.env.example` sans valeur documente les variables attendues.

---

## 12. Versionnement et collaboration

### Git

Git assure le suivi des modifications du code source.

Le projet utilise :

- une branche principale stable : `main` ;
- des branches de travail courtes, nommées `story/<numéro>-<slug>` — par exemple `story/4.3-creer-reparation` ;
- des commits au format **Conventional Commits** : `feat:`, `fix:`, `chore:`, `docs:`, `refactor:` ;
- des pull requests pour intégrer toute évolution.

Ces conventions relient directement l’historique du dépôt au découpage en stories du document [`07-epics-stories.md`](../07-epics-stories.md), et rendent l’historique lisible sans effort supplémentaire.

### GitHub

GitHub héberge le dépôt distant du projet.

Il centralise :

- le code source ;
- l’historique des modifications ;
- les branches ;
- les pull requests ;
- les revues de code ;
- l’intégration continue ;
- les éventuels tickets de travail.

GitHub constitue la source de référence du code de l’application — **et du schéma de base de données**, via `supabase/migrations/`.

---

## 13. Chaîne de livraison

Le flux de livraison attendu est le suivant :

1. Le développeur travaille sur une branche `story/<numéro>-<slug>`.
2. Il pousse ses modifications sur GitHub.
3. L’intégration continue exécute les contrôles de qualité ([§14](#14-gestion-des-environnements) — les contrôles eux-mêmes sont décrits en [§15](./09-qualite-et-journalisation.md#intégration-continue)).
4. Une pull request permet de relire et de valider le travail.
5. Vercel génère un déploiement de prévisualisation, pointant sur le projet Supabase de développement.
6. La fusion dans `main` est **bloquée** tant que les contrôles ne passent pas.
7. La fusion dans `main` déclenche le déploiement en production.
8. Les migrations de schéma sont appliquées explicitement (`supabase db push`) sur le projet correspondant à l’environnement.

---

## 14. Gestion des environnements

### Deux projets Supabase

| Environnement | Projet Supabase | Origine du déploiement | Variables |
|---|---|---|---|
| Local (`pnpm dev`) | `d-g-dev` | poste du développeur | `.env.local` |
| Preview (pull requests Vercel) | `d-g-dev` | branches de pull request | Cible *Preview* sur Vercel |
| Production | `d-g-prod` | branche `main` | Cible *Production* sur Vercel |

**Décision : deux projets Supabase**, ce que le tier gratuit permet exactement (2 projets actifs).

Les déploiements de prévisualisation pointent sur le projet de **développement**, jamais sur la production. C’est le seul arbitrage qui satisfait l’exigence de séparation des données sans dépasser le quota gratuit. Vercel permettant de définir les variables d’environnement par cible, la séparation est triviale à configurer.

Les données de développement ne doivent jamais être mélangées avec les données réelles de production : le `seed.sql` ([§8](./06-migrations.md#données-de-démonstration)) ne s’exécute que sur `d-g-dev`.

**Alternative écartée :** le développement local sur une instance Supabase locale (`supabase start`, via Docker), plus propre conceptuellement mais qui impose une dépendance Docker sur chaque poste de formation. À considérer comme évolution possible, pas comme socle.
