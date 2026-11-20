# Regras para agentes de IA

Qualquer agente (Claude, Codex ou outro) que trabalhe neste projeto:

1. Leia e siga `CLAUDE.md` (regras do projeto) e `docs/SPEC.md` (plano e tarefas).
2. A oferta oculta (`plan_offers`) nunca pode chegar ao navegador de quem não está logado. Ver SPEC 3.2.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
