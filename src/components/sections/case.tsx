import type { CaseProps } from "./types";
import { Provisional } from "./provisional";

export function Case({ caseItem }: CaseProps) {
  return (
    <Provisional id="case" nome="Case de identificação">
      {caseItem ? `${caseItem.title} (${caseItem.niche}) — ${caseItem.resolved_pains.length} dores resolvidas` : "nenhum case escolhido"}
    </Provisional>
  );
}
