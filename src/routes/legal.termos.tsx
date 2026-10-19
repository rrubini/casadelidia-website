import { createFileRoute } from "@tanstack/react-router";
import { TermsContent } from "@/components/legal/terms";
import { SITE_URL } from "@/lib/site";

// Só o texto dos Termos, pré-renderizado no build: o app (app.casadelidia.com.br) lê esta
// página para mostrar os Termos numa janela, sem copiar o texto. A fonte continua sendo terms.tsx.
// Está no sitemap, então pode ser indexada; o app lê só o <article>, não o link de volta.
export const Route = createFileRoute("/legal/termos")({
  head: () => ({
    meta: [{ title: "Termos de Uso | Casa de Lídia" }],
    links: [{ rel: "canonical", href: `${SITE_URL}/legal/termos/` }],
  }),
  component: () => (
    // Na página avulsa, o link "#privacidade" (que no site abre a janela) leva à página da outra política
    <main
      className="mx-auto max-w-3xl px-5 py-10"
      onClickCapture={(e) => {
        const link = (e.target as HTMLElement).closest('a[href="#privacidade"]');
        if (link) {
          e.preventDefault();
          window.location.href = "/legal/privacidade/";
        }
      }}
    >
      <a href="/" className="text-sm font-semibold text-muted-foreground hover:underline">
        ← Casa de Lídia
      </a>
      <div className="mt-6">
        <TermsContent />
      </div>
    </main>
  ),
});
