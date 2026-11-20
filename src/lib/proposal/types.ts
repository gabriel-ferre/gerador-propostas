// Tipos da página pública da proposta. Sem código de servidor: pode ser
// importado por Client Components também.
import type { Tables } from "@/lib/database.types";
import type {
  Anchoring,
  PaymentOptions,
  SectionContent,
  SectionKey,
} from "@/lib/schemas";

export type Channel = "ecommerce" | "loja_fisica";

export type PainItem = Pick<Tables<"pains">, "id" | "channel" | "text" | "position">;
export type CaseItem = Pick<
  Tables<"cases">,
  "id" | "name" | "niche" | "title" | "body" | "resolved_pains" | "media_url" | "media_type"
>;
export type TestimonialItem = Pick<
  Tables<"testimonials">,
  "id" | "kind" | "image_url" | "caption" | "position"
>;
export type FaqItem = Pick<Tables<"faqs">, "id" | "question" | "answer" | "position">;
export type ClientLogoItem = Pick<
  Tables<"client_logos">,
  "id" | "name" | "image_url" | "position"
>;

export type ProposalInfo = {
  id: string;
  slug: string;
  companyName: string;
  channel: Channel;
  highlightedPainIds: string[];
  /** Preço ajustado na proposta; null = usar o preço padrão do plano. */
  priceOverride: PaymentOptions | null;
};

export type PlanInfo = {
  id: string;
  key: string;
  name: string;
  paymentOptions: PaymentOptions;
  anchoring: Anchoring;
};

/** Conteúdo de section_content por seção; null se ausente ou inválido. */
export type SectionsContent = { [K in SectionKey]: SectionContent<K> | null };

/**
 * Tudo que a página pública precisa. NUNCA contém a oferta oculta
 * (plan_offers): ela só chega ao navegador por server action (T16).
 */
export type ProposalPageData = {
  proposal: ProposalInfo;
  case: CaseItem | null;
  plan: PlanInfo | null;
  /** Dores dos dois canais, ordenadas por position. */
  pains: PainItem[];
  testimonials: TestimonialItem[];
  faqs: FaqItem[];
  logos: ClientLogoItem[];
  content: SectionsContent;
};
