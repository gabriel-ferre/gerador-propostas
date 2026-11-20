const brl = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });

/** 4500 -> "R$ 4.500,00" */
export function formatBRL(value: number): string {
  return brl.format(value).replace(/ /g, " ");
}
