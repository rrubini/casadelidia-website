import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import demoWebm from "@/assets/demo-tela.webm";
import demoMp4 from "@/assets/demo-tela.mp4";
import demoPoster from "@/assets/demo-tela-poster.webp";

// Vídeo mudo em loop, só a tela do app, dentro de um celular desenhado em CSS (assim ele assenta
// em qualquer fundo). Toca quando aparece na tela e pausa quando sai, a não ser que a pessoa tenha
// pausado. Com "reduzir movimento" ligado, não toca sozinho e mostra os controles do navegador.
// Nada de window durante a renderização (a home é pré-renderizada).
export function CelularDemo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const pausadoPelaPessoa = useRef(false);
  const [tocando, setTocando] = useState(false);
  // Pausado pela pessoa, ou o navegador recusou o play(): o ícone de play fica à vista
  const [parado, setParado] = useState(false);
  const [reduzirMovimento, setReduzirMovimento] = useState(false);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    // O React pode não escrever o atributo muted no HTML pré-renderizado, e sem ele o iOS
    // bloqueia o play() automático.
    v.muted = true;

    const aoTocar = () => {
      setTocando(true);
      setParado(false);
    };
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

    // Se o navegador recusar o play() (modo economia de bateria, por exemplo), aparece o
    // ícone de play e o toque da pessoa resolve.
    const tocar = () => void v.play().catch(() => setParado(true));

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
      void v.play().catch(() => setParado(true));
    } else {
      pausadoPelaPessoa.current = true;
      setParado(true);
      v.pause();
    }
  }

  return (
    // O aparelho: borda escura fina, botões laterais e a tela com o vídeo
    <div className="relative w-[14rem] rounded-[2.6rem] bg-[#1d1024] p-2 shadow-[0_40px_80px_-32px_rgba(20,5,30,0.65)] ring-1 ring-white/15 sm:w-[15.5rem] lg:w-[16.5rem]">
      <span
        aria-hidden="true"
        className="absolute -left-[3px] top-24 h-9 w-[3px] rounded-l bg-[#1d1024]"
      />
      <span
        aria-hidden="true"
        className="absolute -left-[3px] top-36 h-14 w-[3px] rounded-l bg-[#1d1024]"
      />
      <span
        aria-hidden="true"
        className="absolute -right-[3px] top-32 h-16 w-[3px] rounded-r bg-[#1d1024]"
      />
      <div className="relative aspect-[408/882] overflow-hidden rounded-[2.1rem] bg-cream">
        <video
          ref={videoRef}
          muted
          loop
          playsInline
          preload="none"
          poster={demoPoster}
          width={408}
          height={882}
          controls={reduzirMovimento}
          aria-label="Demonstração no celular: escolher o culto, gerar o roteiro e enviar aos líderes"
          className="block h-full w-full object-cover"
        >
          <source src={demoWebm} type="video/webm" />
          <source src={demoMp4} type="video/mp4" />
        </video>
        {/* A tela inteira pausa e continua (WCAG 2.2.2), no lugar de um botão embaixo do aparelho.
            Com os controles do navegador, sai de cena. */}
        {reduzirMovimento ? null : (
          <button
            type="button"
            onClick={alternar}
            aria-label={tocando ? "Pausar vídeo" : "Tocar vídeo"}
            className="group absolute inset-0 flex cursor-pointer items-center justify-center rounded-[2.1rem] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-inset focus-visible:ring-accent"
          >
            <span
              className={`flex size-14 items-center justify-center rounded-full bg-black/55 text-white shadow-lg backdrop-blur-sm transition-opacity duration-200 ${
                parado
                  ? "opacity-100"
                  : "opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100"
              }`}
            >
              {tocando ? (
                <Pause aria-hidden="true" className="size-6" />
              ) : (
                <Play aria-hidden="true" className="size-6 translate-x-0.5" />
              )}
            </span>
          </button>
        )}
      </div>
    </div>
  );
}
