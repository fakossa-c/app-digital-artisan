# Recherche et filtres

> **Document :** Architecture technique (05) — projet digital-artisan (D-G), application D-g
> **Partie :** 10 / 12 · [Retour à l’index](./index.md)
> **Contenu :** L’exécution serveur des filtres, le point d’implémentation sur les jointures !inner qui conditionne l’usage des index trigrammes, et le pattern chercher-ou-créer d’un client existant (section 18).

---

## 18. Recherche et filtres

La recherche par client ou vélo et les filtres par statut ou réparateur sont exécutés à partir de paramètres transmis à la couche serveur.

```text
Liste des réparations
    │
    ├── terme de recherche  ──► clients.name, bikes.brand, bikes.model
    ├── statut              ──► repairs.status
    └── réparateur          ──► repairs.repairer_id
            │
            ▼
Requête Supabase filtrée, jamais un filtrage dans le navigateur
```

Le filtrage est réalisé au niveau de la requête, jamais en chargeant toutes les réparations dans le navigateur.

**Point d’implémentation qui décide de l’efficacité des index.** La recherche porte sur `clients.name`, `bikes.brand` et `bikes.model`, mais s’exécute depuis la **liste des réparations**, donc à travers deux jointures. L’index trigramme sur `clients.name` n’est utilisé que si le planificateur filtre `clients` **avant** la jointure. La requête doit donc filtrer explicitement sur les tables jointes — via la syntaxe `!inner` du client Supabase — et non ramener les réparations pour filtrer ensuite :

```ts
supabase
  .from('repairs')
  .select('*, clients!inner(name), bikes!inner(brand, model)')
  .ilike('clients.name', `%${term}%`);
```

### Recherche d’un client existant

Le formulaire de création d’une réparation **doit** permettre de retrouver un client existant avant d’en créer un nouveau. Ce n’est pas un confort : sans lui, l’employé recrée client et vélo à chaque visite. Au bout de quelques mois, « Dupont Martin », « M. Dupont » et « dupont martin » coexistent, la recherche par client devient inutilisable, et l’historique par vélo — un argument de valeur du produit — disparaît. La dégradation est **irréversible**.

Le pattern retenu est *chercher ou créer* :

```text
Étape 1 — Client
    │
    ├── champ de recherche (trigramme sur clients.name)
    │      ├── résultat sélectionné ──► p_client_id renseigné
    │      └── aucun résultat ──► formulaire de création
    │
    ▼
Étape 2 — Vélo
    │
    ├── liste restreinte aux vélos DU CLIENT SÉLECTIONNÉ
    │      ├── vélo sélectionné ──► p_bike_id renseigné
    │      └── nouveau vélo ──► formulaire de création
```

Restreindre la liste des vélos au client sélectionné rend la règle d’intégrité du §10 vérifiable côté interface, en amont de la contrainte de base.

---
