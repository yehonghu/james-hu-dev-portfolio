import { useState } from "react";
import { ArrowUpRight, BookOpen, Clock, MapPin, Radar } from "lucide-react";
import { Reveal, SectionLabel } from "./Reveal";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type Note = {
  slug: string;
  title: string;
  date: string;
  readTime: string;
  summary: string;
  paragraphs: string[];
};

const NOTES: Note[] = [
  {
    slug: "png-to-webp",
    title: "30MB of PNGs → 1.5MB of WebP",
    date: "Oct 2026",
    readTime: "3 min",
    summary:
      "My portfolio's screenshots weighed 30.8MB. Converting them to WebP cut 95% of the payload — here's the exact process.",
    paragraphs: [
      "When I ran a performance pass on this portfolio, the JavaScript bundle was 166KB gzipped — perfectly fine. The real problem was hiding in plain sight: 23 PNG screenshots in the public folder totaling 30.8MB. On a phone, that is the difference between instant and abandoned.",
      "The fix was a batch conversion with Pillow: every PNG to WebP at quality 82, keeping the same filenames so the asset registry only needed a one-line extension swap. WebP at q82 is visually lossless for UI screenshots — text stays crisp, gradients stay smooth.",
      "Result: 30.8MB → 1.5MB, a 95% reduction, with zero visual regression I could spot side by side. The old PNGs were deleted from the repo entirely; the originals still exist in the project's git history if I ever need them.",
      "The takeaway I keep relearning: measure before optimizing. I almost started code-splitting the JS bundle. The bundle was never the problem — the images were, by two orders of magnitude.",
    ],
  },
  {
    slug: "ci-from-zero",
    title: "CI from zero: giving BookEase a build pipeline",
    date: "Oct 2026",
    readTime: "3 min",
    summary:
      "BookEase shipped with no CI — every push was 'hope it builds'. Adding a 20-line GitHub Actions workflow changed that.",
    paragraphs: [
      "BookEase, my full-stack booking platform, was deployed to Render straight from git pushes with no automated checks. It worked, but 'it worked on my machine' is not a claim anyone else can verify.",
      "The workflow is deliberately minimal: on every push and pull request, it installs the frontend dependencies and runs the Vite production build, then installs the backend production dependencies and syntax-checks the server entry points. About 30 seconds of compute, and it caught nothing on day one — which is exactly the point.",
      "CI's value isn't the bugs it catches on day one. It's that 'the build passes' becomes a checkable, public fact instead of a hope. The status badge on my portfolio now links to a real pipeline, not a decoration.",
      "Next step when it earns it: a test job. The backend has validation and auth middleware that deserve unit tests; until then, build + syntax check is an honest baseline.",
    ],
  },
];

const NOW = [
  { icon: MapPin, label: "Based in", value: "Toronto, Ontario" },
  { icon: Radar, label: "Status", value: "Open to junior full-stack roles" },
  { icon: Clock, label: "Now", value: "Rebuilding this portfolio in public — most recent: BookEase case study" },
];

function NoteDialog({ note, open, onOpenChange }: { note: Note | null; open: boolean; onOpenChange: (v: boolean) => void }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[85vh] overflow-y-auto border-border glass-strong sm:max-w-2xl">
        {note && (
          <>
            <DialogHeader>
              <DialogTitle className="font-display text-[26px] leading-tight md:text-[32px]">
                {note.title}
              </DialogTitle>
              <DialogDescription className="text-[13px] text-muted-foreground">
                {note.date} · {note.readTime} read
              </DialogDescription>
            </DialogHeader>
            <div className="mt-2 flex flex-col gap-4 pb-2">
              {note.paragraphs.map((p, i) => (
                <p key={i} className="text-[15px] leading-[1.85] text-muted-foreground">
                  {p}
                </p>
              ))}
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default function Notes() {
  const [active, setActive] = useState<Note | null>(null);

  return (
    <section id="notes" className="relative py-24 md:py-36">
      <div className="container">
        <Reveal>
          <SectionLabel label="Notes" index="06" />
          <h2 className="max-w-[820px] font-display text-[40px] font-bold leading-[1.02] text-titanium md:text-[60px]">
            Learning in public.
          </h2>
          <p className="mt-5 max-w-[610px] text-[16px] leading-relaxed text-muted-foreground">
            Short write-ups from real work — what I tried, what the numbers said,
            and what I'd do differently. New notes appear here as the work happens.
          </p>
        </Reveal>

        <Reveal delay={0.1} depth={18}>
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {NOW.map((item) => (
              <div
                key={item.label}
                className="flex items-start gap-3 rounded-2xl border border-border bg-card/50 px-5 py-4"
              >
                <item.icon size={17} className="mt-0.5 shrink-0 text-primary" />
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                    {item.label}
                  </p>
                  <p className="mt-1 text-[13.5px] font-medium leading-snug text-foreground">
                    {item.value}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        <div className="scene mt-10 grid gap-5 md:grid-cols-2">
          {NOTES.map((note, index) => (
            <Reveal key={note.slug} delay={index * 0.08} depth={index * 14}>
              <button
                onClick={() => setActive(note)}
                className="liquid-card group flex h-full w-full flex-col items-start p-7 text-left"
              >
                <span className="inline-flex items-center gap-2 text-[12px] font-semibold text-primary">
                  <BookOpen size={14} />
                  Note · {note.date} · {note.readTime}
                </span>
                <span className="mt-4 font-display text-[24px] font-semibold leading-tight text-titanium md:text-[28px]">
                  {note.title}
                </span>
                <span className="mt-3 text-[14px] leading-relaxed text-muted-foreground">
                  {note.summary}
                </span>
                <span className="mt-6 inline-flex items-center gap-1.5 text-[13px] font-semibold text-primary">
                  Read the note
                  <ArrowUpRight
                    size={14}
                    className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </span>
              </button>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.15}>
          <p className="mt-8 text-[13px] text-muted-foreground">
            <a
              href={`${import.meta.env.BASE_URL}feed.xml`}
              className="font-semibold text-primary transition-opacity hover:opacity-75"
            >
              RSS feed
            </a>{" "}
            — subscribe if you want new notes as they're written.
          </p>
        </Reveal>
      </div>

      <NoteDialog note={active} open={active !== null} onOpenChange={(v) => !v && setActive(null)} />
    </section>
  );
}
