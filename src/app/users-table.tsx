// Pastilles de statut, aux couleurs de la maquette (reçu, en attente, terminé...).
const STATUS_STYLES: Record<string, string> = {
  actif: "bg-[#e7f7ea] text-[#14602a]",
  "en attente": "bg-[#fdeee4] text-[#793400]",
  désactivé: "bg-[#f0efee] text-[#615d59]",
};

function Cell({ column, value }: { column: string; value: unknown }) {
  const text = String(value ?? "");
  const style = column === "statut" || column === "status" ? STATUS_STYLES[text] : undefined;

  if (style) {
    return (
      <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${style}`}>{text}</span>
    );
  }
  // Un identifiant complet est illisible : on garde le début.
  return <>{column === "id" ? `${text.slice(0, 8)}…` : text}</>;
}

// Tableau des profils lisibles par le compte connecté. Les colonnes suivent celles de la table
// `profiles` de l'apprenant, quels que soient leurs noms.
export default function UsersTable({
  rows,
  currentId,
}: {
  rows: Record<string, unknown>[];
  currentId: string | null;
}) {
  const columns = Object.keys(rows[0]);

  return (
    <section className="flex max-w-3xl flex-col gap-3 rounded-xl border border-[#e6e6e6] bg-white p-6 shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
      <h2 className="text-lg font-semibold text-black">Utilisateurs</h2>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left text-sm">
          <thead>
            <tr className="bg-[#f6f5f4] text-xs uppercase tracking-wide text-[#615d59]">
              {columns.map((column) => (
                <th key={column} className="px-3 py-2 font-semibold">
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={String(row.id ?? index)} className="border-t border-[#e6e6e6]">
                {columns.map((column) => (
                  <td key={column} className="px-3 py-2.5 text-[#31302e]">
                    <Cell column={column} value={row[column]} />
                    {column === columns[1] && row.id === currentId && (
                      <span className="ml-2 text-xs text-[#615d59]">(vous)</span>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
