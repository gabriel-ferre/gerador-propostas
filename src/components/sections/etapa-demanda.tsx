import type { EtapaDemandaProps } from "./types";
import { Provisional } from "./provisional";

export function EtapaDemanda({ content }: EtapaDemandaProps) {
  return (
    <Provisional id="etapa_demanda" nome="Etapa 2 — Demanda qualificada">
      {content ? `${content.titulo} — ${content.bullets.length} bullets, ${content.dashboards.length} dashboards` : "sem conteúdo"}
    </Provisional>
  );
}
