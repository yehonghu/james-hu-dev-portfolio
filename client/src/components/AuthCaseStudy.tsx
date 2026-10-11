import { Cookie, KeyRound } from "lucide-react";
import { Reveal } from "./Reveal";

export default function AuthCaseStudy() {
  return (
    <section aria-label="Authentication design comparison" className="relative py-20 md:py-28">
      <div className="container">
        <Reveal>
          <h3 className="max-w-[820px] font-display text-[30px] font-semibold leading-[1.05] text-titanium md:text-[42px]">
            Two apps, two ways to hold a session.
          </h3>
          <p className="mt-5 max-w-[640px] text-[15.5px] leading-relaxed text-muted-foreground">
            BookEase and Game Library solve the same problem — keeping a user
            signed in — with opposite trade-offs. Picking between them was a
            deliberate decision, not a habit.
          </p>
        </Reveal>

        <div className="scene mt-10 grid gap-5 md:grid-cols-2">
          <Reveal delay={0.06} depth={16}>
            <article className="depth-card h-full rounded-2xl border border-border bg-card/40 p-7">
              <div className="flex items-center gap-2.5">
                <KeyRound size={17} className="text-primary" />
                <h4 className="text-[16px] font-semibold text-foreground">
                  BookEase — Bearer token in localStorage
                </h4>
              </div>
              <p className="mt-3 text-[13.5px] leading-relaxed text-muted-foreground">
                The API returns a JWT in JSON; the client stores it as{" "}
                <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
                  bookcase_token
                </code>{" "}
                and attaches it as an{" "}
                <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
                  Authorization: Bearer
                </code>{" "}
                header through one axios interceptor.
              </p>
              <p className="mt-3 text-[13.5px] leading-relaxed text-muted-foreground">
                <span className="font-semibold text-foreground">Why:</span> the
                frontend and API deploy as one Render service but are developed
                and reasoned about as separate origins — a header-based token
                keeps that boundary clean.{" "}
                <span className="font-semibold text-foreground">Cost:</span>{" "}
                any XSS hole can read localStorage, so the app leans harder on
                input validation and helmet headers.
              </p>
            </article>
          </Reveal>

          <Reveal delay={0.12} depth={24}>
            <article className="depth-card h-full rounded-2xl border border-border bg-card/40 p-7">
              <div className="flex items-center gap-2.5">
                <Cookie size={17} className="text-primary" />
                <h4 className="text-[16px] font-semibold text-foreground">
                  Game Library — JWT in an HTTPOnly cookie
                </h4>
              </div>
              <p className="mt-3 text-[13.5px] leading-relaxed text-muted-foreground">
                Login sets a 24-hour JWT in a cookie flagged{" "}
                <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
                  httpOnly
                </code>
                ,{" "}
                <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
                  sameSite: lax
                </code>
                , and{" "}
                <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
                  secure
                </code>{" "}
                in production. Middleware reads{" "}
                <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
                  req.cookies.token
                </code>
                ; logout clears it. The client just sets{" "}
                <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
                  withCredentials
                </code>{" "}
                and the browser does the rest.
              </p>
              <p className="mt-3 text-[13.5px] leading-relaxed text-muted-foreground">
                <span className="font-semibold text-foreground">Why:</span>{" "}
                JavaScript can never touch the token, so XSS can't steal the
                session.{" "}
                <span className="font-semibold text-foreground">Cost:</span> the
                client and server must cooperate on CORS and credentials, and
                cookie auth asks for CSRF awareness the header approach avoids.
              </p>
            </article>
          </Reveal>
        </div>

        <Reveal delay={0.16}>
          <p className="mt-8 max-w-[640px] text-[14px] leading-relaxed text-muted-foreground">
            The takeaway I bring to any team: there's no universally "correct"
            session strategy — there's the one whose failure mode you've
            actually thought through. Both of these are in production, and I can
            explain why each one fits its app.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
