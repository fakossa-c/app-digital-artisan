"use client";

import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

// Bloc « Compte » de l'accueil : confirme visuellement que l'authentification fonctionne.
export default function SessionCard({ email }: { email: string | null }) {
  async function signOut() {
    await createClient().auth.signOut();
    window.location.assign("/auth");
  }

  return (
    <section className="flex max-w-[480px] flex-col gap-3 rounded-xl border border-[#e6e6e6] bg-white p-6 shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
      <h2 className="text-lg font-semibold text-black">Compte</h2>
      {email ? (
        <>
          <p className="text-base leading-relaxed text-[#31302e]">
            Connecté en tant que <strong>{email}</strong>.
          </p>
          <span className="flex items-center gap-1.5 self-start rounded-full bg-[#e7f7ea] px-2.5 py-1 text-xs font-semibold text-[#14602a]">
            <span className="h-2 w-2 rounded-full bg-[#1aae39]" />
            Session active
          </span>
          <button
            onClick={signOut}
            className="mt-2 h-10 self-start rounded-lg border border-[#dddddd] bg-white px-4 text-sm font-medium text-[#31302e] hover:bg-[#f6f5f4]"
          >
            Se déconnecter
          </button>
        </>
      ) : (
        <>
          <p className="text-base leading-relaxed text-[#615d59]">
            Vous n’êtes pas connecté.
          </p>
          <Link
            href="/auth"
            className="mt-2 flex h-11 items-center self-start rounded-lg bg-[#0075de] px-5 text-base font-semibold text-white hover:bg-[#005bab]"
          >
            Tester l’authentification
          </Link>
        </>
      )}
    </section>
  );
}
