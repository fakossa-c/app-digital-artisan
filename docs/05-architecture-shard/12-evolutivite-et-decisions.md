# Évolutivité et décisions structurantes

> **Document :** Architecture technique (05) — projet digital-artisan (D-G), application D-g
> **Partie :** 12 / 12 · [Retour à l’index](./index.md)
> **Contenu :** Les évolutions possibles sans refonte, la position sur le multi-atelier, le tableau des vingt-six décisions structurantes avec leurs alternatives écartées, et les limites du document (sections 20, 21 et 22).

---

## 20. Évolutivité

Cette architecture permet d’ajouter sans modification fondamentale :

* un historique des statuts (table `repair_status_history` alimentée par trigger) ;
* des notifications par e-mail ou SMS ;
* des devis et des factures ;
* des pièces associées aux réparations ;
* des tableaux de bord simples ;
* de nouveaux rôles internes (une valeur de plus dans `user_role`).

Chaque évolution peut prendre la forme d’un nouveau domaine dans `features/` ou compléter un domaine existant.

**Sur le multi-atelier**, écarté du MVP : s’il devenait nécessaire, l’ajout d’une colonne `workshop_id` sur `profiles`, `clients` et `repairs`, plus une condition dans chaque policy, resterait une migration mécanique. L’ajouter aujourd’hui produirait une colonne toujours égale à la même valeur — un faux cloisonnement, qui est un piège de sécurité classique : on croit cloisonner, on ne cloisonne rien.

Une extraction vers une API ou un service métier séparé ne serait envisagée que si le produit devait gérer :

* plusieurs applications clientes ;
* des traitements asynchrones importants ;
* de nombreuses intégrations externes ;
* des opérations longues ;
* une logique métier beaucoup plus complexe.

Ces besoins ne justifient aucune complexité supplémentaire dans le MVP.

---

## 21. Décisions structurantes

| # | Décision | Choix retenu | Alternative écartée |
|---|---|---|---|
| 1 | Forme de l’application | Une seule application full-stack Next.js sur Vercel | Backend séparé (Express, NestJS) |
| 2 | Backend managé | Supabase — Auth, PostgreSQL, RLS | Serveur applicatif propriétaire |
| 3 | Rendu | Server Components par défaut ; composants clients seulement si l’interactivité l’exige | Application entièrement cliente |
| 4 | Mutations | Server Actions, déléguant à des fonctions métier | API REST interne systématique |
| 5 | Périmètre | **Mono-atelier** : aucune entité Atelier | Table `workshops` + `workshop_members` |
| 6 | Notes internes | **Table `repair_notes`** dédiée, append-only, avec auteur et horodatage | Champ `text` sur `repairs` |
| 7 | Lien public | **Colonne `public_token`** sur `repairs` | Table `tracking_links` (relation 1:1 sans attribut propre) |
| 8 | Clés primaires | `uuid` avec `gen_random_uuid()` | `bigint` séquentiel |
| 9 | Types temporels | `timestamptz` partout, affichage en `Europe/Paris` | `timestamp` |
| 10 | Rôles, états, statuts | `enum` PostgreSQL — génère les unions TypeScript | `text` + contrainte `CHECK` |
| 11 | Règle client-vélo | **Clé étrangère composite** `(client_id, bike_id) → bikes(client_id, id)` | Vérification applicative seule |
| 12 | Non-suppression | `REVOKE DELETE` + absence de policy + trigger — les trois | Un seul mécanisme |
| 13 | Vérification de l’état `active` en RLS | **`is_active_member()` dans toutes les policies** | `auth.uid() is not null` |
| 14 | Parade à la récursion RLS | `SECURITY DEFINER` en **`plpgsql`**, jamais en `sql` | Policy directe ; claims JWT |
| 15 | Accès public | **Fonction `get_public_repair()`** en RPC ; aucun privilège `anon` sur les tables | Policy `anon` ; `service_role key` |
| 16 | Transitions de statut | **Libres**, sauf verrouillage après `returned` (trigger) | Machine à états complète |
| 17 | Statut `cancelled` | **Présent** dès le MVP | Fiches erronées bloquées à vie |
| 18 | `updated_at` | Trigger `BEFORE UPDATE` | Code applicatif |
| 19 | Atomicité de la création | **RPC `create_repair`** | Trois appels JS successifs |
| 20 | Temps réel | **Aucun** — `revalidatePath()` | Supabase Realtime (hors stack) |
| 21 | Jeton public | UUID v4 généré en base, régénérable, sans expiration | `Math.random()` ; expiration après restitution |
| 22 | Recherche textuelle | `pg_trgm` + index GIN | `ILIKE` non indexé ; recherche plein texte |
| 23 | RGPD | **Anonymisation** réservée à l’administrateur | Suppression (impossible) ; statu quo (non conforme) |
| 24 | Premier administrateur | **Migration de seed idempotente** | « Premier inscrit promu » ; clic dans le dashboard |
| 25 | Migrations | Supabase CLI, SQL versionné dans Git | Modifications via l’interface web |
| 26 | Structure de code | **`src/`**, arborescence unique, `middleware.ts` dans `src/` | `app/` à la racine |

---

## 22. Limites du document

Ce document définit :

* la répartition des responsabilités techniques ;
* l’organisation de l’application ;
* les domaines fonctionnels ;
* le modèle de données et son DDL exécutable ;
* les politiques RLS et les fonctions de sécurité ;
* les flux principaux ;
* les décisions structurantes.

Il ne définit pas :

* les objectifs produit, décrits dans le PRD ;
* les écrans et comportements d’interface, décrits dans l’UX Design ;
* les technologies retenues, arrêtées dans la stack ;
* l’ordre de développement ;
* le découpage en Epics et User Stories ;
* le détail des tâches d’implémentation.
