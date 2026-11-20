# SPEC — Gerador de Propostas Retrieve

> Plano do produto. Todo agente lê este arquivo antes de começar uma tarefa.
> Uma tarefa = uma conversa. Ao terminar, marque `[x]` na tarefa.

## 1. Visão do produto

A Retrieve apresenta propostas comerciais em reunião (compartilhando a tela) e
depois envia o link para o cliente em
`https://proposta.assessoriaretrieve.com.br/<slug-do-cliente>`.

A página é uma **apresentação de vendas em 15 seções**, sempre na identidade
visual da Retrieve. A maior parte do conteúdo é igual para todo cliente
(autoridade, método ODCR, depoimentos…). O que personaliza cada proposta:

- o **nome da empresa** do cliente no Hero e ao longo da página;
- o **canal** (e-commerce ou loja física) e as **dores destacadas** no Diagnóstico;
- o **case de identificação** escolhido para o nicho do cliente;
- o **plano** (Aceleração de Lojas ou Ecom Experts), com preço padrão ou ajustado;
- a **oferta protagonista oculta**, revelada só se o apresentador quiser.

Quem usa o admin: só a Retrieve. Quem vê a proposta: o cliente, pelo link,
sem login. A proposta é **só leitura** para o cliente; o fechamento é pelo
WhatsApp (CTA).

## 2. Stack

| Camada | Escolha |
|---|---|
| Framework | Next.js (App Router) + TypeScript |
| Estilo | Tailwind CSS + shadcn/ui, tokens do Retrieve Design System (`docs/design-system/`) |
| Formulários | react-hook-form + zod |
| Banco, login, arquivos | Supabase (Postgres, Auth, Storage) via `@supabase/ssr` |
| Hospedagem | Vercel, no subdomínio `proposta.assessoriaretrieve.com.br` |

## 3. Conceitos-chave

### 3.1 Biblioteca × Proposta

| | Biblioteca | Proposta |
|---|---|---|
| O que é | Conteúdo cadastrado **uma vez** e reaproveitado | O que muda **por cliente** |
| Exemplos | Dores, cases, planos, depoimentos, FAQ, textos e imagens das seções | Nome do cliente, canal, dores destacadas, case, plano, preço ajustado |
| Onde edita | `/admin/biblioteca/*` (fase 4; antes disso, via seed SQL) | `/admin/propostas/*` |

### 3.2 Modo apresentador

Quando **a Retrieve está logada** e abre `/<slug>`, a página entra em modo
apresentador **sem mostrar nada diferente na tela** (a tela está sendo
compartilhada com o cliente):

- **Dores:** clicar numa dor do Diagnóstico liga/desliga o destaque e **salva**
  na proposta. Para o cliente (não logado), clicar destaca só na tela dele e não salva.
- **Oferta oculta:** o atalho de teclado `Shift + O` revela a oferta protagonista
  do plano com uma animação. Não existe botão visível.
- **Visualizações:** acessos logados não somam em `views`.

**Regra de segurança da oferta oculta:** a oferta **nunca** é enviada ao
navegador de quem não está logado — nem escondida no HTML, nem no JavaScript.
Ela só é buscada por uma server action que confere a sessão antes de responder.
Esconder com CSS não serve: qualquer pessoa vê pelo "inspecionar elemento".

## 4. Rotas

| Rota | Acesso | Função |
|---|---|---|
| `/login` | público | E-mail e senha do admin |
| `/admin` | logado | Lista de propostas: status, visualizações, última visita, copiar link |
| `/admin/propostas/nova` · `/admin/propostas/[id]` | logado | Criar / editar proposta |
| `/admin/biblioteca/*` | logado | Dores, cases, planos, depoimentos, FAQ, logos, conteúdo das seções |
| `/[slug]` | público | A proposta (404 se não estiver `publicada` ou não existir) |
| `/dev/secoes` | só em desenvolvimento | Vitrine das seções com dados de exemplo |

Slugs reservados: `admin`, `login`, `logout`, `api`, `dev`, `_next`, `auth`.

## 5. As 15 seções da proposta

Ordem fixa. 🔹 = personalizado por proposta. Os demais vêm da Biblioteca.

| # | Seção (`key`) | Conteúdo e comportamento |
|---|---|---|
| 1 | Hero (`hero`) 🔹 | Título fixo: **"Como vamos tornar o faturamento da {empresa} previsível"**. Subtítulo fixo: "Construímos a jornada do seu cliente, desde a compra até a recompra, com um método validado em +200 marcas de moda tanto no e-commerce quanto loja física". Abaixo, **faixa de logos de clientes passando** (loop infinito). |
| 2 | Diagnóstico (`diagnostico`) 🔹 | **Interruptor** E-commerce ⇄ Loja física (abre no canal da proposta). Para cada canal, **6 dores em grade 2×3** (2 colunas, 3 linhas). Dores clicáveis: a destacada ganha ênfase e as outras ficam esmaecidas. Salvamento conforme 3.2. |
| 3 | Autoridade (`autoridade`) | Esquerda: **foto grande do Lucas Borges** (fundador), cercada por fotos menores de eventos e clientes. Direita: história da Retrieve, por que é autoridade em moda e **números atingidos**. |
| 4 | Método (`metodo`) | Framework **ODCR** em torno de uma **roda que gira todo mês**: Oferta → Demanda → Conversão → Recompra. |
| 5 | Etapa 1 — Oferta irresistível (`etapa_oferta`) | Texto + bullets; ao lado, **carrossel de criativos** feitos para clientes. |
| 6 | Etapa 2 — Demanda qualificada (`etapa_demanda`) | Layout centralizado como o Hero: texto + bullets, **desenho do funil** da Retrieve e, ao lado, **prints de dashboards** de resultados de clientes. |
| 7 | Etapa 3 — Conversão otimizada (`etapa_conversao`) | Duas partes: (a) acompanhamento no WhatsApp com a ferramenta **Retrieve SPY**; (b) otimizações em e-commerce, com **foto da home de um projeto** e as alterações realizadas em destaque (marcações sobre a imagem). |
| 8 | Etapa 4 — Recompra sistemática (`etapa_recompra`) | **Logos das plataformas parceiras** (Zoppy, Martz, Nummus…) + **exemplos de e-mails e mensagens de WhatsApp** disparados. |
| 9 | Case de identificação (`case`) 🔹 | O case escolhido na proposta: título, texto (aplicação do método), **blocos de dores resolvidas** e **vídeo ou foto** de depoimento do cliente. |
| 10 | Depoimentos (`depoimentos`) | Fotos de clientes com plaquinhas + prints de WhatsApp. |
| 11 | Reforço de benefícios (`beneficios`) | Título + ícones: metas atingidas, clientes voltando mais vezes, visão de mercado, novos clientes todos os dias, se destacar. Fecha com a pergunta **"Quanto vale isso pra você?"**, que leva à seção seguinte. |
| 12 | Ancoragem de valor (`ancoragem`) 🔹 | Abre com **"Isso é o que vale"**. Profissionais alocados com o **custo de mercado** de cada um + **entregas mensais** com valor; total do que o cliente gastaria contratando à parte. Conteúdo vem do **plano** escolhido. |
| 13 | Investimento (`investimento`) 🔹 | Valor do **plano semestral** em três formas: **à vista, cartão e boleto**. Preço padrão do plano ou o ajustado na proposta. |
| 13.1 | Oferta protagonista (`oferta_oculta`) 🔹 | Condição especial do plano para fechar na reunião. **Oculta**; revelada só pelo modo apresentador (3.2). |
| 14 | FAQ (`faq`) | Perguntas frequentes em acordeão. |
| 15 | CTA (`cta`) | Convite final + botão para o WhatsApp da Retrieve. |

Valores em reais, formatados como `R$ 4.500,00`. A página é pensada **para o
celular primeiro** (o cliente abre o link no WhatsApp) e **para tela grande**
(apresentação na reunião).

## 6. Modelo de dados

### Proposta

`public.proposals`

| Coluna | Tipo | Observação |
|---|---|---|
| `id` | uuid | PK |
| `owner_id` | uuid | `auth.uid()` |
| `slug` | text único | kebab-case `^[a-z0-9]+(-[a-z0-9]+)*$`, não reservado |
| `company_name` | text | nome usado no Hero |
| `channel` | text | `ecommerce` · `loja_fisica` (posição inicial do interruptor) |
| `highlighted_pain_ids` | uuid[] | dores destacadas |
| `case_id` | uuid → `cases` | |
| `plan_id` | uuid → `plans` | |
| `price_override` | jsonb, opcional | mesmo formato de `plans.payment_options`; se vazio, usa o do plano |
| `status` | text | `rascunho` · `publicada` · `arquivada` |
| `views`, `last_viewed_at`, `created_at`, `updated_at` | | |

### Biblioteca

| Tabela | Campos principais |
|---|---|
| `pains` | `channel`, `text`, `position` |
| `cases` | `name`, `niche`, `title`, `body`, `resolved_pains text[]`, `media_url`, `media_type` (`video`·`image`) |
| `plans` | `key` (`aceleracao_lojas`·`ecom_experts`), `name`, `payment_options jsonb` (`[{ forma: avista·cartao·boleto, descricao, valor }]`), `anchoring jsonb` (`{ profissionais: [{cargo, custo_mensal}], entregas: [{item, valor}] }`) |
| `plan_offers` | `plan_id`, `title`, `body`, `price?` — **a oferta oculta, tabela separada** |
| `testimonials` | `kind` (`foto_placa`·`print_whatsapp`), `image_url`, `caption`, `position` |
| `faqs` | `question`, `answer`, `position` |
| `client_logos` | `name`, `image_url`, `position` |
| `section_content` | `key` (seções 3 a 8, 11, 15), `content jsonb` (textos, bullets, números, URLs de imagens) |

Bucket `midia`: leitura pública, upload só logado. Imagens e vídeos da biblioteca.

### Segurança (RLS em todas as tabelas)

- Logado: lê e escreve tudo.
- Anônimo: **nenhum `select` direto** em `proposals`, `plans` e `plan_offers`.
  Lê `pains`, `cases`, `testimonials`, `faqs`, `client_logos` e `section_content`
  (conteúdo de marketing, não é segredo).
- A página pública usa a função `get_proposal(p_slug)` (`security definer`,
  `set search_path = public`): devolve a proposta `publicada` com o case e o
  plano escolhidos (**sem** `plan_offers`) e soma 1 em `views`.
- `plan_offers` só é lida por usuário logado. O anônimo não tem nenhum caminho até ela.

## 7. Agentes

| Agente | Modelo | Quando usar |
|---|---|---|
| (sessão principal) | Opus | Planejar, revisar, juntar branches, resolver conflitos |
| `designer` | Sonnet | Tokens, layout e componentes visuais das seções |
| `frontend` | Sonnet | Páginas, formulários, interações |
| `backend` | Sonnet | Supabase: migrations, RLS, seed, auth, storage, server actions |
| `qa` | Haiku | Lint, build e conferência dos critérios de aceite |

## 8. Tarefas

Formato: **agente** · arquivos que pode tocar · critério de aceite (✅).
Tarefas do mesmo **grupo paralelo** não mexem nos mesmos arquivos.

### Fase 1 — Fundação (sequencial)

- [x] **T01 — Scaffold** · `frontend`
  - Next.js (TS, Tailwind, ESLint, App Router, `src/`) + shadcn/ui (button, input, textarea, label, card, switch, select, accordion).
  - A pasta já tem arquivos: criar em pasta temporária e mover, sem apagar `CLAUDE.md`, `docs/` e `.claude/`.
  - ✅ `npm run dev` abre em `localhost:3000`; `npm run build` passa.
- [x] **T02 — Clients do Supabase** · `backend` · `src/lib/supabase/*`, `src/proxy.ts` (o antigo middleware, renomeado no Next 16), `.env.example`
  - ✅ `npm run build` passa; `.env.local` não aparece no `git status`.
- [x] **T03 — Banco, RLS e seed** · `backend` · `supabase/migrations/*`, `supabase/seed.sql`
  - Tabelas e regras da seção 6 + `get_proposal`. Seed com conteúdo de exemplo marcado como `[EXEMPLO]`: 6 dores por canal, 2 cases, os 2 planos com ofertas, 3 FAQs, conteúdo das seções.
  - ✅ Como anônimo: `select` em `proposals`, `plans` e `plan_offers` volta vazio; `get_proposal` não traz oferta; advisor de segurança do Supabase sem alertas.
- [x] **T04 — Login** · `backend` · `src/app/login/*`, `src/app/admin/layout.tsx`, `src/lib/auth.ts`
  - ✅ Aba anônima em `/admin` vai para `/login`; depois de entrar, abre o admin.
- [x] **T05 — Bucket `midia`** · `backend` · `supabase/migrations/*` · ✅ upload logado funciona; URL pública abre.
- [x] **T06 — Tipos do banco** · `qa` · `src/lib/database.types.ts` · ✅ gerado; build passa.

### Fase 2 — Admin de propostas (sequencial)

- [x] **T07 — Schemas** · `backend` · `src/lib/schemas/*`
  - zod da proposta, de `section_content` por seção e de `payment_options`/`anchoring`; validação de slug reservado.
  - ✅ JSON inválido é recusado; slug `admin` é recusado.
- [x] **T08 — Lista e formulário de propostas** · `frontend` · `src/app/admin/page.tsx`, `src/app/admin/propostas/*`, `src/components/admin/*`
  - Lista com status, visualizações, última visita, copiar link, publicar/arquivar. Formulário: empresa, slug gerado do nome, canal, dores destacadas (checkbox por canal), case (select com nicho), plano (select), ajuste de preço opcional.
  - ✅ Criar uma proposta faz ela aparecer na lista; copiar link copia `https://proposta.assessoriaretrieve.com.br/<slug>`.

### Fase 3 — A página da proposta

- [ ] **T09 — Tokens e base visual** · `designer` · `src/app/globals.css`, `src/lib/theme.ts`, `src/components/ui-retrieve/*`
  - Identidade do Retrieve Design System; tipografia, cores, espaçamentos, componentes base (título de seção, bullet, card de dor).
  - ✅ `/dev/secoes` mostra os componentes base no celular e no desktop.
- [x] **T10 — Esqueleto da página** · `frontend` · `src/app/[slug]/page.tsx`, `src/app/[slug]/presenter.tsx`, `src/components/sections/index.ts`
  - Chama `get_proposal`, detecta sessão (modo apresentador), renderiza as 15 seções em ordem. Cada seção começa como um componente provisório em `src/components/sections/<key>.tsx`.
  - ✅ uma proposta publicada mostra as 15 seções provisórias; rascunho, arquivada ou slug inventado mostram a página "não encontrado" (status HTTP 200 + noindex; ver decisão de 21/11).

**Grupo paralelo B (depois da T10)** — cada tarefa só mexe nos arquivos das suas seções em `src/components/sections/`:

- [ ] **T11 — Hero + Diagnóstico** · `designer` · `hero.tsx`, `diagnostico.tsx`, `src/app/[slug]/actions/pains.ts`
  - Faixa de logos em loop; interruptor de canal; grade 2×3; destaque com salvamento só no modo apresentador.
  - ✅ Logado, clicar numa dor e recarregar mantém o destaque; anônimo, o destaque some ao recarregar.
- [ ] **T12 — Autoridade + Método** · `designer` · `autoridade.tsx`, `metodo.tsx`
  - ✅ Roda ODCR anima girando (e respeita "reduzir movimento" do sistema); fotos se reorganizam bem no celular.
- [ ] **T13 — Etapas Oferta + Demanda** · `designer` · `etapa-oferta.tsx`, `etapa-demanda.tsx`
  - ✅ Carrossel funciona com toque e com setas; funil e prints legíveis no celular.
- [ ] **T14 — Etapas Conversão + Recompra** · `designer` · `etapa-conversao.tsx`, `etapa-recompra.tsx`
  - ✅ Marcações sobre a home aparecem nos pontos certos; exemplos de mensagens legíveis.
- [ ] **T15 — Case + Depoimentos + Benefícios** · `designer` · `case.tsx`, `depoimentos.tsx`, `beneficios.tsx`
  - ✅ Trocar o case no admin muda a seção 9; vídeo toca no celular.
- [ ] **T16 — Ancoragem + Investimento + Oferta oculta** · `backend` + `frontend` · `ancoragem.tsx`, `investimento.tsx`, `oferta-oculta.tsx`, `src/app/[slug]/actions/offer.ts`
  - Total da ancoragem calculado; formas de pagamento; `Shift + O` revela a oferta só com sessão válida.
  - ✅ Anônimo: a oferta não aparece no código-fonte nem nas requisições de rede; `Shift + O` não faz nada. Logado: `Shift + O` revela.
- [ ] **T17 — FAQ + CTA** · `frontend` · `faq.tsx`, `cta.tsx` · ✅ acordeão acessível pelo teclado; botão abre o WhatsApp.

- [ ] **T18 — Revisão da página inteira** · `qa` + sessão principal · ✅ página completa sem erro no celular e no desktop; nota de performance boa no Lighthouse.

### Fase 4 — Admin da biblioteca (paralelo, depois da Fase 3)

- [ ] **T19 — Dores, FAQ e logos** · `frontend` · `src/app/admin/biblioteca/{dores,faq,logos}/*` · ✅ editar e reordenar reflete na página.
- [ ] **T20 — Cases e depoimentos** · `frontend` · `src/app/admin/biblioteca/{cases,depoimentos}/*` · ✅ cadastrar um case com vídeo e escolhê-lo numa proposta.
- [ ] **T21 — Planos e ofertas** · `frontend` · `src/app/admin/biblioteca/planos/*` · ✅ mudar preço padrão reflete nas propostas sem ajuste.
- [ ] **T22 — Conteúdo das seções** · `frontend` · `src/app/admin/biblioteca/secoes/*` · ✅ editar texto e imagens da Autoridade reflete na página.

### Fase 5 — Extras e publicação

- [ ] **T23 — Prévia no WhatsApp** · `frontend` · `src/app/[slug]/opengraph-image.tsx` · ✅ link colado mostra imagem com o nome da empresa.
- [ ] **T24 — Deploy** · você · Vercel + CNAME `proposta` + URLs de auth no Supabase · ✅ `https://proposta.assessoriaretrieve.com.br/cliente-teste` abre com HTTPS e o login funciona.

## 9. Conteúdo que a Retrieve precisa reunir

Os agentes constroem com conteúdo `[EXEMPLO]`; o real entra pelo admin da
biblioteca. Pode ir juntando desde já:

- [ ] Logos de clientes (PNG/SVG, fundo transparente)
- [ ] 6 dores de e-commerce e 6 de loja física
- [ ] Foto em alta do Lucas Borges + fotos de eventos e clientes
- [ ] História da Retrieve e números (marcas atendidas, faturamento gerado etc.)
- [ ] Textos e bullets de cada etapa do ODCR
- [ ] Criativos para o carrossel
- [ ] Desenho do funil + prints de dashboards de clientes
- [ ] Prints da Retrieve SPY + foto da home de um e-commerce com as alterações
- [ ] Logos das plataformas parceiras (Zoppy, Martz, Nummus) — confirmar autorização de uso
- [ ] Exemplos de e-mails e mensagens de WhatsApp
- [ ] Cases: nicho, texto, dores resolvidas, vídeo/foto
- [ ] Depoimentos: fotos com plaquinha e prints de WhatsApp — **borrar números e nomes de terceiros**
- [ ] Profissionais alocados e custo de mercado de cada um, por plano
- [ ] Preços dos dois planos (à vista, cartão, boleto) e a oferta protagonista de cada um
- [ ] Perguntas frequentes

## 10. Decisões tomadas

- 19/11: domínio `proposta.assessoriaretrieve.com.br`; proposta só leitura, sem aceite; status `rascunho`·`publicada`·`arquivada`.
- 20/11: página reestruturada em 15 seções de ordem fixa, sempre na identidade Retrieve; Biblioteca × Proposta; modo apresentador com dores salvas ao vivo e oferta oculta por `Shift + O`; preço fixo por plano com ajuste opcional.
- 20/11: a página da proposta segue a **linguagem do deck comercial** do Design System (`docs/design-system/slides/`): fonte Poppins (`--font-deck`), fundos preto ou degradê preto → `deck-navy`, títulos em caixa-alta com a palavra-chave em `brand-red`, números de prova em vermelho. O admin segue a linguagem de interface (Apfel Grotezk, fundo claro).
- 21/11: com Cache Components o Next 16 envia a casca da página com HTTP 200 antes de consultar o banco; `notFound()` mostra "não encontrado" mas não troca o status para 404. Aceito: propostas têm noindex e só links válidos são enviados. Se precisar de 404 real (ex.: prévia de WhatsApp de proposta arquivada), checar o slug no `src/proxy.ts` com uma função SQL leve `proposal_exists`.
