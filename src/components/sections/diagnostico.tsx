import type { DiagnosticoProps } from "./types";
import { Provisional } from "./provisional";

export function Diagnostico({ pains, highlightedPainIds, initialChannel }: DiagnosticoProps) {
  return (
    <Provisional id="diagnostico" nome="Diagnóstico">
      {`${pains.length} dores, ${highlightedPainIds.length} destacadas (canal inicial: ${initialChannel})`}
    </Provisional>
  );
}
