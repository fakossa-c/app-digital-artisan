# Contraintes et hors périmètre

> **Document :** PRD — Exigences produit (02) — projet digital-artisan (D-G), application D-g
> **Partie :** 9 / 9 · [Retour à l'index](./index.md)
> **Contenu :** Les contraintes de réalisation et l'ordre de priorité des arbitrages, puis la liste des dix-sept fonctionnalités explicitement exclues du MVP (sections 12 et 13).

---

# 12. Contraintes

Le produit est réalisé dans un cadre de montée en compétences (brief § 13). Cette modalité influence la manière de construire le produit, non son périmètre fonctionnel ni son niveau d'exigence.

Les fonctionnalités doivent rester :

- simples à comprendre ;
- cohérentes entre elles ;
- indépendantes autant que possible.

La logique métier doit rester suffisamment réaliste pour illustrer les concepts d'une application professionnelle, tout en évitant une complexité inutile.

En cas d'arbitrage, l'ordre de priorité est : **1. besoin de l'atelier, 2. qualité et sécurité, 3. valeur d'apprentissage.** Le produit livré doit être exploitable en conditions réelles.

Les contraintes de délai, de charge, d'hébergement et d'exploitation figurent au brief § 8.

---

# 13. Hors périmètre

Les fonctionnalités suivantes ne font pas partie du MVP :

- gestion du stock ;
- devis ;
- facturation ;
- paiement ;
- prise de rendez-vous ;
- calendrier ;
- notifications SMS ou e-mail métier ;
- historique détaillé des modifications ;
- statistiques ;
- tableaux de bord ;
- **gestion multi-ateliers** ;
- gestion des fournisseurs ;
- commandes de pièces ;
- export de données ;
- application mobile native ;
- mise à jour temps réel sans action de l'utilisateur ;
- internationalisation de l'interface.

L'e-mail de réinitialisation de mot de passe ([FEAT-AUT-04](./04-fonctionnalites.md#71-authentification)) ne relève pas des notifications exclues : c'est un mécanisme technique d'authentification, non une notification métier.

Ces fonctionnalités pourront être envisagées dans une évolution future mais ne sont pas nécessaires pour atteindre les objectifs du projet.
