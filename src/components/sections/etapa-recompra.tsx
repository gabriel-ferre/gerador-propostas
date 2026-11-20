import { BulletList, DeckTitle, Eyebrow, Section } from "@/components/ui-retrieve";
import { deck } from "@/lib/theme";
import type { EtapaRecompraProps } from "./types";
import { SafeImg } from "./etapa-conversao-safe-img";

type Conteudo = NonNullable<EtapaRecompraProps["content"]>;
type Plataforma = Conteudo["plataformas"][number];
type Exemplo = Conteudo["exemplos"][number];

function PlataformaChip({ p }: { p: Plataforma }) {
  const nome = (
    <span className="text-lg font-semibold tracking-tight text-[color:var(--deck-fg)] sm:text-xl">
      {p.nome}
    </span>
  );
  return (
    <li className="flex h-20 min-w-[9rem] flex-1 items-center justify-center rounded-2xl border border-[color:var(--deck-line)] bg-[color:var(--deck-surface)] px-6 sm:h-24">
      <SafeImg
        src={p.logo_url}
        alt={p.nome}
        className="max-h-10 w-auto max-w-full object-contain sm:max-h-12"
        fallback={nome}
      />
    </li>
  );
}

function EmailMock({ ex }: { ex: Exemplo }) {
  return (
    <article className="overflow-hidden rounded-2xl bg-[color:var(--brand-white)] text-[color:var(--ink-900)] shadow-2xl shadow-black/40">
      <header className="border-b border-[color:var(--ink-200)] px-5 py-4">
        <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-[color:var(--ink-500)]">
          E-mail
        </p>
        <p className="mt-1 text-base font-semibold leading-snug">
          {ex.assunto || ex.titulo || "Assunto do e-mail"}
        </p>
      </header>
      <div className="space-y-3 px-5 py-5 text-sm leading-relaxed text-[color:var(--ink-700)] sm:text-base">
        {ex.mensagens.map((m, i) => (
          <p key={i}>{m}</p>
        ))}
        <span
          aria-hidden
          className="mt-2 inline-block rounded-lg bg-[color:var(--red-500)] px-5 py-2.5 text-sm font-semibold text-white"
        >
          Ver oferta
        </span>
      </div>
    </article>
  );
}

function WhatsappMock({ ex }: { ex: Exemplo }) {
  return (
    <article className="overflow-hidden rounded-2xl bg-[color:var(--ink-900)] shadow-2xl shadow-black/40 ring-1 ring-[color:var(--deck-line)]">
      <header className="flex items-center gap-3 bg-[color:var(--ink-800)] px-4 py-3">
        <span
          aria-hidden
          className="flex size-8 items-center justify-center rounded-full bg-[color:var(--red-500)] text-xs font-bold text-white"
        >
          R
        </span>
        <p className="text-sm font-semibold text-[color:var(--brand-white)]">
          {ex.titulo || "WhatsApp"}
        </p>
      </header>
      <div className="space-y-2 px-4 py-5">
        {ex.mensagens.map((m, i) => (
          <p
            key={i}
            className="max-w-[88%] rounded-2xl rounded-tl-sm bg-[color:var(--ink-700)] px-4 py-2.5 text-sm leading-snug text-[color:var(--brand-white)] sm:text-base"
          >
            {m}
          </p>
        ))}
      </div>
    </article>
  );
}

export function EtapaRecompra({ content }: EtapaRecompraProps) {
  if (!content) return null;
  const { titulo, texto, bullets, plataformas, exemplos } = content;

  return (
    <Section id="etapa_recompra" variant="navy" glow aria-label={titulo}>
      <div className="max-w-3xl">
        <Eyebrow>Etapa 4 · Recompra</Eyebrow>
        <DeckTitle text={titulo} className="mt-4" />
        <p className={`${deck.body} mt-6`}>{texto}</p>
        {bullets.length > 0 && <BulletList items={bullets} className="mt-8" />}
      </div>

      {plataformas.length > 0 && (
        <div className="mt-14 md:mt-20">
          <Eyebrow>Plataformas parceiras</Eyebrow>
          <ul className="mt-5 flex flex-wrap gap-3 sm:gap-4">
            {plataformas.map((p, i) => (
              <PlataformaChip key={`${i}-${p.nome}`} p={p} />
            ))}
          </ul>
        </div>
      )}

      {exemplos.length > 0 && (
        <div className="mt-14 md:mt-20">
          <Eyebrow>Exemplos de disparos</Eyebrow>
          <div className="mt-6 grid gap-6 md:grid-cols-2 lg:gap-8">
            {exemplos.map((ex, i) =>
              ex.canal === "email" ? (
                <EmailMock key={i} ex={ex} />
              ) : (
                <WhatsappMock key={i} ex={ex} />
              ),
            )}
          </div>
        </div>
      )}
    </Section>
  );
}
