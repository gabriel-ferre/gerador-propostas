import { z } from "zod";

// Mensagens padrão do zod em português do Brasil (as nossas mensagens
// personalizadas continuam valendo; isto cobre os erros genéricos).
z.config(z.locales.ptBR());

/** "Padaria São João" -> "padaria-sao-joao" */
export function slugify(texto: string): string {
  return texto
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Igual ao check da tabela proposals no banco. */
export const RESERVED_SLUGS = [
  "admin",
  "login",
  "logout",
  "api",
  "dev",
  "_next",
  "auth",
] as const;

export const slugSchema = z
  .string({ error: "Informe o endereço da proposta." })
  .min(1, "Informe o endereço da proposta.")
  .regex(
    /^[a-z0-9]+(-[a-z0-9]+)*$/,
    "Use só letras minúsculas, números e hífens (ex.: padaria-sao-joao).",
  )
  .refine((s) => !(RESERVED_SLUGS as readonly string[]).includes(s), {
    message: "Este endereço é reservado pelo sistema. Escolha outro.",
  });
