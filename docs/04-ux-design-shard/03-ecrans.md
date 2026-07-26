# Écrans

> **Document :** UX Design (04) — projet digital-artisan (D-G), application D-g
> **Partie :** 3 / 7 · [Retour à l’index](./index.md)
> **Contenu :** Les dix-huit écrans du MVP avec leurs wireframes : authentification, liste et détail des réparations, création chercher-ou-créer, clients et vélos, employés, espace public de suivi et écrans d’erreur (section 7).

---

## 7. Écrans

Dix-huit écrans ou états d'écran composent le MVP. Ils sont regroupés par espace.

### 7.1 — Espace d'authentification

#### Connexion

L'écran contient :

- l'adresse e-mail ;
- le mot de passe ;
- l'action **Se connecter** ;
- un lien « Mot de passe oublié » ;
- un lien vers l'inscription employé.

Les messages d'erreur sont précis sans révéler d'information sensible (formulations exactes en [§ 13](./07-contenu-redactionnel.md)).

#### Inscription employé

Le formulaire demande uniquement :

- nom ;
- adresse e-mail ;
- mot de passe — les règles de longueur sont affichées **avant** la saisie, pas seulement en cas d'erreur.

Après validation, un écran confirme que la demande est en attente d'acceptation par l'administrateur.

L'utilisateur ne peut pas accéder à l'espace interne tant que son compte n'est pas validé.

#### Compte en attente de validation

Écran atteint lorsqu'un utilisateur dont le compte est encore en attente parvient à se connecter. Il ne doit **pas** voir un message d'accès refusé, qui serait incompréhensible.

> « Votre compte est en attente de validation par l'administrateur de l'atelier.
> Vous recevrez l'accès dès qu'il aura accepté votre demande. »

Une seule action : **Se déconnecter**.

Le cas d'un compte refusé affiche un message distinct : « Votre demande d'accès n'a pas été acceptée. Contactez l'administrateur de l'atelier. »

#### Mot de passe oublié

Un champ e-mail, un bouton **Envoyer le lien de réinitialisation**.

Le message de retour est **identique que l'adresse existe ou non** :

> « Si un compte existe pour cette adresse, un lien de réinitialisation vient d'être envoyé. »

#### Nouveau mot de passe

Écran atteint depuis le lien reçu par e-mail. Deux champs (nouveau mot de passe, confirmation), les règles de longueur affichées avant la saisie, un bouton **Enregistrer le mot de passe**. En cas de lien expiré : « Ce lien de réinitialisation n'est plus valide. Demandez-en un nouveau. » avec un lien vers l'écran précédent.

---

### 7.2 — Réparations

#### Liste des réparations

Écran principal de l'espace interne et page d'entrée après connexion.

**Onglets de portée**, en tête de liste, pilotés par un paramètre d'URL :

| Onglet | URL | Contenu | Par défaut pour |
|---|---|---|---|
| Mes réparations | `?portee=mes` | réparations assignées à l'utilisateur, statut non clos | employé |
| En cours | `?portee=en-cours` | tous statuts sauf « Restitué » et « Annulé » | administrateur |
| Toutes | `?portee=toutes` | tout, y compris les fiches closes | — |

L'onglet actif est signalé par le libellé en gras **et** un soulignement 2 px `#1D4ED8` **et** `aria-current="page"`.

**Un seul composant, deux mises en page.** La même donnée, deux rendus CSS, aucune duplication de logique : sous 768 px une carte empilée, au-delà un vrai `<table>` avec `<th scope="col">`. Toute la ligne ou la carte est cliquable, sur une hauteur d'au moins 44 px. L'ordre d'importance est identique dans les deux rendus : statut, client, vélo, réparateur, date de modification.

```
Liste des réparations — ≥ 768 px

┌────────────────────────────────────────────────────────────────────────────┐
│  Réparations                                        [ + Nouvelle ]         │
│  ┌─────────────────┬────────────┬──────────┐                               │
│  │ Mes réparations │ En cours   │ Toutes   │                               │
│  └─────────────────┴────────────┴──────────┘                               │
│                                                                            │
│  🔍 Rechercher un client ou un vélo    [ Statut ▾ ] [ Réparateur ▾ ]       │
│  47 réparations · 12 en cours                    Effacer les filtres (2)   │
│                                                                            │
│  ┌────────────┬───────────────┬─────────────────────┬────────────┬───────┐ │
│  │ Client   ▲ │ Vélo          │ Statut              │ Réparateur │ Modifié│ │
│  ├────────────┼───────────────┼─────────────────────┼────────────┼───────┤ │
│  │ M. Dupont  │ VTC Btwin     │ ⏸ En attente de p…  │ S. Martin  │ 2 h   │ │
│  │ L. Nguyen  │ Route Trek    │ 🔧 Réparation en c… │ K. Belaïd  │ 4 h   │ │
│  │ A. Fournier│ VTT Rockrider │ ✓ Prêt à récupérer  │ S. Martin  │ hier  │ │
│  └────────────┴───────────────┴─────────────────────┴────────────┴───────┘ │
│                                                                            │
│                          ‹ Précédent   Page 2 sur 8   Suivant ›            │
└────────────────────────────────────────────────────────────────────────────┘

Liste des réparations — < 768 px

┌──────────────────────────────────────────┐
│ ⏸  En attente de pièce                   │
│ Martin Dupont                            │
│ VTC Btwin Riverside 500                  │
│ Sophie Martin · il y a 2 h            ›  │
└──────────────────────────────────────────┘
```

**Recherche et filtres :**

- recherche libre par client ou vélo ;
- filtre par statut — options ordonnées selon l'ordre du workflow, jamais par ordre alphabétique ;
- filtre par réparateur ;
- bouton **Effacer les filtres**, visible **uniquement lorsqu'au moins un filtre est actif**, avec le décompte : « Effacer les filtres (2) ».

**Ordre, tri et pagination :**

- **ordre par défaut** : date de dernière modification décroissante — ce qui bouge est en haut ;
- **tri utilisateur** : en-têtes de colonne cliquables sur ordinateur (client, statut, réparateur, date de modification), indicateur ▲/▼ et attribut `aria-sort` ; sur mobile, un sélecteur « Trier par ▾ » ;
- **pagination** : 25 résultats par page, contrôles « Précédent / Suivant » et « Page 2 sur 8 ». Pas de défilement infini : la pagination est accessible au clavier, restaurable par URL et testable ;
- **compteur** toujours visible au-dessus de la liste : « 47 réparations · 12 en cours » ;
- **persistance dans l'URL** de toute la vue : `/reparations?portee=mes&statut=waiting_for_part&q=dupont&tri=maj&sens=desc&page=2`. Le filtre survit au rechargement, la vue se met en favori, et aucun état client n'est nécessaire.

#### Détail d'une réparation

Le statut et son action de changement sont atteignables **sans défilement**, quelle que soit la taille d'écran.

```
┌───────────────────────────────────────────────────────────────┐
│ ‹ Réparations                                                 │
│                                                               │
│ ┌───────────────────────────────────────────────────────────┐ │
│ │  ⏸  EN ATTENTE DE PIÈCE            [ Changer le statut ▾] │ │
│ │  Mise à jour il y a 2 heures par Sophie Martin             │ │
│ └───────────────────────────────────────────────────────────┘ │
│                                                               │
│ Martin Dupont · 06 12 34 56 78 · martin.dupont@exemple.fr     │
│ VTC Btwin Riverside 500 — gris                                │
│                                                               │
│ Problème signalé                                              │
│ Bruit au pédalage, freins arrière peu efficaces.              │
│                                                               │
│ Réparateur : Sophie Martin                    [ Réassigner ]  │
│ Déposé le 24/07/2026 · Modifié le 26/07/2026 à 14:32          │
│                                                               │
│ ┌─ Lien de suivi client ───────────────────────────────────┐  │
│ │                                                          │  │
│ │  dg.app/suivi/7fd53f90…                                  │  │
│ │                                                          │  │
│ │  [ Copier le lien ]                                      │  │
│ │                                                          │  │
│ │  Collez ce lien dans un SMS ou un e-mail au client.      │  │
│ └──────────────────────────────────────────────────────────┘  │
│                                                               │
│ [ Imprimer le ticket d'atelier ]                              │
│                                                               │
│ [ Modifier la fiche ]              [ Annuler la réparation ]  │
│                                                               │
│ ── Notes internes ─────────────────────────────────────────   │
│                                                               │
│  Sophie Martin · aujourd'hui à 14:32                          │
│  Roulement de roue arrière HS, pièce commandée chez le        │
│  fournisseur habituel.                                        │
│                                                               │
│  Karim Belaïd · hier à 09:15                                  │
│  Diagnostic fait, freins à revoir aussi.                      │
│                                                               │
│  ┌─────────────────────────────────────────────────────────┐  │
│  │ Ajouter une note pour l'équipe…                         │  │
│  └─────────────────────────────────────────────────────────┘  │
│                                     [ Ajouter la note ]       │
└───────────────────────────────────────────────────────────────┘
```

**Transmission du lien au client.** L'application n'envoie rien elle-même : l'employé **copie le lien**, puis le colle dans un **SMS ou un e-mail** qu'il adresse au client depuis le téléphone ou la messagerie de l'atelier, selon la coordonnée dont il dispose. C'est le seul canal, et il n'est pas un pis-aller : un jeton de 36 caractères n'étant ni dictable ni recopiable, on ne l'énonce pas au comptoir, on l'envoie par écrit.

**Le ticket d'atelier est un support interne, pas un document client.** Le bouton **Imprimer le ticket d'atelier** produit un feuillet de petit format, à accrocher au vélo, comportant : le nom du client, le vélo, la date de dépôt et un **QR code qui ouvre la fiche interne de la réparation**. En atelier, le réparateur scanne le ticket accroché au guidon et arrive directement sur la bonne fiche pour en changer le statut, sans la rechercher dans la liste. Ce QR code pointe vers une route de l'espace interne : un scan par une personne non authentifiée aboutit à l'écran de connexion et ne montre rien de la réparation ([§ 4](./01-principes-et-parcours.md#4-structure-générale)). Le ticket ne porte aucune note interne.

**Notes internes : un fil horodaté.** Ce n'est pas un champ unique écrasable — la promesse de collaboration entre réparateurs suppose de savoir qui a écrit quoi et quand.

- la note la plus récente en haut ;
- auteur et date toujours visibles ;
- **aucune modification ni suppression** après publication, cohérent avec le principe « on ne supprime rien » ;
- au-delà de 5 notes, repli avec « Afficher les 12 notes ».

**Changer le statut.** Le menu propose tous les statuts sauf celui en cours. Les transitions sont libres — un diagnostic révèle souvent un second problème, une pièce arrive et s'avère fausse — avec une seule exception : **une réparation « Restituée » est verrouillée**. Son bloc de statut affiche alors un texte à la place du bouton : « Cette réparation est clôturée. Le statut ne peut plus être modifié. » Le passage à « Restitué » demande donc une confirmation ([§ 9](./05-formulaires-et-etats.md#actions-sensibles)), puisqu'il est irréversible.

**Annuler la réparation** est une action de variante danger, placée à l'écart des actions courantes, qui applique le statut « Annulé » après confirmation ([§ 9](./05-formulaires-et-etats.md#actions-sensibles)).

#### Création d'une réparation — pattern chercher-ou-créer

Le formulaire ne part **jamais** d'une page blanche pour le client et le vélo. Sans recherche préalable, un même client est recréé à chaque visite : au bout de six mois, « Dupont Martin », « M. Dupont » et « dupont martin » coexistent, la recherche devient inutilisable et l'historique par vélo — argument de valeur du produit — disparaît.

```
┌─ Nouvelle réparation ──────────────────────────────────┐
│                                                        │
│  1. CLIENT                                             │
│  ┌──────────────────────────────────────────────────┐  │
│  │ 🔍 Rechercher un client (nom, téléphone, e-mail) │  │
│  └──────────────────────────────────────────────────┘  │
│    ↓ 2 résultats                                       │
│    ○ Martin Dupont — 06 12 34 56 78 — 3 réparations    │
│    ○ Martine Dupond — 06 98 76 54 32 — 1 réparation    │
│                                                        │
│    [ + Nouveau client ]  ← ouvre les champs nom /      │
│                             téléphone / e-mail         │
│                                                        │
│  2. VÉLO  (débloqué après choix du client)             │
│    ○ VTC Btwin Riverside 500 — gris                    │
│    ○ Route Trek Domane — bleu                          │
│    [ + Nouveau vélo ]                                  │
│                                                        │
│  3. PROBLÈME SIGNALÉ                                   │
│  4. RÉPARATEUR RESPONSABLE                             │
│  5. STATUT INITIAL   (défaut : Vélo déposé)            │
│                                                        │
│              [ Annuler ]  [ Créer la réparation ]      │
└────────────────────────────────────────────────────────┘
```

Règles fermes :

- l'étape 2 est **désactivée** tant qu'aucun client n'est choisi ; elle affiche alors « Choisissez d'abord un client » ;
- la liste des vélos proposés est **restreinte aux vélos du client choisi** — c'est la traduction en interface de la règle d'intégrité « un vélo appartient au client de la réparation » ;
- créer un client ou un vélo se fait **dans le formulaire, sans changement de page** : aucune navigation, aucune saisie perdue ;
- si la recherche remonte un nom très proche, afficher sous le champ : « Un client au nom similaire existe déjà. Vérifiez avant de créer un doublon. » ;
- aucun champ au-delà de ceux prévus : pas d'adresse, pas de date de naissance, pas de commentaire client ;
- la recherche s'exécute au-delà de 2 caractères saisis, avec un indicateur discret dans le champ et le nombre de résultats annoncé en `aria-live="polite"` (« 2 clients trouvés »).

Après la création, l'utilisateur est redirigé vers le détail de la réparation, où il trouve le lien de suivi à copier et le ticket d'atelier à imprimer.

#### Modification d'une réparation

Même écran que la création, avec deux différences : le client et le vélo sont affichés mais **non modifiables** — les corriger se fait depuis la fiche client (§7.3) —, et le statut initial est remplacé par le statut courant en lecture seule, modifiable uniquement depuis le bloc de statut du détail.

---

### 7.3 — Clients et vélos

#### Liste des clients

Un tableau responsive suivant les mêmes règles que la liste des réparations (composant unique, 25 par page, tri, recherche, persistance URL).

Colonnes : nom, téléphone, e-mail, nombre de vélos, nombre de réparations, date de dernière réparation. Ordre par défaut : date de dernière réparation décroissante.

Cette liste ne comporte **aucune action de création** : un client naît d'une réparation. Elle sert à retrouver quelqu'un, corriger une coordonnée, et consulter un historique.

#### Fiche client

Affiche les coordonnées, la liste des **vélos** du client — c'est le seul endroit où la liste des vélos existe — et l'historique de ses réparations, la plus récente en haut, chacune avec sa pastille de statut et cliquable vers son détail.

Actions : **Modifier les coordonnées** (nom, téléphone, e-mail), **Modifier un vélo** (type, marque, modèle, couleur), et, pour l'administrateur seul, **Anonymiser ce client**.

#### Anonymisation d'un client (administrateur)

Répond à une demande d'effacement du client. Les réparations n'étant jamais supprimées, l'effacement passe par l'anonymisation : nom, téléphone et e-mail sont remplacés par une valeur neutre, les fiches techniques et leur historique sont conservés.

Modale de confirmation, variante danger :

> « Anonymiser Martin Dupont ?
> Son nom, son téléphone et son e-mail seront définitivement remplacés par
> « Client anonymisé ». Les 3 réparations et leur historique sont conservés.
> **Cette action est irréversible.** »
>
> Boutons : `Annuler` / `Anonymiser le client` (danger)

Après l'action, la fiche affiche « Client anonymisé » et le bandeau : « Ce client a été anonymisé le 26/07/2026. » Les liens de suivi de ses réparations cessent de fonctionner et retournent le message neutre de lien invalide.

---

### 7.4 — Employés

#### Gestion des employés (administrateur)

L'écran distingue trois groupes, dans cet ordre :

- **Demandes en attente** — en tête, car c'est le motif de visite ;
- **Employés actifs** ;
- **Demandes refusées** — conservées, sans condition : la décision de l'administrateur est un fait, pas une option.

Pour chaque demande en attente : **Accepter** (primaire) et **Refuser** (danger), visibles directement dans la ligne, sans ouvrir de fiche.

Pour chaque demande refusée : **Réactiver le compte**, qui repasse le profil en actif. Sans cette action, un employé refusé par erreur n'a aucun moyen de récupérer son accès : il ne peut pas se réinscrire, son adresse existant déjà.

Le refus demande une confirmation ([§ 9](./05-formulaires-et-etats.md#actions-sensibles)). L'acceptation et la réactivation n'en demandent pas : elles sont réversibles.

#### Mon compte

Page minimale accessible depuis le menu **Compte ▾** de la barre supérieure. Ce menu contient le nom, le rôle, « Mon compte » et « Se déconnecter ».

La page affiche : nom, adresse e-mail, rôle, date d'inscription. Une seule action : **Modifier mon mot de passe** (mot de passe actuel, nouveau, confirmation). Rien de plus — l'application n'a aucun paramètre.

---

### 7.5 — Espace public

#### Suivi client

La page doit être autonome et compréhensible sans explication préalable. Une seule chose à comprendre, en trois secondes, sur un téléphone.

```
┌────────────────────────────┐
│           D-g              │
│  Suivi de votre réparation │
├────────────────────────────┤
│                            │
│  VTC Btwin Riverside 500   │
│                            │
│  ┌──────────────────────┐  │
│  │         ⏸            │  │
│  │  EN ATTENTE DE PIÈCE │  │
│  └──────────────────────┘  │
│                            │
│  La réparation est         │
│  suspendue jusqu'à         │
│  réception d'une pièce.    │
│                            │
│  Mis à jour le             │
│  26 juillet 2026 à 14:32   │
│                            │
│  ●──●──●──○──○──○          │
│  Déposé      Récupérable   │
│  Étape 3 sur 6 :           │
│  En attente de pièce       │
│                            │
│  Une question ?            │
│  Contactez l'atelier.      │
│                            │
│  Conservez ce lien pour    │
│  suivre votre réparation.  │
└────────────────────────────┘
```

Elle affiche : le mot-symbole D-g, le vélo concerné, le statut actuel, sa courte explication, la date de dernière mise à jour, la frise de progression et un éventuel message destiné au client.

Les notes internes, les noms d'employés et toute information technique n'y apparaissent **jamais**.

Cette page **ne se met pas à jour automatiquement** : pas de rafraîchissement en temps réel dans le MVP. L'afficher comme « en direct » serait mentir sur la fraîcheur de l'information ; la date de mise à jour suffit.

Une mention d'information sur les données personnelles figure en pied de page, sous forme d'un lien discret.

#### Lien de suivi invalide

Message neutre, sans révéler si le lien a existé, s'il a expiré ou si la réparation existe :

> « Ce suivi n'est pas disponible. Vérifiez le lien reçu de l'atelier ou contactez-le directement. »

Aucun lien vers l'espace interne, aucune mention de son existence.

---

### 7.6 — Écrans d'erreur

| Écran | Message | Action |
|---|---|---|
| **403 — accès refusé** | « Vous n'avez pas accès à cette page. » | `Retour aux réparations` |
| **404 interne** | « Cette page n'existe pas. » | `Retour aux réparations` |
| **404 public** | Message neutre de lien de suivi invalide, à l'identique | aucune |
| **500** | « Une erreur est survenue de notre côté. » | `Réessayer` |

Le 404 public ne doit jamais reprendre le 404 interne : un message générique trahirait l'existence de l'application interne.
