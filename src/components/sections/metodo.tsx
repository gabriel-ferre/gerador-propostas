import type { MetodoProps } from "./types";
import { Provisional } from "./provisional";

export function Metodo({ content }: MetodoProps) {
  return (
    <Provisional id="metodo" nome="Método">
      {content ? content.titulo : "sem conteúdo"}
    </Provisional>
  );
}
