"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { useScrolled } from "@/hooks/useScrolled";
import { Button, ThemeToggle } from "@/components/ui";
import { NAV_ITEMS, CONTACT } from "@/data/portfolio";

export function Navbar() {
  const scrolled = useScrolled();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  // Lock body scroll while drawer is open
  useEffect(() => {
    if (!menuOpen) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [menuOpen]);

  // Close on Esc
  useEffect(() => {
    if (!menuOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [menuOpen]);

  // Close drawer when route changes
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <>
      <nav
        className={clsx(
          "fixed top-0 left-0 right-0 z-100 transition-all duration-500 px-[clamp(24px,5vw,80px)]",
          menuOpen
            ? "bg-bg/95 backdrop-blur-[24px] border-b border-border-card"
            : scrolled
              ? "bg-bg/88 backdrop-blur-[24px] border-b border-border-card"
              : "bg-transparent border-b border-transparent",
        )}
      >
        <div className="content-container flex justify-between items-center h-[72px]">
          <Link href="/" className="flex items-center gap-[3px] relative z-10">
            <span className="text-[28px] font-extrabold text-brand tracking-tight">firmino</span>
            <span className="text-[28px] font-light text-accent-light">.dev</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-8">
            {NAV_ITEMS.map((n) => (
              <Link key={n.href} className="nav-link" href={n.href}>
                {n.label}
              </Link>
            ))}
            <ThemeToggle />
            <Link href="/contato">
              <Button className="!py-2.5 !px-[22px]">Fale Conosco</Button>
            </Link>
          </div>

          {/* Mobile actions */}
          <div className="lg:hidden flex items-center gap-2 relative z-10">
            <ThemeToggle />
            <button
              type="button"
              className="flex flex-col gap-[5px] p-2"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-drawer"
            >
              <span
                className={clsx(
                  "block w-5 h-[2px] bg-text-light transition-all duration-300",
                  menuOpen && "rotate-45 translate-y-[7px]",
                )}
              />
              <span
                className={clsx(
                  "block w-5 h-[2px] bg-text-light transition-all duration-300",
                  menuOpen && "opacity-0",
                )}
              />
              <span
                className={clsx(
                  "block w-5 h-[2px] bg-text-light transition-all duration-300",
                  menuOpen && "-rotate-45 -translate-y-[7px]",
                )}
              />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div
        id="mobile-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Menu de navegação"
        className={clsx(
          "lg:hidden fixed inset-0 z-90 transition-all duration-400 ease-[cubic-bezier(.25,.46,.45,.94)]",
          menuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none",
        )}
      >
        {/* Backdrop layer */}
        <div className="absolute inset-0 bg-bg/96 backdrop-blur-[28px]" />

        {/* Decorative glow */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[10%] -left-[20%] w-[60%] aspect-square rounded-full bg-accent/10 blur-[120px]" />
          <div className="absolute bottom-[5%] -right-[20%] w-[70%] aspect-square rounded-full bg-accent-light/8 blur-[140px]" />
        </div>

        {/* Content — accounts for navbar height */}
        <div className="relative h-full flex flex-col pt-[72px] px-[clamp(24px,5vw,40px)]">
          {/* Section label */}
          <div className="pt-10 pb-8">
            <span className="text-[10.5px] text-accent-light font-semibold tracking-[3px] uppercase">
              Navegação
            </span>
          </div>

          {/* Nav links */}
          <ul className="flex flex-col">
            {NAV_ITEMS.map((n, i) => {
              const active = isActive(n.href);
              return (
                <li
                  key={n.href}
                  className="border-b border-divider"
                  style={{
                    animation: menuOpen
                      ? `drawerItemIn 0.4s ease ${0.08 + i * 0.05}s both`
                      : undefined,
                  }}
                >
                  <Link
                    href={n.href}
                    className="flex items-center justify-between py-5 group"
                    aria-current={active ? "page" : undefined}
                  >
                    <span
                      className={clsx(
                        "font-serif text-[28px] leading-none transition-colors",
                        active ? "text-accent-light italic" : "text-text-light group-hover:text-accent-light",
                      )}
                    >
                      {n.label}
                    </span>
                    <span
                      className={clsx(
                        "text-[18px] transition-all duration-300",
                        active
                          ? "text-accent-light translate-x-0 opacity-100"
                          : "text-text-dim opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0",
                      )}
                      aria-hidden
                    >
                      →
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* CTA */}
          <div
            className="mt-8"
            style={{
              animation: menuOpen
                ? `drawerItemIn 0.4s ease ${0.08 + NAV_ITEMS.length * 0.05}s both`
                : undefined,
            }}
          >
            <Link href="/contato" className="block">
              <Button className="w-full !py-3.5 !text-[14px]">Fale Conosco →</Button>
            </Link>
          </div>

          {/* Spacer + footer */}
          <div className="flex-1" />

          <div
            className="pb-[max(env(safe-area-inset-bottom),32px)] pt-6 border-t border-divider"
            style={{
              animation: menuOpen
                ? `drawerItemIn 0.4s ease ${0.08 + (NAV_ITEMS.length + 1) * 0.05}s both`
                : undefined,
            }}
          >
            <p className="text-[11px] text-text-dim uppercase tracking-[2px] mb-4">
              Conecte-se
            </p>
            <div className="flex items-center gap-5">
              <a
                href={CONTACT.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[13px] text-text-muted hover:text-accent-light transition-colors"
              >
                LinkedIn
              </a>
              <span className="text-text-dim/40">·</span>
              <a
                href={CONTACT.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[13px] text-text-muted hover:text-accent-light transition-colors"
              >
                GitHub
              </a>
              <span className="text-text-dim/40">·</span>
              <Link
                href="/blog"
                className="text-[13px] text-text-muted hover:text-accent-light transition-colors"
              >
                Blog
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
