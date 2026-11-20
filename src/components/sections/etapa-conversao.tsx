import type { EtapaConversaoProps } from "./types";
import { Provisional } from "./provisional";

export function EtapaConversao({ content }: EtapaConversaoProps) {
  return (
    <Provisional id="etapa_conversao" nome="Etapa 3 — Conversão otimizada">
      {content ? `${content.titulo} — ${content.bullets.length} bullets, ${content.marcacoes.length} marcações` : "sem conteúdo"}
    </Provisional>
  );
}
