import { cx } from "@/lib/theme";

type BulletListProps = {
  items: string[];
  className?: string;
};

/** Lista com marcador quadrado vermelho (padrão do deck). */
export function BulletList({ items, className }: BulletListProps) {
  return (
    <ul className={cx("space-y-3 sm:space-y-4", className)}>
      {items.map((item, i) => (
        <li
          key={`${i}-${item}`}
          className="deck-bullet flex gap-4 text-base leading-relaxed text-[color:var(--deck-fg)] md:text-lg"
        >
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
