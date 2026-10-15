import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Switch } from "@/components/ui/switch";
import { Skeleton } from "@/components/ui/skeleton";
import { LegalDialog } from "@/components/legal/legal-dialog";
import { DemoVideo } from "@/components/demo-video";
import { COMPANY_CNPJ, COMPANY_NAME, COMPANY_REGION, CONTACT_EMAIL, SITE_URL } from "@/lib/site";
import { formatarReais, type ConfigPublica, type PlanoId } from "@/lib/config-publica";
import { useConfigPublica } from "@/hooks/use-config-publica";
import logo from "@/assets/casadelidia-retangular-header.png";
import printPasso1 from "@/assets/como-funciona-1.webp";
import printPasso2 from "@/assets/como-funciona-2.webp";
import printPasso3 from "@/assets/como-funciona-3.webp";

// Preços ocultos por enquanto: o site mostra só o teste grátis. Mude para true para reexibir.
// Os valores da seção vêm do app (/api/public/config), nunca do código do site.
const SHOW_PRICING = true;

const REGISTER_URL = "https://app.casadelidia.com.br/auth/register";
const LOGIN_URL = "https://app.casadelidia.com.br";
// Abrem a modal de Termos/Política (LegalDialog).
const TERMS_URL = "#termos";
const PRIVACY_URL = "#privacidade";

// Prévia do link no WhatsApp e nas redes: as URLs precisam ser absolutas.
// A imagem (public/og.jpg, 1200x630, JPEG leve para o WhatsApp mostrar) foi gerada a partir da logo e do roteiro-mockup.
const HOME_URL = `${SITE_URL}/`;
const OG_IMAGE = `${SITE_URL}/og.jpg`;
const OG_IMAGE_ALT =
  "Casa de Lídia: do culto de domingo ao roteiro da célula em 1 minuto, com um roteiro pronto ao lado";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Casa de Lídia — do culto de domingo ao roteiro da célula" },
      {
        name: "description",
        content:
          "O culto de domingo vira um roteiro pronto para a reunião de célula, com quebra-gelo, perguntas e aplicação, no modelo e com a logo da sua igreja. Teste grátis de 30 dias.",
      },
      {
        property: "og:title",
        content: "Casa de Lídia — do culto de domingo ao roteiro da célula",
      },
      {
        property: "og:description",
        content:
          "O culto de domingo vira um roteiro pronto para a célula, no modelo da sua igreja, editável e exportável em Word e PDF.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: HOME_URL },
      { property: "og:site_name", content: "Casa de Lídia" },
      { property: "og:locale", content: "pt_BR" },
      { property: "og:image", content: OG_IMAGE },
      { property: "og:image:type", content: "image/jpeg" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: OG_IMAGE_ALT },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: OG_IMAGE },
      { name: "twitter:image:alt", content: OG_IMAGE_ALT },
    ],
    links: [{ rel: "canonical", href: HOME_URL }],
  }),
  component: Landing,
});

function PrimaryButton({
  href,
  children,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <a
      href={href}
      className={`inline-flex items-center justify-center whitespace-nowrap rounded-full bg-accent px-7 py-3.5 text-base font-semibold text-accent-foreground shadow-[var(--shadow-soft)] transition-transform duration-200 hover:-translate-y-0.5 hover:brightness-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${className}`}
    >
      {children}
    </a>
  );
}

function Section({
  id,
  children,
  className = "",
}: {
  id?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`px-5 py-16 sm:px-8 md:py-24 ${className}`}>
      <div className="mx-auto w-full max-w-6xl">{children}</div>
    </section>
  );
}

// Prints do app no celular (780x1200), um por passo.
const steps = [
  {
    n: "1",
    title: "Escolha o culto",
    text: "O culto de domingo aparece sozinho no app quando termina no canal da igreja. É só tocar nele.",
    img: printPasso1,
    alt: "Tela Novo roteiro do app com os últimos cultos do canal",
  },
  {
    n: "2",
    title: "A IA escreve o roteiro",
    text: "O roteiro sai do que foi pregado, no modelo da sua igreja e com a logo dela.",
    img: printPasso2,
    alt: "Roteiro gerado pela IA no celular, com a logo da igreja",
  },
  {
    n: "3",
    title: "Revise e envie",
    text: "Ajuste o que quiser, baixe em Word ou PDF e mande para os líderes pelo WhatsApp.",
    img: printPasso3,
    alt: "Janela Enviar aos líderes com o botão Abrir no WhatsApp",
  },
];

const features = [
  {
    title: "Funciona sem legenda",
    text: "Se o vídeo do culto não tem legenda, a transcrição é feita automaticamente.",
  },
  {
    title: "Também a partir do esboço",
    text: "Sem vídeo? Envie o esboço do sermão e o roteiro é gerado do mesmo jeito.",
  },
  {
    title: "Modelos personalizáveis",
    text: "Você define as seções do roteiro do jeito que a sua igreja usa.",
  },
  {
    title: "Editor com refazer por parte",
    text: "Ajuste o texto e peça para refazer só um trecho do roteiro.",
  },
  {
    title: "Exportação em Word",
    text: "Baixe em .docx e compartilhe com a liderança.",
  },
  {
    title: "Aviso por e-mail",
    text: "Você recebe um e-mail quando o culto de domingo já pode virar roteiro.",
  },
];

// Preços: todos os números e condições vêm de useConfigPublica(). Nada de valor fixo aqui.
const NOME_DO_PLANO: Record<PlanoId, string> = { mensal: "Mensal", anual: "Anual" };
const PERIODO_DO_PLANO: Record<PlanoId, string> = { mensal: "/mês", anual: "/ano" };
const NOME_DA_FORMA_DE_PAGAMENTO: Record<string, string> = {
  cartao_de_credito: "cartão de crédito",
};

function plural(n: number, um: string, varios: string) {
  return `${n} ${n === 1 ? um : varios}`;
}

function frasePagamento(formas: string[]) {
  if (formas.length === 0) return null;
  const nomes = formas.map((f) => NOME_DA_FORMA_DE_PAGAMENTO[f] ?? f.replaceAll("_", " "));
  const lista =
    nomes.length < 2 ? nomes.join("") : `${nomes.slice(0, -1).join(", ")} ou ${nomes.at(-1)}`;
  const soCartao = formas.every((f) => f === "cartao_de_credito");
  return `Pagamento com ${lista}${soCartao ? ", com renovação automática" : ""}.`;
}

function fraseTeste(teste: ConfigPublica["teste_gratis"]) {
  const dias = plural(teste.dias, "dia", "dias");
  const roteiros = plural(teste.roteiros, "roteiro", "roteiros");
  return `Todo plano começa com ${dias} de teste grátis e ${roteiros}${teste.exige_cartao ? "" : ", sem cartão"}.`;
}

function OfertaDeLancamento({ oferta }: { oferta: ConfigPublica["primeiros50"] }) {
  const plano = NOME_DO_PLANO[oferta.plano] ?? oferta.plano;
  const periodo = PERIODO_DO_PLANO[oferta.plano] ?? "";
  const restam = oferta.vagas_restantes === 1 ? "Resta" : "Restam";

  return (
    <>
      <p className="mt-5 inline-flex flex-wrap items-center justify-center gap-x-2 gap-y-1 rounded-3xl bg-gold px-5 py-2 text-sm font-semibold text-gold-foreground">
        Oferta de lançamento: {formatarReais(oferta.preco)}
        {periodo} no plano {plano}, com preço travado enquanto a assinatura estiver ativa
        <span>
          <span className="hidden sm:inline">· </span>
          {restam} {oferta.vagas_restantes} de {oferta.vagas_total} vagas
        </span>
      </p>
      <p className="mt-2 text-sm text-muted-foreground">
        O desconto entra sozinho no checkout do plano {plano}, sem cupom para digitar.
      </p>
    </>
  );
}

function PricingCard({
  config,
  erro,
  tentarDeNovo,
}: {
  config: ConfigPublica | undefined;
  erro: boolean;
  tentarDeNovo: () => void;
}) {
  const [annual, setAnnual] = useState(false);

  let corpo: React.ReactNode;
  if (config) {
    const { mensal, anual } = config.planos;
    const id: PlanoId = annual ? "anual" : "mensal";
    corpo = (
      <>
        <label className="flex cursor-pointer items-center justify-center gap-3 text-sm font-semibold">
          <Switch checked={annual} onCheckedChange={setAnnual} />
          Ativar desconto do plano anual
        </label>

        <div className="mt-7 flex flex-wrap items-center justify-center gap-2">
          <h3 className="text-xl">Plano {NOME_DO_PLANO[id]}</h3>
          {annual && anual.meses_gratis > 0 ? (
            <span className="rounded-full bg-gold px-2.5 py-0.5 text-xs font-semibold text-gold-foreground">
              {plural(anual.meses_gratis, "mês grátis", "meses grátis")}
            </span>
          ) : null}
        </div>
        <p className="mt-3 font-display text-4xl font-semibold sm:text-5xl">
          {formatarReais(annual ? anual.preco : mensal.preco)}
          <span className="font-sans text-base font-medium text-muted-foreground">
            {PERIODO_DO_PLANO[id]}
          </span>
        </p>
        <p className="mt-3 min-h-10 text-sm text-muted-foreground">
          {annual
            ? `Cobrado uma vez por ano. Equivale a ${formatarReais(anual.equivale_por_mes)} por mês.`
            : "Cobrado todo mês. Cancele quando quiser."}
        </p>
      </>
    );
  } else if (erro) {
    corpo = (
      <p className="text-sm text-muted-foreground">
        Não deu para carregar os preços agora.{" "}
        <button
          type="button"
          onClick={tentarDeNovo}
          className="font-semibold text-foreground underline underline-offset-4 hover:text-accent-foreground/80"
        >
          Tentar de novo
        </button>
      </p>
    );
  } else {
    corpo = (
      <div role="status">
        <span className="sr-only">Carregando preços…</span>
        <Skeleton aria-hidden="true" className="mx-auto h-6 w-56 max-w-full" />
        <Skeleton aria-hidden="true" className="mx-auto mt-7 h-7 w-36" />
        <Skeleton aria-hidden="true" className="mx-auto mt-3 h-12 w-48 max-w-full" />
        <Skeleton aria-hidden="true" className="mx-auto mt-3 h-10 w-full" />
      </div>
    );
  }

  return (
    <div className="surface-card mx-auto mt-10 flex max-w-md flex-col p-8 text-center">
      {corpo}

      <PrimaryButton href={REGISTER_URL} className="mt-6 w-full">
        Começar teste grátis
      </PrimaryButton>
    </div>
  );
}

function Precos() {
  const { data: config, isError, refetch } = useConfigPublica();
  // Se uma nova busca falhar depois de já ter dados, continua mostrando os dados.
  const carregando = !config && !isError;
  const pagamento = config ? frasePagamento(config.pagamento) : null;

  return (
    <div aria-busy={carregando}>
      <div className="text-center">
        <p className="eyebrow">Preços</p>
        <h2 className="mt-3 text-3xl leading-tight sm:text-4xl">
          {config
            ? `Um plano só, com ${plural(config.planos.mensal.roteiros_por_mes, "roteiro", "roteiros")} por mês`
            : "Um plano só"}
        </h2>
        {carregando ? (
          <Skeleton aria-hidden="true" className="mx-auto mt-5 h-6 w-80 max-w-full" />
        ) : null}
        {pagamento ? <p className="mt-4 text-lg text-muted-foreground">{pagamento}</p> : null}
        {config?.primeiros50.disponivel ? <OfertaDeLancamento oferta={config.primeiros50} /> : null}
      </div>

      <PricingCard config={config} erro={isError && !config} tentarDeNovo={() => void refetch()} />

      {config ? (
        <p className="mt-6 text-center text-sm text-muted-foreground">
          {fraseTeste(config.teste_gratis)}
        </p>
      ) : null}
    </div>
  );
}

const faqs = [
  {
    q: "Precisa ter legenda no vídeo do YouTube?",
    a: "Não. Quando o vídeo não tem legenda, a transcrição é feita automaticamente.",
  },
  {
    q: "A IA muda a mensagem da pregação?",
    a: "O roteiro sai do que foi pregado no seu culto. E você revisa e edita tudo antes de mandar para os líderes.",
  },
  {
    q: "Serve para qualquer denominação?",
    a: "Sim. O roteiro segue a sua pregação e os modelos são definidos por você, então ele acompanha a linguagem e a prática da sua igreja.",
  },
  {
    q: "Posso usar o esboço em vez do vídeo?",
    a: "Pode. É só enviar o esboço do sermão e o roteiro é gerado sem vídeo nenhum.",
  },
  {
    q: "Como faço o pagamento?",
    a: "No cartão de crédito, com renovação automática. Você pode cancelar quando quiser e mantém o acesso até o fim do período pago.",
  },
  {
    q: "O que acontece quando o teste acaba?",
    a: "O teste grátis dura 30 dias e inclui 5 roteiros. Ao fim, você decide se quer assinar para continuar. Nada é cobrado automaticamente sem a sua escolha.",
  },
  {
    q: "Meus dados estão seguros?",
    a: "Sim. Tratamos os seus dados conforme a LGPD e você pode solicitar a exclusão a qualquer momento.",
  },
];

function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-50 border-b border-border/60 bg-background/85 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-3 px-5 py-3.5 sm:px-8">
          <a href="#topo" className="flex shrink-0 items-center">
            <img
              src={logo}
              width={447}
              height={120}
              alt="Casa de Lídia"
              className="h-9 w-auto sm:h-10"
            />
          </a>

          <nav
            aria-label="Navegação principal"
            className="hidden items-center gap-7 text-sm font-medium md:flex"
          >
            <a href="#como-funciona" className="hover:text-accent-foreground/80">
              Como funciona
            </a>
            {SHOW_PRICING ? (
              <a href="#precos" className="hover:text-accent-foreground/80">
                Preços
              </a>
            ) : null}
            <a href="#duvidas" className="hover:text-accent-foreground/80">
              Dúvidas
            </a>
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href={LOGIN_URL}
              className="rounded-full px-3 py-2 text-sm font-semibold hover:bg-muted"
            >
              Entrar
            </a>
            <a
              href={REGISTER_URL}
              className="rounded-full bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground transition hover:brightness-105"
            >
              Teste grátis
            </a>
          </div>
        </div>
      </header>

      <main id="topo">
        {/* Abertura */}
        <Section className="pt-12 md:pt-20">
          {/* Coluna do texto um pouco mais larga para o botão e o "30 dias grátis..." caberem lado a lado */}
          <div className="grid items-center gap-12 md:grid-cols-[1.15fr_1fr] md:gap-14">
            <div>
              <p className="eyebrow">Para líderes de célula</p>
              <h1 className="mt-4 text-4xl leading-[1.08] sm:text-5xl md:text-6xl">
                Do culto de domingo ao roteiro da célula em 1 minuto
              </h1>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">
                O culto de domingo aparece sozinho no app (ou você cola o link do YouTube) e vira um
                roteiro pronto para a reunião da semana: quebra-gelo, leitura bíblica, perguntas e
                aplicação — tudo a partir do que foi pregado na sua igreja.
              </p>
              {/* Sem espaço para os dois lado a lado, o texto desce inteiro para a linha de baixo */}
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-4">
                <PrimaryButton href={REGISTER_URL}>Começar teste grátis</PrimaryButton>
                <span className="whitespace-nowrap text-sm text-muted-foreground">
                  30 dias grátis · 5 roteiros · sem cartão obrigatório
                </span>
              </div>
            </div>

            {/* O celular navegando até o roteiro pronto: o pôster e o último quadro são o próprio roteiro */}
            <div className="relative">
              <div
                aria-hidden="true"
                className="absolute -inset-4 -z-10 rounded-[2.5rem] bg-accent/15 blur-2xl"
              />
              <DemoVideo />
            </div>
          </div>
        </Section>

        {/* O problema */}
        <Section className="bg-primary text-primary-foreground">
          <div className="grid gap-8 md:grid-cols-2 md:gap-14">
            <h2 className="text-3xl leading-tight sm:text-4xl">
              Toda semana a mesma corrida contra o relógio
            </h2>
            <div className="space-y-4 text-lg leading-relaxed text-primary-foreground/85">
              <p>
                Você passa horas montando o roteiro da célula: escolhe o texto, pensa nas perguntas,
                escreve a aplicação — geralmente na véspera da reunião.
              </p>
              <p>
                E quando recorre a um material pronto da internet, ele não conversa com o que a
                igreja ouviu no domingo. A célula acaba puxando para um lado e o púlpito para outro.
              </p>
            </div>
          </div>
        </Section>

        {/* Como funciona */}
        <Section id="como-funciona">
          <p className="eyebrow">Como funciona</p>
          <h2 className="mt-3 max-w-2xl text-3xl leading-tight sm:text-4xl">
            Três passos, do vídeo ao arquivo no grupo dos líderes
          </h2>
          <ol className="mt-10 grid gap-5 md:grid-cols-3">
            {steps.map((s) => (
              <li key={s.n} className="surface-card flex flex-col p-7">
                <span className="flex size-11 items-center justify-center rounded-full bg-gold font-display text-xl font-semibold text-gold-foreground">
                  {s.n}
                </span>
                <h3 className="mt-5 text-xl">{s.title}</h3>
                {/* mb-6 garante o respiro quando o mt-auto do print (que alinha os três no md) é zero */}
                <p className="mt-2 mb-6 leading-relaxed text-muted-foreground">{s.text}</p>
                <img
                  src={s.img}
                  alt={s.alt}
                  width={780}
                  height={1200}
                  loading="lazy"
                  decoding="async"
                  className="mx-auto mt-auto w-full max-w-[260px] rounded-[1.5rem] border border-border shadow-[var(--shadow-soft)] md:max-w-none"
                />
              </li>
            ))}
          </ol>
        </Section>

        {/* Recursos */}
        <Section className="bg-muted/60">
          <p className="eyebrow">Recursos</p>
          <h2 className="mt-3 max-w-2xl text-3xl leading-tight sm:text-4xl">
            O que você tem em mãos
          </h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <div key={f.title} className="surface-card p-7">
                <span aria-hidden="true" className="block size-2.5 rounded-full bg-accent" />
                <h3 className="mt-4 text-lg">{f.title}</h3>
                <p className="mt-2 leading-relaxed text-muted-foreground">{f.text}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* História do nome */}
        <Section>
          <div className="surface-card mx-auto max-w-3xl p-8 text-center sm:p-12">
            <p className="eyebrow">Por que Casa de Lídia</p>
            <blockquote className="mt-5 font-display text-2xl leading-snug sm:text-3xl">
              “O Senhor abriu o seu coração para atender às coisas que Paulo dizia.”
            </blockquote>
            <p className="mt-3 text-sm font-semibold text-gold-foreground">Atos 16:14</p>
            <p className="mt-6 leading-relaxed text-muted-foreground">
              Lídia de Tiatira abriu o coração ao Senhor e, logo depois, abriu a casa para a igreja.
              É exatamente isso que uma célula faz toda semana: alguém abre a porta, e a Palavra
              encontra pessoas em volta da mesa.
            </p>
          </div>
        </Section>

        {/* Preços */}
        {SHOW_PRICING ? (
          <Section id="precos" className="bg-muted/60">
            <Precos />
          </Section>
        ) : null}

        {/* FAQ */}
        {/* Sem a seção de preços, o fundo alternado passa para cá */}
        <Section id="duvidas" className={SHOW_PRICING ? "" : "bg-muted/60"}>
          <p className="eyebrow">Dúvidas</p>
          <h2 className="mt-3 text-3xl leading-tight sm:text-4xl">
            Perguntas que a gente sempre recebe
          </h2>
          <div className="mt-9 grid gap-4 lg:grid-cols-2">
            {faqs.map((f) => (
              <details key={f.q} className="surface-card group p-6">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-lg font-semibold">
                  {f.q}
                  <span
                    aria-hidden="true"
                    className="shrink-0 text-2xl leading-none text-accent-foreground/70 transition group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="mt-3 leading-relaxed text-muted-foreground">{f.a}</p>
              </details>
            ))}
          </div>
        </Section>

        {/* Chamada final */}
        <Section className="bg-primary text-primary-foreground">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl leading-tight sm:text-4xl">
              O próximo domingo já pode virar roteiro
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-primary-foreground/85">
              Teste por 30 dias, com 5 roteiros, e veja como a sua célula fica alinhada com o que
              foi pregado.
            </p>
            <PrimaryButton href={REGISTER_URL} className="mt-8">
              Começar teste grátis
            </PrimaryButton>
          </div>
        </Section>
      </main>

      <footer className="border-t border-border px-5 py-12 sm:px-8">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <p className="font-display text-xl font-semibold">Casa de Lídia</p>
            <p className="mt-3 text-sm italic leading-relaxed text-muted-foreground">
              “O Senhor abriu o seu coração para atender às coisas que Paulo dizia.” — Atos 16:14
            </p>
          </div>
          <nav aria-label="Links do rodapé" className="flex flex-col gap-3 text-sm font-medium">
            <a href={TERMS_URL} className="hover:underline">
              Termos de Uso
            </a>
            <a href={PRIVACY_URL} className="hover:underline">
              Política de Privacidade
            </a>
            <a href={`mailto:${CONTACT_EMAIL}`} className="hover:underline">
              {CONTACT_EMAIL}
            </a>
          </nav>
        </div>
        {/* Identificação do fornecedor (Decreto 7.962/2013, art. 2º), sem endereço físico.
            O e-mail de contato fica nos links do rodapé, logo acima. */}
        <div className="mx-auto mt-10 w-full max-w-6xl space-y-1 text-xs leading-relaxed text-muted-foreground">
          <p>
            Casa de Lídia é um serviço da {COMPANY_NAME} ·{" "}
            <span className="whitespace-nowrap">CNPJ {COMPANY_CNPJ}</span> · {COMPANY_REGION}
          </p>
          <p>© {new Date().getFullYear()} Casa de Lídia. Todos os direitos reservados.</p>
        </div>
      </footer>

      <LegalDialog />
    </div>
  );
}
