import { createFileRoute } from "@tanstack/react-router";
import { TermsContent } from "@/components/legal/terms";

// Só o texto dos Termos, pré-renderizado no build: o app (app.casadelidia.com.br) lê esta
// página para mostrar os Termos numa janela, sem copiar o texto. A fonte continua sendo terms.tsx.
export const Route = createFileRoute("/legal/termos")({
  head: () => ({
    meta: [{ title: "Termos de Uso — Casa de Lídia" }, { name: "robots", content: "noindex" }],
  }),
  component: () => (
    <main className="mx-auto max-w-3xl px-5 py-10">
      <TermsContent />
    </main>
  ),
});
