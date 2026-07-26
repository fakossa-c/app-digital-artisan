> Story extraite de `docs/07-epics-stories.md`. À exécuter dans l'ordre. Prérequis : voir « Dépend de ».

### Story 4.6 — Imprimer le ticket d'atelier portant le QR code de la fiche
- **Epic :** Epic 4 — Suivi public
- **Dépend de :** Story 2.4
- **Objectif :** Produire un ticket à accrocher au vélo, portant un QR code vers sa fiche interne, pour
  retrouver la bonne réparation d'un scan en atelier.
- **Contexte :** Le ticket est un support **interne** : il n'est pas remis au client et ne porte **pas**
  le lien public. Le QR code encode l'adresse de la fiche interne, protégée comme toute route de
  l'espace interne (voir `05-architecture-shard/07-flux-principaux.md` § Ticket d'atelier et QR code
  interne). La bibliothèque de génération de QR code est la seule dépendance supplémentaire autorisée
  par la stack pour cet usage.
- **Tâches :**
  1. Ajouter l'action « Imprimer le ticket d'atelier » sur la fiche.
  2. Créer la mise en page d'impression, en petit format.
  3. Générer le QR code localement, encodant l'adresse de la fiche interne.
  4. Y porter le nom du client, le vélo et la date de dépôt.
- **Critères d'acceptance :**
  - [ ] Imprimer le ticket produit un feuillet de petit format comportant le nom du client, le vélo, la
        date de dépôt et un QR code.
  - [ ] Scanner le QR code en étant authentifié et actif ouvre la fiche interne de cette réparation et
        permet d'en changer le statut sans étape intermédiaire.
  - [ ] Scanner le QR code sans être authentifié affiche la page de connexion, sans qu'aucune donnée de
        la réparation ne soit visible.
  - [ ] Le ticket ne comporte aucune note interne ni le lien public de suivi.
  - [ ] La génération du QR code n'envoie l'adresse de la fiche à aucun service externe.
- **Terminé quand :** Un réparateur scanne le ticket accroché à un vélo et arrive directement sur la
  fiche interne correspondante.

---

## Epic 5 — Consultation et recherche

Retrouver une réparation en quelques secondes, quel que soit le volume.
