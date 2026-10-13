import { APP_NAME } from "@/lib/constants";
import { createClient } from "@/lib/supabase/server";
import SessionCard from "./session-card";

const code = "rounded bg-[#f6f5f4] px-1.5 py-0.5 font-mono text-sm text-[#31302e]";

// Page d'accueil temporaire : elle occupe la racine tant que les écrans métier
// n'existent pas, et sert de point de contrôle de la configuration Supabase.
export default async function Home() {
  const isSupabaseConfigured = Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
  );

  let email: string | null = null;
  if (isSupabaseConfigured) {
    const supabase = await createClient();
    const { data } = await supabase.auth.getUser();
    email = data.user?.email ?? null;
  }

  return (
    <div className="flex flex-1 flex-col bg-[#f6f5f4]">
      <header className="flex h-16 items-center justify-between border-b border-[#e6e6e6] bg-white px-6 sm:px-12">
        <div className="flex items-center gap-3">
          <span className="flex h-8 w-8 items-center justify-center rounded-[9px] bg-[#0075de]">
            <svg
              aria-hidden="true"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#fff"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
            </svg>
          </span>
          <span className="text-lg font-bold tracking-tight text-black">{APP_NAME}</span>
        </div>
        {email && <span className="text-sm text-[#615d59]">{email}</span>}
      </header>

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

        {isSupabaseConfigured && <SessionCard email={email} />}

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
