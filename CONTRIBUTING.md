# Contributing to Praxis

Thanks for helping. Praxis is a small Next.js app, so a first contribution is usually quick. Good starting points are the [issue drafts](docs/issues/) labelled `good first issue`.

## Ground rules

- Praxis is a research and organisation tool. It does not place trades, connect to exchanges, or give financial advice. Changes that add trade execution or advice are out of scope.
- Keep what the UI says honest. Prices are labelled `Live`, `Cached` or `Demo` and that label must match where the number came from.
- Read [AGENTS.md](AGENTS.md). This repository uses a recent Next.js whose APIs differ from older versions. The relevant guides are in `node_modules/next/dist/docs/` after you install.

## Setup

Requires Node.js 20.9 or newer (Node 22.18 or newer to run the unit tests and benchmark, which execute TypeScript directly).

```bash
git clone https://github.com/aluinn/nexus-crypto-app-.git
cd nexus-crypto-app-
npm install
npm run dev
```

Open <http://localhost:3000>. No API keys or environment variables are needed.

## Commands

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run lint` | ESLint |
| `npm run typecheck` | Generate route types, then `tsc --noEmit` |
| `npm test` | Unit tests (`node:test`) |
| `npm run build` | Production build |
| `npm run test:e2e` | Smoke test against the production build (run `npm run build` first) |
| `npm run bench` | Micro-benchmarks for the pure helpers |

CI runs lint, typecheck, unit tests, build and the smoke test. Run them locally before opening a PR.

## Branches and commits

- Branch from `main`: `feat/short-description`, `fix/short-description`, `docs/short-description`.
- Use [Conventional Commits](https://www.conventionalcommits.org/): `feat:`, `fix:`, `docs:`, `test:`, `refactor:`, `chore:`. Keep each commit to one logical change.

## Pull requests

- One topic per PR. Explain what changed and why.
- Add or update tests when you change logic in `lib/`.
- Include a screenshot for visible UI changes.
- Do not add a dependency without raising it in the issue first.
- Keep saved user data safe: browser storage keys (see `lib/storage/local.ts`) must keep reading existing values.

## Reporting bugs and ideas

Use the issue templates. For security problems, follow [SECURITY.md](SECURITY.md) instead of opening a public issue.
