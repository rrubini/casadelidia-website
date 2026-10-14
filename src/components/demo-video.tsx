import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import demoWebm from "@/assets/demo-roteiro.webm";
import demoMp4 from "@/assets/demo-roteiro.mp4";
import roteiroMockup from "@/assets/roteiro-mockup.jpg";

// Vídeo mudo em loop dentro de um celular: toca quando aparece na tela e pausa quando sai,
// a não ser que a pessoa tenha pausado. Com "reduzir movimento" ligado, não toca sozinho e
// mostra os controles do navegador. Nada de window durante a renderização (a home é pré-renderizada).
export function DemoVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const pausadoPelaPessoa = useRef(false);
  const [tocando, setTocando] = useState(false);
  const [reduzirMovimento, setReduzirMovimento] = useState(false);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    // O React pode não escrever o atributo muted no HTML pré-renderizado, e sem ele o iOS
    // bloqueia o play() automático.
    v.muted = true;

    const aoTocar = () => setTocando(true);
    const aoPausar = () => setTocando(false);
    v.addEventListener("play", aoTocar);
    v.addEventListener("pause", aoPausar);
    const pararDeOuvir = () => {
      v.removeEventListener("play", aoTocar);
      v.removeEventListener("pause", aoPausar);
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setReduzirMovimento(true);
      return pararDeOuvir;
    }

    // Se o navegador recusar o play() (modo economia de bateria, por exemplo), o botão
    // fica em "Continuar vídeo" e o toque da pessoa resolve.
    const tocar = () => void v.play().catch(() => {});

    if (typeof IntersectionObserver === "undefined") {
      tocar();
      return pararDeOuvir;
    }

    const observador = new IntersectionObserver(
      ([entrada]) => {
        if (!entrada) return;
        if (entrada.isIntersecting) {
          if (!pausadoPelaPessoa.current) tocar();
        } else if (!v.paused) {
          v.pause();
        }
      },
      { threshold: 0.4 },
    );
    observador.observe(v);

    return () => {
      observador.disconnect();
      pararDeOuvir();
    };
  }, []);

  function alternar() {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      pausadoPelaPessoa.current = false;
      void v.play().catch(() => {});
    } else {
      pausadoPelaPessoa.current = true;
      v.pause();
    }
  }

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative aspect-[4/5] w-full max-w-md overflow-hidden rounded-[2rem] border border-border shadow-[var(--shadow-lift)]">
        <video
          ref={videoRef}
          muted
          loop
          playsInline
          preload="none"
          poster={roteiroMockup}
          width={800}
          height={1000}
          controls={reduzirMovimento}
          aria-label="Demonstração: do culto de domingo ao roteiro pronto no celular, com o modelo Encontro"
          className="block h-full w-full object-cover"
        >
          <source src={demoWebm} type="video/webm" />
          <source src={demoMp4} type="video/mp4" />
        </video>
      </div>
      {/* Pausar movimento automático (WCAG 2.2.2). Com os controles do navegador, sai de cena. */}
      {reduzirMovimento ? null : (
        <button
          type="button"
          onClick={alternar}
          aria-label={tocando ? "Pausar vídeo" : "Continuar vídeo"}
          className="flex items-center gap-2 rounded-full border border-border bg-background px-4 py-1.5 text-sm font-medium text-foreground transition hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          {tocando ? (
            <Pause aria-hidden="true" className="size-4" />
          ) : (
            <Play aria-hidden="true" className="size-4 translate-x-px" />
          )}
          {tocando ? "Pausar" : "Ver de novo"}
        </button>
      )}
    </div>
  );
}
