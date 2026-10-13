// Preços, oferta PRIMEIROS50, teste grátis e formas de pagamento vêm só do app (SPEC, seção 6).
// O site não guarda nenhum desses valores: o que mudar no app aparece aqui sem novo deploy do site.
export const CONFIG_PUBLICA_URL = "https://app.casadelidia.com.br/api/public/config";

export type PlanoId = "mensal" | "anual";

export type ConfigPublica = {
  /** Formas de pagamento aceitas, por exemplo "cartao_de_credito". */
  pagamento: string[];
  planos: {
    mensal: { preco: number; roteiros_por_mes: number };
    anual: {
      preco: number;
      /** Já vem com corte nos centavos, igual à tela do app. Mostrar como veio, sem recalcular. */
      equivale_por_mes: number;
      meses_gratis: number;
      roteiros_por_mes: number;
    };
  };
  primeiros50: {
    codigo: string;
    plano: PlanoId;
    preco: number;
    vagas_total: number;
    vagas_restantes: number;
    disponivel: boolean;
  };
  teste_gratis: { dias: number; roteiros: number; exige_cartao: boolean };
};

export async function buscarConfigPublica(signal?: AbortSignal): Promise<ConfigPublica> {
  const resposta = await fetch(CONFIG_PUBLICA_URL, { credentials: "omit", signal: signal ?? null });
  if (!resposta.ok) throw new Error(`Config pública: HTTP ${resposta.status}`);
  return conferir(await resposta.json());
}

// Confere o formato antes de mostrar: melhor cair no aviso de erro do que exibir "R$ NaN".
function conferir(dados: unknown): ConfigPublica {
  const c = dados as Partial<ConfigPublica> | null;
  const numeros = [
    c?.planos?.mensal?.preco,
    c?.planos?.mensal?.roteiros_por_mes,
    c?.planos?.anual?.preco,
    c?.planos?.anual?.equivale_por_mes,
    c?.planos?.anual?.meses_gratis,
    c?.planos?.anual?.roteiros_por_mes,
    c?.primeiros50?.preco,
    c?.primeiros50?.vagas_total,
    c?.primeiros50?.vagas_restantes,
    c?.teste_gratis?.dias,
    c?.teste_gratis?.roteiros,
  ];
  const booleanos = [c?.primeiros50?.disponivel, c?.teste_gratis?.exige_cartao];
  const ok =
    numeros.every((n) => typeof n === "number" && Number.isFinite(n)) &&
    booleanos.every((b) => typeof b === "boolean") &&
    Array.isArray(c?.pagamento);
  if (!ok) throw new Error("Config pública em formato inesperado");
  return c as ConfigPublica;
}

const reais = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });

/** 49.9 vira "R$ 49,90" (com espaço não separável depois do R$). */
export function formatarReais(valor: number): string {
  return reais.format(valor);
}
