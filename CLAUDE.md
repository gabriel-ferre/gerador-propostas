# Gerador de Propostas Retrieve

Gerador de propostas comerciais: admin preenche dados do cliente, sistema publica em `/<slug>`.
**Antes de qualquer tarefa, leia `docs/SPEC.md`** (rotas, modelo de dados, blocos, lista de tarefas).

## Stack
Next.js (App Router, TypeScript, `src/`) · Tailwind + shadcn/ui · react-hook-form + zod · Supabase via `@supabase/ssr` · Vercel.

## Comandos
- `npm run dev` — site local em http://localhost:3000
- `npm run lint` · `npm run build` — rodar os dois antes de dar uma tarefa como pronta
- `npx supabase migration new <nome>` · `npx supabase db push`
- `npx supabase gen types typescript --linked | Out-File -Encoding utf8 src/lib/database.types.ts`

## Regras
- Ambiente é Windows + PowerShell.
- Toque só nos arquivos listados na tarefa do SPEC. Precisou de outro? Pare e pergunte.
- Textos da interface em português do Brasil.
- Schemas zod em `src/lib/schemas/` são a fonte da verdade; não duplique tipos.
- A oferta oculta (`plan_offers`) nunca chega ao navegador de quem não está logado. Ver SPEC 3.2.
- Nunca use a chave secret/service_role do Supabase no navegador nem a coloque no Git.
- Toda mudança no banco é uma migration em `supabase/migrations/`, nunca edição manual no painel.
- Ao terminar uma tarefa: marque `[x]` no SPEC e faça um commit `feat: Txx - <resumo>`.

## O dono do projeto
Está aprendendo programação. Ao final de cada tarefa, explique em 2–3 frases simples o que foi feito e como ele pode testar.
