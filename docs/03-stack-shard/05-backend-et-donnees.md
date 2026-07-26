# Backend et données

> **Document :** Stack technique (03) — projet digital-artisan (D-G), application D-g
> **Partie :** 5 / 11 · [Retour à l'index](./index.md)
> **Contenu :** Les services Supabase utilisés, le tableau des deux clients Supabase et de leurs emplacements — le point de configuration le plus délicat de la stack — et ce que stocke PostgreSQL, avec les deux décisions structurantes de stack (section 7).

---

## 7. Backend et données

### Supabase

Supabase fournit les services backend de l’application.

Il prend en charge :

- la base de données ;
- l’authentification ;
- la gestion des sessions ;
- les autorisations d’accès aux données ;
- les opérations de lecture et d’écriture.

L’application ne possède pas de serveur backend indépendant.

### Les deux clients Supabase

Next.js communique avec Supabase à travers **deux clients distincts**, ce qui est le point de configuration le plus délicat de la stack :

| Contexte | Paquet | Emplacement | Rôle |
|---|---|---|---|
| Server Components, Server Actions, Route Handlers | `@supabase/ssr` | `src/lib/supabase/server.ts` | Lit et écrit les cookies de session côté serveur |
| Composants clients (`"use client"`) | `@supabase/ssr` | `src/lib/supabase/client.ts` | Client navigateur, session lue depuis les cookies |
| Rafraîchissement de session | `@supabase/ssr` | `src/middleware.ts` | Renouvelle le jeton à chaque navigation |

Les deux clients s’appuient sur `@supabase/supabase-js`, qui reste une dépendance transitive nécessaire au typage.

L’organisation exacte de ces fabriques relève de l’architecture ([`docs/05-architecture-shard/`](../05-architecture-shard/index.md), §7). La stack fixe les paquets, pas leur implémentation.

### PostgreSQL

La base de données PostgreSQL fournie par Supabase stocke :

- les profils utilisateurs ;
- les clients ;
- les vélos ;
- les réparations ;
- les notes internes ;
- le jeton public de suivi, porté par la réparation elle-même.

Le schéma précis de la base de données appartient au document d’architecture ([`docs/05-architecture-shard/`](../05-architecture-shard/index.md), §7) et n’est pas défini ici.

Deux précisions structurantes, qui sont des décisions de stack et non de schéma :

- **aucune entité Atelier** : l’application sert un atelier unique, l’appartenance est implicite (posséder un profil `active`) ;
- **aucune table de liens publics** : le jeton de suivi est une colonne de la réparation, la relation étant 1:1.
