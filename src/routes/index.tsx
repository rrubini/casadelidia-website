import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Switch } from "@/components/ui/switch";
import { LegalDialog } from "@/components/legal/legal-dialog";
import { CONTACT_EMAIL } from "@/lib/site";
import roteiroMockup from "@/assets/roteiro-mockup.jpg";
import logo from "@/assets/casadelidia-retangular-header.png";

// Preços ocultos por enquanto: o site mostra só o teste grátis. Mude para true para reexibir.
const SHOW_PRICING = false;

const REGISTER_URL = "https://forms.gle/fWRDsymoN5dMZFkb9";
const LOGIN_URL = "https://app.casadelidia.com.br";
// Abrem a modal de Termos/Política (LegalDialog).
const TERMS_URL = "#termos";
const PRIVACY_URL = "#privacidade";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Casa de Lídia — do culto de domingo ao roteiro da célula" },
      {
        name: "description",
        content:
          "Cole o link do culto no YouTube e receba um roteiro pronto para a reunião de célula: quebra-gelo, leitura bíblica, perguntas e aplicação. Teste grátis de 30 dias.",
      },
      {
        property: "og:title",
        content: "Casa de Lídia — do culto de domingo ao roteiro da célula",
      },
      {
        property: "og:description",
        content:
          "Cole o link do culto no YouTube e receba um roteiro pronto para a célula, editável e exportável em Word.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
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
      className={`inline-flex items-center justify-center rounded-full bg-accent px-7 py-3.5 text-base font-semibold text-accent-foreground shadow-[var(--shadow-soft)] transition-transform duration-200 hover:-translate-y-0.5 hover:brightness-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${className}`}
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

const steps = [
  {
    n: "1",
    title: "Cole o link do culto",
    text: "Marque onde começa e onde termina a pregação. Só isso.",
  },
  {
    n: "2",
    title: "A IA escreve o roteiro",
    text: "O material sai do que foi pregado no domingo, não de um texto genérico.",
  },
  {
    n: "3",
    title: "Revise e baixe em Word",
    text: "Ajuste o que quiser e mande para os líderes de célula.",
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

const plans = {
  mensal: {
    label: "Mensal",
    price: "R$ 29,99",
    period: "/mês",
    note: "Cobrança mensal. Cancele quando quiser.",
  },
  anual: {
    label: "Anual",
    price: "R$ 24,99",
    period: "/mês",
    note: "R$\u00a0299,90 cobrados uma vez por ano — 2 meses grátis",
  },
};

const LAUNCH_COUPON = "PRIMEIROS50";

function PricingCard() {
  const [annual, setAnnual] = useState(false);
  const plan = annual ? plans.anual : plans.mensal;

  return (
    <div className="surface-card mx-auto mt-10 flex max-w-md flex-col p-8 text-center">
      <label className="flex cursor-pointer items-center justify-center gap-3 text-sm font-semibold">
        <Switch checked={annual} onCheckedChange={setAnnual} />
        Ativar desconto do plano anual
      </label>

      <h3 className="mt-7 text-xl">Plano {plan.label}</h3>
      <p className="mt-3 font-display text-5xl font-semibold">
        {plan.price}
        <span className="font-sans text-base font-medium text-muted-foreground">{plan.period}</span>
      </p>
      <p className="mt-3 min-h-10 text-sm text-muted-foreground">{plan.note}</p>

      <PrimaryButton href={REGISTER_URL} className="mt-6 w-full">
        Começar teste grátis
      </PrimaryButton>
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
          <div className="grid items-center gap-12 md:grid-cols-2 md:gap-14">
            <div>
              <p className="eyebrow">Para líderes de célula</p>
              <h1 className="mt-4 text-4xl leading-[1.08] sm:text-5xl md:text-6xl">
                Do culto de domingo ao roteiro da célula em 1 minuto
              </h1>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">
                Você cola o link do culto no YouTube e recebe um roteiro pronto para a reunião da
                semana: quebra-gelo, leitura bíblica, perguntas e aplicação — tudo a partir do que
                foi pregado na sua igreja.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <PrimaryButton href={REGISTER_URL}>Começar teste grátis</PrimaryButton>
                <span className="text-sm text-muted-foreground">
                  30 dias grátis · 5 roteiros · sem cartão obrigatório
                </span>
              </div>
            </div>

            <div className="relative">
              <div
                aria-hidden="true"
                className="absolute -inset-4 -z-10 rounded-[2.5rem] bg-accent/15 blur-2xl"
              />
              <img
                src={roteiroMockup}
                width={1024}
                height={1280}
                alt="Exemplo de roteiro de célula com as seções quebra-gelo, leitura bíblica, perguntas para discussão e aplicação da semana"
                className="mx-auto w-full max-w-md rounded-[2rem] border border-border shadow-[var(--shadow-lift)]"
              />
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
              <li key={s.n} className="surface-card p-7">
                <span className="flex size-11 items-center justify-center rounded-full bg-gold font-display text-xl font-semibold text-gold-foreground">
                  {s.n}
                </span>
                <h3 className="mt-5 text-xl">{s.title}</h3>
                <p className="mt-2 leading-relaxed text-muted-foreground">{s.text}</p>
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
            <div className="text-center">
              <p className="eyebrow">Preços</p>
              <h2 className="mt-3 text-3xl leading-tight sm:text-4xl">
                Um plano só, com 30 roteiros por mês
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Escolha como prefere pagar. Pix, cartão ou boleto.
              </p>
              <p className="mt-5 inline-flex flex-wrap items-center justify-center gap-x-2 gap-y-1 rounded-3xl bg-gold px-5 py-2 text-sm font-semibold text-gold-foreground">
                Oferta de lançamento: R$ 19,90/mês nos 3 primeiros meses para os 50 primeiros
                assinantes
                <span>
                  <span className="hidden sm:inline">· </span>Cupom{" "}
                  <span className="rounded-md bg-background/70 px-2 py-0.5 font-mono tracking-wider">
                    {LAUNCH_COUPON}
                  </span>
                </span>
              </p>
            </div>

            <PricingCard />

            <p className="mt-6 text-center text-sm text-muted-foreground">
              Os dois planos começam com 30 dias de teste grátis e 5 roteiros.
            </p>
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
        <p className="mx-auto mt-10 w-full max-w-6xl text-xs text-muted-foreground">
          © {new Date().getFullYear()} Casa de Lídia. Todos os direitos reservados.
        </p>
      </footer>

      <LegalDialog />
    </div>
  );
}
