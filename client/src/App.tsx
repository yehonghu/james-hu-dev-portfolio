import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch, Router as WouterRouter } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import ScrollProgress from "./components/ScrollProgress";
import CommandPalette, { useCommandPalette } from "./components/CommandPalette";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";

const base = import.meta.env.BASE_URL.replace(/\/$/, "") || "";

function Routes() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="dark"
        switchable
      >
        <SkipLink />
        <PaletteHost />
        <TooltipProvider>
          <ScrollProgress />
          <Toaster />
          <WouterRouter base={base}>
            <Routes />
          </WouterRouter>
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

function PaletteHost() {
  const { open, setOpen } = useCommandPalette();
  return <CommandPalette open={open} setOpen={setOpen} />;
}

function SkipLink() {
  return (
    <a
      href="#main"
      className="skip-link"
      onClick={(e) => {
        document.querySelector("#main")?.scrollIntoView();
        e.currentTarget.blur();
      }}
    >
      Skip to content
    </a>
  );
}

export default App;
