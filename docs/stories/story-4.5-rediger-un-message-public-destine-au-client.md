> Story extraite de `docs/07-epics-stories.md`. À exécuter dans l'ordre. Prérequis : voir « Dépend de ».

### Story 4.5 — Rédiger un message public destiné au client
- **Epic :** Epic 4 — Suivi public
- **Dépend de :** Story 2.4, Story 4.1
- **Objectif :** Permettre d'adresser au client un court message que le statut seul ne porte pas.
- **Contexte :** Champ décrit dans `04-ux-design-shard/` § 6.5. Il doit être **explicitement identifié
  comme visible par le client** et clairement distinct du champ de note interne : les confondre
  exposerait une note interne au client.
- **Tâches :**
  1. Ajouter le champ de message public sur la fiche, distinct et signalé comme visible du client.
  2. Enregistrer sa valeur via une Server Action.
  3. Répercuter le message sur la page publique, sans emplacement vide en son absence.
  4. Masquer la modification sur une réparation close.
- **Critères d'acceptance :**
  - [ ] Saisir un message public et l'enregistrer affiche « Modifications enregistrées. » et le message
        apparaît sur la page publique de suivi.
  - [ ] Sans message rédigé, la page publique n'affiche aucun emplacement vide à cet effet.
  - [ ] Modifier ou vider le message se répercute sur la page publique ; un message vidé n'apparaît plus.
  - [ ] Le champ est explicitement identifié comme visible par le client et distinct du champ de note
        interne.
  - [ ] Une réparation « Restitué » ou « Annulé » ne propose pas la modification du message public.
  - [ ] Un utilisateur non authentifié ou non actif se voit refuser l'action côté serveur.
- **Terminé quand :** Un employé adresse une précision au client, visible sur sa page de suivi, sans
  jamais confondre ce champ avec une note interne.
