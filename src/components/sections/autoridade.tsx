import type { AutoridadeProps } from "./types";
import { Provisional } from "./provisional";

export function Autoridade({ content }: AutoridadeProps) {
  return (
    <Provisional id="autoridade" nome="Autoridade">
      {content ? `${content.titulo} — ${content.numeros.length} números, ${content.fotos.length} fotos` : "sem conteúdo"}
    </Provisional>
  );
}
