# Conformité RGPD

> **Document :** Architecture technique (05) — projet digital-artisan (D-G), application D-g
> **Partie :** 11 / 12 · [Retour à l’index](./index.md)
> **Contenu :** Le choix de l’anonymisation plutôt que la suppression, la fonction anonymize_client() réservée à l’administrateur, le point d’attention sur la contrainte de contact et les mesures complémentaires (section 19).

---

## 19. Conformité RGPD

L’application stocke le **nom**, le **téléphone** et l’**adresse e-mail** de chaque client. Ce sont des données à caractère personnel.

La règle « une réparation n’est jamais supprimée » est appliquée jusqu’au niveau de la base. Prise seule, elle rendrait **techniquement impossible** d’honorer une demande d’effacement — une contradiction entre une obligation légale et une décision d’architecture.

### Anonymisation plutôt que suppression

**Décision : les données personnelles du client sont remplacées par des valeurs neutres ; la fiche technique et son historique sont conservés.**

L’atelier conserve ainsi son historique d’interventions (utile à la garantie et à la traçabilité technique) sans conserver de donnée identifiante.

```sql
-- =============================================================================
-- RGPD — anonymisation d'un client (droit à l'effacement)
-- Réservée à l'administrateur. Irréversible.
-- =============================================================================

create or replace function public.anonymize_client(p_client_id uuid)
returns void
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  v_suffix text;
begin
  if not public.is_admin() then
    raise exception 'Seul un administrateur peut anonymiser un client (§19).'
      using errcode = 'insufficient_privilege';
  end if;

  v_suffix := substr(replace(p_client_id::text, '-', ''), 1, 8);

  -- 'anonymise' plutôt que NULL sur phone : la contrainte
  -- clients_contact_required exige au moins un moyen de contact.
  -- La valeur sentinelle la respecte sans conserver de donnée identifiante.
  update public.clients
  set name  = 'Client anonymisé ' || v_suffix,
      phone = 'anonymise',
      email = null
  where id = p_client_id;

  if not found then
    raise exception 'Client introuvable : %', p_client_id
      using errcode = 'no_data_found';
  end if;

  -- Le message public peut contenir le nom du client : il est effacé.
  update public.repairs
  set public_message = null
  where client_id = p_client_id and public_message is not null;
end;
$$;

revoke execute on function public.anonymize_client(uuid) from public, anon;
grant  execute on function public.anonymize_client(uuid) to authenticated;
```

**Point d’attention sur la contrainte de contact.** `clients_contact_required` exige qu’au moins un moyen de contact soit renseigné. Mettre à la fois `phone` et `email` à `NULL` violerait donc la contrainte et ferait échouer l’anonymisation. La fonction inscrit pour cette raison la valeur sentinelle `'anonymise'` dans `phone` : la contrainte est respectée, et aucune donnée identifiante n’est conservée. Alourdir le schéma d’une exception dédiée serait disproportionné.

La vérification `is_admin()` est faite **dans** la fonction, puisque `SECURITY DEFINER` contourne la RLS : sans elle, tout membre actif pourrait anonymiser n’importe quel client.

### Mesures complémentaires

| Mesure | Décision |
|---|---|
| Durée de conservation | 3 ans après restitution, aligné sur la garantie légale de conformité. Purge non automatisée dans le MVP ; à déclencher par l’administrateur. |
| Mention d’information | Une mention courte sur la page publique de suivi indique quelles données sont traitées et par qui. |
| Indexation | `noindex` sur `/suivi/[token]` (§12) : un lien indexé exposerait des informations sur le vélo du client. |
| Journaux | Ni jeton, ni coordonnées client dans les journaux (§16). |
| Suppression du compte d’un employé | `ON DELETE CASCADE` depuis `auth.users` supprime le profil ; les réparations et les notes survivent, non attribuées (§8). |

---
