import type { ReactNode } from "react";
import { COMPANY_CNPJ, COMPANY_NAME, COMPANY_REGION, CONTACT_EMAIL } from "@/lib/site";

/**
 * Link de e-mail. No site, o Cloudflare embaralha os e-mails do HTML (proteção contra robôs que
 * coletam endereços para spam) e o script dele os mostra de novo para quem visita. O app, que lê
 * os textos legais direto do HTML, desembaralha do lado dele (helpers/legal.py).
 */
export function EmailLink({ email }: { email: string }) {
  return <a href={`mailto:${email}`}>{email}</a>;
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
        {COMPANY_REGION} · <EmailLink email={CONTACT_EMAIL} />
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
