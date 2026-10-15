// Pastilles de statut des réparations, aux couleurs de la maquette (reçu, en cours...).
const STATUS_STYLES: Record<string, string> = {
  reçu: "bg-[#e8f1fb] text-[#0b4a8a]",
  "en cours": "bg-[#e6f4f3] text-[#1f6f6c]",
  prêt: "bg-[#e7f7ea] text-[#14602a]",
  récupéré: "bg-[#f0efee] text-[#615d59]",
};

function Cell({
  column,
  value,
  currentId,
}: {
  column: string;
  value: unknown;
  currentId: string | null;
}) {
  const text = String(value ?? "");
  const style = column === "statut" || column === "status" ? STATUS_STYLES[text] : undefined;

  if (style) {
    return (
      <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${style}`}>{text}</span>
    );
  }

  // Un identifiant complet est illisible : on garde le début. Un horodatage : on garde la date.
  const shown =
    text.length > 12 && column.endsWith("id")
      ? `${text.slice(0, 8)}…`
      : column.endsWith("_at")
        ? text.slice(0, 10)
        : text;
  return (
    <>
      {shown}
      {column === "client_id" && currentId !== null && text === currentId && (
        <span className="ml-2 text-xs text-[#615d59]">(vous)</span>
      )}
    </>
  );
}

// Tableau des réparations lisibles par le compte connecté. Les colonnes suivent celles de la
// table `reparations` de l'apprenant, quels que soient leurs noms.
export default function RepairsTable({
  rows,
  currentId,
}: {
  rows: Record<string, unknown>[];
  currentId: string | null;
}) {
  const columns = Object.keys(rows[0]);

  return (
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
                  <Cell column={column} value={row[column]} currentId={currentId} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
