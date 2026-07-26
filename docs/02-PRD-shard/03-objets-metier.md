# Objets métier

> **Document :** PRD — Exigences produit (02) — projet digital-artisan (D-G), application D-g
> **Partie :** 3 / 9 · [Retour à l'index](./index.md)
> **Contenu :** Les cinq objets principaux du produit — utilisateur, client, vélo, réparation, note interne — avec leurs informations et leurs relations (section 6).

---

# 6. Objets métier

Le produit repose sur **cinq objets principaux**.

## 6.1 Utilisateur

Représente une personne pouvant accéder à l'application.

Types :

- administrateur ;
- employé.

Chaque utilisateur possède un état :

- **en attente** — inscription déposée, en attente de décision ;
- **actif** — accès autorisé à l'espace interne ;
- **refusé** — inscription rejetée, accès interdit ; le compte est conservé pour tracer la décision.

---

## 6.2 Client

Représente le propriétaire d'un ou plusieurs vélos.

Informations principales :

- nom ;
- téléphone ;
- e-mail.

Un client peut être associé à plusieurs réparations au fil du temps. La relation avec ses vélos est définie par [RM-17](./06-regles-metier.md#10-règles-métier).

---

## 6.3 Vélo

Représente un vélo pris en charge par l'atelier.

Informations principales :

- le **client propriétaire** ([RM-17](./06-regles-metier.md#10-règles-métier)) ;
- marque ;
- modèle ;
- commentaire libre.

Un vélo peut faire l'objet de plusieurs réparations au cours de sa durée de vie.

---

## 6.4 Réparation

Objet central de l'application.

Une réparation contient notamment :

- le client ;
- le vélo ;
- le réparateur responsable ;
- la description du problème ;
- le statut courant ;
- des notes internes associées (voir objet *Note interne*) ;
- un **message public destiné au client**, facultatif ([RM-25](./06-regles-metier.md#10-règles-métier)) ;
- la date de création ;
- la date de dernière modification ;
- l'**auteur de la dernière modification** ;
- un identifiant public permettant le suivi client.

---

## 6.5 Note interne

Message court rédigé par un utilisateur interne au sujet d'une réparation.

Informations principales :

- la réparation concernée ;
- l'auteur (utilisateur interne) ;
- le contenu ;
- la date de création.

Une note est immuable : elle ne peut être ni modifiée ni supprimée après création. Une réparation peut porter zéro, une ou plusieurs notes. Les notes internes constituent une **collection horodatée**, et non un champ texte unique — sans quoi il serait impossible de savoir qui a écrit quoi, ce qui contredirait OBJ-02.
