"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";

type Theme = "dark" | "light";

const STORAGE_KEY = "firmino-theme";

function readStoredTheme(): Theme {
  if (typeof document === "undefined") return "dark";
  const attr = document.documentElement.getAttribute("data-theme");
  return attr === "light" ? "light" : "dark";
}

function applyTheme(next: Theme) {
  const html = document.documentElement;
  if (next === "light") {
    html.setAttribute("data-theme", "light");
  } else {
    html.removeAttribute("data-theme");
  }
  try {
    localStorage.setItem(STORAGE_KEY, next);
  } catch {
    // localStorage might be blocked — ignore.
  }
}

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const [theme, setTheme] = useState<Theme>("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setTheme(readStoredTheme());
    setMounted(true);
  }, []);

  const toggle = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    applyTheme(next);
  };

  const label =
    theme === "dark" ? "Ativar tema claro" : "Ativar tema escuro";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className={clsx(
        "inline-flex items-center justify-center w-9 h-9 rounded-[10px] border transition-colors duration-300 cursor-pointer",
        "border-border-dark text-text-nav hover:text-brand hover:border-accent/60",
        className,
      )}
    >
      {/* Icon swaps on click; render sun for dark→light, moon for light→dark */}
      <span aria-hidden className="block w-4 h-4 relative">
        {mounted && theme === "light" ? (
          // Moon (currently light, click to go dark)
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-4 h-4"
          >
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
        ) : (
          // Sun (currently dark, click to go light)
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-4 h-4"
          >
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2" />
            <path d="M12 20v2" />
            <path d="m4.93 4.93 1.41 1.41" />
            <path d="m17.66 17.66 1.41 1.41" />
            <path d="M2 12h2" />
            <path d="M20 12h2" />
            <path d="m6.34 17.66-1.41 1.41" />
            <path d="m19.07 4.93-1.41 1.41" />
          </svg>
        )}
      </span>
    </button>
  );
}
