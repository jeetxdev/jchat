# jChat

A messaging app UI built as a pnpm monorepo: a React + Vite web client, an Express API, and a shared types package.

The web client currently renders the full UI. The server exposes APIs for real data.

## Requirements

- Node.js 20+
- pnpm 11 (`corepack enable`)

## Getting started

```bash
pnpm install
pnpm dev
```

`pnpm dev` runs the web client and the API in parallel. The client is served by Vite at `http://localhost:5173` and proxies `/api` to the server at `http://localhost:3001`.

In production both are served from the single origin `https://jchat.modularhq.app`: the Express process serves the built SPA and mounts the API under `/api/v1`. The dev proxy exists so that local development matches that same-origin behaviour.

To run just one side:

```bash
pnpm dev:web
pnpm dev:server
```

Copy `apps/server/.env.example` to `apps/server/.env` to override the API port.

## Structure

```
apps/web       React 19 + Vite client, CSS Modules, lucide-react icons
apps/server    Express 5 API (TypeScript, tsx watch)
packages/shared  Shared TypeScript types (@jchat/shared)
docs/design    Design handoff: HTML mockups, logo and icon SVGs
```

Inside `apps/web/src`:

- `screens/` one component per screen
- `components/primitives/` shared UI pieces (Avatar, ChatRow, MessageBubble, IconButton, Pill, SectionLabel, TabBar)
- `data/mockData.ts` mock chats and contacts
- `styles/theme.css` design tokens, themed via `data-theme` on the root element

## Scripts

Run from the repo root:

| Command          | Description                         |
| ---------------- | ----------------------------------- |
| `pnpm dev`       | Web client and API together         |
| `pnpm build`     | Build every workspace package       |
| `pnpm lint`      | ESLint across the repo              |
| `pnpm typecheck` | TypeScript project references build |

## API

| Method | Path             | Description               |
| ------ | ---------------- | ------------------------- |
| GET    | `/api/v1/health` | Status and process uptime |
