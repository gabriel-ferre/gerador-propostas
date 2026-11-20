import type { ReactNode } from "react";
import { cx } from "@/lib/theme";

type CtaButtonProps = {
  children: ReactNode;
  /** Com href vira link (ex.: WhatsApp); sem href vira botão. */
  href?: string;
  onClick?: () => void;
  className?: string;
};

const BASE =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-pill bg-brand-red px-8 py-3 " +
  "text-[1.2rem] font-bold text-white shadow-brand-red transition-all duration-200 ease-brand " +
  "hover:-translate-y-px hover:bg-red-600 active:translate-y-0 active:bg-red-700 " +
  "motion-reduce:transition-none motion-reduce:hover:translate-y-0";

/** Botão pílula vermelho (a ação principal da tela). */
export function CtaButton({ children, href, onClick, className }: CtaButtonProps) {
  if (href) {
    const externo = /^https?:\/\//.test(href);
    return (
      <a
        href={href}
        className={cx(BASE, className)}
        {...(externo ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {children}
      </a>
    );
  }
  return (
    <button type="button" onClick={onClick} className={cx(BASE, className)}>
      {children}
    </button>
  );
}
