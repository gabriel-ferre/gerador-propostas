import { DeckTitle, Eyebrow, Section } from "@/components/ui-retrieve";
import { formatBRL } from "./ancoragem-format";
import type { InvestimentoProps } from "./types";

const ROTULO = { avista: "À vista", cartao: "Cartão", boleto: "Boleto" } as const;
const MESES = 6; // plano semestral

export function Investimento({ plan, priceOverride }: InvestimentoProps) {
  if (!plan) return null;
  const opcoes = priceOverride && priceOverride.length > 0 ? priceOverride : plan.paymentOptions;
  if (opcoes.length === 0) return null;

  const { profissionais, entregas } = plan.anchoring;
  const totalMensal =
    profissionais.reduce((s, p) => s + p.custo_mensal, 0) + entregas.reduce((s, e) => s + e.valor, 0);
  const ancorado = totalMensal * MESES;
  const avista = opcoes.find((o) => o.forma === "avista");
  const economia = avista && ancorado > avista.valor ? ancorado - avista.valor : 0;
  const destaque = avista ?? opcoes[0];

  return (
    <Section id="investimento" variant="branco" aria-label="Investimento">
      <Eyebrow>Investimento</Eyebrow>
      <DeckTitle text={`Plano semestral · ${plan.name}`} highlight="semestral" className="mt-4" />
      <div
        className={`mt-10 grid gap-5 ${opcoes.length >= 3 ? "lg:grid-cols-3" : opcoes.length === 2 ? "lg:grid-cols-2" : ""}`}
      >
        {opcoes.map((o) => {
          const feat = o === destaque;
          return (
            <div
              key={o.forma}
              className={
                feat
                  ? "relative flex flex-col rounded-3xl border-[1.5px] border-[#0b0b0f] bg-[#0b0b0f] p-8 text-white"
                  : "relative flex flex-col rounded-3xl border-[1.5px] border-black/15 p-8"
              }
            >
              {feat && (
                <span className="absolute right-6 top-5 rounded-full bg-[color:var(--deck-accent)] px-3 py-1.5 text-[0.6875rem] font-bold uppercase tracking-[0.12em] text-white">
                  Melhor valor
                </span>
              )}
              <span
                className={`text-sm font-bold uppercase tracking-[0.12em] ${feat ? "text-white/60" : "text-black/50"}`}
              >
                {ROTULO[o.forma]}
              </span>
              <p className="mt-4 text-4xl font-bold tracking-tight tabular-nums sm:text-5xl">
                {formatBRL(o.valor)}
              </p>
              <p className={`mt-2 text-sm sm:text-base ${feat ? "text-white/70" : "text-black/60"}`}>
                {o.descricao}
              </p>
            </div>
          );
        })}
      </div>
      {economia > 0 && (
        <p className="mt-8 text-lg font-light sm:text-xl">
          Contratando à parte seriam {formatBRL(ancorado)} em {MESES} meses. Aqui você economiza{" "}
          <strong className="font-bold text-[color:var(--deck-accent)]">{formatBRL(economia)}</strong>.
        </p>
      )}
    </Section>
  );
}
