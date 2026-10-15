import type { ReactNode } from "react";
import { COMPANY_CNPJ, COMPANY_NAME, CONTACT_EMAIL } from "@/lib/site";

/**
 * Link de e-mail que o Cloudflare não embaralha. O Cloudflare troca os e-mails do HTML por
 * "[email protected]" e só os mostra de novo com um script dele; o app lê os textos legais direto
 * do HTML, sem esse script. O que fica entre <!--email_off--> e <!--/email_off--> ele não mexe.
 */
export function EmailLink({ email }: { email: string }) {
  return (
    <span
      dangerouslySetInnerHTML={{
        __html: `<!--email_off--><a href="mailto:${email}">${email}</a><!--/email_off-->`,
      }}
    />
  );
}

export function LegalHeader({
  title,
  updated,
  version,
}: {
  title: string;
  updated: string;
  version: string;
}) {
  return (
    <header>
      <h2 className="text-3xl leading-tight sm:text-4xl">{title}</h2>
      <p className="mt-2 text-sm text-muted-foreground">
        Última atualização: {updated} · <span className="whitespace-nowrap">Versão {version}</span>
      </p>
      {/* Identificação do fornecedor (Decreto 7.962/2013, art. 2º) */}
      <p className="mt-1 text-sm text-muted-foreground">
        {COMPANY_NAME} · <span className="whitespace-nowrap">CNPJ {COMPANY_CNPJ}</span> ·{" "}
        <EmailLink email={CONTACT_EMAIL} />
      </p>
    </header>
  );
}

export function Summary({ children }: { children: ReactNode }) {
  return (
    <aside className="mt-7 rounded-3xl bg-muted/70 p-6">
      <p className="eyebrow">Em resumo</p>
      <ul className="mt-3 list-disc space-y-2 pl-5 text-[0.95rem] leading-relaxed marker:text-accent">
        {children}
      </ul>
    </aside>
  );
}
