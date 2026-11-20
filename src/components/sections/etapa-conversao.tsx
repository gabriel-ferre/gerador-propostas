import type { ReactNode } from "react";
import { BulletList, DeckTitle, Eyebrow, Section } from "@/components/ui-retrieve";
import { deck } from "@/lib/theme";
import type { EtapaConversaoProps } from "./types";
import { SafeImg } from "./etapa-conversao-safe-img";

/** Placeholder do print da Retrieve SPY: mock de painel + conversa. */
function SpyPlaceholder() {
  return (
    <div
      aria-hidden
      className="flex aspect-[4/3] w-full flex-col gap-3 bg-[color:var(--ink-900)] p-4 sm:p-6"
    >
      <div className="flex items-center gap-2">
        <span className="size-2.5 rounded-full bg-[color:var(--red-500)]" />
        <span className="h-2 w-24 rounded bg-[color:var(--ink-700)]" />
      </div>
      <div className="grid flex-1 grid-cols-3 gap-3">
        {[0, 1, 2].map((i) => (
          <div key={i} className="rounded-lg bg-[color:var(--ink-800)] p-3">
            <div className="h-2 w-2/3 rounded bg-[color:var(--ink-600)]" />
            <div className="mt-3 h-5 w-1/2 rounded bg-[color:var(--red-500)]/80" />
          </div>
        ))}
      </div>
      <div className="space-y-2">
        <div className="h-2.5 w-3/4 rounded bg-[color:var(--ink-700)]" />
        <div className="h-2.5 w-1/2 rounded bg-[color:var(--ink-700)]" />
      </div>
    </div>
  );
}

function HomePlaceholder() {
  return (
    <div
      aria-hidden
      className="flex aspect-[10/7] w-full flex-col bg-[color:var(--ink-900)]"
    >
      <div className="h-[12%] border-b border-[color:var(--ink-700)]" />
      <div className="m-4 flex-1 rounded-lg bg-[color:var(--ink-800)]" />
    </div>
  );
}

function BrowserFrame({ children, label }: { children: ReactNode; label: string }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-[color:var(--deck-line)] shadow-2xl shadow-black/40">
      <div
        aria-hidden
        className="flex items-center gap-1.5 bg-[color:var(--ink-800)] px-4 py-3"
      >
        <span className="size-2.5 rounded-full bg-[color:var(--ink-600)]" />
        <span className="size-2.5 rounded-full bg-[color:var(--ink-600)]" />
        <span className="size-2.5 rounded-full bg-[color:var(--ink-600)]" />
        <span className="ml-3 h-4 flex-1 rounded bg-[color:var(--ink-700)] text-[0.6rem] leading-4 text-[color:var(--ink-300)]">
          <span className="px-2">{label}</span>
        </span>
      </div>
      {children}
    </div>
  );
}

export function EtapaConversao({ content }: EtapaConversaoProps) {
  if (!content) return null;
  const { titulo, texto, bullets, home_url, marcacoes, spy_print_url, home_titulo, home_texto } =
    content;

  return (
    <Section id="etapa_conversao" variant="preto" glow aria-label={titulo}>
      <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
        <div>
          <Eyebrow>Etapa 3 · Conversão</Eyebrow>
          <DeckTitle text={titulo} className="mt-4" />
          <p className={`${deck.body} mt-6`}>{texto}</p>
          {bullets.length > 0 && <BulletList items={bullets} className="mt-8" />}
        </div>
        <BrowserFrame label="Retrieve SPY">
          <SafeImg
            src={spy_print_url}
            alt="Print da ferramenta Retrieve SPY"
            className="block h-auto w-full"
            fallback={<SpyPlaceholder />}
          />
        </BrowserFrame>
      </div>

      <div className="mt-20 md:mt-28">
        {(home_titulo || home_texto) && (
          <div className="mb-10 max-w-3xl">
            {home_titulo && <DeckTitle text={home_titulo} as="h3" size="card" />}
            {home_texto && <p className={`${deck.body} mt-3`}>{home_texto}</p>}
          </div>
        )}
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.7fr)_minmax(0,1fr)] lg:gap-12">
          <BrowserFrame label="home do e-commerce">
            <div className="relative">
              <SafeImg
                src={home_url}
                alt="Home do e-commerce com as alterações realizadas numeradas"
                className="block h-auto w-full"
                fallback={<HomePlaceholder />}
              />
              {marcacoes.map((m, i) => (
                <span
                  key={i}
                  aria-hidden
                  style={{ left: `${m.x}%`, top: `${m.y}%` }}
                  className="absolute flex size-7 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[color:var(--red-500)] text-xs font-bold text-white shadow-lg ring-2 ring-white sm:size-9 sm:text-sm"
                >
                  {i + 1}
                </span>
              ))}
            </div>
          </BrowserFrame>
          {marcacoes.length > 0 && (
            <ol className="space-y-4 self-center" aria-label="Alterações realizadas">
              {marcacoes.map((m, i) => (
                <li key={i} className="flex gap-4">
                  <span
                    aria-hidden
                    className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[color:var(--red-500)] text-sm font-bold text-white"
                  >
                    {i + 1}
                  </span>
                  <span className="pt-1 text-base leading-snug text-[color:var(--deck-fg)] md:text-lg">
                    {m.texto}
                  </span>
                </li>
              ))}
            </ol>
          )}
        </div>
      </div>
    </Section>
  );
}
