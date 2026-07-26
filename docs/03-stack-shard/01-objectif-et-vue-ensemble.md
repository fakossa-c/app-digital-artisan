# Objectif et vue d'ensemble

> **Document :** Stack technique (03) — projet digital-artisan (D-G), application D-g
> **Partie :** 1 / 11 · [Retour à l'index](./index.md)
> **Contenu :** L'en-tête du document, les principes qui guident le choix des outils, et le tableau de correspondance entre chaque besoin et la technologie retenue (sections 1 et 2).

---

# Stack technique

**Client :** digital-artisan (D-G)
**Application :** D-g — *nom provisoire, à valider avant la mise en production*
**Version du document :** 2.0
**Statut :** stack figée — les documents en aval ne remettent pas en cause les technologies retenues
**Date de dernière mise à jour :** 2026-07-26

**S'appuie sur :** `docs/01-brief.md`, `docs/02-PRD-shard/`
**Documents en aval :** `docs/04-ux-design-shard/`, `docs/05-architecture-shard/`, `docs/06-plan.md`, `docs/07-epics-stories.md`

---

## 1. Objectif

La stack doit permettre de développer, déployer et maintenir l’application avec un nombre limité d’outils.

Elle privilégie :

- une architecture simple à comprendre ;
- un développement rapide ;
- un typage cohérent de bout en bout ;
- des services managés limitant la configuration serveur ;
- un déploiement continu à partir du dépôt GitHub.

Aucune technologie supplémentaire ne doit être introduite sans répondre à un besoin réel du MVP.

L’application sert **un seul atelier**. La gestion multi-ateliers est hors périmètre ([PRD §13](../02-PRD-shard/09-perimetre-et-limites.md#13-hors-périmètre)) : aucune entité Atelier n’existe dans le produit, à aucun niveau.

---

## 2. Vue d’ensemble

| Besoin | Technologie |
|---|---|
| Application web | Next.js |
| Langage | TypeScript |
| Interface utilisateur | React |
| Styles | Tailwind CSS |
| Backend | Supabase |
| Base de données | PostgreSQL via Supabase |
| Authentification | Supabase Auth |
| Migrations de schéma | Supabase CLI |
| Validation des données | Zod |
| Hébergement | Vercel |
| Gestion du code source | Git |
| Dépôt distant | GitHub |
| Intégration continue | GitHub Actions |
| Déploiement continu | GitHub vers Vercel |
