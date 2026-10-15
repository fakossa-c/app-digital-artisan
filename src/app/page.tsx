import { createClient } from "@/lib/supabase/server";
import AppHeader from "./app-header";
import SessionCard from "./session-card";
import UsersTable from "./users-table";

const code = "rounded bg-[#f6f5f4] px-1.5 py-0.5 font-mono text-sm text-[#31302e]";

// Page d'accueil temporaire : elle occupe la racine tant que les écrans métier
// n'existent pas, et sert de point de contrôle de la configuration Supabase.
export default async function Home() {
  const isSupabaseConfigured = Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
  );

  let email: string | null = null;
  let profile: Record<string, unknown> | null = null;
  let profiles: Record<string, unknown>[] = [];
  if (isSupabaseConfigured) {
    const supabase = await createClient();
    const { data } = await supabase.auth.getUser();
    email = data.user?.email ?? null;

    if (data.user) {
      // La table `profiles` est créée par l'apprenant dans Supabase : les types générés ne la
      // connaissent pas encore, d'où le typage lâche. Les lignes absentes ou masquées par les
      // RLS donnent une liste vide, sans erreur.
      const { data: rows } = await (supabase as unknown as {
        from: (t: string) => {
          select: (c: string) => Promise<{ data: Record<string, unknown>[] | null }>;
        };
      })
        .from("profiles")
        .select("*");
      profiles = rows ?? [];
      profile = profiles.find((row) => row.id === data.user.id) ?? null;
    }
  }

  return (
    <div className="flex flex-1 flex-col bg-[#f6f5f4]">
      <AppHeader email={email} />

      <main className="flex flex-col gap-8 px-6 py-12 sm:px-12">
        <div className="flex flex-col gap-2">
          <h1 className="text-[32px] font-semibold leading-tight tracking-[-0.03em] text-black">
            Bienvenue !
          </h1>
          <p className="max-w-2xl text-base leading-normal text-[#615d59]">
            Page d’accueil temporaire de l’application de suivi de réparations.
            Les écrans de l’atelier seront construits story après story ; cette
            page disparaîtra à ce moment-là.
          </p>
        </div>

        {isSupabaseConfigured && <SessionCard email={email} profile={profile} />}

        {profiles.length > 0 && (
          <UsersTable
            rows={profiles}
            currentId={typeof profile?.id === "string" ? profile.id : null}
          />
        )}

        <section className="flex max-w-[480px] flex-col gap-3 rounded-xl border border-[#e6e6e6] bg-white p-6 shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
          <h2 className="text-lg font-semibold text-black">Connexion à Supabase</h2>

          {isSupabaseConfigured ? (
            <p className="text-base leading-relaxed text-[#31302e]">
              Configuration détectée. L’application sait joindre votre projet
              Supabase.
            </p>
          ) : (
            <>
              <p className="text-base leading-relaxed text-[#31302e]">
                Aucune configuration détectée. C’est normal si vous venez de
                cloner le dépôt : l’application n’est reliée à aucune base de
                données pour l’instant.
              </p>
              <ol className="list-decimal space-y-2 pl-5 text-base leading-relaxed text-[#615d59]">
                <li>
                  Créez vos projets Supabase et récupérez l’URL et la clé
                  publique.
                </li>
                <li>
                  Copiez <code className={code}>.env.local.example</code> en{" "}
                  <code className={code}>.env.local</code>, puis renseignez vos
                  deux valeurs.
                </li>
                <li>Redémarrez le serveur de développement.</li>
              </ol>
              <p className="text-sm leading-relaxed text-[#615d59]">
                Le détail figure dans les stories 0.4 à 0.7, sous{" "}
                <code className={code}>docs/stories/</code>.
              </p>
            </>
          )}
        </section>
      </main>
    </div>
  );
}
