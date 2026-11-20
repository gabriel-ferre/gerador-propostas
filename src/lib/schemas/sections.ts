import { z } from "zod";

const texto = z.string();
const url = z.string();
const bullets = z.array(z.string());
// Listas de mídia: vazias no seed; ainda sem formato definido para os itens.
const midias = z.array(z.string());
const livre = z.array(z.unknown());

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
  marcacoes: livre,
});

export const etapaRecompraSchema = z.object({
  titulo: texto,
  texto,
  bullets,
  plataformas: livre,
  exemplos: livre,
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
