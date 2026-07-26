# Contenu rédactionnel

> **Document :** UX Design (04) — projet digital-artisan (D-G), application D-g
> **Partie :** 7 / 7 · [Retour à l’index](./index.md)
> **Contenu :** Les règles transverses de rédaction, le vocabulaire figé, le ton par espace, le format des dates, et les tableaux complets des messages d’erreur et de confirmation, puis les limites du document (sections 13 et 14).

---

## 13. Contenu rédactionnel

### Règles transverses

| Règle | Décision | Exemple |
|---|---|---|
| **Vouvoiement** | Vouvoyer partout, interne comme public. Jamais de tutoiement. | « Vos informations sont conservées. » — jamais « Tes informations » |
| **Personne** | Le produit ne dit jamais « je » ni « nous ». Formulations impersonnelles ou à la 2ᵉ personne. | « Une erreur est survenue. » — pas « Nous avons rencontré un problème » |
| **Possessif côté client** | Sur la page publique : « votre vélo », « votre réparation ». | « Votre vélo est prêt. » |
| **Casse des boutons** | Première lettre en majuscule uniquement. Jamais de capitales, jamais de casse de titre. | `Créer une réparation` — pas `CRÉER UNE RÉPARATION` ni `Créer Une Réparation` |
| **Verbe des boutons** | Infinitif, action explicite. | `Copier le lien de suivi`, `Accepter l'employé` |
| **Titres d'écran** | Substantif, pas de verbe. | `Réparations`, `Employés`, `Nouvelle réparation` |
| **Ponctuation** | Pas de point final sur les libellés de boutons, de champs et de titres. Point final sur les phrases. | `Enregistrer` / « La réparation a été créée. » |
| **Espaces insécables** | Avant `: ; ! ?` et dans les numéros de téléphone. | « 06 12 34 56 78 » |
| **Nombres** | Chiffres arabes toujours, y compris sous dix. | « 3 réparations en cours » |
| **Jargon** | Jamais côté client : ni « statut », ni « fiche », ni « token ». | « Où en est votre réparation » plutôt que « Statut de la réparation » |

Libellés à préférer : « Créer une réparation », « Modifier le statut », « Copier le lien de suivi », « Accepter l'employé ». Libellés à éviter dès qu'un mot plus précis existe : « Valider », « Soumettre », « Gérer », « Action ».

### Vocabulaire figé

Un mot, un sens, partout :

| Retenir | Bannir |
|---|---|
| **réparation** | intervention, dossier, ticket, fiche *(sauf « ticket d'atelier » et « fiche client »)* |
| **réparateur** | technicien, mécanicien, assigné |
| **client** | propriétaire, particulier |
| **vélo** | bicyclette, machine, engin |
| **statut** | état, étape *(interne uniquement — jamais côté client)* |
| **lien de suivi** | URL publique, lien client, token |
| **note interne** | commentaire, remarque, observation |

### Ton par espace

**Espace interne** — factuel, bref, sans politesse superflue. L'employé le lit vingt fois par jour.

> « Réparation créée. » — pas « Votre réparation a bien été créée avec succès ! »

**Page publique** — courtois, rassurant, complet. Le client le lit une fois.

> « Votre vélo est prêt, vous pouvez venir le récupérer. »

Aucune exclamation nulle part. Aucun emoji dans l'interface : les icônes tiennent ce rôle.

### Format des dates

| Contexte | Format | Exemple |
|---|---|---|
| Liste des réparations, colonne « Modifié » | Relatif jusqu'à 7 jours, absolu au-delà | « il y a 2 heures », « hier à 09:15 », « 18/07/2026 » |
| Détail, dernière modification | Relatif, absolu en info-bulle | « il y a 2 heures » (`title` : « 26/07/2026 à 14:32 ») |
| Détail, date de dépôt | Absolu, jamais relatif | « Déposé le 24/07/2026 » |
| Fil de notes internes | Relatif court avec heure | « aujourd'hui à 14:32 », « hier à 09:15 », « 20/07 à 16:40 » |
| **Page publique** | **Absolu et complet, jamais relatif** | « Mis à jour le 26 juillet 2026 à 14:32 » |

Le client consulte occasionnellement, parfois plusieurs jours après : « il y a 3 jours » l'oblige à un calcul mental, une date complète est immédiatement fiable. Format numérique `JJ/MM/AAAA` en interne, format long en toutes lettres côté client.

### Messages d'erreur

Structure imposée : **ce qui s'est passé** + **ce qu'il faut faire**. Jamais de code technique, jamais d'« erreur inattendue » seul.

| Situation | Message |
|---|---|
| Connexion, identifiants faux | « Adresse e-mail ou mot de passe incorrect. » *(volontairement ambigu)* |
| Connexion, compte en attente | « Votre compte est en attente de validation par l'administrateur de l'atelier. » |
| Connexion, compte refusé | « Votre demande d'accès n'a pas été acceptée. Contactez l'administrateur de l'atelier. » |
| Inscription, e-mail déjà pris | « Si un compte existe pour cette adresse, vous pouvez vous connecter ou réinitialiser votre mot de passe. » |
| Mot de passe trop court | « Le mot de passe doit contenir au moins 8 caractères. » |
| Lien de réinitialisation expiré | « Ce lien de réinitialisation n'est plus valide. Demandez-en un nouveau. » |
| Champ obligatoire vide | « Le nom du client est obligatoire. » *(nommer le champ, jamais « ce champ »)* |
| E-mail mal formé | « Cette adresse e-mail n'est pas valide. Exemple : martin.dupont@exemple.fr » |
| Téléphone mal formé | « Ce numéro de téléphone n'est pas valide. Exemple : 06 12 34 56 78 » |
| Aucun client sélectionné | « Choisissez un client ou créez-en un nouveau. » |
| Aucun vélo sélectionné | « Choisissez un vélo ou enregistrez-en un nouveau pour ce client. » |
| Doublon de client probable | « Un client au nom similaire existe déjà. Vérifiez avant de créer un doublon. » |
| Statut d'une réparation restituée | « Cette réparation est clôturée. Le statut ne peut plus être modifié. » |
| Réseau perdu | « Connexion perdue. Vos informations sont conservées, réessayez. » |
| Erreur serveur à l'enregistrement | « L'enregistrement a échoué. Réessayez dans un instant. » |
| Permission insuffisante | « Vous n'avez pas accès à cette page. » + `Retour aux réparations` |
| Page interne inexistante | « Cette page n'existe pas. » + `Retour aux réparations` |
| Erreur serveur globale | « Une erreur est survenue de notre côté. » + `Réessayer` |
| Lien de suivi invalide (public) | « Ce suivi n'est pas disponible. Vérifiez le lien reçu de l'atelier ou contactez-le directement. » |

### Messages de confirmation

Courts, au passé composé, sans exclamation. Bandeau temporaire de 4 secondes **et** annonce en `aria-live="polite"`.

| Action | Message |
|---|---|
| Réparation créée | « Réparation créée. » |
| Fiche modifiée | « Modifications enregistrées. » |
| Statut changé | « Statut mis à jour : Réparation en cours. » *(nommer le nouveau statut)* |
| Réparation annulée | « Réparation annulée. » |
| Réparateur réassigné | « Réparation assignée à Sophie Martin. » |
| Lien copié | « Lien de suivi copié. » |
| Note ajoutée | « Note ajoutée. » |
| Client modifié | « Coordonnées enregistrées. » |
| Client anonymisé | « Client anonymisé. » |
| Employé accepté | « Karim Belaïd a maintenant accès à l'application. » |
| Employé refusé | « Demande refusée. » |
| Employé réactivé | « Karim Belaïd a de nouveau accès à l'application. » |
| Mot de passe modifié | « Mot de passe modifié. » |

---

## 14. Limites du document

Ce document définit l'expérience utilisateur, les écrans, les parcours, les fondations visuelles et les comportements d'interface.

Il ne définit pas :

- le schéma de base de données ;
- les composants techniques ;
- les routes serveur ;
- les politiques de sécurité ;
- l'organisation du code ;
- l'ordre de développement ;
- le détail des tâches ou des user stories.

Ces éléments appartiennent respectivement aux documents d'architecture, de plan d'implémentation et de backlog.

Trois décisions prises ici doivent être répercutées en aval :

- les **notes internes en fil horodaté** avec auteur et date supposent une collection, non un champ unique — à refléter dans le modèle de données ;
- l'**anonymisation d'un client** suppose une action réservée à l'administrateur — à refléter dans les permissions et le backlog ;
- le **statut « Annulé »** porte à sept le nombre de valeurs de statut — à refléter partout où la liste est énumérée.
