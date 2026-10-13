"use client";

import Link from "next/link";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import AuthShell from "../auth-shell";

// Atteinte via le lien « mot de passe oublié » : la session de récupération est déjà ouverte
// par /auth/callback, il ne reste qu'à choisir le nouveau mot de passe.
export default function ResetPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const { error } = await createClient().auth.updateUser({ password });
    if (error) setError(error.message);
    else setDone(true);
    setLoading(false);
  }

  return (
    <AuthShell
      title="Nouveau mot de passe"
      subtitle="Choisissez un mot de passe d’au moins 6 caractères."
    >
      {done ? (
        <p
          role="status"
          className="rounded-lg border border-[#b7e3c0] bg-[#e7f7ea] px-3.5 py-3 text-sm text-[#14602a]"
        >
          Mot de passe modifié.{" "}
          <Link href="/" className="font-semibold underline">
            Retour à l’accueil
          </Link>
        </p>
      ) : (
        <form onSubmit={onSubmit} className="flex flex-col gap-6">
          <label className="flex flex-col gap-1.5 text-sm font-medium text-[#31302e]">
            Nouveau mot de passe
            <input
              type="password"
              required
              minLength={6}
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-11 w-full rounded-lg border border-[#dddddd] px-3.5 text-base text-[#31302e] outline-none focus:border-2 focus:border-[#0075de] focus:px-[13px]"
            />
          </label>
          {error && (
            <p
              role="alert"
              className="rounded-lg border border-[#f3c1c1] bg-[#fdecec] px-3.5 py-3 text-sm text-[#a12626]"
            >
              {error}
            </p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="h-12 w-full rounded-lg bg-[#0075de] text-base font-semibold text-white hover:bg-[#005bab] disabled:opacity-50"
          >
            {loading ? "Patientez…" : "Enregistrer"}
          </button>
        </form>
      )}
    </AuthShell>
  );
}
