# Authentification, autorisations et validation

> **Document :** Stack technique (03) — projet digital-artisan (D-G), application D-g
> **Partie :** 7 / 11 · [Retour à l'index](./index.md)
> **Contenu :** Le périmètre de Supabase Auth et le point de sécurité majeur sur les comptes `pending`, la désactivation assumée de la confirmation d'e-mail, la réinitialisation du mot de passe, et le choix de Zod pour la validation (sections 9 et 10).

---

## 9. Authentification et autorisations

### Supabase Auth

Supabase Auth gère :

- l’inscription des employés ;
- la connexion ;
- la déconnexion ;
- les sessions ;
- la récupération sécurisée de l’utilisateur connecté ;
- la réinitialisation du mot de passe oublié.

Les rôles métier et les états de validation ne reposent pas uniquement sur l’authentification.

Un utilisateur authentifié possède également un profil applicatif permettant de déterminer :

- son rôle (`admin` ou `employee`) ;
- son état de validation (`pending`, `active`, `rejected`) ;
- ses droits dans l’application.

Les règles d’accès aux données sont renforcées avec les politiques Row Level Security de Supabase.

**Point de sécurité majeur, à ne jamais perdre de vue :** un compte `pending` ou `rejected` obtient une **session Supabase parfaitement valide**. Seul l’accès applicatif Next.js lui est refusé. Les politiques RLS doivent donc vérifier l’état `active` du profil, et non la simple présence d’une session. Le mécanisme est détaillé dans [`docs/05-architecture-shard/`](../05-architecture-shard/06-securite-rls.md) (§12).

### Confirmation d’e-mail : désactivée pour le MVP

Supabase Auth active **par défaut** la confirmation d’adresse e-mail à l’inscription. Cette option est **désactivée** pour ce projet.

> Dashboard Supabase → Authentication → Providers → Email → *Confirm email* : **off**

Justification :

- la validation d’accès repose sur le workflow métier `pending` → `active` contrôlé par l’administrateur ([PRD §5](../02-PRD-shard/02-utilisateurs-et-parcours.md#5-parcours-utilisateurs)), qui constitue déjà une barrière d’entrée ;
- la confirmation d’e-mail ferait double emploi avec cette barrière ;
- elle dépendrait du SMTP mutualisé de Supabase, **fortement limité en débit** (quelques envois par heure) et destiné aux tests uniquement. En formation, plusieurs inscriptions successives épuisent le quota : les e-mails n’arrivent pas et le parcours d’inscription paraît cassé, sans message d’erreur exploitable.

**Dette technique assumée.** Pour une mise en production réelle, la confirmation d’e-mail doit être réactivée et accompagnée d’un SMTP dédié (Resend, Postmark, Amazon SES ou équivalent). Cette réactivation est hors périmètre du MVP mais doit figurer au registre des dettes ([§17](./10-couts-et-comptes.md#17-coûts-quotas-et-propriété-des-comptes)).

**Distinction à conserver :** l’e-mail de confirmation d’inscription et l’e-mail de réinitialisation de mot de passe relèvent de l’**authentification**. Les notifications métier (avertir un client que son vélo est prêt) sont hors périmètre du MVP ([PRD §13](../02-PRD-shard/09-perimetre-et-limites.md#13-hors-périmètre)). Les deux sujets ne se confondent pas.

### Réinitialisation du mot de passe

La récupération de mot de passe oublié est **dans le périmètre du MVP** : elle utilise `resetPasswordForEmail()` de Supabase Auth. Elle dépend du même SMTP de test que la confirmation d’e-mail, avec les mêmes limites de débit — limite à documenter auprès du client et à lever par un SMTP dédié en production.

---

## 10. Validation des données

**Zod v4** est la bibliothèque de validation du projet.

Justification :

- inférence TypeScript native (`z.infer`), ce qui sert directement l’objectif de typage de bout en bout de [§1](./01-objectif-et-vue-ensemble.md#1-objectif) et [§5](./03-application-et-langage.md#5-langage) ;
- écosystème dominant, donc bien documenté pour un public en formation ;
- utilisable à l’identique côté serveur et côté client.

Valibot, plus léger, a été écarté : l’écart de poids est sans objet pour une validation exécutée côté serveur, et sa documentation est plus mince.

Organisation retenue : **un schéma Zod par entité** dans `src/lib/validation/`, utilisé en entrée de chaque Server Action, avant tout appel à une fonction métier.

La validation côté navigateur peut améliorer l’expérience, mais ne remplace jamais la validation côté serveur.
