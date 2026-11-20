import type { ClientLogoItem } from "@/lib/proposal/types";

type HeroLogosProps = { logos: ClientLogoItem[] };

// Faixa de logos em loop infinito, só com CSS. A lista é repetida até
// cobrir a largura da tela e duplicada para o loop fechar sem emenda.
// Com "reduzir movimento", a animação para e a faixa vira uma grade estática.
const CSS = `
@keyframes hero-logos-scroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }
.hero-logos-track { animation: hero-logos-scroll var(--hero-logos-duration, 40s) linear infinite; }
.hero-logos:hover .hero-logos-track { animation-play-state: paused; }
@media (prefers-reduced-motion: reduce) {
  .hero-logos-track { animation: none; flex-wrap: wrap; justify-content: center; width: auto; row-gap: 1.5rem; }
  .hero-logos-track .hero-logos-dup { display: none; }
  .hero-logos { mask-image: none; -webkit-mask-image: none; }
}
`;

export function HeroLogos({ logos }: HeroLogosProps) {
  const valid = logos.filter((l) => l.image_url);
  if (valid.length === 0) return null;

  // Garante pelo menos ~10 itens por metade para cobrir telas largas.
  const repeat = Math.max(1, Math.ceil(10 / valid.length));
  const half = Array.from({ length: repeat }, () => valid).flat();
  const duration = Math.max(24, half.length * 4);

  const renderHalf = (hidden: boolean) =>
    half.map((logo, i) => (
      <li
        key={`${logo.id}-${i}`}
        aria-hidden={hidden || undefined}
        className={`flex h-10 shrink-0 items-center px-6 sm:h-12 sm:px-10${hidden ? " hero-logos-dup" : ""}`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={logo.image_url}
          alt={hidden ? "" : logo.name}
          loading="lazy"
          className="h-full w-auto max-w-[9rem] object-contain opacity-70 brightness-0 invert sm:max-w-[11rem]"
        />
      </li>
    ));

  return (
    <div
      className="hero-logos relative overflow-hidden"
      style={{
        maskImage: "linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent)",
        WebkitMaskImage: "linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent)",
      }}
    >
      <style>{CSS}</style>
      <ul
        className="hero-logos-track flex w-max items-center"
        style={{ ["--hero-logos-duration" as string]: `${duration}s` }}
      >
        {renderHalf(false)}
        {renderHalf(true)}
      </ul>
    </div>
  );
}
