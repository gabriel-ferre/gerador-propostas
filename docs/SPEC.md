# SPEC — Gerador de Propostas Retrieve

> Plano do produto. Todo agente lê este arquivo antes de começar uma tarefa.
> Uma tarefa = uma conversa. Ao terminar, marque `[x]` na tarefa.

## 1. Visão do produto

A Retrieve cria propostas comerciais personalizadas para cada cliente. O admin
preenche um formulário (dados, marca, redes sociais, blocos da proposta) e o
sistema gera uma página pública em `seudominio.com/<slug-do-cliente>`.

- **Quem usa o admin:** só a Retrieve (um usuário, sem cadastro público).
- **Quem vê a proposta:** o cliente, pelo link, sem login.
- **O que torna a proposta dinâmica:** tema com a cor e a logo do cliente,
  blocos que podem ser ligados, desligados e reordenados, contagem de
  visualizações e um botão "Aceitar proposta".

## 2. Stack

| Camada | Escolha |
|---|---|
| Framework | Next.js (App Router) + TypeScript |
| Estilo | Tailwind CSS + shadcn/ui |
| Formulários | react-hook-form + zod |
| Banco, login, arquivos | Supabase (Postgres, Auth, Storage) via `@supabase/ssr` |
| Hospedagem | Vercel, com domínio próprio |
| Reordenar blocos | dnd-kit |

## 3. Rotas

| Rota | Acesso | Função |
|---|---|---|
| `/login` | público | E-mail e senha do admin |
| `/admin` | logado | Lista de propostas: status, visualizações, copiar link |
| `/admin/nova` | logado | Criar proposta |
| `/admin/[id]` | logado | Editar proposta |
| `/[slug]` | público | Página da proposta (404 se rascunho ou inexistente) |
| `/dev/blocos` | só em desenvolvimento | Vitrine dos blocos com dados de exemplo |

Slugs reservados (não podem ser usados por propostas): `admin`, `login`,
`logout`, `api`, `dev`, `_next`, `auth`.

## 4. Modelo de dados

Tabela `public.proposals`:

| Coluna | Tipo | Observação |
|---|---|---|
| `id` | uuid | PK |
| `owner_id` | uuid | `auth.uid()` de quem criou |
| `slug` | text único | kebab-case: `^[a-z0-9]+(-[a-z0-9]+)*$` |
| `client_name` | text | |
| `logo_url` | text | URL pública no bucket `logos` |
| `brand_color` | text | hex, ex. `#1f3a8a` |
| `socials` | jsonb | `{ instagram?, linkedin?, site?, whatsapp? }` |
| `blocks` | jsonb | lista de blocos (seção 5) |
| `status` | text | `rascunho` · `enviada` · `aceita` · `recusada` |
| `views` | int | incrementado pela página pública |
| `last_viewed_at`, `accepted_at`, `created_at`, `updated_at` | timestamptz | |

**Segurança (RLS ligado):**
- Usuário logado lê e edita só as linhas em que `owner_id = auth.uid()`.
- Visitante anônimo **não lê a tabela**. A página pública usa duas funções
  `security definer`:
  - `get_proposal(p_slug)`: devolve a proposta se não for rascunho e soma 1 em `views`.
  - `accept_proposal(p_slug)`: muda `enviada` → `aceita` e grava `accepted_at`.

Bucket `logos`: leitura pública, upload só para usuário logado.

## 5. Blocos

`blocks` é uma lista ordenada. A ordem da lista é a ordem na página.

```ts
type Block = { id: string; type: BlockType; enabled: boolean; data: ... }
```

| `type` | Conteúdo de `data` |
|---|---|
| `hero` | título, subtítulo (logo e cor vêm da proposta) |
| `diagnostico` | texto sobre a situação atual do cliente, pontos de dor (lista) |
| `escopo` | lista de entregas `{ titulo, descricao }` |
| `cronograma` | etapas `{ etapa, prazo }` |
| `investimento` | pacotes `{ nome, preco, periodicidade, itens[], destaque }` |
| `cases` | `{ cliente, resultado, link? }` |
| `cta` | texto do convite, WhatsApp; mostra o botão Aceitar |

O schema zod de cada bloco fica em `src/lib/blocks/schema.ts` e é a fonte da
verdade para o formulário e para a página pública.

## 6. Agentes

| Agente | Modelo | Quando usar |
|---|---|---|
| (sessão principal) | Opus | Planejar, revisar, juntar branches, resolver conflitos |
| `designer` | Sonnet | Tokens, tema, componentes visuais dos blocos |
| `frontend` | Sonnet | Páginas, formulários, componentes |
| `backend` | Sonnet | Supabase: migrations, RLS, auth, storage, server actions |
| `qa` | Haiku | Lint, build e conferência dos critérios de aceite |

## 7. Tarefas

Formato: **agente** · arquivos que pode tocar · critério de aceite.
Tarefas do mesmo **grupo paralelo** não mexem nos mesmos arquivos e podem
rodar ao mesmo tempo em worktrees separados.

### Base (sequencial)

- [ ] **T01 — Scaffold** · `frontend`
  - Next.js com TS, Tailwind, ESLint, App Router, `src/`; shadcn/ui com button, input, textarea, label, card.
  - ✅ `npm run dev` abre em `localhost:3000`; `npm run build` passa.

### Supabase (sequencial)

- [ ] **T02 — Clients do Supabase** · `backend` · `src/lib/supabase/*`, `src/middleware.ts`, `.env.example`
  - Clients de navegador e servidor com `@supabase/ssr`; middleware que renova a sessão.
  - ✅ `npm run build` passa; `.env.local` não aparece no `git status`.
- [ ] **T03 — Tabela, RLS e funções** · `backend` · `supabase/migrations/*`
  - Migration com a tabela, as policies e as funções da seção 4.
  - ✅ Como anônimo, `select` em `proposals` volta vazio; `get_proposal` devolve só não-rascunhos.
- [ ] **T04 — Login do admin** · `backend` · `src/app/login/*`, `src/app/admin/layout.tsx`
  - Login por e-mail e senha; `/admin/*` redireciona para `/login` sem sessão; botão sair.
  - ✅ Numa aba anônima, `/admin` vai para `/login`; depois de entrar, abre o admin.
- [ ] **T05 — Bucket de logos** · `backend` · `supabase/migrations/*`
  - ✅ Upload logado funciona; a URL pública abre a imagem.
- [ ] **T06 — Tipos do banco** · `qa` · `src/lib/database.types.ts`
  - ✅ Arquivo gerado; `npm run build` passa.

### Design (sequencial)

- [ ] **T07 — Tokens e tema** · `designer` · `src/app/globals.css`, `src/lib/theme.ts`
  - Base visual da Retrieve; `--brand` sobrescrito pela cor de cada proposta, com contraste de texto calculado.
  - ✅ Trocar `--brand` no navegador muda a página inteira e o texto continua legível.
- [ ] **T08 — Schema dos blocos** · `backend` · `src/lib/blocks/schema.ts`
  - zod para cada bloco da seção 5 + schema da proposta inteira + validação de slug reservado.
  - ✅ Um JSON inválido é recusado; o slug `admin` é recusado.
- [ ] **T09 — Componentes dos blocos** · `designer` · `src/components/blocks/*`, `src/app/dev/blocos/*`
  - Um componente por bloco, recebendo dados tipados pelo schema da T08.
  - ✅ `/dev/blocos` mostra todos, bonitos no celular e no desktop.

### Grupo paralelo A (depois da T09)

- [ ] **T10 — Formulário do admin** · `frontend` · `src/app/admin/nova/*`, `src/app/admin/[id]/*`, `src/components/admin/*`
  - Campos da proposta, slug gerado do nome (`Padaria São João` → `padaria-sao-joao`), upload de logo, redes sociais, editor de blocos (ligar/desligar, editar `data`).
  - ✅ Criar uma proposta faz ela aparecer no Supabase; editar salva as mudanças.
- [ ] **T11 — Página pública** · `frontend` · `src/app/[slug]/*`, `src/components/proposal/*`
  - Chama `get_proposal` no servidor, aplica cor e logo, renderiza os blocos ativos na ordem; botão Aceitar chama `accept_proposal`.
  - ✅ Aba anônima abre `/cliente-teste`; slug inventado ou rascunho dá 404; Aceitar muda o status.
- [ ] **T12 — Lista do admin** · `frontend` · `src/app/admin/page.tsx`, `src/components/admin-list/*`
  - Tabela com cliente, status, visualizações, última visita, botões copiar link e editar; mudar status.
  - ✅ Copiar link copia `https://<domínio>/<slug>`; status atualizado aparece na hora.

### Extras (depois do grupo A)

- [ ] **T13 — Reordenar blocos** · `frontend` · `src/components/admin/*` · dnd-kit · ✅ nova ordem aparece na página pública.
- [ ] **T14 — Prévia no WhatsApp** · `frontend` · `src/app/[slug]/opengraph-image.tsx` · ✅ link colado mostra logo e nome do cliente.
- [ ] **T15 — Aviso de aceite** · `backend` · ✅ aceitar dispara um e-mail para a Retrieve.
- [ ] **T16 — (Opcional) IA no diagnóstico** · `backend` + `frontend` · ✅ botão gera rascunho editável do diagnóstico.

### Deploy (você)

- [ ] **T17 — Vercel + domínio + URLs de auth no Supabase** · ✅ `https://<domínio>/cliente-teste` abre com HTTPS e o login funciona em produção.

## 8. Decisões em aberto

- Domínio que será usado.
- Os blocos da seção 5 cobrem o que a Retrieve costuma apresentar? Falta algum (ex.: "Sobre a Retrieve", depoimentos, FAQ)?
- Investimento: um preço fechado ou pacotes para o cliente escolher?
- Aviso de aceite: e-mail, WhatsApp ou outro canal?
