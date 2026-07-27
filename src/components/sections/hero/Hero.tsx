import Image from "next/image";
import { ArrowRight, MapPin } from "lucide-react";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section id="home" className={styles.hero}>
      <Image
        src="/images/hero.jpg"
        alt="Frota da TR Transportes carregando entregas no Alto Vale do Itajaí"
        fill
        priority
        className={styles.image}
        sizes="100vw"
      />

      <div className={styles.overlayVertical} />
      <div className={styles.overlayHorizontal} />

      <div className={styles.content}>
        <div className={styles.inner}>
          <span className={styles.eyebrow}>
            <MapPin size={14} className={styles.pin} />
            Rio do Sul — SC · Alto Vale do Itajaí
          </span>
          <h1 className={styles.title}>
            Cada carga é um compromisso.
            <br />
            Cada rota, uma <span className={styles.titleEmphasis}>entrega precisa</span>.
          </h1>
          <p className={styles.subtitle}>
              Há mais de 15 anos movendo a economia do Alto Vale com frota própria,
              segurança total e a pontualidade que a sua operação exige.
          </p>
          <div className={styles.actions}>
            <a href="#contato" className={styles.btnPrimary}>
              Solicitar Orçamento
              <ArrowRight size={16} />
            </a>
            <a href="#servicos" className={styles.btnSecondary}>
              Conhecer Serviços
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
