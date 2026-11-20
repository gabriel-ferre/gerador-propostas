import { z } from "zod";

const texto = z.string();
const url = z.string();
const bullets = z.array(z.string());
// Listas de mídia: vazias no seed; ainda sem formato definido para os itens.
const midias = z.array(z.string());

export const autoridadeSchema = z.object({
  titulo: texto,
  texto,
  foto_principal: url,
  fotos: midias,
  numeros: z.array(z.object({ valor: z.string(), rotulo: z.string() })),
});

export const metodoSchema = z.object({ titulo: texto, texto });

export const etapaOfertaSchema = z.object({
  titulo: texto,
  texto,
  bullets,
  criativos: midias,
});

export const etapaDemandaSchema = z.object({
  titulo: texto,
  texto,
  bullets,
  funil_url: url,
  dashboards: midias,
});

export const etapaConversaoSchema = z.object({
  titulo: texto,
  texto,
  bullets,
  home_url: url,
  /** Alterações numeradas sobre a foto da home; x/y em % da imagem. */
  marcacoes: z.array(
    z.object({
      x: z.number().min(0).max(100),
      y: z.number().min(0).max(100),
      texto: z.string(),
    }),
  ),
  /** Print da ferramenta Retrieve SPY (parte "WhatsApp"); opcional. */
  spy_print_url: url.default(""),
  /** Título e texto da parte "otimizações em e-commerce"; opcionais. */
  home_titulo: texto.default(""),
  home_texto: texto.default(""),
});

export const etapaRecompraSchema = z.object({
  titulo: texto,
  texto,
  bullets,
  /** Plataformas parceiras; sem logo_url aparece só o nome. */
  plataformas: z.array(
    z.object({ nome: z.string(), logo_url: z.string().default("") }),
  ),
  /** Mocks de e-mail (assunto + parágrafos) e de WhatsApp (balões). */
  exemplos: z.array(
    z.object({
      canal: z.enum(["email", "whatsapp"]),
      titulo: z.string().default(""),
      assunto: z.string().default(""),
      mensagens: z.array(z.string()),
    }),
  ),
});

export const beneficiosSchema = z.object({
  titulo: texto,
  itens: z.array(z.string()),
  pergunta: texto,
});

export const ctaSchema = z.object({
  titulo: texto,
  texto,
  botao: texto,
  whatsapp_url: url,
});

export const sectionContentSchemas = {
  autoridade: autoridadeSchema,
  metodo: metodoSchema,
  etapa_oferta: etapaOfertaSchema,
  etapa_demanda: etapaDemandaSchema,
  etapa_conversao: etapaConversaoSchema,
  etapa_recompra: etapaRecompraSchema,
  beneficios: beneficiosSchema,
  cta: ctaSchema,
} as const;

export type SectionKey = keyof typeof sectionContentSchemas;
export type SectionContent<K extends SectionKey> = z.infer<
  (typeof sectionContentSchemas)[K]
>;

export function parseSectionContent<K extends SectionKey>(
  key: K,
  content: unknown,
): SectionContent<K> {
  return sectionContentSchemas[key].parse(content) as SectionContent<K>;
}
