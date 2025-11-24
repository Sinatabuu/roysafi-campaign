# Copilot Instructions for Roysafi Campaign

## Project Overview
Roysafi is a **static Next.js campaign site** built for **static export** deployment. The project is configured with:
- **Framework**: Next.js 14.2.15 with React 18.3.1 and TypeScript
- **Build Target**: Static HTML export (`output: 'export'` in `next.config.js`)
- **Deployment**: Vercel with static output directory (`.next`)
- **Styling**: Tailwind CSS v4 with PostCSS
- **Linting**: ESLint v9 with Next.js and TypeScript configs

## Key Architecture Decisions
1. **Static Export Mode**: The project builds to static HTML/CSS/JS files, meaning no server-side rendering, API routes, or dynamic features. All data must be pre-built or loaded from external services at build time.
2. **App Router**: Uses Next.js App Router (`src/app/`) convention with layout-based component hierarchy.
3. **Path Aliases**: TypeScript paths configured with `@/*` → `src/*` for clean imports (e.g., `import { Component } from '@/components'`).

## Development Workflow

### Getting Started
```bash
npm run dev      # Start dev server (http://localhost:3000)
npm run build    # Static build to out/ directory
npm start        # Serve static build locally
npm run lint     # Run ESLint
```

### Important Notes
- **No API Routes**: Do not create `pages/api/` or `src/app/api/` routes—they won't work in static export mode.
- **No Dynamic Pages**: Avoid `[id].tsx` dynamic routes unless using `generateStaticParams()` to pre-generate all variations.
- **No Server Components with Secrets**: Keep sensitive data in environment files (`.env.local`) and ensure secrets never leak into static HTML.

## Code Organization & Patterns

### File Structure
```
src/app/           # App Router entry point
├── layout.tsx     # Root layout (global fonts, metadata, styling)
├── page.tsx       # Homepage (currently shows "✅ Roysafi is LIVE")
└── globals.css    # Global Tailwind CSS
public/            # Static assets (images, fonts, favicons)
```

### Component Patterns
- **Layouts**: Define in `layout.tsx` files; wrap child routes automatically.
- **Metadata**: Set page titles/descriptions using Next.js `Metadata` API in layouts/pages (see `src/app/layout.tsx`).
- **Fonts**: Load from `next/font` (currently using Geist Sans/Mono); declare as variables and pass `className` to `<html>` or `<body>`.

### Styling Conventions
- **Tailwind v4**: Uses `@tailwindcss/postcss` package; import `globals.css` for reset/utilities.
- **Font Stacks**: Geist fonts injected via CSS variables (`--font-geist-sans`, `--font-geist-mono`); apply to `<body>` with `antialiased` class.
- **Responsive Design**: Use Tailwind breakpoints (default: `sm`, `md`, `lg`, `xl`, `2xl`) in className strings.

## TypeScript Configuration
- **Target**: ES2017
- **Strict Mode**: Enabled (strict type checking)
- **Module Resolution**: Bundler mode (Next.js optimized)
- **Path Aliases**: `@/*` maps to `src/*` for imports

## Deployment & Build
- **Vercel Integration**: `vercel.json` specifies framework, build/install commands, and output directory (`.next`).
- **Regions**: Deployed to `iad1` (US) and `nrt1` (Tokyo).
- **Build Command**: `npm run build` generates static files in `.next/` directory for Vercel.

## Common Gotchas
1. **Static Export Constraints**: No `next/navigation` (useRouter, usePathname) dynamic behavior—only static linking with `<Link>`.
2. **Image Optimization**: Use `next/image` but set `unoptimized={true}` in static exports to avoid requiring a build-time image server.
3. **Environment Variables**: Prefix with `NEXT_PUBLIC_` for client-side access; build-only variables stay server-side in static builds.
4. **ESLint**: Config uses flat config format (`eslint-config-next/core-web-vitals` + TypeScript rules). Run `npm run lint` before commits.

## When Adding Features
- **New Pages**: Create as `.tsx` file in `src/app/` with `export default function` component.
- **Shared Components**: Create in `src/app/components/` (or restructure if folder grows).
- **Third-Party Integrations**: Ensure they don't require server-side rendering or runtime APIs (use static/build-time data only).
