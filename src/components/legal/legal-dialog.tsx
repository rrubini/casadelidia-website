import { useEffect, useRef, useState } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";

import logo from "@/assets/casadelidia-retangular-header.png";
import { Dialog, DialogClose, DialogOverlay, DialogPortal } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PrivacyContent } from "./privacy";
import { TermsContent } from "./terms";

type LegalTab = "termos" | "privacidade";

const TITLES: Record<LegalTab, string> = {
  termos: "Termos de Uso",
  privacidade: "Política de Privacidade",
};

function tabFromHash(hash: string): LegalTab | null {
  const tab = hash.replace(/^#/, "");
  return tab === "termos" || tab === "privacidade" ? tab : null;
}

/**
 * Termos e Política em uma modal com abas, aberta pelos links #termos e #privacidade.
 * O hash também chega por redirect (/terms.html, /privacy.html), então a modal abre sozinha
 * quando a página carrega com ele. A troca de aba e o fechamento usam replaceState para não
 * encher o histórico do navegador.
 */
export function LegalDialog() {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<LegalTab>("termos");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const syncFromHash = () => {
      const next = tabFromHash(window.location.hash);
      if (next) {
        setTab(next);
        setOpen(true);
      } else {
        setOpen(false);
      }
    };

    // Links para #termos/#privacidade em qualquer lugar da página abrem a modal sem criar
    // entrada nova no histórico.
    const onClick = (event: globalThis.MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey) return;
      const link = (event.target as Element | null)?.closest?.("a[href^='#']");
      const next = link ? tabFromHash(link.getAttribute("href") ?? "") : null;
      if (!next) return;
      event.preventDefault();
      history.replaceState(null, "", `#${next}`);
      syncFromHash();
    };

    syncFromHash();
    window.addEventListener("hashchange", syncFromHash);
    document.addEventListener("click", onClick);
    return () => {
      window.removeEventListener("hashchange", syncFromHash);
      document.removeEventListener("click", onClick);
    };
  }, []);

  // Volta ao topo do texto ao abrir ou trocar de aba.
  useEffect(() => {
    if (open) scrollRef.current?.scrollTo({ top: 0 });
  }, [open, tab]);

  function changeTab(value: string) {
    const next = tabFromHash(value);
    if (!next) return;
    history.replaceState(null, "", `#${next}`);
    setTab(next);
  }

  function onOpenChange(nextOpen: boolean) {
    if (nextOpen) return;
    history.replaceState(null, "", window.location.pathname + window.location.search);
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogPortal>
        <DialogOverlay className="bg-primary/55 backdrop-blur-sm" />
        <DialogPrimitive.Content
          aria-describedby={undefined}
          className="fixed inset-x-0 bottom-0 top-6 z-50 flex flex-col overflow-hidden rounded-t-[2rem] bg-background shadow-[var(--shadow-lift)] outline-none duration-200 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:slide-in-from-bottom-10 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:slide-out-to-bottom-10 sm:inset-auto sm:left-1/2 sm:top-1/2 sm:h-[min(88vh,56rem)] sm:w-[min(92vw,48rem)] sm:-translate-x-1/2 sm:-translate-y-1/2 sm:rounded-[2rem] sm:data-[state=open]:slide-in-from-bottom-0 sm:data-[state=open]:zoom-in-95 sm:data-[state=closed]:slide-out-to-bottom-0 sm:data-[state=closed]:zoom-out-95"
        >
          <DialogPrimitive.Title className="sr-only">{TITLES[tab]}</DialogPrimitive.Title>

          <Tabs value={tab} onValueChange={changeTab} className="flex min-h-0 flex-1 flex-col">
            <div className="border-b border-border px-5 pb-4 pt-4 sm:px-10 sm:pt-6">
              <div className="flex items-center justify-between gap-4">
                <img
                  src={logo}
                  width={447}
                  height={120}
                  alt="Casa de Lídia"
                  className="h-8 w-auto"
                />
                <DialogClose
                  aria-label="Fechar"
                  className="flex size-10 cursor-pointer items-center justify-center rounded-full text-muted-foreground transition hover:bg-muted hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                  <X className="size-5" />
                </DialogClose>
              </div>
              <TabsList className="mt-4 grid h-auto w-full grid-cols-2 rounded-full bg-muted p-1">
                {(Object.keys(TITLES) as LegalTab[]).map((value) => (
                  <TabsTrigger
                    key={value}
                    value={value}
                    className="rounded-full px-3 py-2 text-sm font-semibold text-muted-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-none"
                  >
                    {TITLES[value]}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            <div
              ref={scrollRef}
              className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-8 sm:px-10"
            >
              <TabsContent value="termos" className="mt-0">
                <TermsContent />
              </TabsContent>
              <TabsContent value="privacidade" className="mt-0">
                <PrivacyContent />
              </TabsContent>
            </div>
          </Tabs>
        </DialogPrimitive.Content>
      </DialogPortal>
    </Dialog>
  );
}
