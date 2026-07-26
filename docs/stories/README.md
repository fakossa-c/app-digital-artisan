# Stories — ordre d'exécution

> Une story par fichier, à donner isolément au développeur. Les exécuter **dans l'ordre**.
> La source de vérité reste [`../07-epics-stories.md`](../07-epics-stories.md) ; ces fichiers en sont des extraits fidèles.


## Epic 0 — Fondations

- **Story 0.1** — [Initialiser le projet Next.js](./story-0.1-initialiser-le-projet-next-js.md) · *dépend de : Aucune*
- **Story 0.2** — [Créer le compte Vercel et publier une première fois](./story-0.2-creer-le-compte-vercel-et-publier-une-premiere-fois.md) · *dépend de : Story 0.1*
- **Story 0.3** — [Configurer l'intégration continue et protéger la branche](./story-0.3-configurer-l-integration-continue-et-proteger-la-branche.md) · *dépend de : Story 0.2*
- **Story 0.4** — [Créer les projets Supabase](./story-0.4-creer-les-projets-supabase.md) · *dépend de : Aucune*
- **Story 0.5** — [Installer et configurer le Supabase CLI](./story-0.5-installer-et-configurer-le-supabase-cli.md) · *dépend de : Story 0.4*
- **Story 0.6** — [Connecter l'application à Supabase](./story-0.6-connecter-l-application-a-supabase.md) · *dépend de : Story 0.1, Story 0.5*
- **Story 0.7** — [Créer le schéma de base de données](./story-0.7-creer-le-schema-de-base-de-donnees.md) · *dépend de : Story 0.5, Story 0.6*
- **Story 0.8** — [Écrire les triggers et les contraintes d'intégrité](./story-0.8-ecrire-les-triggers-et-les-contraintes-d-integrite.md) · *dépend de : Story 0.7*
- **Story 0.9** — [Activer et écrire les politiques de sécurité (RLS)](./story-0.9-activer-et-ecrire-les-politiques-de-securite-rls.md) · *dépend de : Story 0.7*
- **Story 0.10** — [Créer le premier administrateur](./story-0.10-creer-le-premier-administrateur.md) · *dépend de : Story 0.8*
- **Story 0.11** — [Produire les données de démonstration](./story-0.11-produire-les-donnees-de-demonstration.md) · *dépend de : Story 0.9, Story 0.10*

## Epic 1 — Accès à l'application

- **Story 1.1** — [Se connecter](./story-1.1-se-connecter.md) · *dépend de : Story 0.9, Story 0.11*
- **Story 1.2** — [Restreindre l'accès aux comptes actifs](./story-1.2-restreindre-l-acces-aux-comptes-actifs.md) · *dépend de : Story 0.9, Story 1.1*
- **Story 1.3** — [Se déconnecter](./story-1.3-se-deconnecter.md) · *dépend de : Story 1.1*
- **Story 1.4** — [Réinitialiser un mot de passe oublié](./story-1.4-reinitialiser-un-mot-de-passe-oublie.md) · *dépend de : Story 1.1*
- **Story 1.5** — [Consulter et modifier mon compte](./story-1.5-consulter-et-modifier-mon-compte.md) · *dépend de : Story 1.1*
- **Story 1.6** — [Créer les composants transverses partagés](./story-1.6-creer-les-composants-transverses-partages.md) · *dépend de : Story 0.1, Story 1.1*

## Epic 2 — Réparations, clients et vélos

- **Story 2.1** — [Créer une réparation](./story-2.1-creer-une-reparation.md) · *dépend de : Story 0.9, Story 1.2, Story 1.6*
- **Story 2.2** — [Réutiliser un client existant](./story-2.2-reutiliser-un-client-existant.md) · *dépend de : Story 2.1*
- **Story 2.3** — [Réutiliser un vélo existant du client](./story-2.3-reutiliser-un-velo-existant-du-client.md) · *dépend de : Story 2.2*
- **Story 2.4** — [Consulter le détail d'une réparation](./story-2.4-consulter-le-detail-d-une-reparation.md) · *dépend de : Story 2.1, Story 1.6*
- **Story 2.5** — [Modifier une réparation](./story-2.5-modifier-une-reparation.md) · *dépend de : Story 2.4*
- **Story 2.6** — [Affecter un réparateur](./story-2.6-affecter-un-reparateur.md) · *dépend de : Story 2.4*
- **Story 2.7** — [Ajouter une note interne](./story-2.7-ajouter-une-note-interne.md) · *dépend de : Story 2.4*
- **Story 2.8** — [Consulter la liste des clients](./story-2.8-consulter-la-liste-des-clients.md) · *dépend de : Story 2.1, Story 1.6*
- **Story 2.9** — [Consulter et modifier une fiche client](./story-2.9-consulter-et-modifier-une-fiche-client.md) · *dépend de : Story 2.8*

## Epic 3 — Workflow des statuts

- **Story 3.1** — [Modifier le statut d'une réparation](./story-3.1-modifier-le-statut-d-une-reparation.md) · *dépend de : Story 2.4, Story 1.6*
- **Story 3.2** — [Clôturer une réparation restituée](./story-3.2-cloturer-une-reparation-restituee.md) · *dépend de : Story 3.1*
- **Story 3.3** — [Annuler une réparation](./story-3.3-annuler-une-reparation.md) · *dépend de : Story 3.1*

## Epic 4 — Suivi public

- **Story 4.1** — [Consulter l'avancement de sa réparation](./story-4.1-consulter-l-avancement-de-sa-reparation.md) · *dépend de : Story 0.9, Story 3.1*
- **Story 4.2** — [Afficher un message neutre sur un lien invalide](./story-4.2-afficher-un-message-neutre-sur-un-lien-invalide.md) · *dépend de : Story 4.1*
- **Story 4.3** — [Copier le lien de suivi](./story-4.3-copier-le-lien-de-suivi.md) · *dépend de : Story 2.4, Story 4.1*
- **Story 4.4** — [Transmettre le lien de suivi au client](./story-4.4-transmettre-le-lien-de-suivi-au-client.md) · *dépend de : Story 4.3*
- **Story 4.5** — [Rédiger un message public destiné au client](./story-4.5-rediger-un-message-public-destine-au-client.md) · *dépend de : Story 2.4, Story 4.1*
- **Story 4.6** — [Imprimer le ticket d'atelier portant le QR code de la fiche](./story-4.6-imprimer-le-ticket-d-atelier-portant-le-qr-code-de-la-fiche.md) · *dépend de : Story 2.4*

## Epic 5 — Consultation et recherche

- **Story 5.1** — [Consulter la liste des réparations](./story-5.1-consulter-la-liste-des-reparations.md) · *dépend de : Story 3.1, Story 1.6*
- **Story 5.2** — [Rechercher une réparation](./story-5.2-rechercher-une-reparation.md) · *dépend de : Story 5.1*
- **Story 5.3** — [Filtrer les réparations](./story-5.3-filtrer-les-reparations.md) · *dépend de : Story 5.1*
- **Story 5.4** — [Consulter mes réparations](./story-5.4-consulter-mes-reparations.md) · *dépend de : Story 5.1*
- **Story 5.5** — [Trier les réparations](./story-5.5-trier-les-reparations.md) · *dépend de : Story 5.1*
- **Story 5.6** — [Retrouver une vue par son adresse](./story-5.6-retrouver-une-vue-par-son-adresse.md) · *dépend de : Story 5.2, Story 5.3, Story 5.4, Story 5.5*

## Epic 6 — Inscription et gestion des employés

- **Story 6.1** — [S'inscrire comme employé](./story-6.1-s-inscrire-comme-employe.md) · *dépend de : Story 1.2, Story 0.10*
- **Story 6.2** — [Consulter les comptes de l'atelier](./story-6.2-consulter-les-comptes-de-l-atelier.md) · *dépend de : Story 6.1, Story 1.2*
- **Story 6.3** — [Accepter une demande d'inscription](./story-6.3-accepter-une-demande-d-inscription.md) · *dépend de : Story 6.2*
- **Story 6.4** — [Refuser une demande d'inscription](./story-6.4-refuser-une-demande-d-inscription.md) · *dépend de : Story 6.2*
- **Story 6.5** — [Réactiver un compte refusé](./story-6.5-reactiver-un-compte-refuse.md) · *dépend de : Story 6.4*
- **Story 6.6** — [Promouvoir ou rétrograder un utilisateur](./story-6.6-promouvoir-ou-retrograder-un-utilisateur.md) · *dépend de : Story 6.3*

## Epic 7 — Conformité, finition et mise en service

- **Story 7.1** — [Anonymiser un client](./story-7.1-anonymiser-un-client.md) · *dépend de : Story 2.9, Story 4.1*
- **Story 7.2** — [Afficher la mention d'information sur les données personnelles](./story-7.2-afficher-la-mention-d-information-sur-les-donnees-personnelles.md) · *dépend de : Story 4.1*
- **Story 7.3** — [Exclure la page publique de l'indexation](./story-7.3-exclure-la-page-publique-de-l-indexation.md) · *dépend de : Story 4.1*
- **Story 7.4** — [Afficher les pages d'erreur](./story-7.4-afficher-les-pages-d-erreur.md) · *dépend de : Story 1.6, Story 4.2*
- **Story 7.5** — [Vérifier la conformité d'accessibilité](./story-7.5-verifier-la-conformite-d-accessibilite.md) · *dépend de : Toutes les stories produisant un écran*
- **Story 7.6** — [Recetter le parcours complet et basculer en production](./story-7.6-recetter-le-parcours-complet-et-basculer-en-production.md) · *dépend de : Toutes les stories*
