import { motion } from "framer-motion";
import { Reveal, SectionLabel } from "./Reveal";

const STEPS = [
  {
    num: "01",
    title: "Understand the problem",
    desc: "Requirements first: who it’s for, what it must do, and how success is measured — before any code.",
    duration: "Planning",
  },
  {
    num: "02",
    title: "Design the solution",
    desc: "Data model, API shape, and interface sketched out so the build has a clear target.",
    duration: "Design",
  },
  {
    num: "03",
    title: "Build and test",
    desc: "Iterative development with a Git workflow, code review, and testing along the way.",
    duration: "Build",
  },
  {
    num: "04",
    title: "Ship and iterate",
    desc: "Deployed to production, then improved with real feedback.",
    duration: "Release",
  },
];

export default function Process() {
  return (
    <section id="process" className="relative py-24 md:py-36">
      <div className="container">
        <Reveal>
          <SectionLabel label="Process" index="04" />
          <h2 className="font-display text-[40px] font-bold leading-[1.02] text-titanium md:text-[60px]">
            How I build software.
          </h2>
          <p className="mt-5 max-w-[580px] text-[16px] leading-relaxed text-muted-foreground">
            The same loop I used to take BookEase from idea to public beta: plan, design, build, ship.
          </p>
        </Reveal>

        <div className="scene relative mt-16 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div aria-hidden="true" className="pointer-events-none absolute left-[12%] right-[12%] top-10 hidden h-px bg-gradient-to-r from-transparent via-primary/45 to-transparent lg:block" />
          {STEPS.map((step, index) => (
            <Reveal key={step.num} delay={index * 0.08} depth={index * 14}>
              <motion.article
                className="depth-card relative flex h-full flex-col rounded-3xl border border-border bg-card/30 p-7"
                whileHover={{ y: -8, rotateX: 3, rotateY: index < 2 ? -2 : 2 }}
                transition={{ type: "spring", stiffness: 260, damping: 22 }}
              >
                <p className="font-display text-[48px] font-bold leading-none text-gravity">{step.num}</p>
                <h3 className="mt-6 font-display text-[21px] font-bold">{step.title}</h3>
                <p className="mt-4 flex-1 text-[13.5px] leading-relaxed text-muted-foreground">{step.desc}</p>
                <p className="mt-6 inline-flex w-fit rounded-full glass px-3 py-1 text-[11.5px] text-secondary-foreground">{step.duration}</p>
              </motion.article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
