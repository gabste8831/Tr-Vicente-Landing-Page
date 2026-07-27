"use client";

import { useEffect, useRef } from "react";
import { MapPin, Circle, Clock } from "lucide-react";
import styles from "./Coverage.module.css";

const ITEMS = [
  { icon: MapPin, label: "Atividade operacional em todo Alto Vale" },
  { icon: Circle, label: "Domínio e expertise em rotas regionais" },
  { icon: Clock, label: "Prazos diferenciados para Rio do Sul e proximidades" },
];

const DESKTOP_QUERY = "(min-width: 1024px)";
const FRAME_COUNT = 50;
const currentFrame = (index: number) =>
  `/coverage-frames/frame_${index.toString().padStart(4, "0")}.jpg`;

const CROP_EDGES = { x: 40, y: 40 };

const TRIGGER_DESKTOP = {
  start: 0.6, // Começa a animar quando o canvas atingir 60% da tela 
  end: 0.4,   // Termina de animar quando o canvas subir até 20% da tela
};

const TRIGGER_MOBILE = {
  start: 0.8, // No mobile, começa um pouco mais tarde para dar tempo do usuário rolar após o texto
  end: 0.3,   // Termina bem próximo do topo
};

export default function Coverage() {
  const pinWrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const wrapper = pinWrapperRef.current;
    const canvas = canvasRef.current;
    if (!wrapper || !canvas) return;

    const context = canvas.getContext("2d", { alpha: false });
    if (!context) return;

    let targetFrameIndex = 1;
    let currentFrameIndex = 1;
    let renderedFrameIndex = -1;
    let loopId: number | null = null;
    let isPreloading = true;

    const images: HTMLImageElement[] = [];

    const renderFrame = (index: number) => {
      if (index === renderedFrameIndex) return;
      renderedFrameIndex = index;

      const img = images[index - 1];
      if (img && img.complete && img.naturalWidth !== 0) {
        const cropX = CROP_EDGES.x;
        const cropY = CROP_EDGES.y;

        const cropW = img.naturalWidth - (cropX * 2);
        const cropH = img.naturalHeight - (cropY * 2);

        if (canvas.width !== cropW) {
          canvas.width = cropW;
          canvas.height = cropH;
        }

        context.drawImage(img, cropX, cropY, cropW, cropH, 0, 0, canvas.width, canvas.height);
      }
    };

    const scrub = () => {
      if (images.length === 0) return;

      // MUDANÇA CHAVE: Agora medimos o comportamento do próprio CANVAS
      const canvasRect = canvas.getBoundingClientRect();

      // Detecta se é desktop ou mobile para aplicar as configurações certas
      const isDesktop = window.matchMedia(DESKTOP_QUERY).matches;
      const config = isDesktop ? TRIGGER_DESKTOP : TRIGGER_MOBILE;

      // Define os pontos físicos na tela com base nas porcentagens do painel de controle
      const startPos = window.innerHeight * config.start;
      const endPos = window.innerHeight * config.end;

      const totalTravel = startPos - endPos;
      const currentTravel = startPos - canvasRect.top; // Monitora o topo do Canvas

      const progress = Math.min(Math.max(currentTravel / totalTravel, 0), 1);

      targetFrameIndex = Math.min(
        FRAME_COUNT,
        Math.max(1, Math.floor(progress * FRAME_COUNT) + 1)
      );
    };

    const tick = () => {
      if (!isPreloading) {
        currentFrameIndex += (targetFrameIndex - currentFrameIndex) * 0.08;

        if (Math.abs(targetFrameIndex - currentFrameIndex) < 0.05) {
          currentFrameIndex = targetFrameIndex;
        }

        renderFrame(Math.round(currentFrameIndex));
      }
      loopId = requestAnimationFrame(tick);
    };

    let loadedCount = 0;
    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image();
      img.src = currentFrame(i);
      img.onload = () => {
        loadedCount++;
        if (i === 1) {
          isPreloading = false;
          renderFrame(1);
          scrub();
        }
      };
      images.push(img);
    }

    const onScrollOrResize = () => {
      scrub();
    };

    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize);

    loopId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
      if (loopId !== null) cancelAnimationFrame(loopId);
    };
  }, []);

  return (
    <section className={styles.section} id="cobertura">
      <div ref={pinWrapperRef} className={styles.pinWrapper}>
        <div className={styles.pinInner}>
          <div className={styles.container}>
            <div className={styles.layout}>
              <div className={styles.left}>
                <span className={styles.eyebrow}>Presença Regional</span>
                <h2 className={styles.title}>Área de Atuação e Cobertura</h2>
                <p className={styles.text}>
                  Atendimento especializado em todo o{" "}
                  <span className={styles.highlight}>Alto Vale do Itajaí</span>,
                  com um raio de atuação de{" "}
                  <span className={styles.highlight}>
                    100km a partir de Rio do Sul - SC
                  </span>
                  .
                </p>
                <div className={styles.list}>
                  {ITEMS.map(({ icon: Icon, label }) => (
                    <div key={label} className={styles.listItem}>
                      <Icon size={18} className={styles.listIcon} strokeWidth={1.75} />
                      <span className={styles.listLabel}>{label}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className={styles.videoWrap}>
                <canvas
                  ref={canvasRef}
                  className={styles.canvas}
                  aria-label="Mapa de Atuação Vicente Transportes"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}