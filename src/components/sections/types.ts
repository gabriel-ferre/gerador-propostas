import type {
  CaseItem,
  ClientLogoItem,
  FaqItem,
  PainItem,
  PlanInfo,
  ProposalInfo,
  SectionsContent,
  TestimonialItem,
} from "@/lib/proposal/types";

// Props de cada seção. As tarefas T11–T17 só trocam o miolo dos arquivos;
// se precisarem de mais dados, ampliam o tipo aqui e o getProps em index.ts.

export type HeroProps = { companyName: string; logos: ClientLogoItem[] };
export type DiagnosticoProps = {
  proposalId: string;
  slug: string;
  initialChannel: ProposalInfo["channel"];
  pains: PainItem[];
  highlightedPainIds: string[];
};
export type AutoridadeProps = { content: SectionsContent["autoridade"] };
export type MetodoProps = { content: SectionsContent["metodo"] };
export type EtapaOfertaProps = { content: SectionsContent["etapa_oferta"] };
export type EtapaDemandaProps = { content: SectionsContent["etapa_demanda"] };
export type EtapaConversaoProps = { content: SectionsContent["etapa_conversao"] };
export type EtapaRecompraProps = { content: SectionsContent["etapa_recompra"] };
export type CaseProps = { caseItem: CaseItem | null };
export type DepoimentosProps = { testimonials: TestimonialItem[] };
export type BeneficiosProps = { content: SectionsContent["beneficios"] };
export type AncoragemProps = { plan: PlanInfo | null };
export type InvestimentoProps = {
  plan: PlanInfo | null;
  priceOverride: ProposalInfo["priceOverride"];
};
// Sem nenhum dado de oferta: só o id da proposta. A oferta só chega por
// server action protegida por requireUser() (T16).
export type OfertaOcultaProps = { proposalId: string };
export type FaqProps = { faqs: FaqItem[] };
export type CtaProps = { content: SectionsContent["cta"] };
