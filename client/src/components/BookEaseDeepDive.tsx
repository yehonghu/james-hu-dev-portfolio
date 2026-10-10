import { ArrowDown, Layers, Server, ShieldCheck, Wrench } from "lucide-react";
import { Reveal, SectionLabel } from "./Reveal";

const CI_BADGE =
  "https://github.com/yehonghu/BookEase-COMP313-Group6-Final/actions/workflows/ci.yml/badge.svg";
const COMMIT_BADGE =
  "https://img.shields.io/github/last-commit/yehonghu/BookEase-COMP313-Group6-Final";

const DECISIONS = [
  {
    icon: Server,
    title: "One service, zero infra cost",
    body: "A single Render web service serves both the API and the built SPA — Express mounts /api routes and serves frontend/dist statically, all declared in render.yaml. The trade-off is free-tier cold starts, which is acceptable for a public beta.",
  },
  {
    icon: ShieldCheck,
    title: "Roles enforced twice",
    body: "The backend authorize('admin', 'provider', 'customer') middleware rejects wrong roles with 403; the frontend mirrors it with RequireRole guards and four dedicated layouts. The UI never offers an action the API would reject.",
  },
  {
    icon: Layers,
    title: "API layer per domain",
    body: "Seven axios modules (auth, bookings, offers, requests, reviews, services, contact) sit on one interceptor instance that attaches the Bearer token and handles FormData. Components stay free of fetch logic.",
  },
];

const CHALLENGES = [
  {
    title: "Static-path resolution across environments",
    body: "Local dev and Render lay out the repo differently, so the server probes several candidate dist paths before serving the SPA — small detail, but it's what keeps one deploy working in both places.",
  },
  {
    title: "Keeping four role layouts consistent",
    body: "Public, customer, provider, and admin each get a layout, but they share components, the auth context, and the API layer — consistency comes from shared code, not duplicated pages.",
  },
];

function FlowBox({
  title,
  sub,
  accent = false,
}: {
  title: string;
  sub: string;
  accent?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl border px-5 py-4 ${
        accent
          ? "border-primary/40 bg-primary/10"
          : "border-border bg-card/70"
      }`}
    >
      <p className="text-[14px] font-semibold text-foreground">{title}</p>
      <p className="mt-1 text-[12.5px] leading-relaxed text-muted-foreground">{sub}</p>
    </div>
  );
}

function FlowArrow() {
  return (
    <div className="flex justify-center py-1.5" aria-hidden="true">
      <ArrowDown size={16} className="text-primary" />
    </div>
  );
}

export default function BookEaseDeepDive() {
  return (
    <section aria-label="BookEase case study" className="relative py-24 md:py-32">
      <div className="container">
        <Reveal>
          <SectionLabel label="Case study" index="01b" />
          <h2 className="max-w-[820px] font-display text-[38px] font-semibold leading-[1.02] text-titanium md:text-[56px]">
            BookEase, under the hood.
          </h2>
          <p className="mt-5 max-w-[650px] text-[16px] leading-relaxed text-muted-foreground">
            The architecture behind the booking platform — what runs where, the
            decisions that shaped it, and what broke along the way.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <a
              href="https://github.com/yehonghu/BookEase-COMP313-Group6-Final/actions/workflows/ci.yml"
              target="_blank"
              rel="noreferrer"
              aria-label="BookEase CI status"
            >
              <img src={CI_BADGE} alt="BookEase CI status" loading="lazy" />
            </a>
            <a
              href="https://github.com/yehonghu/BookEase-COMP313-Group6-Final/commits/main"
              target="_blank"
              rel="noreferrer"
              aria-label="BookEase last commit"
            >
              <img src={COMMIT_BADGE} alt="BookEase last commit" loading="lazy" />
            </a>
            <a
              href="https://bookease-5e97.onrender.com"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1 text-[12px] font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              Live on Render
            </a>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
          <Reveal depth={18}>
            <h3 className="text-[13px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              System architecture
            </h3>
            <div className="mt-5">
              <FlowBox
                title="React SPA — Vite + React Router"
                sub="Four role layouts (Public / Customer / Provider / Admin) over an AuthProvider context and RequireRole route guards."
              />
              <FlowArrow />
              <FlowBox
                title="Axios API layer — 7 domain modules"
                sub="Bearer JWT attach + FormData handling in one interceptor; withCredentials enabled."
              />
              <FlowArrow />
              <FlowBox
                title="Express API — 8 route groups"
                sub="auth · services · requests · offers · bookings · availability · reviews · admin"
                accent
              />
              <FlowArrow />
              <FlowBox
                title="Middleware chain"
                sub="helmet + rate limits (200/min, 25 for auth) → JWT auth → role authorization → centralized error handler."
              />
              <FlowArrow />
              <FlowBox
                title="8 controllers → 8 Mongoose models"
                sub="User · Service · ServiceRequest · Offer · Booking · Availability · Review · ContactMessage"
              />
              <FlowArrow />
              <FlowBox title="MongoDB Atlas" sub="Hosted document store; schemas enforce the booking domain." />
            </div>
          </Reveal>

          <div className="flex flex-col gap-10">
            <Reveal depth={24} delay={0.08}>
              <h3 className="text-[13px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                Key technical decisions
              </h3>
              <div className="mt-5 flex flex-col gap-4">
                {DECISIONS.map((d) => (
                  <article
                    key={d.title}
                    className="depth-card rounded-2xl border border-border bg-card/40 p-5"
                  >
                    <div className="flex items-center gap-2.5">
                      <d.icon size={17} className="shrink-0 text-primary" />
                      <h4 className="text-[15px] font-semibold text-foreground">{d.title}</h4>
                    </div>
                    <p className="mt-2.5 text-[13.5px] leading-relaxed text-muted-foreground">
                      {d.body}
                    </p>
                  </article>
                ))}
              </div>
            </Reveal>

            <Reveal depth={24} delay={0.14}>
              <h3 className="flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                <Wrench size={14} className="text-primary" /> What broke along the way
              </h3>
              <div className="mt-5 flex flex-col gap-4">
                {CHALLENGES.map((c) => (
                  <article key={c.title}>
                    <h4 className="text-[14.5px] font-semibold text-foreground">{c.title}</h4>
                    <p className="mt-1.5 text-[13.5px] leading-relaxed text-muted-foreground">
                      {c.body}
                    </p>
                  </article>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
