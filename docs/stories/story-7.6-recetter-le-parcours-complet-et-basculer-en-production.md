> Story extraite de `docs/07-epics-stories.md`. À exécuter dans l'ordre. Prérequis : voir « Dépend de ».

### Story 7.6 — Recetter le parcours complet et basculer en production
- **Epic :** Epic 7 — Conformité, finition et mise en service
- **Dépend de :** Toutes les stories
- **Objectif :** Vérifier l'application de bout en bout puis l'ouvrir à l'atelier sur des données
  réelles.
- **Contexte :** Les treize critères d'acceptation du PRD § 11 constituent la recette. La **mesure de
  référence des appels** doit être réalisée *avant* la bascule : elle n'a aucun coût de développement
  et n'est plus réalisable après le lancement (brief § 6.3). Le seed n'est jamais exécuté en
  production.
- **Tâches :**
  1. Dérouler le parcours complet du dépôt à la restitution, sur téléphone et sur tablette.
  2. Rejouer un à un les treize critères d'acceptation du PRD et consigner chaque verdict par écrit.
  3. Chronométrer dix créations de fiche au comptoir.
  4. Réaliser et consigner la mesure de référence du nombre d'appels de suivi sur une semaine.
  5. Appliquer les migrations sur le projet de production, sans exécuter le seed.
  6. Créer le premier administrateur réel.
  7. Trancher et consigner les arbitrages de mise en service.
- **Critères d'acceptance :**
  - [ ] Le parcours complet — création, envoi du lien, changements de statut, consultation client,
        restitution — se déroule sans blocage, depuis un téléphone et depuis une tablette.
  - [ ] Les treize critères d'acceptation du PRD sont rejoués un à un, chacun prononcé conforme ou non
        conforme par écrit.
  - [ ] Dix créations de fiche chronométrées au comptoir sont chacune réalisées en 90 secondes ou moins.
  - [ ] Le comptage des appels de suivi sur une semaine a été réalisé avant la bascule et consigné comme
        point de référence.
  - [ ] Les migrations ont été appliquées sur le projet de production, le script de données de
        démonstration n'y a pas été exécuté, un premier administrateur réel existe, et les comptes
        d'hébergement appartiennent à digital-artisan.
  - [ ] L'usage commercial de l'hébergement a été arbitré, la reprise ou non des réparations en cours
        décidée et consignée, la date d'arrêt du support papier fixée, et le nom applicatif définitif
        tranché ou explicitement reconduit.
- **Terminé quand :** L'atelier utilise l'application sur des données réelles et la mesure de référence
  des appels est enregistrée.
