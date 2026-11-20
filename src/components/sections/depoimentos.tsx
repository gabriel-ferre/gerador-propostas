import type { DepoimentosProps } from "./types";
import { Provisional } from "./provisional";

export function Depoimentos({ testimonials }: DepoimentosProps) {
  return (
    <Provisional id="depoimentos" nome="Depoimentos">
      {`${testimonials.length} depoimentos`}
    </Provisional>
  );
}
