"use client";

import { useEffect, useState, useRef } from "react"; // Inserido useRef aqui
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import styles from "./Testimonials.module.css";

const TESTIMONIALS = [
  {
    quote:
      "A pontualidade e o cuidado com a carga são os diferenciais da Vicente Transportes. Uma parceria de confiança para o nosso dia a dia.",
    name: "Alnak",
  },
  {
    quote:
      "Atendimento ágil e transparente, com a segurança que precisamos para manter nossa operação em dia.",
    name: "Coremma",
  },
  {
    quote:
      "A Vicente Transportes entende as urgências do nosso setor e sempre entrega com agilidade e precisão.",
    name: "MD Autopeças",
  },
  {
    quote:
      "Confiabilidade nas entregas e comunicação clara em todo o processo. Um parceiro estratégico para nossa operação.",
    name: "SB Tratores",
  },
  {
    quote:
      "Mesmo em períodos de alta demanda, a equipe sempre cumpre os prazos acordados com profissionalismo.",
    name: "MB Metal Mecânica",
  },
  {
    quote:
      "Serviço ágil, seguro e com excelente suporte. O compromisso com a qualidade faz toda a diferença no dia a dia.",
    name: "Mecânica Diesel Jairo",
  },
  {
    quote:
      "Uma transportadora séria, que cumpre o combinado e trata cada entrega com o cuidado que a nossa empresa precisa.",
    name: "CJ Autopeças",
  },
];

function useVisibleCount() {
  const [visible, setVisible] = useState(3);

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w < 640) setVisible(1);
      else if (w < 1024) setVisible(2);
      else setVisible(3);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return visible;
}

export default function Testimonials() {
  const visible = useVisibleCount();
  const count = TESTIMONIALS.length;
  const maxIndex = Math.max(0, count - visible);
  const [index, setIndex] = useState(0);

  // 1. Refs inseridas para rastrear o movimento do dedo
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const minSwipeDistance = 50; // Distância mínima (em px) para disparar a ação

  useEffect(() => {
    setIndex((i) => Math.min(i, maxIndex));
  }, [maxIndex]);

  const goTo = (nextIndex: number) => {
    const span = maxIndex + 1;
    setIndex(((nextIndex % span) + span) % span);
  };

  // 2. Novas funções inseridas para capturar os gestos na tela
  const handleTouchStart = (e: React.TouchEvent) => {
    touchEndX.current = null;
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;

    const distance = touchStartX.current - touchEndX.current;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      goTo(index + 1); // Desliza para a esquerda: mostra o próximo depoimento
    } else if (isRightSwipe) {
      goTo(index - 1); // Desliza para a direita: volta ao depoimento anterior
    }
  };

  const trackWidthPercent = (count / visible) * 100;
  const translatePercent = (index * 100) / count;
  const cardBasisPercent = 100 / count;

  return (
    <section className={styles.section} id="depoimentos">
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.eyebrow}>Depoimentos</span>
          <h2 className={styles.title}>O que nossos clientes dizem</h2>
          <div className={styles.divider} />
          <p className={styles.lead}>
            A confiança de quem move o Brasil conosco todos os dias.
          </p>
        </div>

        {/* 3. Modificado: Eventos de touch mapeados diretamente na Viewport */}
        <div
          className={styles.viewport}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          role="region"
          aria-label="Carrossel de depoimentos"
        >
          <div
            className={styles.track}
            style={{
              width: `${trackWidthPercent}%`,
              transform: `translateX(-${translatePercent}%)`,
            }}
          >
            {TESTIMONIALS.map((t) => (
              <div
                key={t.name}
                className={styles.cardOuter}
                style={{ flexBasis: `${cardBasisPercent}%` }}
              >
                <div className={styles.card}>
                  <div className={styles.stars}>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} size={14} className={styles.star} />
                    ))}
                  </div>
                  <p className={styles.quote}>&ldquo;{t.quote}&rdquo;</p>
                  <div className={styles.footer}>
                    <p className={styles.name}>{t.name}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {maxIndex > 0 && (
          <div className={styles.controls}>
            <button
              type="button"
              aria-label="Depoimento anterior"
              onClick={() => goTo(index - 1)}
              className={styles.controlButton}
            >
              <ChevronLeft size={20} strokeWidth={1.5} />
            </button>
            <button
              type="button"
              aria-label="Próximo depoimento"
              onClick={() => goTo(index + 1)}
              className={styles.controlButton}
            >
              <ChevronRight size={20} strokeWidth={1.5} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}