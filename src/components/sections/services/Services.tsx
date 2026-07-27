"use client";

import { useRef, useState, useEffect } from "react";
import { Handshake, Package, Truck, RotateCcw } from "lucide-react";
import styles from "./Services.module.css";

const SERVICES = [
  {
    icon: Handshake,
    title: "Parcerias de Longo Prazo",
    description:
      "Mais do que um contrato, uma parceria real: planejamento conjunto, comunicação fácil e a segurança de contar com a gente no dia a dia.",
  },
  {
    icon: Package,
    title: "Cargas Fracionadas",
    description:
      "Ideal para pequenos volumes. Coleta e entrega eficiente compartilhando espaço, reduzindo custos sem perder a agilidade.",
  },
  {
    icon: Truck,
    title: "Cargas Completas",
    description:
      "Veículo exclusivo para sua mercadoria. Máxima segurança, rapidez no trânsito e zero manipulação intermediária.",
  },
  {
    icon: RotateCcw,
    title: "Logística Reversa",
    description:
      "Gestão rápida de devoluções e retornos de mercadorias. Atuamos no menor prazo possível para concluir o processo e manter a satisfação estabelecida.",
  },
];

const AUTOPLAY_MS = 6000;

export default function Services() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Detecta qual card está centralizado
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const cards = Array.from(track.children) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = cards.indexOf(entry.target as HTMLElement);
            if (index !== -1) setActiveIndex(index);
          }
        });
      },
      { root: track, threshold: 0.6 }
    );

    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  const scrollToIndex = (index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.children[index] as HTMLElement;
    if (!card) return;
    const cardCenter = card.offsetLeft + card.offsetWidth / 2;
    track.scrollTo({ left: cardCenter - track.clientWidth / 2, behavior: "smooth" });
  };

  // Autoplay — só no mobile (quando é carrossel) e quando não está pausado
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const mq = window.matchMedia("(max-width: 767px)");
    if (!mq.matches || isPaused) return;

    const interval = setInterval(() => {
      const cards = track.children;
      const next = (activeIndex + 1) % cards.length;
      const card = cards[next] as HTMLElement;
      if (!card) return;
      const cardCenter = card.offsetLeft + card.offsetWidth / 2;
      track.scrollTo({ left: cardCenter - track.clientWidth / 2, behavior: "smooth" });
    }, AUTOPLAY_MS);

    return () => clearInterval(interval);
  }, [activeIndex, isPaused]);

  // Pausa quando o usuário toca/arrasta; retoma pouco depois
  const pauseTemporarily = () => {
    setIsPaused(true);
    window.clearTimeout((pauseTemporarily as any)._t);
    (pauseTemporarily as any)._t = window.setTimeout(
      () => setIsPaused(false),
      AUTOPLAY_MS
    );
  };

  return (
    <section className={styles.section} id="servicos">
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.eyebrow}>Soluções Logísticas</span>
          <h2 className={styles.title}>Serviços Oferecidos</h2>
          <div className={styles.divider} />
          <p className={styles.lead}>
            Logística sob medida e compromisso técnico para levar sua mercadoria ao destino final com total segurança.
          </p>
        </div>

        <div
          className={styles.grid}
          ref={trackRef}
          onPointerDown={pauseTemporarily}
          onTouchStart={pauseTemporarily}
        >
          {SERVICES.map(({ icon: Icon, title, description }) => (
            <div key={title} className={styles.card}>
              <div className={styles.iconWrap}>
                <div className={styles.iconCircle}>
                  <Icon size={22} className={styles.icon} strokeWidth={1.5} />
                </div>
              </div>
              <h3 className={styles.cardTitle}>{title}</h3>
              <p className={styles.cardText}>{description}</p>
            </div>
          ))}
        </div>

        <div className={styles.dots}>
          {SERVICES.map((_, index) => (
            <button
              key={index}
              type="button"
              className={`${styles.dot} ${index === activeIndex ? styles.dotActive : ""
                }`}
              aria-label={`Ir para o slide ${index + 1}`}
              aria-current={index === activeIndex}
              onClick={() => {
                pauseTemporarily();
                scrollToIndex(index);
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}