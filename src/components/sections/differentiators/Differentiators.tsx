"use client";

import { useRef, useState, useEffect } from "react";
import { ShieldCheck, Timer, Truck } from "lucide-react";
import styles from "./Differentiators.module.css";

const DIFFERENTIATORS = [
  {
    icon: ShieldCheck,
    title: "Seguro Total",
    description: (
      <>
        Em casos de avaria da sua mercadoria, nossa empresa se responsabilizará por <strong>todos os custos</strong>.
      </>
    ),
  },
  {
    icon: Timer,
    title: "Pontualidade",
    description: (
      <>
        Eficiência medida em números:{" "}
        <strong>99% das nossas entregas</strong> são realizadas rigorosamente
        dentro do prazo acordado.
      </>
    ),
  },
  {
    icon: Truck,
    title: "Frota Própria",
    description: (
      <>
        Controle total da operação com{" "}
        <strong>veículos de carga expressos</strong>, ideais ao seu pacote.
      </>
    ),
  },
];

const AUTOPLAY_MS = 6000;

export default function Differentiators() {
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
    <section className={styles.section} id="diferenciais">
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.eyebrow}>Compromisso</span>
          <h2 className={styles.title}>Nossos Diferenciais</h2>
          <div className={styles.divider} />
        </div>

        <div
          className={styles.grid}
          ref={trackRef}
          onPointerDown={pauseTemporarily}
          onTouchStart={pauseTemporarily}
        >
          {DIFFERENTIATORS.map(({ icon: Icon, title, description }) => (
            <div key={title} className={styles.card}>
              <div className={styles.iconCircle}>
                <Icon size={34} className={styles.icon} strokeWidth={1.5} />
              </div>
              <h4 className={styles.cardTitle}>{title}</h4>
              <p className={styles.cardText}>{description}</p>
            </div>
          ))}
        </div>

        <div className={styles.dots}>
          {DIFFERENTIATORS.map((_, index) => (
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