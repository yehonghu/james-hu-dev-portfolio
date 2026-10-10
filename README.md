# James Hu — Developer Portfolio (Employer Version)

An employer-facing portfolio for **Yehong (James) Hu**, a Toronto-based full-stack software developer
(Centennial College, Software Engineering Technology, GPA 3.7). This version leads with shipped software,
live demos, and open-source code — written for hiring managers, not freelance clients.

The freelancer/designer version of this site lives in [`james-hu-portfolio`](https://github.com/yehonghu/james-hu-portfolio);
both share the same visual system but speak to different audiences.

## Experience Principles

The website uses a **Midnight Signal** visual language: near-black space, titanium typography, electric-blue light, glass surfaces, and real project imagery. Scroll-driven depth, a reading-progress indicator, staggered section entrances, and subtle pointer-responsive cards create an immersive experience without relying on a heavy 3D rendering engine.

The interface respects `prefers-reduced-motion`, providing a stable alternative for visitors who request less animation.

## Technology

| Area | Tools |
|---|---|
| Application | React 19, TypeScript, Vite |
| Styling | Tailwind CSS 4, custom CSS design tokens |
| Motion | Framer Motion, CSS transforms and perspective |
| Server | Express production server |
| Package manager | pnpm |

## Local Development

### Prerequisites

- Node.js 18 or later
- pnpm 10 or later

### Run locally

```bash
pnpm install --frozen-lockfile
pnpm dev
```

Visit the local address shown by Vite.

### Validate and build for production

```bash
pnpm check
pnpm build
pnpm start
```

The production server runs at `http://localhost:3000` by default.

## Project Structure

```text
client/
  src/
    components/      # Portfolio sections, motion primitives, and UI building blocks
    pages/           # Route-level views
    lib/             # Static asset registry and utilities
    index.css        # Design tokens, spatial effects, and motion accessibility rules
server/              # Production static-server entry point
shared/              # Shared constants
```

## Contact

- Email: [huyehong76@gmail.com](mailto:huyehong76@gmail.com)
- GitHub: [@yehonghu](https://github.com/yehonghu)
- LinkedIn: [Yehong (James) Hu](https://linkedin.com/in/yehong-hu-142278297)

## Contributor

**Yehong Hu (James Hu)**
