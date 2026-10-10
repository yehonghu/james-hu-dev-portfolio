/*
 * Titanium Keynote — James Hu portfolio single page.
 * Vertical keynote narrative: Hero → Stats → Work → Services → Process → About → CTA.
 */
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import Work from "@/components/Work";
import Services from "@/components/Services";
import Process from "@/components/Process";
import About from "@/components/About";
import Notes from "@/components/Notes";
import Contact, { Footer } from "@/components/Contact";
import CanvasParticleField from "@/components/CanvasParticleField";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-x-clip bg-background text-foreground">
      <CanvasParticleField />
      <div className="relative z-10">
        <Nav />
        <main id="main">
          <Hero />
          <Stats />
          <Work />
          <Services />
          <Process />
          <About />
          <Notes />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  );
}
