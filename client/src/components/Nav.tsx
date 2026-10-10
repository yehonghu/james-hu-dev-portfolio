import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Command, Menu, Moon, Sun, X } from "lucide-react";
import { ASSETS } from "@/lib/assets";
import { useTheme } from "@/contexts/ThemeContext";
import { openCommandPalette } from "./CommandPalette";
import LiquidGlass from "./LiquidGlass";

const LINKS = [
  { href: "#work", label: "Work" },
  { href: "#services", label: "Capabilities" },
  { href: "#process", label: "Process" },
  { href: "#about", label: "About" },
];

function AvailabilityBadge() {
  return (
    <a
      href="#contact"
      className="hidden items-center gap-2 rounded-full border border-border bg-card/60 py-1.5 pl-2.5 pr-3.5 text-[12px] font-medium text-muted-foreground backdrop-blur transition-colors hover:text-foreground lg:inline-flex"
      aria-label="Open to work — go to contact"
    >
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
      </span>
      Open to work · Toronto
    </a>
  );
}

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  if (!toggleTheme) return null;
  return (
    <button
      onClick={toggleTheme}
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      className="btn-press inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card/60 text-muted-foreground backdrop-blur transition-colors hover:text-foreground"
    >
      {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  );
}

function PaletteButton() {
  return (
    <button
      onClick={openCommandPalette}
      aria-label="Open command palette"
      className="btn-press hidden items-center gap-2 rounded-full border border-border bg-card/60 py-1.5 pl-3 pr-2 text-[12px] text-muted-foreground backdrop-blur transition-colors hover:text-foreground md:inline-flex"
    >
      <Command size={13} />
      <kbd className="rounded-md border border-border bg-muted px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
        ⌘K
      </kbd>
    </button>
  );
}

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-2 pt-2 sm:px-4">
      <LiquidGlass
        size="sm"
        interactive={false}
        className={`transition-all duration-300 ${scrolled ? "rounded-2xl" : "rounded-2xl border-transparent bg-transparent shadow-none"}`}
      >
      <nav className="container flex h-14 items-center justify-between gap-3">
        <a href="#top" className="flex items-center gap-2.5" aria-label="James Hu home">
          <img src={ASSETS.logo} alt="JH monogram" className="h-8 w-8 rounded-full" />
          <span className="font-display text-[17px] font-bold tracking-tight">
            James Hu<span className="text-gravity">.</span>
          </span>
        </a>

        <div className="hidden items-center gap-6 md:flex">
          {LINKS.map((link) => (
            <a key={link.href} href={link.href} className="text-[13px] text-muted-foreground transition-colors duration-200 hover:text-foreground">
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-2.5 md:flex">
          <AvailabilityBadge />
          <PaletteButton />
          <ThemeToggle />
          <a href="#contact" className="btn-press rounded-full bg-primary px-4 py-1.5 text-[13px] font-semibold text-primary-foreground shadow-[0_10px_26px_-12px_rgba(83,137,255,0.8)] hover:opacity-95">
            Contact
          </a>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button className="p-2 text-foreground" onClick={() => setOpen((value) => !value)} aria-label={open ? "Close navigation" : "Open navigation"} aria-expanded={open}>
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {open && (
        <motion.div className="border-t border-border md:hidden" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
          <LiquidGlass size="md" interactive={false} className="rounded-t-none border-x-0 border-b-0">
          <div className="container flex flex-col gap-4 py-5">
            {LINKS.map((link) => (
              <a key={link.href} href={link.href} onClick={() => setOpen(false)} className="text-[15px] text-muted-foreground transition-colors hover:text-foreground">
                {link.label}
              </a>
            ))}
            <button onClick={() => { setOpen(false); openCommandPalette(); }} className="text-left text-[15px] text-muted-foreground transition-colors hover:text-foreground">
              Search / commands <span className="font-mono text-[12px]">⌘K</span>
            </button>
            <a href="#contact" onClick={() => setOpen(false)} className="btn-press rounded-full bg-primary px-4 py-2.5 text-center text-[14px] font-semibold text-primary-foreground">
              Contact
            </a>
          </div>
          </LiquidGlass>
        </motion.div>
      )}
      </LiquidGlass>
    </header>
  );
}
