import { APP_NAME } from "@/lib/constants";

// Page d'accueil temporaire : elle occupe la racine tant que les écrans métier
// n'existent pas, et sert de point de contrôle de la configuration Supabase.
export default function Home() {
  const isSupabaseConfigured = Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
  );

  return (
    <div className="flex flex-1 items-center justify-center bg-[#F8FAFC] px-6 py-12">
      <main className="w-full max-w-2xl rounded-lg border border-[#E2E8F0] bg-white p-8 shadow-sm">
        <p className="text-base font-semibold text-[#0F172A]">{APP_NAME}</p>

        <h1 className="mt-6 text-[32px] font-semibold leading-tight text-[#0F172A]">
          Bienvenue !
        </h1>

        <p className="mt-4 text-base leading-7 text-[#475569]">
          Voici la page d’accueil temporaire de l’application de suivi de
          réparations. Les écrans de l’atelier seront construits story après
          story ; cette page disparaîtra à ce moment-là.
        </p>

        <div className="mt-8 rounded-lg border border-[#E2E8F0] p-6">
          <h2 className="text-xl font-semibold text-[#0F172A]">
            Connexion à Supabase
          </h2>

          {isSupabaseConfigured ? (
            <p className="mt-3 text-base leading-7 text-[#475569]">
              Configuration détectée. L’application sait joindre votre projet
              Supabase : vous pouvez enchaîner sur la création du schéma de
              données.
            </p>
          ) : (
            <>
              <p className="mt-3 text-base leading-7 text-[#475569]">
                Aucune configuration détectée. C’est normal si vous venez de
                cloner le dépôt — l’application n’est reliée à aucune base de
                données pour l’instant.
              </p>

              <p className="mt-6 text-sm font-medium text-[#0F172A]">
                Pour la relier à votre propre projet :
              </p>
              <ol className="mt-3 list-decimal space-y-2 pl-5 text-base leading-7 text-[#475569]">
                <li>
                  Créez vos projets Supabase et récupérez l’URL et la clé
                  publique.
                </li>
                <li>
                  Copiez le fichier{" "}
                  <code className="rounded bg-[#F8FAFC] px-1.5 py-0.5 font-mono text-sm text-[#0F172A]">
                    .env.local.example
                  </code>{" "}
                  en{" "}
                  <code className="rounded bg-[#F8FAFC] px-1.5 py-0.5 font-mono text-sm text-[#0F172A]">
                    .env.local
                  </code>
                  , puis renseignez vos deux valeurs.
                </li>
                <li>Redémarrez le serveur de développement.</li>
              </ol>

              <p className="mt-6 text-sm leading-6 text-[#475569]">
                Le détail de ces étapes figure dans les stories 0.4 à 0.7, sous{" "}
                <code className="rounded bg-[#F8FAFC] px-1.5 py-0.5 font-mono text-sm text-[#0F172A]">
                  docs/stories/
                </code>
                .
              </p>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
