"use client";

import { useState } from "react";
import {
  BulletList,
  CtaButton,
  DeckPage,
  DeckTitle,
  Eyebrow,
  Logo,
  PainCard,
  ProofNumber,
  Section,
  type PainCardState,
} from "@/components/ui-retrieve";
import { SECTION_VARIANTS } from "@/lib/theme";

// Dados de exemplo só desta vitrine.
const DORES = [
  { titulo: "Faturamento imprevisível", texto: "Um mês bom, dois meses ruins, sem saber o motivo." },
  { titulo: "Cliente compra uma vez", texto: "A base não volta e o CAC só sobe." },
  { titulo: "Tráfego sem qualificação", texto: "Cliques que não viram venda." },
  { titulo: "Loja cheia, caixa vazio", texto: "Movimento que não vira margem." },
  { titulo: "Equipe sem processo", texto: "Cada vendedor atende de um jeito." },
  { titulo: "Decisão no achismo", texto: "Sem dados para priorizar." },
];

const ITENS = [
  "Oferta construída a partir do produto e da marca",
  "Campanhas que trazem o público que compra",
  "Canal de venda medido da visita ao pagamento",
  "Recompra com CRM, cashback e WhatsApp",
];

export function Vitrine() {
  const [selecionada, setSelecionada] = useState<number | null>(1);

  const estado = (i: number): PainCardState =>
    selecionada === null ? "normal" : selecionada === i ? "destacado" : "esmaecido";

  return (
    <DeckPage>
      <Section variant="navy" glow>
        <Logo variant="horizontal" height={36} priority />
        <div className="mt-12 flex max-w-3xl flex-col gap-6">
          <Eyebrow>12 meses em 12 semanas</Eyebrow>
          <DeckTitle
            as="h1"
            size="hero"
            text="Como vamos tornar o faturamento da Loja Exemplo previsível"
            highlight="previsível"
          />
          <p className="max-w-xl text-base font-light leading-relaxed text-[color:var(--deck-muted)] md:text-lg">
            Texto de apoio de exemplo. Construímos a jornada do seu cliente, da compra à recompra.
          </p>
          <div>
            <CtaButton href="https://wa.me/5500000000000">Quero meu diagnóstico</CtaButton>
          </div>
        </div>
      </Section>

      {SECTION_VARIANTS.map((v) => (
        <Section key={v} variant={v} glow={v === "preto"} id={`variante-${v}`}>
          <p className="mb-8 text-xs uppercase tracking-widest text-[color:var(--deck-muted)]">
            Fundo: {v}
          </p>
          <div className="grid gap-12 lg:grid-cols-2">
            <div className="flex flex-col gap-6">
              <Eyebrow>Etapa 01</Eyebrow>
              <DeckTitle text="Oferta irresistível para o seu varejo" highlight="irresistível" />
              <BulletList items={ITENS} />
            </div>
            <div className="grid grid-cols-2 content-start gap-8">
              <ProofNumber value="+200" label="marcas de moda atendidas" />
              <ProofNumber value="10x" label="retorno sobre o investimento" />
              <ProofNumber
                className="col-span-2"
                size="grande"
                value="R$ 680 mil"
                label="faturamento mensal após 2 meses"
              />
            </div>
          </div>
          <div className="mt-12 flex flex-wrap gap-4">
            <CtaButton onClick={() => {}}>Vamos começar</CtaButton>
          </div>
        </Section>
      ))}

      <Section variant="preto" id="dores">
        <div className="mb-8 flex flex-col gap-4">
          <Eyebrow>Diagnóstico</Eyebrow>
          <DeckTitle text="Qual dessas dores é a sua?" highlight="dores" />
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
          {DORES.map((d, i) => (
            <PainCard
              key={d.titulo}
              title={d.titulo}
              description={d.texto}
              state={estado(i)}
              onSelect={() => setSelecionada(selecionada === i ? null : i)}
            />
          ))}
        </div>
        <p className="mt-6 text-sm text-[color:var(--deck-muted)]">
          Clique para destacar; clique de novo para limpar. Estados: normal, destacado, esmaecido.
        </p>
      </Section>

      <Section variant="branco" width="estreito">
        <Logo variant="principal" height={64} />
        <div className="mt-8 flex flex-col gap-4">
          <Eyebrow>Fundo claro</Eyebrow>
          <DeckTitle text="Isso é o que vale" highlight="vale" />
          <BulletList items={ITENS.slice(0, 2)} />
        </div>
      </Section>
    </DeckPage>
  );
}
