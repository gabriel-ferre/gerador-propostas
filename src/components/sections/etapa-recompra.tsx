import type { EtapaRecompraProps } from "./types";
import { Provisional } from "./provisional";

export function EtapaRecompra({ content }: EtapaRecompraProps) {
  return (
    <Provisional id="etapa_recompra" nome="Etapa 4 — Recompra sistemática">
      {content ? `${content.titulo} — ${content.plataformas.length} plataformas, ${content.exemplos.length} exemplos` : "sem conteúdo"}
    </Provisional>
  );
}
