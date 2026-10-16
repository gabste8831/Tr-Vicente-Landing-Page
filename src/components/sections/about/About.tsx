import Image from "next/image";
import styles from "./About.module.css";

const STATS = [
  { value: "120k+", label: "Entregas Anuais" },
  { value: "500+", label: "Clientes Atendidos" },
  { value: "14+", label: "Veículos na Frota" },
];

export default function About() {
  return (
    <section className={styles.section} id="sobre">
      <div className={styles.grid}>
        <div className={styles.imageWrap}>
          <div className={styles.imageFrame}>
            <Image
              src="/images/sobre-rio-do-sul.jpg"
              alt="Cidade Rio do Sul Santa Catarina"
              fill
              className={styles.image}
            />
          </div>
          <div className={styles.badge}>
            <span className={styles.badgeValue}>15+</span>
            <span className={styles.badgeLabel}>Anos de História</span>
          </div>
        </div>
        <div>
          <span className={styles.eyebrow}>Nossa História</span>
          <h2 className={styles.title}>Tradição e Modernidade em <br /> Rio do Sul</h2>
          <p className={styles.text}>
            Fundada no coração do Alto Vale, a Vicente Transportes consolidou-se
            como referência em soluções logísticas sob medida. Nossa trajetória é
            marcada pelo compromisso com a eficiência e a segurança, transformando
            desafios complexos em rotas de sucesso.
          </p>
          <div className={styles.stats}>
            {STATS.map((stat) => (
              <div key={stat.label} className={styles.statsItem}>
                <span className={styles.statValue}>{stat.value}</span>
                <span className={styles.statLabel}>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
