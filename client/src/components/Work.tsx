import { motion } from "framer-motion";
import { ArrowUpRight, ExternalLink, Github } from "lucide-react";
import { ASSETS } from "@/lib/assets";
import { Reveal, SectionLabel } from "./Reveal";
import BookEaseDeepDive from "./BookEaseDeepDive";
import AuthCaseStudy from "./AuthCaseStudy";

type ProjectLink = {
  href: string;
  label: string;
  kind: "live" | "github";
};

type CaseStudy = {
  id: string;
  category: string;
  title: string;
  tagline: string;
  description: string;
  tags: string[];
  images: { src: string; alt: string }[];
  layout: "left" | "right";
  links?: ProjectLink[];
  accent: string;
};

type IndexProject = {
  src: string;
  title: string;
  status: string;
  description: string;
  href: string;
  sourceHref: string;
  repo: string;
};

const CASES: CaseStudy[] = [
  {
    id: "bookease",
    category: "Full-Stack Product · Toronto Public Beta",
    title: "BookEase",
    tagline: "A clearer path from a local request to a confirmed booking.",
    description:
      "A live, full-stack service marketplace built for the Toronto/GTA launch. Customers publish requests, providers respond with offers, and role-aware workflows keep availability, bookings, reviews, profile settings, and administration connected in one dependable system.",
    tags: ["React", "Node.js / Express", "MongoDB Atlas", "JWT", "Role-Aware UX", "Render"],
    images: [{ src: ASSETS.bookeaseLive, alt: "Current BookEase Toronto public beta homepage" }],
    layout: "left",
    links: [
      { href: "https://bookease-5e97.onrender.com", label: "Open live MVP", kind: "live" },
      { href: "https://github.com/yehonghu/BookEase-COMP313-Group6-Final", label: "View source", kind: "github" },
    ],
    accent: "from-sky-300 via-blue-400 to-violet-400",
  },
];

const PROJECT_INDEX: IndexProject[] = [
  {
    src: ASSETS.bookeaseLive,
    title: "BookEase",
    status: "Toronto public beta",
    description: "A live local-service marketplace with role-aware booking, provider offers, account controls, and operations workflow.",
    href: "https://bookease-5e97.onrender.com",
    sourceHref: "https://github.com/yehonghu/BookEase-COMP313-Group6-Final",
    repo: "BookEase-COMP313-Group6-Final",
  },
  {
    src: ASSETS.psychMindLive,
    title: "PsychMind",
    status: "Interactive study hub",
    description: "An editorial psychology learning experience shaped around guided modules, concept review, and practice.",
    href: "https://yehonghu.github.io/psychology-study/",
    sourceHref: "https://github.com/yehonghu/psychology-study",
    repo: "psychology-study",
  },
  {
    src: ASSETS.findHouseLive,
    title: "Find House",
    status: "Real-estate discovery",
    description: "A casebook-led residence browser with cinematic interiors, refined navigation, and motion-based exploration.",
    href: "https://yehonghu.github.io/find-house-portfolio/",
    sourceHref: "https://github.com/yehonghu/find-house-portfolio",
    repo: "find-house-portfolio",
  },
  {
    src: ASSETS.ourPlanetLive,
    title: "Our Planet",
    status: "Environmental editorial",
    description: "A content-first environmental website that pairs visual narrative with an accessible, focused reading flow.",
    href: "https://yehonghu.github.io/our-planet-environmental-website/",
    sourceHref: "https://github.com/yehonghu/our-planet-environmental-website",
    repo: "our-planet-environmental-website",
  },
  {
    src: ASSETS.iphone15Live,
    title: "iPhone 15 Pro Study",
    status: "Product-page interaction",
    description: "A responsive product presentation focused on visual detail, interaction polish, and premium information hierarchy.",
    href: "https://yehonghu.github.io/iphone15pro-portfolio/",
    sourceHref: "https://github.com/yehonghu/iphone15pro-portfolio",
    repo: "iphone15pro-portfolio",
  },
  {
    src: ASSETS.gameLibraryLive,
    title: "Game Library",
    status: "Interactive catalogue",
    description: "A spatial game catalogue with an orbital visual language, collection state, and playful public demo flow.",
    href: "https://yehonghu.github.io/Group9_COMP308Lab1_Ex2/",
    sourceHref: "https://github.com/yehonghu/Group9_COMP308Lab1_Ex2",
    repo: "Group9_COMP308Lab1_Ex2",
  },
];

function ProjectActions({ links }: { links: ProjectLink[] }) {
  return (
    <div className="mt-7 flex flex-wrap gap-2.5">
      {links.map((link) => {
        const Icon = link.kind === "live" ? ExternalLink : Github;
        return (
          <a
            key={link.href}
            href={link.href}
            target="_blank"
            rel="noreferrer"
            className={link.kind === "live" ? "liquid-action liquid-action--primary" : "liquid-action"}
          >
            <Icon size={14} />
            {link.label}
            <ArrowUpRight size={13} />
          </a>
        );
      })}
    </div>
  );
}

function CaseBlock({ study, index }: { study: CaseStudy; index: number }) {
  const visual = (
    <Reveal depth={28} delay={0.05} className="scene relative">
      <motion.div
        className="liquid-frame group relative"
      >
        <img
          src={study.images[0].src}
          alt={study.images[0].alt}
          loading="lazy"
          className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-[1.006]"
        />
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-slate-950/28 via-transparent to-white/10" />
        <div aria-hidden="true" className="liquid-frame__sheen" />
      </motion.div>
    </Reveal>
  );

  const copy = (
    <Reveal depth={14} className="flex flex-col justify-center">
      <p className="portfolio-index-eyebrow text-[12px] font-semibold uppercase text-muted-foreground">
        <span className="mr-2 font-mono text-primary">{String(index + 1).padStart(2, "0")}</span>
        {study.category}
      </p>
      <h3 className="mt-3 font-display text-[38px] font-semibold leading-[1.02] text-titanium md:text-[52px]">{study.title}</h3>
      <p className={`mt-3 bg-gradient-to-r ${study.accent} bg-clip-text text-[17px] font-semibold leading-snug text-transparent md:text-[20px]`}>
        {study.tagline}
      </p>
      <p className="mt-5 max-w-[34rem] text-[15.5px] leading-relaxed text-muted-foreground">{study.description}</p>
      <div className="mt-6 flex flex-wrap gap-2">
        {study.tags.map((tag) => (
          <span key={tag} className="liquid-tag">{tag}</span>
        ))}
      </div>
      {study.links && <ProjectActions links={study.links} />}
    </Reveal>
  );

  return (
    <article className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
      {study.layout === "left" ? (
        <>{visual}{copy}</>
      ) : (
        <><div className="lg:order-2">{visual}</div><div className="lg:order-1">{copy}</div></>
      )}
    </article>
  );
}

export default function Work() {

  return (
    <section id="work" className="portfolio-index-stage relative py-24 md:py-36">
      <div aria-hidden="true" className="portfolio-index-orbit"><span /><i /></div>
      <div aria-hidden="true" className="absolute inset-x-0 top-20 h-[560px] bg-[radial-gradient(ellipse_at_75%_30%,rgba(75,120,255,0.10),transparent_62%)]" />
      <div className="container relative">
        <Reveal>
          <SectionLabel label="Selected Work" index="01" />
          <h2 className="max-w-[820px] font-display text-[42px] font-semibold leading-[1.01] text-titanium md:text-[64px]">
            Software I&apos;ve built and shipped.
          </h2>
          <p className="mt-5 max-w-[650px] text-[16px] leading-relaxed text-muted-foreground">
            Live applications with public demos and open-source code. Each one designed, built, and deployed end to end.
          </p>
        </Reveal>

        <div className="mt-20 flex flex-col gap-28 md:mt-28 md:gap-36">
          {CASES.map((study, index) => <CaseBlock key={study.id} study={study} index={index} />)}
        </div>

        <BookEaseDeepDive />

        <AuthCaseStudy />

        <div className="mt-28 border-t border-border pt-20 md:mt-36 md:pt-24">
          <Reveal>
            <SectionLabel label="Complete Project Index" index="02" />
            <h3 className="max-w-[740px] font-display text-[34px] font-semibold leading-[1.08] text-titanium md:text-[48px]">Every upgraded build, ready to open.</h3>
            <p className="mt-4 max-w-[650px] text-[14.5px] leading-relaxed text-muted-foreground">
              This is the live index of the portfolio’s upgraded software projects. Each glass card leads directly to the current public build and its GitHub source—without repeating the portfolio itself as a project.
            </p>
          </Reveal>
          <div className="scene mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {PROJECT_INDEX.map((project, index) => {
              const wide = index === 0;
              return (
              <Reveal key={project.title} delay={index * 0.055} depth={index * 9} className={wide ? "sm:col-span-2" : ""}>
                <motion.article
                  className="liquid-card group h-full"
                >
                  <a href={project.href} target="_blank" rel="noreferrer" className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-primary">
                    <div className={`relative overflow-hidden rounded-t-[inherit] ${wide ? "aspect-[21/10]" : "aspect-[16/10]"}`}>
                      <img src={project.src} alt={`${project.title} current live homepage`} loading="lazy" className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.006]" />
                      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-slate-950/62 via-transparent to-transparent" />
                      <span className="liquid-status absolute bottom-3 left-3">{project.status} <ArrowUpRight size={12} /></span>
                    </div>
                  </a>
                  <div className="portfolio-card-copy relative p-5">
                    <div aria-hidden="true" className="liquid-card__glow" />
                    <p className="portfolio-index-eyebrow relative text-[9px] font-semibold uppercase text-primary/85">Current live build</p>
                    <a href={project.href} target="_blank" rel="noreferrer" className="relative mt-2 inline-flex items-center gap-1 font-display text-[23px] font-semibold leading-tight text-titanium transition-colors hover:text-primary">
                      {project.title}<ArrowUpRight size={15} className="text-primary transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
                    <p className="relative mt-2 min-h-[42px] text-[12px] leading-relaxed text-muted-foreground">{project.description}</p>
                    <div className="relative mt-5 flex flex-wrap items-center justify-between gap-3">
                      <a href={project.href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-[11px] font-semibold text-primary transition-opacity hover:opacity-75">
                        Open project <ExternalLink size={12} />
                      </a>
                      <span className="inline-flex items-center gap-2">
                        <img
                          src={`https://img.shields.io/github/last-commit/yehonghu/${project.repo}`}
                          alt={`${project.title} last commit`}
                          loading="lazy"
                          className="h-5"
                        />
                        <a href={project.sourceHref} target="_blank" rel="noreferrer" aria-label={`View ${project.title} source code`} className="liquid-code-link">
                          <Github size={12} /> Code
                        </a>
                      </span>
                    </div>
                  </div>
                </motion.article>
              </Reveal>
              );
            })}
            <Reveal delay={0.33} depth={54} className="sm:col-span-2 lg:col-span-1">
              <a
                href="https://github.com/yehonghu?tab=repositories"
                target="_blank"
                rel="noreferrer"
                className="liquid-card group flex h-full min-h-[220px] flex-col items-start justify-center gap-3 p-8"
              >
                <Github size={26} className="text-primary" />
                <p className="font-display text-[24px] font-semibold leading-tight text-titanium">
                  More experiments<br />on GitHub
                </p>
                <span className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-primary">
                  Explore all repositories
                  <ArrowUpRight size={14} className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </a>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
