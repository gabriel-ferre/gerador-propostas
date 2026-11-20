// URL base pública das propostas (sem barra no final).
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://proposta.assessoriaretrieve.com.br"
).replace(/\/+$/, "");
