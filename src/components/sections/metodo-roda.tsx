import { cx } from "@/lib/theme";

export type MetodoPilar = { n: string; nome: string };

const C = 220; // centro do viewBox 440x440
const R_EXT = 190;
const R_INT = 104;
const GAP = 3; // graus entre segmentos

function ponto(grau: number, raio: number) {
  const a = (grau * Math.PI) / 180;
  return { x: C + raio * Math.sin(a), y: C - raio * Math.cos(a) };
}

function arco(de: number, ate: number, rExt: number, rInt: number) {
  const a = ponto(de, rExt);
  const b = ponto(ate, rExt);
  const c = ponto(ate, rInt);
  const d = ponto(de, rInt);
  return `M${a.x} ${a.y} A${rExt} ${rExt} 0 0 1 ${b.x} ${b.y} L${c.x} ${c.y} A${rInt} ${rInt} 0 0 0 ${d.x} ${d.y}Z`;
}

type RodaProps = {
  pilares: readonly MetodoPilar[];
  /** Texto do centro da roda. */
  centro: string;
  className?: string;
};

/** Roda ODCR: 4 segmentos fixos e legíveis; só o anel externo gira (lento, para com "reduzir movimento"). */
export function MetodoRoda({ pilares, centro, className }: RodaProps) {
  const orbita = ponto(0, 206);
  const fim = ponto(40, 206);

  return (
    <div className={cx("metodo-roda relative mx-auto aspect-square w-full max-w-[26rem] lg:max-w-[32rem]", className)}>
      <style>{`
        @keyframes metodo-giro { to { transform: rotate(360deg); } }
        .metodo-orbita { transform-origin: ${C}px ${C}px; animation: metodo-giro 48s linear infinite; }
        @media (prefers-reduced-motion: reduce) { .metodo-orbita { animation: none; } }
      `}</style>

      <svg viewBox="0 0 440 440" className="absolute inset-0 h-full w-full" aria-hidden="true">
        {/* Órbita girando: trilho tracejado + arco e ponto vermelhos */}
        <g className="metodo-orbita">
          <circle
            cx={C}
            cy={C}
            r={206}
            fill="none"
            stroke="var(--deck-line)"
            strokeWidth={1.5}
            strokeDasharray="2 8"
          />
          <path
            d={`M${orbita.x} ${orbita.y} A206 206 0 0 1 ${fim.x} ${fim.y}`}
            fill="none"
            stroke="var(--deck-accent)"
            strokeWidth={4}
            strokeLinecap="round"
          />
          <circle cx={fim.x} cy={fim.y} r={7} fill="var(--deck-accent)" />
        </g>

        {/* Segmentos fixos */}
        {pilares.map((_, i) => (
          <path
            key={i}
            d={arco(i * 90 + GAP / 2, (i + 1) * 90 - GAP / 2, R_EXT, R_INT)}
            fill="var(--deck-surface)"
            stroke="var(--deck-line)"
            strokeWidth={1}
          />
        ))}
      </svg>

      {/* Legendas por cima (HTML, não rotacionam) */}
      {pilares.map((p, i) => {
        const pos = ponto(45 + i * 90, (R_EXT + R_INT) / 2);
        return (
          <div
            key={p.n}
            className="absolute flex w-[22%] -translate-x-1/2 -translate-y-1/2 flex-col items-center text-center"
            style={{ left: `${(pos.x / 440) * 100}%`, top: `${(pos.y / 440) * 100}%` }}
          >
            <span className="font-mono text-sm font-bold text-[color:var(--deck-accent)] sm:text-lg">
              {p.n}
            </span>
            <span className="mt-0.5 text-[0.6rem] font-semibold uppercase leading-tight tracking-[0.08em] text-[color:var(--deck-fg)] sm:text-xs">
              {p.nome}
            </span>
          </div>
        );
      })}

      {/* Centro */}
      <div className="absolute left-1/2 top-1/2 flex w-[40%] -translate-x-1/2 -translate-y-1/2 items-center justify-center text-center">
        <p className="text-balance text-sm font-bold uppercase leading-tight text-[color:var(--deck-fg)] sm:text-lg lg:text-xl">
          {centro}
        </p>
      </div>
    </div>
  );
}
