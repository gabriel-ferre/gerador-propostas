/** Desenho do funil da Retrieve em SVG (cores via variáveis do deck). */

const ETAPAS = [
  { nome: "Anúncio", sub: "Atrai quem tem intenção", topo: 400, base: 316 },
  { nome: "Perfil / Home", sub: "Prova e primeira impressão", topo: 316, base: 232 },
  { nome: "Loja / PDP", sub: "Oferta e decisão", topo: 232, base: 148 },
  { nome: "Compra", sub: "Venda fechada", topo: 148, base: 100 },
];
const ALTURA = 78;
const GAP = 8;

export function EtapaDemandaFunil({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 470"
      role="img"
      aria-label="Funil da Retrieve: anúncio, perfil ou home, loja ou página de produto e compra, com remarketing e WhatsApp VIP trazendo quem não comprou de volta"
      className={className}
    >
      {ETAPAS.map((e, i) => {
        const y = i * (ALTURA + GAP);
        const l1 = (400 - e.topo) / 2;
        const r1 = l1 + e.topo;
        const l2 = (400 - e.base) / 2;
        const r2 = l2 + e.base;
        const ultima = i === ETAPAS.length - 1;
        const opac = [0.45, 0.62, 0.8, 1][i];
        return (
          <g key={e.nome}>
            <polygon
              points={`${l1},${y} ${r1},${y} ${r2},${y + ALTURA} ${l2},${y + ALTURA}`}
              style={{ fill: "var(--deck-accent)", fillOpacity: opac }}
            />
            <text x="200" y={y + 36} textAnchor="middle" fontSize={ultima ? 17 : 20} fontWeight="700" style={{ fill: "#fefefe", textTransform: "uppercase" }}>
              {e.nome}
            </text>
            {!ultima && (
              <text x="200" y={y + 58} textAnchor="middle" fontSize="13" style={{ fill: "#fefefe", fillOpacity: 0.85 }}>
                {e.sub}
              </text>
            )}
          </g>
        );
      })}

      {/* Remarketing: laço que devolve quem saiu para a loja */}
      <path
        d="M 120 396 H 40 Q 14 396 14 370 V 232 Q 14 208 40 208 H 56"
        fill="none"
        strokeWidth="2.5"
        strokeDasharray="6 6"
        style={{ stroke: "var(--deck-accent)" }}
      />
      <path d="M 52 200 L 66 208 L 52 216 Z" style={{ fill: "var(--deck-accent)" }} />

      <g>
        <rect x="60" y="360" width="280" height="86" rx="14" style={{ fill: "var(--deck-surface)", stroke: "var(--deck-line)" }} />
        <text x="200" y="391" textAnchor="middle" fontSize="16" fontWeight="700" style={{ fill: "var(--deck-fg)", letterSpacing: "0.12em" }}>
          REMARKETING
        </text>
        <text x="200" y="414" textAnchor="middle" fontSize="13" style={{ fill: "var(--deck-muted)" }}>
          Quem não comprou volta para a loja
        </text>
        <text x="200" y="434" textAnchor="middle" fontSize="13" fontWeight="700" style={{ fill: "var(--deck-accent)" }}>
          + WhatsApp VIP
        </text>
      </g>
      <path d="M 200 346 V 358" strokeWidth="2.5" style={{ stroke: "var(--deck-accent)" }} />
    </svg>
  );
}
