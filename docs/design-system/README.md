# Retrieve — Design System

> **Retrieve** é uma assessoria de marketing especializada em **varejo**. Ajuda lojistas a estruturar todo o processo de **aquisição, conversão e retenção** de clientes — para loja física e virtual. Promessa de marca: **“12 meses em 12 semanas”** — retomar o controle do crescimento.

Este projeto é o sistema de design da marca: tokens (cor, tipo, espaçamento), fontes, ativos (logos), componentes React e UI kits prontos para gerar peças e interfaces consistentes.

---

## Contexto da marca

- **Nome:** vem do inglês *Retrieve* = **“Retomar”**. A essência é apoiar varejistas a recuperar clareza, direção e ritmo de crescimento.
- **Posicionamento:** “Criado de dentro do varejo, para fora.” Base de 19–20 anos de experiência prática no varejo (sócio referência nacional, ex-supervisor regional na Aramis, lojas que faturavam R$200M/ano) + atuação direta em marketing.
- **Método (O.D.C.R / 12x12):** **Oferta Irresistível → Demanda Qualificada → Conversão Otimizada → Recompra Sistemática.** Um ciclo estruturado a dados e jornada.
- **Meta:** atender 300 varejistas até o final de 2028.
- **Atributos:** **Exclusivo · Sofisticado · Autêntico.**

### Fontes / materiais recebidos
- `uploads/MANUAL IDENTIDADE VISUAL I  RETRIEVE.pdf` — manual de identidade visual (paleta, tipografia, atributos).
- `uploads/PLANO DE RETOMADA - RETRIEVE  (5).pdf` — deck comercial “Plano de Retomada” (método, cases, planos, próximos passos). Texto extraído em `scraps/`.
- `uploads/LOGO ORIG.png`, `LOGO ORIG WHITE.png`, `LOGO RED.png` — logotipos oficiais → copiados para `assets/logos/`.

> ⚠️ Não foi possível extrair as imagens de mockup do PDF do manual neste ambiente (a renderização de páginas falha no sandbox). O conteúdo foi reconstruído a partir do texto e dos logos enviados.

---

## CONTENT FUNDAMENTALS — como escrevemos

- **Idioma:** português do Brasil.
- **Voz:** **séria, direta e que transmite autoridade.** Afirmamos, não pedimos. Vendemos método, não promessa vazia.
- **Pessoa:** falamos com o lojista por **“você”** (“assuma o controle do *seu* faturamento”). A marca fala de si como **“nós / a Retrieve”**.
- **Tom:** confiante e objetivo. Frases curtas, verbos no imperativo (“Retome”, “Assuma”, “Vamos começar”). Evita jargão fofo e hype; foca em **performance real, previsibilidade e controle**.
- **Vocabulário recorrente:** retomada, controle, crescimento, método, varejo, previsível, escalável, ecossistema, aquisição/conversão/recompra, faturamento incremental.
- **Números são prova:** ROI 10x, +45%, R$200M, 12 semanas, 300 varejistas. Use métricas concretas como argumento.
- **Caixa-alta** em rótulos curtos e eyebrows (kickers), com tracking largo. Títulos em caixa normal.
- **Emoji:** **não usar.** A marca é sóbria; iconografia é geométrica/linear, não emotiva.
- **Exemplos:**
  - Eyebrow: `12 MESES EM 12 SEMANAS`
  - Headline: “Retome o controle do seu **crescimento**.”
  - CTA: “Quero meu diagnóstico” · “Vamos começar →”
  - Apoio: “Criado de dentro do varejo, para fora.”

---

## VISUAL FOUNDATIONS

- **Cores:** vermelho `#E62F22` (energia, ação, crescimento — cor primária e de CTA), preto quente `#373435` (sofisticação, força, premium), branco `#FEFEFE` (clareza, respiro), azul-marinho `#102249` (apoio, profundidade). Paleta de **alto contraste**, moderna. Escalas completas em `tokens.json`.
- **Uso de cor:** vermelho é pontual e poderoso — reservado para CTAs, destaques e um pilar do método por vez. Fundos são branco ou preto/ink-950. Azul é secundário, usado com parcimônia.
- **Tipografia:** **Apfel Grotezk** (Collletttivo, SIL OFL) para tudo — display e texto. Grotesca contemporânea, redonda e arejada, x-height alto. Pesos 400 (Regular) e 700 (Fett/Bold). Títulos em 700 com tracking apertado (`-0.02em`); rótulos em caixa-alta com tracking largo (`0.22em`).
- **Backgrounds:** sólidos (branco / ink-950 / vermelho). Único efeito decorativo: um **glow radial vermelho** suave no canto de superfícies escuras (hero, capa de slide). Sem fotos genéricas, sem texturas, sem gradientes azul-roxo.
- **Cantos:** raios moderados — cards `16px` (`--radius-lg`), botões e badges em **pílula** (`--radius-pill`). Acompanha a redondeza da tipografia.
- **Cards:** superfície branca com borda fina `1.5px` (`--ink-200`) ou sombra quente discreta (`--shadow-md`). Variantes escura (preto) e vermelha para destaque. Sem borda-colorida-à-esquerda.
- **Sombras:** quentes e discretas (tom do preto da marca), de `--shadow-xs` a `--shadow-xl`, + `--shadow-red` para CTAs.
- **Movimento:** sóbrio, **sem bounce**. `--ease-out` firme, durações 120–360ms. Hover de botão: leve `translateY(-1px)` + escurecimento da cor + sombra vermelha no primário. Press: volta ao normal / cor mais escura.
- **Estados:** hover escurece a cor (red-600) e adiciona sombra; foco usa anel vermelho (`--red-100` + borda vermelha). Seleção de texto: fundo vermelho, texto branco.
- **Layout:** container `1200px`, seções com respiro generoso (`104px` vertical), grid com `gap`. Header sticky com blur translúcido.
- **Imagery vibe:** quando houver foto, esperar tom de varejo real, contrastado; b&w ou com realce de vermelho combina. (Nenhuma foto incluída neste pacote.)

---

## ICONOGRAPHY

- **Abordagem:** ícones **geométricos / lineares**, traço firme, sem preenchimento emotivo — coerentes com a grotesca e o tom sério.
- **Sistema sugerido:** [**Lucide**](https://lucide.dev) (stroke ~2px, cantos levemente arredondados) como conjunto padrão, via CDN. Combina com a redondeza da Apfel Grotezk. Não há icon font proprietária no material da marca.
- **Símbolo da marca:** o logo é um **“R” com seta ascendente** integrada (representa retomada/crescimento) — ver `assets/logos/`. Use o símbolo como elemento gráfico de apoio quando precisar de um mark isolado.
- **Numerais de passo** (01–04) em **fonte mono** marcam as fases do método.
- **Emoji:** não usar. **Unicode** apenas funcional (seta `→` em CTAs e entre passos do método).

---

## Índice / manifesto

**Raiz**
- `styles.css` — ponto de entrada global (só `@import`). Consumidores linkam este arquivo.
- `tokens.json` — todos os tokens (cor, tipo, espaçamento, raio, sombra); `tokens.css` é gerado a partir dele (@font-face Apfel Grotezk incluído).
- `components/bundle.css` — aliases, movimento e regras base.
- `assets/logos/` — `retrieve-logo-primary.png`, `-white.png`, `-red.png` + versões do manual (ver `assets/logos/README.md`).
- `fonts/` — Apfel Grotezk 400 / 700 (woff2).
- `guidelines/` — páginas de marca (método, atributos, tom de voz).

**Componentes** (`components/`, namespace `window.RetrieveDesignSystem_cd8a72`)
- **Button**, **Badge**, **Card**, **Eyebrow**, **Stat** (fontes em `components/core/`)
- **Input**, **Checkbox**, **Switch** (fontes em `components/forms/`)
- Cada um tem `components/<Nome>/README.md` (uso) e `preview.html`; tipos em `components/index.d.ts`.

**Slides** (`slides/`) — modelos do deck “Plano de Retomada”: capa, método, case, divisor de seção, investimento, próximos passos.

**UI Kits** (`ui_kits/`)
- `website/` — homepage institucional da Retrieve (compõe os primitivos).

**`assets/notes/SKILL.from-standalone.md`** — instruções originais para uso como Agent Skill.

---

## Como usar
1. Consumidores linkam **`styles.css`** e carregam React 18 + **`components/bundle.js`**.
2. Componentes ficam em `window.RetrieveDesignSystem_cd8a72`.
3. Para peças estáticas (slides, mocks), copie os ativos de `assets/` e use os tokens.

---

## Atualização — Manual de Identidade + Plano de Retomada V2

### Paleta oficial (manual)
- **Branco** `brand-white` #FEFEFE · C0 M0 Y0 K0
- **Vermelho** `brand-red` #E62F22 · C4 M100 Y100 K0 — energia, ação, crescimento.
- **Preto** `brand-black` #373435 · K100 — sofisticação, força, credibilidade.
- **Azul** `brand-navy` #102249 · C98 M98 Y49 K27 — apoio.
- Cores de aplicação vistas nas peças: `cover-red` (capas do manual), `cover-navy` (páginas azuis do manual) e `deck-navy` (fim do degradê preto → azul do deck e da capa padrão). Use-as só como fundo de capa/slide, com texto e logo em `white`.
- Texto branco sobre `brand-red` mede 4,34:1: só em 19px bold ou 24px+. Para texto pequeno sobre vermelho use `red-600` como fundo.

### Tipografia
- **Apfel Grotezk** (`--font-sans` / `--font-display`) é a tipografia da marca: títulos, wordmark, interfaces.
- **Poppins** (`--font-deck`, Google Fonts) aparece nos materiais comerciais: todo o deck *Plano de Retomada* (Bold/SemiBold em títulos, Regular/Light no texto) e os textos corridos do manual. Use `--font-deck` em slides e propostas comerciais; mantenha Apfel Grotezk em site, produto e peças de marca.

### Logos e padrão gráfico
- Use os arquivos de `assets/logos/` conforme `assets/logos/README.md`: principal, branco, símbolo, horizontal, capa preta, capa padrão (degradê preto → `deck-navy`), monocromático e variação azul.
- **Padrão de marca:** o símbolo repetido em diagonal, em vermelho mais escuro sobre `cover-red` (capa e contracapa do manual) ou branco sobre vermelho. Use só a partir do arquivo original do manual — não reconstrua.
- **Aplicações do manual:** polo preta com símbolo bordado em `brand-red`, caneca e cartão de visita pretos com logo vermelho + wordmark branco, adesivo em vidro jateado.

### Linguagem do deck comercial
- Fundos `#000` ou degradê preto → `deck-navy` (da esquerda para a direita); sem fundos claros.
- Títulos em Poppins Bold, **caixa-alta**, com a palavra-chave em `brand-red` (“PLANO DE **RETOMADA**”, “DE **DENTRO DO VAREJO**, PARA FORA.”).
- Listas com marcador quadrado `brand-red` + chevron branco. Ícones lineares grandes em vermelho escuro como ilustração de fundo.
- Fases do método em setas-chevron (**FASE 01 → 04**): a fase atual e as anteriores preenchidas em `brand-red`, as seguintes só com contorno.
- Números de prova sempre em destaque vermelho: “De R$ 220k para **R$ 680k em 2 meses**”.

### Posicionamento (deck V2)
- “Somos a única assessoria de marketing de moda com experiência do chão de loja.” Método baseado num dos maiores cases do varejo brasileiro, adaptado ao pequeno e médio lojista. Lucas Borges: 19 anos na Aramis como supervisor regional de lojas que faturavam R$ 200 milhões/ano.
- Especialistas em **varejo de moda** — segmentos: modinha, alto padrão, marca, popular.
- **Método O.D.C.R** com a pergunta de cada pilar: **Oferta** (a marca/produto é atrativo?), **Demanda** (as campanhas geram demanda qualificada?), **Conversão** (o canal de venda converte?), **Recompra** (o cliente volta?). Diagnóstico em matriz N1–N4 por pilar.
- **Funis:** Nível 1 — Loja física (Instagram/Facebook Ads → perfil → loja; remarketing + WhatsApp VIP). Nível 2 — Híbrido (multicanal → home → PDP → carrinho → checkout, com cashback e CRM para aumentar LTV e reduzir CAC).
- **Ciclo:** definição de oferta → planejamento de campanhas → geração de demanda → estruturação do canal de venda → recompra com CRM → relatórios e resultados.
- **Cases:** Ferrucci (indústria) de R$ 50 mil para R$ 300 mil/mês · Baggio (confecção) de R$ 40 mil para R$ 540 mil/mês · Fino Raro (private label) de R$ 100 mil para R$ 450 mil/mês.
- **Plano Loja:** R$ 2.497/mês (semestral), entrada em 15 dias. Próximos passos: pagamento → grupo no WhatsApp → briefing de entrada → call de start.
- Parceiros e palcos: ONDM, Joy Alano (parceira oficial), Provador Fashion ao vivo.

### Regras de uso
- Uma ação `color-primary` por tela; o resto em `secondary`/`outline`.
- Em fundos escuros use eyebrows em `red-400` e texto de apoio em `ink-400` ou mais claro.
- Status sempre com palavra (Badge), nunca só cor: `green-500` e `brand-red` diferem pouco em luminosidade.
- Foco: contorno sólido `color-focus-ring` de 2px (`border-thick`), afastado 2px.
