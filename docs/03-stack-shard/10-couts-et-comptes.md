# Coûts, quotas et propriété des comptes

> **Document :** Stack technique (03) — projet digital-artisan (D-G), application D-g
> **Partie :** 10 / 11 · [Retour à l'index](./index.md)
> **Contenu :** Les limites du tier gratuit Supabase et la mise en pause après sept jours, la restriction d'usage commercial du plan Hobby de Vercel, la propriété des trois comptes à trancher avec le client, le nommage des ressources externes et la position sur les sauvegardes (section 17).

---

## 17. Coûts, quotas et propriété des comptes

### Limites du tier gratuit Supabase

| Limite | Valeur | Incidence sur ce projet |
|---|---|---|
| **Mise en pause après 7 jours d’inactivité** | plan gratuit | **Le piège opérationnel le plus probable du projet.** Une formation étalée sur plusieurs semaines retrouvera un projet en pause et une application apparemment cassée, sans message explicite. |
| Projets actifs | 2 | Valide exactement le choix de [§14](./08-hebergement-et-deploiement.md#14-gestion-des-environnements) (`d-g-dev` + `d-g-prod`). |
| Taille de la base | 500 Mo | Sans contrainte pour ce MVP. |
| Utilisateurs actifs mensuels | 50 000 | Sans contrainte pour ce MVP. |
| SMTP mutualisé | quelques envois par heure | Motive la désactivation de la confirmation d’e-mail ([§9](./07-auth-et-validation.md#confirmation-de-mail--désactivée-pour-le-mvp)). |

**Mitigation de la mise en pause :** réactivation manuelle en un clic depuis le tableau de bord Supabase — **les données sont conservées**. Si les sessions de formation sont espacées de plus d’une semaine, prévoir une réactivation avant chaque séance.

### Vercel

Le plan **Hobby** est suffisant techniquement, mais **interdit l’usage commercial**. Si digital-artisan exploite réellement l’application dans son atelier, un plan **Pro** devient nécessaire. Point à signaler au client ; ce n’est pas un arbitrage technique.

### Propriété des comptes

| Service | Propriétaire | Compte / organisation |
|---|---|---|
| GitHub | *À compléter* | *À compléter* |
| Vercel | *À compléter* | *À compléter* |
| Supabase | *À compléter* | *À compléter* |

**À trancher avec digital-artisan avant la livraison.** Un projet livré sur un compte personnel de formateur est un projet non livré : prévoir explicitement le transfert de propriété des trois comptes, ou leur création directe au nom du client.

### Nommage des ressources externes

Le nom applicatif **D-g est provisoire**. Les identifiants techniques sont donc choisis descriptifs et stables, pour survivre à un changement de nom commercial.

| Ressource | Nom retenu | Remarque |
|---|---|---|
| Dépôt GitHub | `digital-artisan/d-g-suivi-reparations` | Descriptif plutôt que dépendant du nom commercial ; renommer un dépôt GitHub casse les URL existantes |
| Projet Vercel | `d-g-suivi-reparations` | Domaine de production à définir avec le client ; un domaine `.vercel.app` provisoire suffit à la formation |
| Projet Supabase (production) | `d-g-prod` | |
| Projet Supabase (développement) | `d-g-dev` | |

Un changement du nom applicatif affecterait le nom du projet Vercel et le domaine, **mais ni le dépôt, ni les projets Supabase, ni le schéma de base de données**. C’est précisément l’intérêt de ce choix de nommage.

### Sauvegardes

Le plan gratuit de Supabase n’offre qu’une couverture de sauvegarde limitée. Pour la durée de la formation, le risque est **assumé** : les données de démonstration ne sont pas critiques et sont reconstructibles depuis `supabase/seed.sql`.

Une exploitation réelle par l’atelier exige un plan payant offrant des sauvegardes quotidiennes et une fenêtre de restauration définie. À trancher avec le client avant toute mise en service.
