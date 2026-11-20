import type { HeroProps } from "./types";
import { Provisional } from "./provisional";

export function Hero({ companyName, logos }: HeroProps) {
  return (
    <Provisional id="hero" nome="Hero">
      {`Como vamos tornar o faturamento da ${companyName} previsível — ${logos.length} logos`}
    </Provisional>
  );
}
