"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import AuthShell from "./auth-shell";

type Mode = "signin" | "signup" | "forgot";

const COPY: Record<Mode, { title: string; subtitle: string; submit: string }> = {
  signin: {
    title: "Content de vous revoir",
    subtitle: "Connectez-vous pour suivre vos réparations.",
    submit: "Se connecter",
  },
  signup: {
    title: "Créer votre compte",
    subtitle: "Quelques secondes pour suivre vos réparations.",
    submit: "Créer mon compte",
  },
  forgot: {
    title: "Mot de passe oublié ?",
    subtitle:
      "Indiquez votre adresse, nous vous envoyons un lien pour en choisir un nouveau.",
    submit: "Envoyer le lien",
  },
};

const inputClass =
  "h-11 w-full rounded-lg border border-[#dddddd] px-3.5 text-base text-[#31302e] outline-none focus:border-2 focus:border-[#0075de] focus:px-[13px]";
const linkClass = "font-semibold text-[#005bab] hover:underline";

// Traduit les erreurs Supabase les plus courantes en message clair pour un débutant.
function explain(message: string): string {
  const m = message.toLowerCase();
  if (m.includes("invalid login credentials"))
    return "E-mail ou mot de passe incorrect (ou compte pas encore confirmé).";
  if (m.includes("email not confirmed"))
    return "Compte non confirmé : cliquez sur le lien reçu par e-mail.";
  if (m.includes("rate limit") || m.includes("too many") || m.includes("seconds"))
    return "Trop de demandes. Avec le compte gratuit Supabase, seuls 2 e-mails par heure partent, et une nouvelle demande est possible après 60 secondes. Patientez, puis réessayez.";
  if (m.includes("not authorized"))
    return "Cette adresse n’est pas autorisée : avec l’envoi d’e-mails par défaut de Supabase, seules les adresses des membres de votre organisation Supabase reçoivent des messages.";
  if (m.includes("password") && m.includes("characters"))
    return "Mot de passe trop court (6 caractères minimum).";
  return message;
}

export default function AuthForm({ linkError = false }: { linkError?: boolean }) {
  const [mode, setMode] = useState<Mode>("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(
    linkError
      ? "Ce lien n’est plus valable (déjà utilisé ou expiré). Reconnectez-vous, ou refaites une demande de mot de passe oublié."
      : null
  );
  const [info, setInfo] = useState<string | null>(null);

  function switchMode(next: Mode) {
    setMode(next);
    setError(null);
    setInfo(null);
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setInfo(null);

    const supabase = createClient();
    const origin = window.location.origin;

    if (mode === "signin") {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) setError(explain(error.message));
      else window.location.assign("/");
    }

    if (mode === "signup") {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: `${origin}/auth/callback` },
      });
      if (error) setError(explain(error.message));
      else if (data.session) window.location.assign("/");
      else
        setInfo(
          "Inscription enregistrée. Vérifiez votre boîte mail (et les spams) et cliquez sur le lien de confirmation. Si l’adresse avait déjà un compte, Supabase n’envoie rien et ne le dit pas, par sécurité."
        );
    }

    if (mode === "forgot") {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${origin}/auth/callback?next=/auth/reset`,
      });
      if (error) setError(explain(error.message));
      else
        setInfo(
          "Si un compte existe pour cette adresse, un e-mail de réinitialisation vient d’être envoyé."
        );
    }

    setLoading(false);
  }

  const { title, subtitle, submit } = COPY[mode];

  return (
    <AuthShell title={title} subtitle={subtitle}>
      <form onSubmit={onSubmit} className="flex flex-col gap-6">
        <div className="flex flex-col gap-4">
          <label className="flex flex-col gap-1.5 text-sm font-medium text-[#31302e]">
            Adresse e-mail
            <input
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={inputClass}
            />
          </label>

          {mode !== "forgot" && (
            <label className="flex flex-col gap-1.5 text-sm font-medium text-[#31302e]">
              Mot de passe
              <input
                type="password"
                required
                minLength={6}
                autoComplete={mode === "signup" ? "new-password" : "current-password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={inputClass}
              />
            </label>
          )}

          {mode === "signin" && (
            <div className="text-right">
              <button
                type="button"
                onClick={() => switchMode("forgot")}
                className="text-sm font-medium text-[#005bab] hover:underline"
              >
                Mot de passe oublié ?
              </button>
            </div>
          )}
        </div>

        {error && (
          <p
            role="alert"
            className="rounded-lg border border-[#f3c1c1] bg-[#fdecec] px-3.5 py-3 text-sm leading-normal text-[#a12626]"
          >
            {error}
          </p>
        )}
        {info && (
          <p
            role="status"
            className="rounded-lg border border-[#b7e3c0] bg-[#e7f7ea] px-3.5 py-3 text-sm leading-normal text-[#14602a]"
          >
            {info}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="h-12 w-full rounded-lg bg-[#0075de] text-base font-semibold text-white hover:bg-[#005bab] disabled:opacity-50"
        >
          {loading ? "Patientez…" : submit}
        </button>

        <p className="text-center text-sm text-[#615d59]">
          {mode === "signin" ? (
            <>
              Pas encore de compte ?{" "}
              <button type="button" onClick={() => switchMode("signup")} className={linkClass}>
                Créer un compte
              </button>
            </>
          ) : mode === "signup" ? (
            <>
              Déjà un compte ?{" "}
              <button type="button" onClick={() => switchMode("signin")} className={linkClass}>
                Se connecter
              </button>
            </>
          ) : (
            <button type="button" onClick={() => switchMode("signin")} className={linkClass}>
              Retour à la connexion
            </button>
          )}
        </p>
      </form>
    </AuthShell>
  );
}
