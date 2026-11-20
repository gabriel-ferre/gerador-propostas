import type { InvestimentoProps } from "./types";
import { Provisional } from "./provisional";

export function Investimento({ plan, priceOverride }: InvestimentoProps) {
  return (
    <Provisional id="investimento" nome="Investimento">
      {plan ? `${plan.name} — ${(priceOverride ?? plan.paymentOptions).length} formas de pagamento${priceOverride ? " (preço ajustado)" : ""}` : "sem plano"}
    </Provisional>
  );
}
