import { createFileRoute } from "@tanstack/react-router";
import { PrivacyContent } from "@/components/legal/privacy";

// Só o texto da Política, pré-renderizado no build: o app (app.casadelidia.com.br) lê esta
// página para mostrar a Política numa janela, sem copiar o texto. A fonte continua sendo privacy.tsx.
export const Route = createFileRoute("/legal/privacidade")({
  head: () => ({
    meta: [{ title: "Política de Privacidade — Casa de Lídia" }, { name: "robots", content: "noindex" }],
  }),
  component: () => (
    <main className="mx-auto max-w-3xl px-5 py-10">
      <PrivacyContent />
    </main>
  ),
});
