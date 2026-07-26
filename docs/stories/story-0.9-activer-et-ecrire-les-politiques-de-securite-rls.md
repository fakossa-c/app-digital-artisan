> Story extraite de `docs/07-epics-stories.md`. À exécuter dans l'ordre. Prérequis : voir « Dépend de ».

### Story 0.9 — Activer et écrire les politiques de sécurité (RLS)
- **Epic :** Epic 0 — Fondations
- **Dépend de :** Story 0.7
- **Objectif :** Verrouiller chaque table pour que la base refuse elle-même tout accès non autorisé,
  même si une requête contourne l'application.
- **Contexte :** C'est le morceau le plus sensible du projet — toutes les politiques figurent dans
  `05-architecture-shard/06-securite-rls.md`. **Règle structurante : toute politique doit appeler
  `is_active_member()`, jamais se contenter de `auth.uid() is not null`** — un compte `pending` ou
  `rejected` possède une session Supabase parfaitement valide et pourrait sinon interroger l'API
  directement (risque R4). La fonction helper doit être écrite en **PL/pgSQL et non en SQL** :
  PostgreSQL intègre les fonctions SQL simples dans la requête appelante, ce qui leur fait perdre leur
  contexte privilégié et ramène la récursion infinie 42P17 sur `profiles`.
- **Tâches :**
  1. Écrire la fonction `is_active_member()` en PL/pgSQL et `SECURITY DEFINER`.
  2. Activer la RLS sur les cinq tables métier, en refus par défaut.
  3. Écrire les politiques table par table et action par action, selon l'architecture ; chacune
     appelle `is_active_member()`.
  4. Envelopper les appels de fonction dans `(select …)` pour la performance, selon la seconde règle
     de l'architecture.
  5. Écrire le fichier SQL de vérification des politiques : pour chaque profil type — anonyme,
     `pending`, `rejected`, `active`, `admin` — compter les lignes lisibles sur chaque table et
     comparer à l'attendu.
  6. Appliquer les migrations et exécuter le fichier de vérification.
- **Critères d'acceptance :**
  - [ ] La RLS est activée sur `profiles`, `clients`, `bikes`, `repairs` et `repair_notes`, et une
        table sans politique explicite ne retourne aucune ligne.
  - [ ] Chaque politique appelle la fonction vérifiant que le profil est actif ; aucune ne se contente
        de vérifier la présence d'une session.
  - [ ] Un compte `pending` muni d'une session valide obtient zéro ligne sur chaque table métier en
        interrogeant directement l'API, et aucune écriture n'est acceptée.
  - [ ] Un compte `rejected` muni d'une session valide obtient zéro ligne sur chaque table métier.
  - [ ] Un visiteur anonyme muni de la clé publique obtient zéro ligne sur chaque table métier.
  - [ ] Un compte `active` voit toutes les réparations de l'atelier, sans cloisonnement par réparateur,
        ainsi que les clients, les vélos et les notes internes.
  - [ ] Un employé ne peut modifier ni son propre rôle ni son propre état.
  - [ ] Un administrateur consulte la liste des profils et modifie l'état d'un employé sans produire
        d'erreur de récursion infinie.
  - [ ] Le fichier de vérification des politiques s'exécute et signale tout écart avec l'attendu.
- **Terminé quand :** Chaque table est protégée par des politiques vérifiant l'état actif du profil, et
  le fichier de vérification confirme les comptages attendus pour les cinq profils types.

> Un défaut ici ne produit **aucune erreur visible** : la base retourne simplement trop de lignes. Ni
> la revue de code, ni TypeScript, ni un test d'interface ne l'attrapent. Le fichier de vérification
> est la seule preuve possible — il est rejoué à chaque phase ajoutant une table ou une politique.
