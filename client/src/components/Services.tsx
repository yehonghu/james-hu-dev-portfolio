import { CheckCircle2, Code2, Database, Rocket, Server, Users } from "lucide-react";
import LiquidGlass from "./LiquidGlass";
import { Reveal, SectionLabel } from "./Reveal";

const SERVICES = [
  {
    icon: Code2,
    title: "Frontend Development",
    desc: "Responsive React applications with modern tooling, built to be maintainable and pleasant to use.",
    points: ["React + TypeScript interfaces", "Tailwind CSS design systems", "Interactive visuals (Three.js, Recharts)"],
    accent: "from-sky-300 to-violet-500",
  },
  {
    icon: Server,
    title: "Backend & APIs",
    desc: "Node.js services and APIs that power the front end, with authentication done properly.",
    points: ["REST + GraphQL APIs", "JWT authentication & role-based access", "ASP.NET / Java Spring Boot"],
    accent: "from-emerald-300 to-teal-500",
  },
  {
    icon: Database,
    title: "Data & Deployment",
    desc: "Databases modeled cleanly and applications shipped to the cloud, not just running on localhost.",
    points: ["MongoDB / SQL Server / MySQL", "Cloud deployment (Render)", "Git workflows & CI/CD basics"],
    accent: "from-amber-200 to-orange-400",
  },
];

const EXTRAS = [
  {
    icon: CheckCircle2,
    title: "Testing & code quality",
    desc: "Unit tests and careful review before anything ships — BookEase released with zero critical bugs.",
  },
  {
    icon: Users,
    title: "Agile teamwork",
    desc: "Led a student team through the full SDLC: planning, Git workflow, testing, and release.",
  },
  {
    icon: Rocket,
    title: "Fast, independent learner",
    desc: "Picks up new stacks on my own — self-taught Three.js for a 3D project interface.",
  },
];

export default function Services() {
  return (
    <section id="services" className="relative py-24 md:py-36">
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-[560px] bg-[radial-gradient(ellipse_at_50%_0%,rgba(102,110,255,0.13),transparent_66%)]" />
      <div className="container relative">
        <Reveal>
          <SectionLabel label="Capabilities" index="03" />
          <h2 className="max-w-[820px] font-display text-[40px] font-bold leading-[1.02] text-titanium md:text-[60px]">
            What I bring to a team.
          </h2>
          <p className="mt-5 max-w-[610px] text-[16px] leading-relaxed text-muted-foreground">
            I’m strongest across the full stack: I can own a feature from the database schema to the deployed UI, and I’m comfortable learning whatever the team uses.
          </p>
        </Reveal>

        <div className="scene mt-16 grid gap-4 md:grid-cols-3">
          {SERVICES.map((service, index) => (
            <Reveal key={service.title} delay={index * 0.08} depth={index * 16}>
              <article className="h-full">
                <LiquidGlass size="lg" variant="material" className="h-full">
                  <div className="flex h-full flex-col p-7">
                    <div className={`mb-6 flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br ${service.accent} shadow-lg`}>
                      <service.icon size={20} className="text-white" />
                    </div>
                    <h3 className="font-display text-[22px] font-bold">{service.title}</h3>
                    <p className="mt-4 flex-1 text-[14px] leading-relaxed text-muted-foreground">{service.desc}</p>
                    <ul className="mt-6 flex flex-col gap-2.5">
                      {service.points.map((point) => (
                        <li key={point} className="flex items-center gap-2 text-[13px] text-secondary-foreground">
                          <span className={`h-1.5 w-1.5 rounded-full bg-gradient-to-r ${service.accent}`} />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                </LiquidGlass>
              </article>
            </Reveal>
          ))}
        </div>

        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          {EXTRAS.map((extra, index) => (
            <Reveal key={extra.title} delay={0.18 + index * 0.07} depth={12}>
              <div className="h-full">
                <LiquidGlass size="md" variant="material" className="h-full">
                  <div className="flex h-full items-start gap-4 px-6 py-5">
                    <extra.icon size={18} className="mt-0.5 shrink-0 text-primary" />
                    <div>
                      <p className="text-[14px] font-semibold">{extra.title}</p>
                      <p className="mt-1 text-[12.5px] leading-relaxed text-muted-foreground">{extra.desc}</p>
                    </div>
                  </div>
                </LiquidGlass>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
