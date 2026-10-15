"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

type Result = { tone: "ok" | "none" | "error"; text: string };

const TONES: Record<Result["tone"], string> = {
  ok: "border-[#bfe5c7] bg-[#e7f7ea] text-[#14602a]",
  none: "border-[#f1d9a8] bg-[#fdf3e0] text-[#7a4b00]",
  error: "border-[#f2c4c4] bg-[#fdeaea] text-[#8a1c1c]",
};

// Formulaire de l'exercice RLS : tente de supprimer une réparation par son identifiant, avec la
// session du compte connecté, et dit combien de lignes ont réellement été supprimées.
export default function DeleteRepair() {
  const router = useRouter();
  const [id, setId] = useState("");
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<Result | null>(null);

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setBusy(true);
    setResult(null);

    // La table `reparations` est créée par l'apprenant dans Supabase : les types générés ne la
    // connaissent pas, d'où le typage lâche. `.select()` renvoie les lignes réellement supprimées.
    const { data, error } = await (createClient() as unknown as {
      from: (t: string) => {
        delete: () => {
          eq: (
            c: string,
            v: string
          ) => {
            select: () => Promise<{
              data: unknown[] | null;
              error: { message: string; code?: string } | null;
            }>;
          };
        };
      };
    })
      .from("reparations")
      .delete()
      .eq("id", id.trim())
      .select();

    if (error) {
      setResult({
        tone: "error",
        text: `Erreur : ${error.message}${error.code ? ` (code ${error.code})` : ""}`,
      });
    } else if (data && data.length > 0) {
      setResult({ tone: "ok", text: `${data.length} réparation supprimée.` });
    } else {
      // C'est le comportement du RLS : un refus ne produit pas d'erreur, il ne touche aucune ligne.
      setResult({
        tone: "none",
        text: "0 réparation supprimée. Aucune erreur : cet identifiant n’existe pas, ou une règle de sécurité interdit la suppression.",
      });
    }

    setBusy(false);
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-3">
      <label htmlFor="repair-id" className="text-sm font-medium text-[#31302e]">
        Identifiant de la réparation
      </label>
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          id="repair-id"
          value={id}
          onChange={(event) => setId(event.target.value)}
          required
          autoComplete="off"
          placeholder="Collez l’identifiant copié depuis le Table Editor"
          className="h-11 flex-1 rounded-lg border border-[#dddddd] bg-white px-3.5 text-base text-[#31302e] placeholder:text-[#a39e98] focus:border-[#0075de] focus:outline-none focus:ring-2 focus:ring-[#0075de]/20"
        />
        <button
          type="submit"
          disabled={busy}
          className="h-11 rounded-lg bg-[#0075de] px-5 text-base font-semibold text-white hover:bg-[#005bab] disabled:opacity-60"
        >
          {busy ? "Suppression…" : "Supprimer"}
        </button>
      </div>
      {result && (
        <p
          role="status"
          className={`rounded-lg border px-3.5 py-3 text-sm leading-normal ${TONES[result.tone]}`}
        >
          {result.text}
        </p>
      )}
    </form>
  );
}
