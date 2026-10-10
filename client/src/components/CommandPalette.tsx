import { useCallback, useEffect, useState } from "react";
import { Command } from "cmdk";
import {
  ArrowUpRight,
  Copy,
  Download,
  Github,
  Linkedin,
  Mail,
  Moon,
  Sun,
} from "lucide-react";
import { toast } from "sonner";
import { useTheme } from "@/contexts/ThemeContext";

const base = import.meta.env.BASE_URL.replace(/\/$/, "");
const EMAIL = "huyehong76@gmail.com";

type Item = {
  icon: React.ReactNode;
  label: string;
  hint?: string;
  run: () => void;
};

function scrollTo(href: string) {
  document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
}

export function useCommandPalette() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    const external = () => setOpen(true);
    window.addEventListener("keydown", down);
    window.addEventListener("open-command-palette", external);
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("open-command-palette", external);
    };
  }, []);
  return { open, setOpen };
}

export function openCommandPalette() {
  window.dispatchEvent(new CustomEvent("open-command-palette"));
}

export default function CommandPalette({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (v: boolean) => void;
}) {
  const { theme, toggleTheme } = useTheme();

  const close = useCallback(() => setOpen(false), [setOpen]);
  const go = useCallback(
    (fn: () => void) => () => {
      fn();
      close();
    },
    [close]
  );

  const openExternal = (href: string) => () =>
    window.open(href, "_blank", "noreferrer");

  const nav: Item[] = [
    { icon: <ArrowUpRight size={15} />, label: "Go to Work", hint: "Projects", run: go(() => scrollTo("#work")) },
    { icon: <ArrowUpRight size={15} />, label: "Go to Capabilities", hint: "Sections", run: go(() => scrollTo("#services")) },
    { icon: <ArrowUpRight size={15} />, label: "Go to Process", hint: "Sections", run: go(() => scrollTo("#process")) },
    { icon: <ArrowUpRight size={15} />, label: "Go to About", hint: "Sections", run: go(() => scrollTo("#about")) },
    { icon: <ArrowUpRight size={15} />, label: "Go to Notes", hint: "Sections", run: go(() => scrollTo("#notes")) },
    { icon: <ArrowUpRight size={15} />, label: "Go to Contact", hint: "Sections", run: go(() => scrollTo("#contact")) },
  ];

  const projects: Item[] = [
    { icon: <ArrowUpRight size={15} />, label: "BookEase — live demo", hint: "External", run: go(openExternal("https://bookease-5e97.onrender.com")) },
    { icon: <Github size={15} />, label: "BookEase — source code", hint: "GitHub", run: go(openExternal("https://github.com/yehonghu/BookEase-COMP313-Group6-Final")) },
    { icon: <ArrowUpRight size={15} />, label: "Game Library — live demo", hint: "External", run: go(openExternal("https://yehonghu.github.io/Group9_COMP308Lab1_Ex2/")) },
    { icon: <ArrowUpRight size={15} />, label: "Find House — live demo", hint: "External", run: go(openExternal("https://yehonghu.github.io/find-house-portfolio/")) },
  ];

  const actions: Item[] = [
    {
      icon: <Download size={15} />,
      label: "Download resume",
      hint: "PDF",
      run: go(openExternal(`${base}/Yehong_Hu_Resume.pdf`)),
    },
    {
      icon: <Copy size={15} />,
      label: "Copy email address",
      hint: EMAIL,
      run: () => {
        navigator.clipboard.writeText(EMAIL).then(
          () => toast.success("Email copied to clipboard"),
          () => toast.error("Could not copy email")
        );
        close();
      },
    },
    {
      icon: <Mail size={15} />,
      label: "Send an email",
      hint: "Mail app",
      run: go(() => (window.location.href = `mailto:${EMAIL}`)),
    },
    {
      icon: theme === "dark" ? <Sun size={15} /> : <Moon size={15} />,
      label: theme === "dark" ? "Switch to light mode" : "Switch to dark mode",
      hint: "Theme",
      run: () => {
        toggleTheme?.();
        close();
      },
    },
    { icon: <Github size={15} />, label: "Open GitHub profile", hint: "External", run: go(openExternal("https://github.com/yehonghu")) },
    { icon: <Linkedin size={15} />, label: "Open LinkedIn", hint: "External", run: go(openExternal("https://linkedin.com/in/yehong-hu-142278297")) },
  ];

  return (
    <Command.Dialog
      open={open}
      onOpenChange={setOpen}
      label="Command palette"
      className="command-palette"
    >
      <Command.Input placeholder="Type a command or search…" />
      <Command.List>
        <Command.Empty>No results found.</Command.Empty>
        <Command.Group heading="Navigate">
          {nav.map((item) => (
            <Command.Item key={item.label} onSelect={item.run}>
              <span className="cmdk-icon">{item.icon}</span>
              {item.label}
              {item.hint && <span className="cmdk-hint">{item.hint}</span>}
            </Command.Item>
          ))}
        </Command.Group>
        <Command.Group heading="Projects">
          {projects.map((item) => (
            <Command.Item key={item.label} onSelect={item.run}>
              <span className="cmdk-icon">{item.icon}</span>
              {item.label}
              {item.hint && <span className="cmdk-hint">{item.hint}</span>}
            </Command.Item>
          ))}
        </Command.Group>
        <Command.Group heading="Actions">
          {actions.map((item) => (
            <Command.Item key={item.label} onSelect={item.run}>
              <span className="cmdk-icon">{item.icon}</span>
              {item.label}
              {item.hint && <span className="cmdk-hint">{item.hint}</span>}
            </Command.Item>
          ))}
        </Command.Group>
      </Command.List>
    </Command.Dialog>
  );
}
