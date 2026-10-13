import AuthShell from "./auth-shell";
import AuthForm from "./auth-form";

// Page de test de l'authentification Supabase (inscription, connexion, mot de passe oublié).
export default async function AuthPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  const isSupabaseConfigured = Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
  );

  if (!isSupabaseConfigured) {
    return (
      <AuthShell
        title="Supabase n’est pas configuré"
        subtitle="Copiez .env.local.example en .env.local, renseignez l’URL et la clé publique de votre projet Supabase, puis redémarrez le serveur (pnpm dev)."
      >
        {null}
      </AuthShell>
    );
  }

  return <AuthForm linkError={error === "lien-invalide"} />;
}
