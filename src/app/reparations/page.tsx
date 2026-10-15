import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import AppHeader from "../app-header";
import DeleteRepair from "./delete-repair";
import RepairsTable from "./repairs-table";

const card =
  "flex max-w-3xl flex-col gap-3 rounded-xl border border-[#e6e6e6] bg-white p-6 shadow-[0_1px_3px_rgba(0,0,0,0.06)]";
const code = "rounded bg-[#f6f5f4] px-1.5 py-0.5 font-mono text-sm text-[#31302e]";

// Page de test du RLS sur `reparations` : elle montre ce que le compte connecté
// (ou la clé publique seule) peut lire dans `reparations`, et permet d'essayer de supprimer une
// ligne. Page temporaire, comme l'accueil : elle disparaît avec les vrais écrans de l'atelier.
export default async function ReparationsPage() {
  const isSupabaseConfigured = Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
  );

  let email: string | null = null;
  let userId: string | null = null;
  let rows: Record<string, unknown>[] = [];
  let readError: string | null = null;

  if (isSupabaseConfigured) {
    const supabase = await createClient();
    const { data } = await supabase.auth.getUser();
    email = data.user?.email ?? null;
    userId = data.user?.id ?? null;

    // La table `reparations` est créée par l'apprenant : les types générés ne la connaissent pas.
    // Les lignes masquées par le RLS ne donnent pas d'erreur, juste une liste plus courte.
    const result = await (supabase as unknown as {
      from: (t: string) => {
        select: (c: string) => Promise<{
          data: Record<string, unknown>[] | null;
          error: { message: string } | null;
        }>;
      };
    })
      .from("reparations")
      .select("*");
    rows = result.data ?? [];
    readError = result.error?.message ?? null;
  }

  return (
    <div className="flex flex-1 flex-col bg-[#f6f5f4]">
      <AppHeader email={email} />

      <main className="flex flex-col gap-8 px-6 py-12 sm:px-12">
        <div className="flex flex-col gap-3">
          <Link
            href="/"
            className="self-start text-sm font-medium text-[#0075de] hover:text-[#005bab]"
          >
            ← Retour à l’accueil
          </Link>
          <h1 className="text-[32px] font-semibold leading-tight tracking-[-0.03em] text-black">
            Réparations
          </h1>
          <p className="max-w-2xl text-base leading-normal text-[#615d59]">
            Ce que la clé publique et le compte connecté ont le droit de lire dans la table{" "}
            <code className={code}>reparations</code>, et un essai de suppression.
          </p>
        </div>

        {!isSupabaseConfigured ? (
          <section className={card}>
            <p className="text-base leading-relaxed text-[#31302e]">
              Aucune configuration Supabase détectée : renseignez <code className={code}>.env.local</code>{" "}
              puis redémarrez le serveur.
            </p>
          </section>
        ) : (
          <>
            <section className={card}>
              <h2 className="text-lg font-semibold text-black">
                {email ? "Réparations que vous pouvez lire" : "Réparations lisibles sans compte"}
              </h2>

              {!email && (
                <p className="text-sm leading-relaxed text-[#615d59]">
                  Vous n’êtes pas connecté : ce tableau montre ce que la clé publique seule peut
                  lire.{" "}
                  <Link href="/auth" className="font-medium text-[#0075de] hover:text-[#005bab]">
                    Se connecter
                  </Link>
                </p>
              )}

              {readError ? (
                <p
                  role="alert"
                  className="rounded-lg border border-[#f2c4c4] bg-[#fdeaea] px-3.5 py-3 text-sm leading-normal text-[#8a1c1c]"
                >
                  Lecture impossible : {readError}
                </p>
              ) : (
                <>
                  <p className="text-base font-medium text-[#31302e]">
                    {rows.length} réparation{rows.length > 1 ? "s" : ""} visible
                    {rows.length > 1 ? "s" : ""}
                  </p>
                  {rows.length > 0 ? (
                    <RepairsTable rows={rows} currentId={userId} />
                  ) : (
                    <p className="text-sm leading-relaxed text-[#615d59]">
                      Aucune ligne visible, et aucune erreur : la table est vide, ou protégée par
                      le RLS. Cette page ne peut pas faire la différence.
                    </p>
                  )}
                </>
              )}
            </section>

            {email && (
              <section className={card}>
                <h2 className="text-lg font-semibold text-black">Supprimer une réparation</h2>
                <p className="text-sm leading-relaxed text-[#615d59]">
                  La suppression est réelle. Un refus de sécurité ne produit pas d’erreur : le
                  message indique simplement combien de lignes ont été supprimées.
                </p>
                <DeleteRepair />
              </section>
            )}
          </>
        )}
      </main>
    </div>
  );
}
