"use client";

import { useState, type ReactNode } from "react";

type SafeImgProps = {
  src: string;
  alt: string;
  className?: string;
  /** Mostrado quando não há src ou a imagem falha ao carregar. */
  fallback: ReactNode;
};

/** Imagem que nunca aparece quebrada: cai no placeholder se faltar ou falhar. */
export function SafeImg({ src, alt, className, fallback }: SafeImgProps) {
  const [failed, setFailed] = useState(false);
  if (!src || failed) return <>{fallback}</>;
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      loading="lazy"
      className={className}
      onError={() => setFailed(true)}
    />
  );
}
