import { z } from "zod";
import { slugSchema } from "./common";
import { paymentOptionsSchema } from "./plan";

export const proposalFormSchema = z
  .object({
    company_name: z
      .string({ error: "Informe o nome da empresa." })
      .trim()
      .min(1, "Informe o nome da empresa."),
    slug: slugSchema,
    channel: z.enum(["ecommerce", "loja_fisica"], {
      error: "Escolha o canal da proposta.",
    }),
    highlighted_pain_ids: z.array(z.uuid("Dor inválida.")),
    case_id: z.uuid("Escolha um case válido.").nullish(),
    plan_id: z.uuid("Escolha um plano válido.").nullish(),
    price_override: paymentOptionsSchema.nullish(),
    status: z.enum(["rascunho", "publicada", "arquivada"], {
      error: "Status inválido.",
    }),
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
