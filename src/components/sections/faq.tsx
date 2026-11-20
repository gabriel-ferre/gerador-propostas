import type { FaqProps } from "./types";
import { Provisional } from "./provisional";

export function Faq({ faqs }: FaqProps) {
  return (
    <Provisional id="faq" nome="FAQ">
      {`${faqs.length} perguntas`}
    </Provisional>
  );
}
