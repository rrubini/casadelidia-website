import type { ReactNode } from "react";

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
