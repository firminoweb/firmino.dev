import type { Metadata } from "next";
import Link from "next/link";
import { getCurrentUser, isAdmin } from "@/lib/portal/session";
import { logoutAction } from "./actions";

// Área logada: fora do Google e das IAs (também bloqueada no robots.txt)
export const metadata: Metadata = {
  title: "Área do cliente",
  robots: { index: false, follow: false },
};

export default async function ClienteLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser();
  const admin = isAdmin(user);

  return (
    <div className="min-h-screen bg-bg">
      <header className="border-b border-border-subtle">
        <div className="content-container max-w-[960px] flex items-center justify-between gap-4 py-4">
          <div className="flex items-center gap-3">
            <Link href="/" className="font-bold text-[17px] text-text-light tracking-tight">
              firmino<span className="text-accent-light">.dev</span>
            </Link>
            <span className="text-[12px] uppercase tracking-[1.5px] font-semibold text-text-dim">
              {admin ? "Administração" : "Área do cliente"}
            </span>
          </div>
          {user && (
            <div className="flex items-center gap-4 text-[13px]">
              {admin && (
                <Link href="/cliente/admin" className="text-text-dim hover:text-text-light">
                  Painel
                </Link>
              )}
              <span className="text-text-dim hidden sm:inline">{user.name}</span>
              <form action={logoutAction}>
                <button type="submit" className="text-accent-light hover:text-accent font-medium">
                  Sair
                </button>
              </form>
            </div>
          )}
        </div>
      </header>
      <main className="content-container max-w-[960px] py-10">{children}</main>
    </div>
  );
}
