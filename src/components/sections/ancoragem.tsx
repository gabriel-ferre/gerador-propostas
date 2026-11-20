import type { AncoragemProps } from "./types";
import { Provisional } from "./provisional";

export function Ancoragem({ plan }: AncoragemProps) {
  return (
    <Provisional id="ancoragem" nome="Ancoragem de valor">
      {plan ? `${plan.name} — ${plan.anchoring.profissionais.length} profissionais, ${plan.anchoring.entregas.length} entregas` : "sem plano"}
    </Provisional>
  );
}
