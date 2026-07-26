# Formulaires, actions sensibles et états particuliers

> **Document :** UX Design (04) — projet digital-artisan (D-G), application D-g
> **Partie :** 5 / 7 · [Retour à l’index](./index.md)
> **Contenu :** Le comportement attendu des formulaires, la liste fermée des quatre actions demandant confirmation, puis les états de chargement, de liste vide, d’erreur et de réseau perdu (sections 9 et 10).

---

## 9. Formulaires et actions sensibles

Chaque action produit un retour visible : bandeau temporaire de 4 secondes, annoncé en `aria-live="polite"`. Les formulations exactes figurent en [§ 13](./07-contenu-redactionnel.md).

Les formulaires doivent :

- conserver les données saisies en cas d'erreur, **y compris en cas d'échec réseau** ;
- indiquer clairement les champs obligatoires ;
- passer le bouton en état occupé pendant l'enregistrement (libellé « Enregistrement… », `disabled`, `aria-busy="true"`) ;
- empêcher les doubles soumissions ;
- afficher un message de confirmation après succès ;
- déplacer le focus sur le premier champ en erreur.

### Actions sensibles

Rien ne se supprime dans cette application : les réparations, les clients et les vélos sont conservés. La règle générale « les actions destructrices demandent une confirmation » serait donc sans objet — et, appliquée au hasard, elle ralentirait le changement de statut, qui est l'action la plus fréquente du produit.

Elle est remplacée par une **liste fermée** de quatre actions sensibles :

| Action | Confirmation | Formulation |
|---|---|---|
| Refuser une inscription | Modale | « Refuser la demande de {nom} ? Cette personne ne pourra pas accéder à l'application. » — `Annuler` / `Refuser la demande` (danger) |
| Passer une réparation à **Restitué** | Modale légère | « Marquer cette réparation comme restituée ? Le statut ne pourra plus être modifié ensuite. » — `Annuler` / `Marquer comme restituée` |
| **Annuler** une réparation | Modale | « Annuler cette réparation ? Elle sortira des réparations en cours. Vous pourrez la rouvrir si nécessaire. » — `Annuler` / `Annuler la réparation` (danger) |
| **Anonymiser** un client (admin) | Modale | Voir [§ 7.3](./03-ecrans.md#73--clients-et-vélos) — action irréversible |

À quoi s'ajoute une confirmation de sortie : « Des modifications ne sont pas enregistrées. Quitter quand même ? », déclenchée en cas de déconnexion ou de navigation depuis un formulaire non enregistré.

**Aucune autre action ne demande de confirmation.** Les changements de statut ordinaires sont immédiats : on ne confirme pas ce qui se corrige en un clic.

---

## 10. États particuliers

### Chargement

L'architecture rend la plupart des écrans côté serveur : il n'y a alors rien à charger côté client, et un indicateur permanent serait une décoration inutile — voire une raison de convertir des écrans serveur en écrans clients, ce qui annulerait la décision d'architecture. Trois cas, trois traitements :

| Cas | Traitement |
|---|---|
| **Navigation vers une page rendue côté serveur** (liste, détail, clients, employés, page publique) | Pas de spinner. Un **squelette** de la page — blocs gris aux dimensions du contenu réel — s'affiche pendant la navigation. Jamais de page blanche. |
| **Soumission d'un formulaire** (créer, modifier, changer un statut, accepter/refuser) | Bouton en état occupé : libellé remplacé, `disabled`, `aria-busy="true"`. C'est le seul chargement réellement perçu par l'utilisateur. |
| **Interaction client réelle** (recherche de client ou de vélo au clavier) | Indicateur discret dans le champ, texte « Recherche… » associé, nombre de résultats annoncé en `aria-live="polite"`. |

### Listes vides

Un message par contexte — proposer « Créer une première réparation » quand un filtre ne remonte rien est absurde :

| Contexte | Message | Action proposée |
|---|---|---|
| Aucune réparation (base vide) | « Aucune réparation enregistrée pour l'instant. » | `Créer une réparation` |
| « Mes réparations » vide | « Aucune réparation ne vous est assignée. » | `Voir toutes les réparations` |
| Recherche ou filtre sans résultat | « Aucune réparation ne correspond à votre recherche. » | `Effacer les filtres` |
| Aucun client | « Aucun client enregistré pour l'instant. » | `Créer une réparation` |
| Aucune demande en attente | « Aucune demande d'inscription en attente. » | — |
| Aucune note interne | « Aucune note pour l'instant. » | champ d'ajout déjà visible |

### Erreur

Le message indique ce qui n'a pas fonctionné et propose de réessayer ([§ 13](./07-contenu-redactionnel.md#messages-derreur)).

### Réseau perdu

L'atelier a souvent un réseau médiocre. Deux garde-fous, peu coûteux :

- **ne jamais perdre une saisie** en cas d'échec réseau ;
- un message distinct des erreurs de validation : « Connexion perdue. Vos informations sont conservées, réessayez. », accompagné d'un bouton `Réessayer`.

Le mode hors ligne complet est hors périmètre.

### Accès refusé et lien invalide

Traités comme écrans à part entière en [§ 7.6](./03-ecrans.md#76--écrans-derreur) et [§ 7.5](./03-ecrans.md#75--espace-public).
