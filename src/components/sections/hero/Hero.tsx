import Image from "next/image";
import { MapPin } from "lucide-react";
import { WhatsappIcon } from "../../icons";
import styles from "./Hero.module.css";



export default function Hero() {
  return (
    <section id="home" className={styles.hero}>
      <Image
        src="/images/hero.jpg"
        alt="Frota da TR Vicente"
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
            <a 
              href="https://wa.me/5547999990000?text=Ol%C3%A1%20tudo%20bem%3F%20Gostaria%20de%20fazer%20um%20or%C3%A7amento%20com%20a%20Tr%20Vicente%21" 
              target="_blank"
              rel="noopener noreferrer"
              className={styles.btnPrimary}
            >
              <WhatsappIcon size={18} />
              Solicitar Orçamento
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
