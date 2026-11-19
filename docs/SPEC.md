# SPEC — Gerador de Propostas Retrieve

> Plano do produto. Todo agente lê este arquivo antes de começar uma tarefa.
> Uma tarefa = uma conversa. Ao terminar, marque `[x]` na tarefa.

## 1. Visão do produto

A Retrieve cria propostas comerciais personalizadas para cada cliente. O admin
preenche um formulário (dados, marca, redes sociais, blocos da proposta) e o
sistema gera uma página pública em
`https://proposta.assessoriaretrieve.com.br/<slug-do-cliente>`.

- **Quem usa o admin:** só a Retrieve (um usuário, sem cadastro público).
- **Quem vê a proposta:** o cliente, pelo link, sem login. A proposta é
  **só para leitura**: não há botão de aceitar. O fechamento acontece fora do
  site (o CTA leva para o WhatsApp da Retrieve).
- **O que torna a proposta dinâmica:** tema com a cor e a logo do cliente,
  blocos que podem ser ligados, desligados e reordenados, e contagem de
  visualizações para a Retrieve saber quando o cliente abriu.

## 2. Stack

| Camada | Escolha |
|---|---|
| Framework | Next.js (App Router) + TypeScript |
| Estilo | Tailwind CSS + shadcn/ui |
| Formulários | react-hook-form + zod |
| Banco, login, arquivos | Supabase (Postgres, Auth, Storage) via `@supabase/ssr` |
| Hospedagem | Vercel, no subdomínio `proposta.assessoriaretrieve.com.br` |
| Reordenar blocos | dnd-kit |

## 3. Rotas

| Rota | Acesso | Função |
|---|---|---|
| `/login` | público | E-mail e senha do admin |
| `/admin` | logado | Lista de propostas: status, visualizações, copiar link |
| `/admin/nova` | logado | Criar proposta |
| `/admin/[id]` | logado | Editar proposta |
| `/[slug]` | público | Página da proposta (404 se não estiver `publicada` ou não existir) |
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
| `status` | text | `rascunho` (só no admin) · `publicada` (link no ar) · `arquivada` (link sai do ar) |
| `views` | int | incrementado pela página pública |
| `last_viewed_at`, `created_at`, `updated_at` | timestamptz | |

**Segurança (RLS ligado):**
- Usuário logado lê e edita só as linhas em que `owner_id = auth.uid()`.
- Visitante anônimo **não lê a tabela**. A página pública usa uma única função
  `security definer`:
  - `get_proposal(p_slug)`: devolve a proposta se estiver `publicada` e soma 1 em `views`.
- Não existe nenhuma escrita pública: o visitante não altera nada.

Bucket `logos`: leitura pública, upload só para usuário logado.

## 5. Blocos

`blocks` é uma lista ordenada. A ordem da lista é a ordem na página.

```ts
type Block = { id: string; type: BlockType; enabled: boolean; data: ... }
```

Ordem padrão de uma proposta nova (pode ser reordenada e cada bloco pode ser desligado):

| # | `type` | Para que serve | Conteúdo de `data` |
|---|---|---|---|
| 1 | `hero` | Abertura personalizada | `titulo`, `subtitulo` (logo e cor vêm da proposta) |
| 2 | `diagnostico` | Mostrar que entendemos o cliente | `texto`, `pontos_de_dor: string[]` |
| 3 | `metodo` | Explicar o método de trabalho da Retrieve | `nome_metodo`, `etapas: { titulo, descricao }[]` |
| 4 | `escopo` | O que será entregue | `entregas: { titulo, descricao }[]` |
| 5 | `cronograma` | O que acontece em cada fase | `fases: { periodo, titulo, atividades: string[] }[]`; fases padrão: **Mês 1**, **Mês 2**, **Mês 3**, **Meses 4 a 6** |
| 6 | `cases` | Resultados com outros clientes | `itens: { cliente, resultado, link? }[]` |
| 7 | `depoimentos` | Prova social | `itens: { nome, cargo_empresa, texto, foto_url? }[]` |
| 8 | `ancoragem` | Ancoragem de valor: mostrar quanto as entregas valeriam contratadas à parte, antes do preço | `itens: { item, valor }[]`, `texto_comparativo`; o total é calculado (soma dos itens) |
| 9 | `investimento` | **Preço fechado** | `valor`, `periodicidade` (`mensal` · `unico`), `duracao_meses?`, `itens_inclusos: string[]`, `condicoes` (texto: forma de pagamento, fidelidade) |
| 10 | `faq` | Tirar objeções | `itens: { pergunta, resposta }[]` |
| 11 | `cta` | Próximo passo | `texto`, `whatsapp` (número), `texto_botao`; o botão abre conversa no WhatsApp da Retrieve |

Valores em reais, formatados como `R$ 4.500,00`. Quando `ancoragem` e
`investimento` estão ligados, a página mostra a diferença (“economia de R$ X”).

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
  - Migration com a tabela, as policies e a função da seção 4.
  - ✅ Como anônimo, `select` em `proposals` volta vazio; `get_proposal` devolve só propostas `publicada`.
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
  - Chama `get_proposal` no servidor, aplica cor e logo, renderiza os blocos ativos na ordem. Página só de leitura.
  - ✅ Aba anônima abre `/cliente-teste`; slug inventado, rascunho ou arquivada dá 404.
- [ ] **T12 — Lista do admin** · `frontend` · `src/app/admin/page.tsx`, `src/components/admin-list/*`
  - Tabela com cliente, status, visualizações, última visita, botões copiar link e editar; publicar e arquivar.
  - ✅ Copiar link copia `https://proposta.assessoriaretrieve.com.br/<slug>`; status atualizado aparece na hora.

### Extras (depois do grupo A)

- [ ] **T13 — Reordenar blocos** · `frontend` · `src/components/admin/*` · dnd-kit · ✅ nova ordem aparece na página pública.
- [ ] **T14 — Prévia no WhatsApp** · `frontend` · `src/app/[slug]/opengraph-image.tsx` · ✅ link colado mostra logo e nome do cliente.
- [ ] **T15 — (Opcional) IA no diagnóstico** · `backend` + `frontend` · ✅ botão gera rascunho editável do diagnóstico.

### Deploy (você)

- [ ] **T16 — Vercel + subdomínio + URLs de auth no Supabase** · ✅ `https://proposta.assessoriaretrieve.com.br/cliente-teste` abre com HTTPS e o login funciona em produção.

## 8. Decisões tomadas (19/11/2026)

- **Domínio:** `proposta.assessoriaretrieve.com.br` (subdomínio; DNS com um registro CNAME apontando para a Vercel).
- **Blocos:** além dos originais, entram `metodo`, `depoimentos`, `ancoragem` e `faq`. O cronograma é detalhado por fase (Mês 1, 2, 3 e Meses 4 a 6).
- **Investimento:** preço fechado, sem pacotes.
- **Aceite:** não existe. A proposta é só para leitura; o fechamento é pelo WhatsApp.
- **Status:** `rascunho`, `publicada` e `arquivada`, para poder tirar um link do ar.
