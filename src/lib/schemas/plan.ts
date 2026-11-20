import { z } from "zod";

export const paymentOptionSchema = z.object({
  forma: z.enum(["avista", "cartao", "boleto"], {
    error: "Forma de pagamento inválida.",
  }),
  descricao: z.string().min(1, "Informe a descrição."),
  valor: z.number({ error: "Informe um valor." }).nonnegative("O valor não pode ser negativo."),
});

export const paymentOptionsSchema = z.array(paymentOptionSchema);

export const anchoringSchema = z.object({
  profissionais: z.array(
    z.object({
      cargo: z.string().min(1, "Informe o cargo."),
      custo_mensal: z.number({ error: "Informe um valor." }).nonnegative("O custo não pode ser negativo."),
    }),
  ),
  entregas: z.array(
    z.object({
      item: z.string().min(1, "Informe o item."),
      valor: z.number({ error: "Informe um valor." }).nonnegative("O valor não pode ser negativo."),
    }),
  ),
});

export type PaymentOption = z.infer<typeof paymentOptionSchema>;
export type PaymentOptions = z.infer<typeof paymentOptionsSchema>;
export type Anchoring = z.infer<typeof anchoringSchema>;
