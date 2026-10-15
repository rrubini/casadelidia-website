import { createFileRoute } from "@tanstack/react-router";
import { PrivacyContent } from "@/components/legal/privacy";
import { SITE_URL } from "@/lib/site";

// Só o texto da Política, pré-renderizado no build: o app (app.casadelidia.com.br) lê esta
// página para mostrar a Política numa janela, sem copiar o texto. A fonte continua sendo privacy.tsx.
// Está no sitemap, então pode ser indexada; o app lê só o <article>, não o link de volta.
export const Route = createFileRoute("/legal/privacidade")({
  head: () => ({
    meta: [{ title: "Política de Privacidade — Casa de Lídia" }],
    links: [{ rel: "canonical", href: `${SITE_URL}/legal/privacidade/` }],
  }),
  component: () => (
    // Na página avulsa, o link "#termos" (que no site abre a janela) leva à página da outra política
    <main
      className="mx-auto max-w-3xl px-5 py-10"
      onClickCapture={(e) => {
        const link = (e.target as HTMLElement).closest('a[href="#termos"]');
        if (link) {
          e.preventDefault();
          window.location.href = "/legal/termos/";
        }
      }}
    >
      <a href="/" className="text-sm font-semibold text-muted-foreground hover:underline">
        ← Casa de Lídia
      </a>
      <div className="mt-6">
        <PrivacyContent />
      </div>
    </main>
  ),
});
