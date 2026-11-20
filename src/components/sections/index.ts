import { createElement, type ComponentType, type ReactNode } from "react";
import type { ProposalPageData } from "@/lib/proposal/types";
import { Hero } from "./hero";
import { Diagnostico } from "./diagnostico";
import { Autoridade } from "./autoridade";
import { Metodo } from "./metodo";
import { EtapaOferta } from "./etapa-oferta";
import { EtapaDemanda } from "./etapa-demanda";
import { EtapaConversao } from "./etapa-conversao";
import { EtapaRecompra } from "./etapa-recompra";
import { Case } from "./case";
import { Depoimentos } from "./depoimentos";
import { Beneficios } from "./beneficios";
import { Ancoragem } from "./ancoragem";
import { Investimento } from "./investimento";
import { OfertaOculta } from "./oferta-oculta";
import { Faq } from "./faq";
import { Cta } from "./cta";

export type * from "./types";

export type SectionEntry = {
  key: string;
  render: (data: ProposalPageData) => ReactNode;
};

function entry<P extends object>(
  key: string,
  Component: ComponentType<P>,
  getProps: (data: ProposalPageData) => P,
): SectionEntry {
  return { key, render: (data) => createElement(Component, getProps(data)) };
}

// Ordem fixa da proposta (SPEC seção 5).
export const sections: SectionEntry[] = [
  entry("hero", Hero, (d) => ({
    companyName: d.proposal.companyName,
    logos: d.logos,
  })),
  entry("diagnostico", Diagnostico, (d) => ({
    proposalId: d.proposal.id,
    slug: d.proposal.slug,
    initialChannel: d.proposal.channel,
    pains: d.pains,
    highlightedPainIds: d.proposal.highlightedPainIds,
  })),
  entry("autoridade", Autoridade, (d) => ({ content: d.content.autoridade })),
  entry("metodo", Metodo, (d) => ({ content: d.content.metodo })),
  entry("etapa_oferta", EtapaOferta, (d) => ({ content: d.content.etapa_oferta })),
  entry("etapa_demanda", EtapaDemanda, (d) => ({ content: d.content.etapa_demanda })),
  entry("etapa_conversao", EtapaConversao, (d) => ({
    content: d.content.etapa_conversao,
  })),
  entry("etapa_recompra", EtapaRecompra, (d) => ({
    content: d.content.etapa_recompra,
  })),
  entry("case", Case, (d) => ({ caseItem: d.case })),
  entry("depoimentos", Depoimentos, (d) => ({ testimonials: d.testimonials })),
  entry("beneficios", Beneficios, (d) => ({ content: d.content.beneficios })),
  entry("ancoragem", Ancoragem, (d) => ({ plan: d.plan })),
  entry("investimento", Investimento, (d) => ({
    plan: d.plan,
    priceOverride: d.proposal.priceOverride,
  })),
  entry("oferta_oculta", OfertaOculta, (d) => ({ proposalId: d.proposal.id })),
  entry("faq", Faq, (d) => ({ faqs: d.faqs })),
  entry("cta", Cta, (d) => ({ content: d.content.cta })),
];
