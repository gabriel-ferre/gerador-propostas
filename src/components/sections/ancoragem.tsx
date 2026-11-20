import { DeckTitle, Eyebrow, Section } from "@/components/ui-retrieve";
import { formatBRL } from "./ancoragem-format";
import type { AncoragemProps } from "./types";

type Linha = { nome: string; valor: number; sufixo?: string };

function Lista({ titulo, linhas }: { titulo: string; linhas: Linha[] }) {
  if (linhas.length === 0) return null;
  return (
    <div>
      <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-[color:var(--deck-muted)]">
        {titulo}
      </h3>
      <ul className="mt-4 divide-y divide-white/10 border-y border-white/10">
        {linhas.map((l, i) => (
          <li key={`${l.nome}-${i}`} className="flex items-baseline justify-between gap-4 py-3.5">
            <span className="text-base font-light sm:text-lg">{l.nome}</span>
            <span className="shrink-0 text-base font-semibold tabular-nums sm:text-lg">
              {formatBRL(l.valor)}
              {l.sufixo && (
                <small className="ml-1 text-xs font-light text-[color:var(--deck-muted)]">{l.sufixo}</small>
              )}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Ancoragem({ plan }: AncoragemProps) {
  if (!plan) return null;
  const { profissionais, entregas } = plan.anchoring;
  if (profissionais.length === 0 && entregas.length === 0) return null;

  const total =
    profissionais.reduce((s, p) => s + p.custo_mensal, 0) + entregas.reduce((s, e) => s + e.valor, 0);

  return (
    <Section id="ancoragem" variant="navy" aria-label="Ancoragem de valor">
      <Eyebrow>Ancoragem de valor</Eyebrow>
      <DeckTitle text="Isso é o que vale" highlight="vale" className="mt-4" />
      <div className="mt-10 grid gap-10 lg:grid-cols-2 lg:gap-16">
        <Lista
          titulo="Profissionais alocados"
          linhas={profissionais.map((p) => ({ nome: p.cargo, valor: p.custo_mensal, sufixo: "/mês" }))}
        />
        <Lista
          titulo="Entregas mensais"
          linhas={entregas.map((e) => ({ nome: e.item, valor: e.valor, sufixo: "/mês" }))}
        />
      </div>
      <div className="mt-12 rounded-2xl border border-[color:var(--deck-accent)]/60 bg-white/5 p-6 sm:p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[color:var(--deck-muted)]">
          O que você gastaria contratando à parte
        </p>
        <p className="mt-3 text-4xl font-bold leading-none tracking-tight text-[color:var(--deck-accent)] sm:text-6xl">
          {formatBRL(total)}
          <small className="ml-2 text-lg font-light text-[color:var(--deck-muted)]">/mês</small>
        </p>
      </div>
    </Section>
  );
}
