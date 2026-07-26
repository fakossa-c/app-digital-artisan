# Validation, erreurs et accès publics

> **Document :** Architecture technique (05) — projet digital-artisan (D-G), application D-g
> **Partie :** 9 / 12 · [Retour à l’index](./index.md)
> **Contenu :** La validation serveur avec Zod, la typologie des erreurs et la journalisation avec identifiant de corrélation, puis les propriétés du jeton public et le risque de limitation de débit nommé et accepté (sections 15, 16 et 17).

---

## 15. Validation des données

Toutes les données provenant d’un formulaire sont validées **côté serveur** avant leur utilisation, avec **Zod** (`docs/03-stack.md` §10). Un schéma par entité, dans `src/lib/validation/`.

La validation couvre :

* les champs obligatoires ;
* le format des adresses e-mail ;
* les identifiants (format UUID) ;
* les rôles et les états, contre les unions générées depuis les `enum` PostgreSQL ;
* les statuts, contre l’union `repair_status` ;
* la cohérence entre le client et le vélo ;
* l’existence et l’état du réparateur assigné ;
* les longueurs maximales, alignées sur les contraintes `CHECK` du schéma.

Les longueurs déclarées dans les schémas Zod doivent correspondre à celles du DDL. En cas d’écart, la base gagne — mais l’utilisateur reçoit alors une erreur technique au lieu d’un message clair. C’est la raison d’aligner les deux.

La validation côté navigateur peut améliorer l’expérience, mais elle ne remplace jamais la validation côté serveur.

---

## 16. Gestion des erreurs et journalisation

Les erreurs sont distinguées selon leur nature :

| Nature | Traitement |
|---|---|
| Données invalides | Message de champ, formulaire conservé |
| Session absente | Redirection vers la connexion |
| Permission insuffisante | Message neutre, sans révéler l’existence de la ressource |
| Ressource introuvable | Message neutre |
| Conflit métier (fiche restituée verrouillée, par exemple) | Message explicite et actionnable |
| Erreur technique inattendue | Message générique + identifiant de corrélation |

L’interface reçoit un message compréhensible, sans exposer :

* de requête SQL ;
* de trace technique ;
* de secret ;
* d’information sur une ressource non autorisée.

### Journalisation

`console.error` côté serveur, consulté dans les Runtime Logs de Vercel (`docs/03-stack.md` §16).

Format retenu : JSON structuré, avec un **identifiant de corrélation** renvoyé à l’utilisateur.

```ts
const correlationId = crypto.randomUUID().slice(0, 6);
console.error(JSON.stringify({
  correlationId,
  action: 'updateRepairStatus',
  repairId,
  code: error.code,
  message: error.message,
}));
// Interface : « Une erreur est survenue. Référence : a3f9c2 »
```

**Règle de sécurité sur les journaux :** ne jamais journaliser le **jeton public** — il donne accès à la fiche — ni les **coordonnées des clients**. Le §16 protège l’affichage ; les journaux méritent la même discipline.

**Limite assumée :** la rétention des Runtime Logs sur le plan Hobby est courte. Une erreur survenue le week-end aura disparu le lundi. Une supervision externe (Sentry) est hors périmètre du MVP et inscrite au registre des dettes de la stack.

---

## 17. Gestion des accès publics

Le lien public n’utilise jamais l’identifiant interne de la réparation.

Chaque réparation possède un jeton public aléatoire et unique :

```text
/suivi/7fd53f90-4ae1-49a6-93c2-b3c8a41f5d02
```

| Propriété | Décision |
|---|---|
| **Format** | UUID v4 — 122 bits d’entropie, issus du générateur cryptographique de `pgcrypto`. Deviner un jeton valide est hors de portée. |
| **Génération** | En base, par la valeur par défaut de la colonne. Jamais par le code applicatif : un jeton existe donc quelle que soit la voie d’insertion, et l’unicité est portée par la contrainte `UNIQUE`. |
| **Expiration** | **Aucune.** Le PRD §10 exige qu’une réparation restituée reste consultable ; faire expirer le lien priverait le client de sa trace. |
| **Révocation** | **Régénération possible**, réservée à l’administrateur : un simple `UPDATE` de la colonne. Un client peut avoir transféré son lien (SMS retransmis, capture d’écran) ; l’atelier doit pouvoir le couper. Aucune migration n’est nécessaire, la colonne et l’index le permettent déjà. |

La possession du lien donne uniquement un droit de consultation limité. Le jeton ne permet pas :

* de modifier la réparation ;
* de consulter les notes internes ;
* de consulter les coordonnées du client ;
* de parcourir les autres réparations ;
* d’accéder à l’espace employé.

### Limitation de débit — risque nommé et accepté

Aucune limitation de débit n’est mise en place sur `/suivi/[token]` dans le MVP. Le risque doit être **nommé plutôt qu’ignoré** :

* **Ce n’est pas un risque de confidentialité.** Avec 2^122 possibilités, le forçage brut est sans espoir.
* **C’est un risque de disponibilité et de facturation.** Chaque requête, même sur un jeton invalide, consomme une invocation de fonction Vercel et une requête Supabase. Un script mal intentionné ou un robot d’indexation agressif peut épuiser les quotas du plan gratuit et rendre l’application indisponible pour l’atelier, sans jamais accéder à une donnée.
* **Oracle de validité.** Si la réponse différait entre jeton inexistant et jeton existant (code HTTP, temps de réponse), un attaquant possédant une liste de jetons candidats pourrait les trier.

Mesures retenues dans le MVP, proportionnées :

1. **Cache HTTP** — `export const revalidate = 60` sur la page publique. Absorbe l’essentiel des requêtes répétées sans infrastructure supplémentaire, et se combine bien avec le `revalidatePath` qui invalide le cache dès un vrai changement de statut.
2. **Réponse uniforme** — même code HTTP et même rendu pour un jeton invalide, inexistant ou en erreur.
3. **Validation du format avant appel** — un jeton mal formé n’atteint jamais la base.
4. **`noindex`** sur la page publique (§12).

Une limitation par adresse IP (Vercel Firewall ou middleware avec compteur) est hors stack et reportée hors MVP.

---
