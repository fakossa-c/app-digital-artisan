# Utilisateurs et parcours

> **Document :** PRD — Exigences produit (02) — projet digital-artisan (D-G), application D-g
> **Partie :** 2 / 9 · [Retour à l'index](./index.md)
> **Contenu :** Les trois profils utilisateurs `PERS-01` à `PERS-03` avec leurs objectifs et contextes d'usage, puis les six parcours : amorçage, inscription d'un employé, récupération de mot de passe, création, suivi et clôture d'une réparation (sections 4 et 5).

---

# 4. Utilisateurs

## 4.1 Administrateur

**PERS-01.** Responsable de l'atelier. Il supervise l'application et possède les droits d'administration.

### Objectifs

- gérer les employés ;
- gérer les réparations ;
- superviser l'activité de l'atelier.

### Contexte d'usage

Responsable de l'atelier, également réparateur dans les faits. Utilise l'application comme un employé 90 % du temps, et ses droits d'administration ponctuellement (arrivée d'un nouvel employé). C'est ce double rôle qui justifie qu'il dispose de toutes les permissions de l'employé ([§ 9](./05-statuts-et-permissions.md#9-permissions)).

---

## 4.2 Employé

**PERS-02.** Réparateur de l'atelier. Il utilise quotidiennement l'application pour assurer le suivi des réparations.

### Objectifs

- créer une réparation ;
- consulter les réparations ;
- mettre à jour leur avancement ;
- collaborer avec les autres employés.

### Contexte d'usage

Réparateur en atelier, debout, souvent les mains occupées ou sales. Consulte et met à jour depuis une tablette posée sur l'établi ou depuis son téléphone. Sa tolérance à la friction est très faible : une mise à jour de statut doit tenir en deux gestes. Il n'a reçu aucune formation à l'outil.

---

## 4.3 Client

**PERS-03.** Personne ayant confié son vélo à l'atelier. Le client ne possède pas de compte.

Il consulte uniquement l'état de sa réparation grâce à un lien public sécurisé généré lors de la création de la fiche.

### Contexte d'usage

Cycliste ayant déposé son vélo, consulte depuis son téléphone, une à trois fois pendant la durée de la réparation. Il ne connaît rien au vocabulaire de l'atelier : chaque statut doit être compréhensible sans explication.

---

# 5. Parcours utilisateurs

## 5.1 Amorçage de l'application

1. L'application est installée et déployée.
2. Le premier compte administrateur est créé par une opération d'initialisation réalisée hors de l'interface ([FEAT-AUT-05](./04-fonctionnalites.md#71-authentification)).
3. Cet administrateur peut alors valider les inscriptions des employés.

---

## 5.2 Inscription d'un employé

1. L'employé crée un compte.
2. Son compte est placé en attente de validation (état « en attente »).
3. L'administrateur accepte ou refuse la demande.
4. Après validation, l'employé peut accéder à l'application. En cas de refus, le compte passe à l'état « refusé » et l'accès reste interdit.

---

## 5.3 Récupération d'un mot de passe

1. Depuis l'écran de connexion, l'utilisateur demande la réinitialisation de son mot de passe.
2. Un lien de réinitialisation à usage unique et à durée limitée lui est envoyé par e-mail.
3. Il définit un nouveau mot de passe et accède à l'application, sous réserve que son compte soit actif.

---

## 5.4 Création d'une réparation

1. Un client dépose son vélo.
2. Un employé recherche le client parmi les clients existants ; il n'en crée un nouveau que si la recherche est infructueuse ([FEAT-REP-12](./04-fonctionnalites.md#74-gestion-des-réparations)).
3. Il sélectionne le vélo du client parmi ceux déjà enregistrés, ou en enregistre un nouveau.
4. Il crée la fiche de réparation en renseignant la description du problème et le réparateur responsable.
5. Un lien public de suivi est généré.
6. L'employé copie le lien et l'envoie au client par SMS ou par e-mail ([FEAT-SUI-04](./04-fonctionnalites.md#75-suivi-client)).
7. Il imprime le ticket d'atelier portant le QR code de la fiche interne et l'accroche au vélo ([FEAT-SUI-07](./04-fonctionnalites.md#75-suivi-client)).

---

## 5.5 Suivi d'une réparation

1. Le réparateur met à jour le statut de la réparation.
2. Les autres employés visualisent la nouvelle information dès leur prochaine consultation de la réparation ou de la liste ([RM-16](./06-regles-metier.md#10-règles-métier)).
3. Le client consulte l'avancement depuis son lien public.

---

## 5.6 Clôture d'une réparation

1. La réparation passe au statut **Prêt à récupérer**.
2. Une fois le vélo restitué, le statut devient **Restitué**. La fiche est alors verrouillée ([RM-14](./05-statuts-et-permissions.md#8-workflow-des-statuts)).
3. La réparation reste consultable dans l'application.

Une réparation ouverte par erreur ou dont le vélo n'a jamais été déposé est close par le statut **Annulé** ([RM-24](./05-statuts-et-permissions.md#8-workflow-des-statuts)). Elle n'est jamais supprimée ([RM-12](./06-regles-metier.md#10-règles-métier)).
