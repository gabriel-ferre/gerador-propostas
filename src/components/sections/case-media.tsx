type CaseMediaProps = { url: string; type: string | null; title: string };

/** Mídia do depoimento do case: vídeo com controles (sem autoplay) ou imagem. */
export function CaseMedia({ url, type, title }: CaseMediaProps) {
  const frame =
    "w-full overflow-hidden rounded-2xl border border-[color:var(--deck-line)] bg-[color:var(--deck-surface)] shadow-brand-red";

  if (type === "video") {
    return (
      <div className={frame}>
        <video
          src={url}
          controls
          playsInline
          preload="metadata"
          aria-label={`Vídeo: ${title}`}
          className="block aspect-video w-full bg-black object-contain"
        />
      </div>
    );
  }

  return (
    <div className={frame}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={url} alt={title} loading="lazy" className="block h-auto w-full" />
    </div>
  );
}
