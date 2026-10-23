import { ArrowDown, ArrowUpRight, ExternalLink, Github, Layers, Scale, Server, ShieldCheck, Workflow, Wrench } from "lucide-react";
import { Reveal, SectionLabel } from "./Reveal";

const CI_BADGE =
  "https://github.com/yehonghu/ette-po-hub/actions/workflows/ci.yml/badge.svg";
const COMMIT_BADGE =
  "https://img.shields.io/github/last-commit/yehonghu/ette-po-hub";

const LIVE_URL = "https://ette-po-hub.onrender.com";
const DEMO_URL = "https://yehonghu.github.io/ette-po-hub/";
const REPO_URL = "https://github.com/yehonghu/ette-po-hub";

const DECISIONS = [
  {
    icon: ShieldCheck,
    title: "The server enforces the SOP, not the UI",
    body: "Every control from the process design is an API rule: an unapproved PO cannot be sent, nobody can approve their own purchase above their authority, a duplicate vendor invoice number is rejected, and a PO only closes when ordered = received = invoiced = paid. The interface explains the rules; it never has to be trusted with them.",
  },
  {
    icon: Workflow,
    title: "The process is the data model",
    body: "A purchase order's status is the 11-step cycle itself — a state machine from need identified to paid and closed. Every transition records who acted and when, so the audit trail is a by-product of the workflow, not a separate log somebody has to remember to keep.",
  },
  {
    icon: Layers,
    title: "One rule set, two runtimes",
    body: "The production app runs Express + SQLite on Render. The GitHub Pages demo runs the same rules in an in-browser data layer with the same seed data, so anyone can try the full cycle — approvals, receiving, matching, exceptions — without waiting for a server to wake up.",
  },
];

const PROCESS_POINTS = [
  {
    icon: Workflow,
    title: "The 11-step cycle",
    body: "Identify the need → routine-or-emergency gate → purchase request → tiered approval → create PO and send → receive and inspect → capture the invoice → three-way match → independent invoice approval → finance payment approval → pay and close. The app's Process Map page renders this cycle live, with a real count of the orders sitting at each step.",
  },
  {
    icon: Scale,
    title: "The money rules",
    body: "Approval follows the money, in CAD: up to $500 the Kitchen Manager approves, $500.01–$2,000 the Executive Chef, above $2,000 the GM. Three approvals stay strictly separate — approving the purchase, approving the invoice, and approving the payment are three different acts by design, so no single person can push a purchase from idea to paid on their own.",
  },
  {
    icon: Server,
    title: "The three-way match",
    body: "Before anything is paid, the system compares what was ordered (the approved PO), what actually arrived (the receiving record), and what the vendor is charging (the invoice). Any disagreement — short delivery, damaged goods, a price that crept up — automatically opens an exception and freezes that payment until a named owner resolves it.",
  },
];

const CHALLENGES = [
  {
    title: "Excel hit its ceiling first",
    body: "The process started life as a document plus an auto-linked Excel tracker — PO form, register, receiving log, exception log, linked by PO number. It worked, except for the one thing formulas cannot do: a completed form cannot file itself into the register (that needs VBA or a macro). Somebody still had to re-type every order. That single limitation is what turned the design into software — in the app, finishing the form creates the register entry, the receiving tasks, and the audit record automatically.",
  },
  {
    title: "Free-tier infrastructure is ephemeral",
    body: "Render's free tier sleeps when idle and wipes its disk on restart, which would normally eat a SQLite database. The app treats that as a feature: it seeds a complete, realistic dataset on every cold boot — 8 role accounts, 5 vendors, 13 items, 5 purchase orders at different steps of the cycle — so the first visit after a restart is still a working system, not an empty shell.",
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

export default function EtteDeepDive() {
  return (
    <section aria-label="ETTE PO Hub case study" className="relative py-24 md:py-32">
      <div className="container">
        <Reveal>
          <SectionLabel label="Case study" index="01a" />
          <h2 className="max-w-[860px] font-display text-[38px] font-semibold leading-[1.02] text-titanium md:text-[56px]">
            ETTE PO Hub, from process to product.
          </h2>
          <p className="mt-5 max-w-[680px] text-[16px] leading-relaxed text-muted-foreground">
            This one did not start as an app. It started as a problem I could not
            unsee: a hotel kitchen ordering the way most kitchens order — a text
            to the supplier, a verbal OK, deliveries nobody checks against
            anything, and invoices that get paid because they arrived. No
            approvals, no paper trail, and no way to prove that what was paid
            for is what was ordered, or even what showed up. So I designed the
            missing system first — a complete purchase-order process for a
            boutique hotel kitchen — and then, because a process on paper still
            depends on people remembering to follow it, I built it as software
            that enforces itself.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <a
              href="https://github.com/yehonghu/ette-po-hub/actions/workflows/ci.yml"
              target="_blank"
              rel="noreferrer"
              aria-label="ETTE PO Hub CI status"
            >
              <img src={CI_BADGE} alt="ETTE PO Hub CI status" loading="lazy" />
            </a>
            <a
              href="https://github.com/yehonghu/ette-po-hub/commits/main"
              target="_blank"
              rel="noreferrer"
              aria-label="ETTE PO Hub last commit"
            >
              <img src={COMMIT_BADGE} alt="ETTE PO Hub last commit" loading="lazy" />
            </a>
            <a
              href={LIVE_URL}
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
          <div className="mt-7 flex flex-wrap gap-2.5">
            <a href={LIVE_URL} target="_blank" rel="noreferrer" className="liquid-action liquid-action--primary">
              <ExternalLink size={14} /> Open live app <ArrowUpRight size={13} />
            </a>
            <a href={DEMO_URL} target="_blank" rel="noreferrer" className="liquid-action">
              <ExternalLink size={14} /> Instant demo <ArrowUpRight size={13} />
            </a>
            <a href={REPO_URL} target="_blank" rel="noreferrer" className="liquid-action">
              <Github size={14} /> View source <ArrowUpRight size={13} />
            </a>
          </div>
          <p className="mt-4 max-w-[620px] text-[13px] leading-relaxed text-muted-foreground">
            Try it with the seeded demo accounts — GM: <span className="font-mono text-foreground/80">gm@ette.local</span>,
            password <span className="font-mono text-foreground/80">demo1234</span>. Eight roles in total, each seeing
            only the steps they own.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
          <Reveal depth={18}>
            <h3 className="text-[13px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              System architecture
            </h3>
            <div className="mt-5">
              <FlowBox
                title="React 19 SPA — Vite + TypeScript + Tailwind v4"
                sub="Dashboard, approvals inbox, purchase orders, receiving, invoices, exceptions, reports, audit log — and the Process Map, the SOP flowchart rendered live with per-step order counts. Dark mode, Cmd+K search, motion gated by prefers-reduced-motion."
              />
              <FlowArrow />
              <FlowBox
                title="Typed API layer"
                sub="One client over the REST API; role-aware navigation means a receiver never sees a payment approval button the API would refuse anyway."
              />
              <FlowArrow />
              <FlowBox
                title="Express 5 API — one process serves app + API"
                sub="auth · requests · purchase orders · receiving · invoices · exceptions · payments · reports · audit — deployed as a single Render service from a render.yaml Blueprint."
                accent
              />
              <FlowArrow />
              <FlowBox
                title="Rule engine — where the SOP lives"
                sub="JWT auth and role authorization first, then the purchasing rules: CAD approval tiers, emergency-order documentation, send-blocking before approval, split-PO detection, duplicate-invoice rejection, the three-way match, separation of the three approvals, close-only-when-reconciled."
              />
              <FlowArrow />
              <FlowBox
                title="SQLite data layer (node:sqlite)"
                sub="Users and roles · vendors · items and par levels · requests · purchase orders and lines · receipts · invoices · exceptions · payments · a full audit log of every transition."
              />
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
                <Wrench size={14} className="text-primary" /> What was hard
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

        <Reveal depth={16}>
          <div className="mt-16 grid gap-4 md:grid-cols-3">
            {PROCESS_POINTS.map((p) => (
              <article
                key={p.title}
                className="depth-card rounded-2xl border border-border bg-card/40 p-5"
              >
                <div className="flex items-center gap-2.5">
                  <p.icon size={17} className="shrink-0 text-primary" />
                  <h4 className="text-[15px] font-semibold text-foreground">{p.title}</h4>
                </div>
                <p className="mt-2.5 text-[13.5px] leading-relaxed text-muted-foreground">{p.body}</p>
              </article>
            ))}
          </div>
          <p className="mt-8 max-w-[760px] text-[14.5px] leading-relaxed text-muted-foreground">
            Verified the way the process itself would demand — with evidence: a
            scripted API smoke suite walks a purchase order through the entire
            cycle and asserts every rule fires (37/37 passing, including the
            refusals), the in-browser demo port passes its own 28-assertion
            suite, and a live browser QA pass over the deployed demo cleared
            12/12 checks across all eight role accounts. GitHub Actions runs
            the build and the smoke suite on every push.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
