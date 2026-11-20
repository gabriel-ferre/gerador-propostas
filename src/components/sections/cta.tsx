import { CtaButton, DeckTitle, Eyebrow, Logo, Section } from "@/components/ui-retrieve";
import type { CtaProps } from "./types";

// O conteúdo do CTA (schema) não tem passos; usamos os do slide "Próximos passos" do design system.
const PASSOS = [
  { t: "Realizar pagamento", d: "Condição definida no plano escolhido." },
  { t: "Grupo no WhatsApp", d: "Canal direto com o time Retrieve." },
  { t: "Briefing de entrada", d: "Mapeamento de cenário e metas." },
  { t: "Call de start", d: "Kickoff e início das 12 semanas." },
];

/** Texto legível do link (wa.me/5511... -> +55 11 ...), sem inventar formatação. */
function rotuloLink(url: string) {
  const m = url.match(/wa\.me\/(\d{10,15})/);
  return m ? `wa.me/${m[1]}` : url.replace(/^https?:\/\//, "");
}

/** Seção 15: fechamento no estilo do slide "Próximos passos". */
export function Cta({ content }: CtaProps) {
  if (!content) return null;

  return (
    <Section id="cta" variant="preto" glow aria-label="Próximos passos">
      <Eyebrow>Próximos passos</Eyebrow>
      <DeckTitle
        text={content.titulo}
        size="hero"
        className="mt-4 max-w-[20ch]"
      />

      <ol className="mt-12 grid gap-8 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4 lg:gap-5">
        {PASSOS.map((p, i) => (
          <li key={p.t} className="border-t-2 border-brand-red pt-5">
            <span className="font-mono text-sm font-bold text-brand-red">
              {String(i + 1).padStart(2, "0")}
            </span>
            <p className="mt-3 text-2xl leading-tight font-bold text-white">{p.t}</p>
            <p className="mt-2 text-sm leading-relaxed text-ink-400">{p.d}</p>
          </li>
        ))}
      </ol>

      <div className="mt-14 max-w-2xl lg:mt-20">
        <p className="text-lg leading-relaxed text-ink-300 sm:text-xl">{content.texto}</p>
        <div className="mt-8 flex flex-col items-start gap-4">
          <CtaButton href={content.whatsapp_url} className="w-full sm:w-auto">
            {content.botao} <span aria-hidden>→</span>
          </CtaButton>
          <p className="text-sm text-ink-400">
            Ou copie o link:{" "}
            <span className="font-mono text-ink-200 select-all break-all">
              {rotuloLink(content.whatsapp_url)}
            </span>
          </p>
        </div>
      </div>

      <footer className="mt-16 flex items-center justify-between gap-4 border-t border-white/10 pt-8 lg:mt-24">
        <Logo variant="branco" height={40} />
        <p className="text-xs text-ink-500">© Retrieve</p>
      </footer>
    </Section>
  );
}
