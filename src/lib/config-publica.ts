// Preços, Plano Fundador, teste grátis e formas de pagamento vêm só do app (SPEC, seção 6).
// O site não guarda nenhum desses valores: o que mudar no app aparece aqui sem novo deploy do site.
export const CONFIG_PUBLICA_URL = "https://app.casadelidia.com.br/api/public/config";

export type PlanoId = "essencial" | "crescendo" | "rede";

/** Um dos 3 planos (SPEC v3.2). Os preços já vêm no de Fundador quando ele está aberto. */
export type Plano = {
  id: PlanoId;
  nome: string;
  mensal: number;
  anual: number;
  /** Já vem com corte nos centavos, igual à tela do app. Mostrar como veio, sem recalcular. */
  anual_equivale_por_mes: number;
  meses_gratis: number;
  /** Preço regular, para riscar quando o de Fundador está valendo. */
  mensal_regular: number;
  anual_regular: number;
  fundador: boolean;
  roteiros_por_mes: number;
  roteiros_ilimitados: boolean;
  usuarios: number;
  usuarios_ilimitados: boolean;
  celulas: number;
  celulas_ilimitadas: boolean;
};

export type ConfigPublica = {
  /** Formas de pagamento aceitas, por exemplo "cartao_de_credito". */
  pagamento: string[];
  planos_v3: Plano[];
  /** Plano Fundador: preço reduzido para quem assinar até `ate` (AAAA-MM-DD), travado enquanto a assinatura durar. */
  fundador: { disponivel: boolean; ate: string };
  teste_gratis: { dias: number; roteiros: number; usuarios: number; exige_cartao: boolean };
};

export async function buscarConfigPublica(signal?: AbortSignal): Promise<ConfigPublica> {
  const resposta = await fetch(CONFIG_PUBLICA_URL, { credentials: "omit", signal: signal ?? null });
  if (!resposta.ok) throw new Error(`Config pública: HTTP ${resposta.status}`);
  return conferir(await resposta.json());
}

const numero = (n: unknown) => typeof n === "number" && Number.isFinite(n);
const booleano = (b: unknown) => typeof b === "boolean";

// Confere o formato antes de mostrar: melhor cair no aviso de erro do que exibir "R$ NaN".
function conferir(dados: unknown): ConfigPublica {
  const c = dados as Partial<ConfigPublica> | null;
  const planos = c?.planos_v3;
  const planosOk =
    Array.isArray(planos) &&
    planos.length > 0 &&
    planos.every(
      (p) =>
        typeof p?.id === "string" &&
        typeof p?.nome === "string" &&
        [
          p.mensal,
          p.anual,
          p.anual_equivale_por_mes,
          p.meses_gratis,
          p.mensal_regular,
          p.anual_regular,
          p.roteiros_por_mes,
          p.usuarios,
          p.celulas,
        ].every(numero) &&
        [p.fundador, p.roteiros_ilimitados, p.usuarios_ilimitados, p.celulas_ilimitadas].every(
          booleano,
        ),
    );
  const ok =
    planosOk &&
    booleano(c?.fundador?.disponivel) &&
    typeof c?.fundador?.ate === "string" &&
    [c?.teste_gratis?.dias, c?.teste_gratis?.roteiros, c?.teste_gratis?.usuarios].every(numero) &&
    booleano(c?.teste_gratis?.exige_cartao) &&
    Array.isArray(c?.pagamento);
  if (!ok) throw new Error("Config pública em formato inesperado");
  return c as ConfigPublica;
}

const reais = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });

/** 49.9 vira "R$ 49,90" (com espaço não separável depois do R$). */
export function formatarReais(valor: number): string {
  return reais.format(valor);
}

/** "2026-12-31" vira "31/12/2026". */
export function formatarData(iso: string): string {
  const [ano, mes, dia] = iso.split("-");
  return dia && mes && ano ? `${dia}/${mes}/${ano}` : iso;
}

/** Dias de hoje (no relógio de quem vê) até a data "AAAA-MM-DD": 0 no próprio dia, null se já passou. */
export function diasAte(iso: string): number | null {
  const [ano, mes, dia] = iso.split("-").map(Number);
  if (!ano || !mes || !dia) return null;
  const hoje = new Date();
  const dias = Math.round(
    (Date.UTC(ano, mes - 1, dia) - Date.UTC(hoje.getFullYear(), hoje.getMonth(), hoje.getDate())) /
      86_400_000,
  );
  return dias >= 0 ? dias : null;
}
