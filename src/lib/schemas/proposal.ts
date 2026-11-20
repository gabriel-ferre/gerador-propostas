import { z } from "zod";
import { slugSchema } from "./common";
import { paymentOptionsSchema } from "./plan";

export const channelSchema = z.enum(["ecommerce", "loja_fisica"], {
  error: "Escolha o canal da proposta.",
});
export type Channel = z.infer<typeof channelSchema>;

export const proposalStatusSchema = z.enum(["rascunho", "publicada", "arquivada"], {
  error: "Status inválido.",
});
export type ProposalStatus = z.infer<typeof proposalStatusSchema>;

// Rótulos de interface. Record<...> obriga a ter um rótulo para cada valor do schema.
export const CHANNEL_LABELS: Record<Channel, string> = {
  ecommerce: "E-commerce",
  loja_fisica: "Loja física",
};
export const PROPOSAL_STATUS_LABELS: Record<ProposalStatus, string> = {
  rascunho: "Rascunho",
  publicada: "Publicada",
  arquivada: "Arquivada",
};

export const proposalFormSchema = z
  .object({
    company_name: z
      .string({ error: "Informe o nome da empresa." })
      .trim()
      .min(1, "Informe o nome da empresa."),
    slug: slugSchema,
    channel: channelSchema,
    highlighted_pain_ids: z.array(z.uuid("Dor inválida.")),
    case_id: z.uuid("Escolha um case válido.").nullish(),
    plan_id: z.uuid("Escolha um plano válido.").nullish(),
    price_override: paymentOptionsSchema.nullish(),
    status: proposalStatusSchema,
  })
  .superRefine((data, ctx) => {
    if (data.status !== "publicada") return;
    if (!data.case_id) {
      ctx.addIssue({
        code: "custom",
        path: ["case_id"],
        message: "Escolha um case para publicar a proposta.",
      });
    }
    if (!data.plan_id) {
      ctx.addIssue({
        code: "custom",
        path: ["plan_id"],
        message: "Escolha um plano para publicar a proposta.",
      });
    }
  });

export type ProposalFormValues = z.infer<typeof proposalFormSchema>;
