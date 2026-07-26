> Story extraite de `docs/07-epics-stories.md`. À exécuter dans l'ordre. Prérequis : voir « Dépend de ».

### Story 0.4 — Créer les projets Supabase
- **Epic :** Epic 0 — Fondations
- **Dépend de :** Aucune
- **Objectif :** Disposer de deux projets Supabase distincts, l'un pour le développement et l'autre
  pour la production, afin de ne jamais travailler sur les données réelles.
- **Contexte :** Deux projets `d-g-dev` et `d-g-prod` (voir
  `03-stack-shard/08-hebergement-et-deploiement.md` § 14 Gestion des environnements). La confirmation
  d'e-mail est **désactivée** pour le MVP (voir `03-stack-shard/07-auth-et-validation.md`). ⚠️ Un
  projet Supabase gratuit est **mis en pause après 7 jours d'inactivité** : c'est la cause la plus
  fréquente d'une application qui semble cassée sans raison (risque R2).
- **Tâches :**
  1. Créer un compte Supabase.
  2. Créer deux projets sur le plan gratuit : `d-g-dev` et `d-g-prod` ; conserver les mots de passe de
     base en lieu sûr.
  3. Récupérer pour chacun l'URL du projet et la clé `anon`.
  4. Activer l'authentification e-mail + mot de passe sur les deux projets.
  5. Désactiver la confirmation d'adresse e-mail sur les deux projets.
  6. Documenter dans le dépôt la procédure de réactivation d'un projet mis en pause.
- **Critères d'acceptance :**
  - [ ] Deux projets nommés `d-g-dev` et `d-g-prod` existent.
  - [ ] L'authentification e-mail + mot de passe est activée sur les deux.
  - [ ] La confirmation d'adresse e-mail est désactivée sur les deux.
  - [ ] Les URL et clés `anon` des deux projets sont récupérées et conservées hors du dépôt.
  - [ ] La procédure de réactivation après mise en pause est documentée dans le dépôt.
- **Terminé quand :** Les deux projets Supabase sont prêts à recevoir les migrations et à servir
  l'authentification, et la procédure de réactivation est écrite.
