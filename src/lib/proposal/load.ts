import "server-only";
import { cache } from "react";
import { createClient } from "@/lib/supabase/server";
import {
  anchoringSchema,
  paymentOptionsSchema,
  parseSectionContent,
  sectionContentSchemas,
  type SectionKey,
} from "@/lib/schemas";
import type {
  Channel,
  PlanInfo,
  ProposalPageData,
  SectionsContent,
} from "./types";

type RawProposal = {
  id: string;
  slug: string;
  company_name: string;
  channel: string;
  highlighted_pain_ids: string[] | null;
  price_override: unknown;
  case: ProposalPageData["case"];
  plan: {
    id: string;
    key: string;
    name: string;
    payment_options: unknown;
    anchoring: unknown;
  } | null;
};

function parsePlan(raw: RawProposal["plan"]): PlanInfo | null {
  if (!raw) return null;
  const options = paymentOptionsSchema.safeParse(raw.payment_options);
  const anchoring = anchoringSchema.safeParse(raw.anchoring);
  if (!options.success || !anchoring.success) {
    console.error("[proposal] plano com dados inválidos:", raw.key);
    return null;
  }
  return {
    id: raw.id,
    key: raw.key,
    name: raw.name,
    paymentOptions: options.data,
    anchoring: anchoring.data,
  };
}

function parseOverride(raw: unknown) {
  if (raw == null) return null;
  const parsed = paymentOptionsSchema.safeParse(raw);
  if (!parsed.success || parsed.data.length === 0) return null;
  return parsed.data;
}

const SECTION_KEYS = Object.keys(sectionContentSchemas) as SectionKey[];

function parseContent(rows: { key: string; content: unknown }[]): SectionsContent {
  const result = Object.fromEntries(
    SECTION_KEYS.map((key) => [key, null]),
  ) as SectionsContent;
  const byKey = new Map(rows.map((r) => [r.key, r.content]));
  for (const key of SECTION_KEYS) {
    if (!byKey.has(key)) continue;
    try {
      (result as Record<SectionKey, unknown>)[key] = parseSectionContent(
        key,
        byKey.get(key),
      );
    } catch (error) {
      // Conteúdo inválido não derruba a página: a seção recebe null.
      console.error(`[proposal] section_content "${key}" inválido:`, error);
    }
  }
  return result;
}

/**
 * Carrega a proposta publicada + conteúdo da biblioteca.
 * Devolve null se o slug não existe ou não está publicado.
 * Memoizada por requisição (get_proposal soma uma view a cada chamada;
 * generateMetadata e a página compartilham o mesmo resultado).
 */
export const loadProposalPage = cache(
  async (slug: string): Promise<ProposalPageData | null> => {
    const supabase = await createClient();

    const { data, error } = await supabase.rpc("get_proposal", { p_slug: slug });
    if (error) throw new Error(`get_proposal falhou: ${error.message}`);
    if (!data) return null;
    const raw = data as unknown as RawProposal;

    const [pains, testimonials, faqs, logos, sections] = await Promise.all([
      supabase.from("pains").select("id, channel, text, position").order("position"),
      supabase
        .from("testimonials")
        .select("id, kind, image_url, caption, position")
        .order("position"),
      supabase.from("faqs").select("id, question, answer, position").order("position"),
      supabase
        .from("client_logos")
        .select("id, name, image_url, position")
        .order("position"),
      supabase.from("section_content").select("key, content"),
    ]);

    for (const [nome, res] of Object.entries({ pains, testimonials, faqs, logos, sections })) {
      if (res.error) throw new Error(`Falha ao ler ${nome}: ${res.error.message}`);
    }

    return {
      proposal: {
        id: raw.id,
        slug: raw.slug,
        companyName: raw.company_name,
        channel: raw.channel === "loja_fisica" ? "loja_fisica" : ("ecommerce" as Channel),
        highlightedPainIds: raw.highlighted_pain_ids ?? [],
        priceOverride: parseOverride(raw.price_override),
      },
      case: raw.case ?? null,
      plan: parsePlan(raw.plan),
      pains: pains.data ?? [],
      testimonials: testimonials.data ?? [],
      faqs: faqs.data ?? [],
      logos: logos.data ?? [],
      content: parseContent(sections.data ?? []),
    };
  },
);

/** true se há usuário logado (modo apresentador). */
export async function isPresenter(): Promise<boolean> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return !!user;
}
