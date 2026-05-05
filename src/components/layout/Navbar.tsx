"use client";

import { useState } from "react";
import Link from "next/link";
import clsx from "clsx";
import { useScrolled } from "@/hooks/useScrolled";
import { Button } from "@/components/ui";
import { NAV_ITEMS } from "@/data/portfolio";

export function Navbar() {
  const scrolled = useScrolled();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav
      className={clsx(
        "fixed top-0 left-0 right-0 z-100 transition-all duration-500 px-[clamp(24px,5vw,80px)]",
        scrolled
          ? "bg-bg/88 backdrop-blur-[24px] border-b border-border-card"
          : "bg-transparent border-b border-transparent",
      )}
    >
      <div className="content-container flex justify-between items-center h-[72px]">
        <Link href="/" className="flex items-center gap-[3px]">
          <span className="text-[28px] font-extrabold text-white tracking-tight">firmino</span>
          <span className="text-[28px] font-light text-accent-light">.dev</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-8">
          {NAV_ITEMS.map((n) => (
            <Link key={n.href} className="nav-link" href={n.href}>
              {n.label}
            </Link>
          ))}
          <Link href="/contato">
            <Button className="!py-2.5 !px-[22px]">Fale Conosco</Button>
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden flex flex-col gap-[5px] p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <span className={clsx("block w-5 h-[2px] bg-text-nav transition-all duration-300", menuOpen && "rotate-45 translate-y-[7px]")} />
          <span className={clsx("block w-5 h-[2px] bg-text-nav transition-all duration-300", menuOpen && "opacity-0")} />
          <span className={clsx("block w-5 h-[2px] bg-text-nav transition-all duration-300", menuOpen && "-rotate-45 -translate-y-[7px]")} />
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={clsx(
          "lg:hidden overflow-hidden transition-all duration-400 ease-[cubic-bezier(.25,.46,.45,.94)]",
          menuOpen ? "max-h-[400px] pb-6" : "max-h-0",
        )}
      >
        <div className="flex flex-col gap-4 pt-2">
          {NAV_ITEMS.map((n) => (
            <Link
              key={n.href}
              className="nav-link !text-[15px]"
              href={n.href}
              onClick={() => setMenuOpen(false)}
            >
              {n.label}
            </Link>
          ))}
          <Link href="/contato" onClick={() => setMenuOpen(false)}>
            <Button className="!py-2.5 !px-[22px] w-fit mt-2">Fale Conosco</Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
