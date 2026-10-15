import Link from "next/link";
import { APP_NAME } from "@/lib/constants";

// En-tête commun des pages de l'application : logo, nom applicatif et compte connecté.
export default function AppHeader({ email }: { email: string | null }) {
  return (
    <header className="flex h-16 items-center justify-between border-b border-[#e6e6e6] bg-white px-6 sm:px-12">
      <Link href="/" className="flex items-center gap-3">
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
      </Link>
      {email && <span className="text-sm text-[#615d59]">{email}</span>}
    </header>
  );
}
