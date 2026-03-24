# TriviaBlitz

A fun, real-time trivia app built with Electric SQL and TanStack DB. Pick a category, choose your difficulty, answer 10 multiple-choice questions, and see how you rank on the live leaderboard — scores sync in real time across every connected browser.

## Features

- **5 categories**: Science 🔬, History 📜, Pop Culture 🎬, Sports ⚽, Technology 💻
- **3 difficulty levels**: Easy (10 pts), Medium (20 pts), Hard (30 pts)
- **50 pre-loaded questions** with instant feedback on every answer
- **Live leaderboard** synced in real time via Electric SQL — see new scores appear without refresh
- **Optimistic mutations** — game state updates instantly without waiting for the server

## Tech Stack

- **Electric SQL** — Postgres-to-client real-time sync via shapes
- **TanStack DB** — reactive collections and optimistic mutations
- **Drizzle ORM** — type-safe schema and migrations
- **TanStack Start** — React meta-framework with SSR + server routes
- **Radix UI Themes** — accessible component library

## Getting Started

```bash
pnpm install
pnpm dev:start
```

The app runs at [http://localhost:5173](http://localhost:5173).

## Database

Migrations and seed data run automatically on first start. To re-run:

```bash
pnpm drizzle-kit generate && pnpm drizzle-kit migrate
```

## License

MIT
