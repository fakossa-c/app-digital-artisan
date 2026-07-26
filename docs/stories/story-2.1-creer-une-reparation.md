> Story extraite de `docs/07-epics-stories.md`. À exécuter dans l'ordre. Prérequis : voir « Dépend de ».

### Story 2.1 — Créer une réparation
- **Epic :** Epic 2 — Réparations, clients et vélos
- **Dépend de :** Story 0.9, Story 1.2, Story 1.6
- **Objectif :** Permettre à un employé d'enregistrer au comptoir une réparation complète — client,
  vélo, problème, réparateur, statut initial — en une seule opération.
- **Contexte :** Formulaire décrit dans `04-ux-design-shard/` § 6.2. La création passe par la **RPC
  `create_repair`** qui garantit l'atomicité : trois appels JS successifs laisseraient des données
  partielles en cas d'échec (voir `05-architecture-shard/07-flux-principaux.md` § Création d'une
  réparation). Cette story couvre le formulaire complet en une tranche verticale ; la réutilisation
  d'un client ou d'un vélo existant fait l'objet des stories 2.2 et 2.3. La création doit tenir en
  90 secondes au comptoir (brief § 6.3).
- **Tâches :**
  1. Créer l'écran « Nouvelle réparation » avec ses étapes client, vélo, problème, réparateur et statut.
  2. Écrire la RPC de création atomique en base.
  3. Créer la Server Action appelant la RPC, avec validation Zod des entrées.
  4. Désactiver l'étape vélo tant qu'aucun client n'est choisi.
  5. Restreindre la liste des réparateurs aux profils `active`.
  6. Proposer « Vélo déposé » comme statut initial par défaut, en excluant les statuts terminaux.
  7. Rediriger vers la fiche créée et afficher la confirmation.
- **Critères d'acceptance :**
  - [ ] Créer une réparation complète l'enregistre avec ses dates, lui attribue un jeton public unique,
        redirige vers sa fiche et affiche « Réparation créée. ».
  - [ ] Le statut initial proposé est « Vélo déposé » ; un autre statut est choisissable, mais
        « Restitué » et « Annulé » ne sont pas proposés.
  - [ ] L'étape « Vélo » est désactivée tant qu'aucun client n'est choisi et affiche « Choisissez
        d'abord un client ».
  - [ ] Soumettre sans nom de client affiche « Le nom du client est obligatoire. » au niveau du champ,
        ne crée rien, et conserve toute la saisie.
  - [ ] Soumettre sans client affiche « Choisissez un client ou créez-en un nouveau. » ; sans vélo,
        « Choisissez un vélo ou enregistrez-en un nouveau pour ce client. ».
  - [ ] Associer un vélo n'appartenant pas au client choisi, en contournant l'interface, est refusé par
        le serveur **et** par la base.
  - [ ] Seuls les profils `active` figurent dans la liste des réparateurs ; assigner un profil non actif
        est refusé par le serveur.
  - [ ] Un statut absent des sept valeurs est refusé par le serveur **et** par la base.
  - [ ] Le formulaire ne demande au client que son nom, son téléphone et son adresse e-mail — aucune
        adresse postale, date de naissance ni commentaire.
  - [ ] Un échec en cours de création ne laisse aucun client, vélo ni réparation partiels en base.
  - [ ] Cliquer deux fois sur « Créer la réparation » ne crée qu'une seule réparation.
  - [ ] Un utilisateur non authentifié ou non actif se voit refuser l'action côté serveur, les
        politiques RLS empêchant toute écriture.
- **Terminé quand :** Un employé enregistre une réparation de bout en bout au comptoir en moins de
  90 secondes, et aucun échec ne laisse de données partielles.
