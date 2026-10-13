import Link from "next/link";
import { APP_NAME } from "@/lib/constants";

function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-3">
      <span className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-[#0075de]">
        <svg
          aria-hidden="true"
          width="20"
          height="20"
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
      <span
        className={`text-xl font-bold tracking-tight ${light ? "text-white" : "text-black"}`}
      >
        {APP_NAME}
      </span>
    </Link>
  );
}

// Écran partagé : panneau de marque à gauche (masqué sur mobile), formulaire à droite.
export default function AuthShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-1 bg-white">
      <aside className="hidden w-[44%] max-w-[560px] flex-col justify-between bg-[#213183] p-12 text-white lg:flex">
        <Logo light />

        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <h2 className="text-[40px] font-semibold leading-[1.15] tracking-[-0.03em]">
              Chaque réparation, de la réception au retrait.
            </h2>
            <p className="text-base leading-relaxed text-white/75">
              Suivez l’avancement de votre vélo à l’atelier, sans appeler.
            </p>
          </div>

          <div className="flex flex-col gap-4 rounded-xl bg-white p-5 shadow-[0_8px_24px_rgba(0,0,0,0.18)]">
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-0.5">
                <span className="text-xs text-[#615d59]">Réparation n° 0042</span>
                <span className="text-base font-semibold text-[#31302e]">
                  Vélo de ville, révision complète
                </span>
              </div>
              <span className="flex items-center gap-1.5 rounded-full bg-[#e6f4f3] px-2.5 py-1 text-xs font-semibold text-[#1f6f6c]">
                <span className="h-2 w-2 rounded-full bg-[#2a9d99]" />
                En cours
              </span>
            </div>
            <div className="flex gap-1.5">
              <div className="h-1.5 flex-1 rounded-sm bg-[#62aef0]" />
              <div className="h-1.5 flex-1 rounded-sm bg-[#d6b6f6]" />
              <div className="h-1.5 flex-1 rounded-sm bg-[#2a9d99]" />
              <div className="h-1.5 flex-1 rounded-sm bg-[#e6e6e6]" />
            </div>
            <div className="flex justify-between text-xs text-[#615d59]">
              <span>Reçu</span>
              <span>Diagnostic</span>
              <span>En cours</span>
              <span>Prêt</span>
            </div>
          </div>
        </div>

        <span className="text-[13px] text-white/60">
          Atelier {APP_NAME} · Suivi de réparations
        </span>
      </aside>

      <main className="flex flex-1 items-center justify-center px-6 py-12">
        <div className="flex w-full max-w-[380px] flex-col gap-6">
          <div className="lg:hidden">
            <Logo />
          </div>
          <div className="flex flex-col gap-2">
            <h1 className="text-[32px] font-semibold leading-tight tracking-[-0.03em] text-black">
              {title}
            </h1>
            {subtitle && (
              <p className="text-base leading-normal text-[#615d59]">{subtitle}</p>
            )}
          </div>
          {children}
        </div>
      </main>
    </div>
  );
}
