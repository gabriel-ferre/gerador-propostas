import Image from "next/image";

const LOGOS = {
  /** Símbolo vermelho + wordmark preto: fundos claros. */
  principal: { src: "/brand/retrieve-logo-primary.png", width: 954, height: 712 },
  /** Símbolo vermelho + wordmark branco: fundos escuros. */
  branco: { src: "/brand/retrieve-logo-white.png", width: 954, height: 712 },
  /** Só o símbolo vermelho. */
  simbolo: { src: "/brand/retrieve-logo-red.png", width: 753, height: 562 },
  /** Horizontal com wordmark branco: cabeçalhos e rodapés escuros. */
  horizontal: { src: "/brand/retrieve-logo-horizontal.png", width: 300, height: 100 },
} as const;

export type LogoVariant = keyof typeof LOGOS;

type LogoProps = {
  variant?: LogoVariant;
  /** Altura em pixels (a largura acompanha a proporção). */
  height?: number;
  alt?: string;
  priority?: boolean;
  className?: string;
};

/** Logo da Retrieve a partir dos PNGs oficiais em public/brand/. */
export function Logo({
  variant = "branco",
  height = 40,
  alt = "Retrieve",
  priority,
  className,
}: LogoProps) {
  const l = LOGOS[variant];
  return (
    <Image
      src={l.src}
      alt={alt}
      width={Math.round((l.width / l.height) * height)}
      height={height}
      priority={priority}
      className={className}
      style={{ height, width: "auto" }}
    />
  );
}
