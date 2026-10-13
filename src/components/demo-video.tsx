import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import demoWebm from "@/assets/demo-roteiro.webm";
import demoMp4 from "@/assets/demo-roteiro.mp4";
import demoPoster from "@/assets/demo-roteiro-poster.webp";

// Na mesma ordem do vídeo. O vídeo aponta para esta lista com aria-describedby.
const passos = [
  "Toque em Novo roteiro",
  "Escolha o culto de domingo na lista",
  "Gere o roteiro com a IA",
  "Baixe em Word ou envie aos líderes",
];

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
    <div className="grid items-center gap-10 md:grid-cols-[1fr_auto]">
      <div>
        <p className="eyebrow">Veja funcionando</p>
        <h2 className="mt-3 max-w-xl text-3xl leading-tight sm:text-4xl">
          Do culto ao roteiro em cerca de 1 minuto
        </h2>
        <ol id="demo-passos" className="mt-8 space-y-4">
          {passos.map((passo, i) => (
            <li key={passo} className="flex items-center gap-4 text-lg">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-gold font-display text-base font-semibold text-gold-foreground">
                {i + 1}
              </span>
              {passo}
            </li>
          ))}
        </ol>
      </div>

      <div className="mx-auto flex w-full max-w-[280px] flex-col items-center gap-3 md:max-w-[300px]">
        <div className="relative aspect-[390/844] w-full overflow-hidden rounded-[2.5rem] border-[10px] border-foreground bg-foreground shadow-[var(--shadow-lift)]">
          <video
            ref={videoRef}
            muted
            loop
            playsInline
            preload="none"
            poster={demoPoster}
            width={640}
            height={1386}
            controls={reduzirMovimento}
            aria-label="Demonstração do Casa de Lídia no celular"
            aria-describedby="demo-passos"
            className="block h-full w-full object-cover"
          >
            <source src={demoWebm} type="video/webm" />
            <source src={demoMp4} type="video/mp4" />
          </video>
        </div>

        {/* Pausar movimento automático (WCAG 2.2.2), abaixo do celular para não cobrir a tela do app.
            Com os controles do navegador, sai de cena. */}
        {reduzirMovimento ? null : (
          <button
            type="button"
            onClick={alternar}
            aria-label={tocando ? "Pausar vídeo" : "Continuar vídeo"}
            title={tocando ? "Pausar vídeo" : "Continuar vídeo"}
            className="flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            {tocando ? (
              <Pause aria-hidden="true" className="size-4" />
            ) : (
              <Play aria-hidden="true" className="size-4 translate-x-px" />
            )}
            {tocando ? "Pausar" : "Continuar"}
          </button>
        )}
      </div>
    </div>
  );
}
