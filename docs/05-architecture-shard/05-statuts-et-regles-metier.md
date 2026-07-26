# Gestion des statuts et règles métier

> **Document :** Architecture technique (05) — projet digital-artisan (D-G), application D-g
> **Partie :** 5 / 12 · [Retour à l’index](./index.md)
> **Contenu :** Les sept valeurs de repair_status et leurs libellés, les transitions libres avec verrouillage après restitution, puis le tableau des règles métier, la clé étrangère composite et la non-suppression en défense en profondeur (sections 9 et 10).

---

## 9. Gestion des statuts

Les statuts forment un ensemble fermé, porté par le type `repair_status` :

| Valeur technique | Libellé interface |
|---|---|
| `deposited` | Vélo déposé |
| `diagnosis` | Diagnostic |
| `waiting_for_part` | En attente de pièce |
| `in_progress` | Réparation en cours |
| `ready_for_pickup` | Prêt à récupérer |
| `returned` | Restitué |
| `cancelled` | Annulé |

La base conserve la valeur technique stable ; l’interface affiche le libellé français correspondant. Une réparation ne possède qu’un seul statut courant.

Le statut **`cancelled`** répond à un besoin d’exploitation réel : aucune fiche n’étant supprimable, une fiche ouverte par erreur ou concernant un vélo jamais déposé resterait sinon éternellement en « Vélo déposé » dans la liste de travail. Le défaut serait apparu dès la première semaine d’exploitation.

### Transitions autorisées

**Toutes les transitions entre statuts sont libres, à une exception près : la fiche est verrouillée après le passage à `returned`.**

Cette liberté est une décision, pas un oubli. En atelier réel, les allers-retours sont fréquents : un diagnostic révèle un second problème, une pièce arrive et s’avère fausse, un vélo « prêt à récupérer » présente un défaut à la vérification finale. Un workflow rigide se retournerait contre l’utilisateur, et une erreur de saisie exigerait une intervention en base.

Le verrouillage après restitution clôt en revanche le cycle : la réparation est terminée, le vélo est rendu, la fiche devient un enregistrement historique.

**Mécanisme de garantie.** Le verrouillage n’est pas confié au code applicatif : il est porté par le trigger `repairs_guard_returned` (§8), qui rejette toute modification du statut, du client, du vélo, du réparateur, du problème ou du message public dès lors que la valeur précédente était `returned`. Le trigger s’applique à toutes les voies d’écriture, y compris une console SQL.

Deux points restent volontairement possibles après restitution :

* la **consultation** de la fiche, en interne comme sur le lien public — le PRD §10 l’exige ;
* l’**ajout de notes internes**, qui ne modifient pas `repairs` et documentent un éventuel retour du client ;
* la **régénération du jeton public** (§17), qui ne touche pas aux champs verrouillés.

Aucune machine à états n’est implémentée au-delà de cette règle. Le type `enum` garantit déjà qu’aucun statut inventé ne peut être inséré.

---

## 10. Règles métier principales

La couche applicative Next.js applique les règles suivantes. Celles qui sont critiques sont **également garanties en base** — la colonne « Garantie en base » indique par quel mécanisme.

| Règle | Garantie en base |
|---|---|
| Un employé doit avoir un profil `active` pour accéder à l’espace interne | `is_active_member()` dans **toutes** les politiques RLS (§11) |
| Seul un administrateur peut accepter ou refuser une inscription | Policy `profiles_update_admin` + trigger `profiles_guard_privileges` (§11) |
| Un employé ne peut pas s’activer lui-même ni se promouvoir | Trigger `profiles_guard_privileges` (§11) |
| Un vélo sélectionné doit appartenir au client associé à la réparation | **Clé étrangère composite** (voir ci-dessous) |
| Un réparateur assigné doit être un utilisateur existant | Clé étrangère `repairs.repairer_id → profiles` |
| Une réparation ne peut jamais être supprimée | `REVOKE DELETE` + absence de policy `DELETE` + trigger `prevent_delete()` |
| Une note interne ne peut être ni modifiée ni supprimée | Absence de policy `UPDATE`, `GRANT` limité à `select, insert`, trigger |
| Une réparation restituée est verrouillée | Trigger `repairs_guard_returned` (§9) |
| Une réparation restituée reste consultable | Aucune suppression, aucune expiration du jeton |
| Les notes internes ne sont jamais retournées dans le suivi public | Type de retour figé de `get_public_repair()` (§12) |
| Le suivi public ne donne accès qu’à la réparation correspondant au jeton | Aucun privilège `anon` sur les tables ; fonction filtrée par jeton (§12) |
| Un client doit avoir au moins un moyen de contact | Contrainte `clients_contact_required` |

### La clé étrangère composite

Deux clés étrangères indépendantes (`client_id → clients(id)` et `bike_id → bikes(id)`) laisseraient la base accepter une réparation associant le client A au vélo du client B. Une vérification purement applicative est sujette à une condition de course classique : entre le `SELECT` de vérification et l’`INSERT`, le vélo peut avoir changé de propriétaire.

La conséquence concrète serait une **fuite de données entre clients sur la seule page non authentifiée du produit** : le lien de suivi du client A afficherait le vélo du client B.

Le mécanisme retenu : PostgreSQL exige qu’une clé étrangère référence une contrainte `UNIQUE` ou `PRIMARY KEY`. On crée donc sur `bikes` une contrainte `UNIQUE (client_id, id)` — redondante en apparence, `id` étant déjà unique seul, mais **indispensable** comme cible référençable. `repairs` déclare alors une clé étrangère composite `(client_id, bike_id) → bikes(client_id, id)`.

La base **refuse structurellement** toute réparation dont le vélo n’appartient pas au client, quelle que soit la voie d’écriture : Server Action, RPC, console SQL ou appel direct à l’API Supabase. `ON UPDATE CASCADE` propage automatiquement un transfert de propriétaire vers les réparations liées.

Cette contrainte ne remplace pas la vérification applicative : la Server Action doit continuer à valider pour produire un message d’erreur clair. Mais la base devient la garantie, et non l’espoir.

### La non-suppression, en défense en profondeur

Trois mécanismes se cumulent, chacun couvrant une faille des autres :

| Mécanisme | Force | Faiblesse couverte par les autres |
|---|---|---|
| Absence de policy RLS `DELETE` | Simple, idiomatique Supabase | Ne protège que les rôles soumis à RLS ; silencieux (`0 ligne supprimée`, pas une erreur) |
| `REVOKE DELETE` | Bloque au niveau des privilèges, avant RLS ; erreur explicite | Ne s’applique ni au propriétaire de la table ni à `service_role` |
| Trigger `BEFORE DELETE` levant une exception | S’applique à **tous** les rôles ; message explicite ; auto-documenté dans le schéma | Contournable par `ALTER TABLE … DISABLE TRIGGER`, ce qui exige un acte administrateur délibéré |

Coût total : une quinzaine de lignes de SQL, pour une règle que le PRD, le brief et ce document énoncent chacun.

---
