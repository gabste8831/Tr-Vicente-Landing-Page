import Image from "next/image";
import styles from "./Clients.module.css";

const LOGOS = [
  { name: "Alnak", src: "/logos-clientes/Alnak.png" },
  { name: "Coremma", src: "/logos-clientes/Coremma.png" },
  { name: "MD Auto Peças", src: "/logos-clientes/MD Auto Peças.png" },
  { name: "SB Tratores", src: "/logos-clientes/sb tratores.png" },
  { name: "MB Metal Mecânica", src: "/logos-clientes/mb metal mecanica.png" },
  { name: "Mecânica Diesel do Jairo", src: "/logos-clientes/mecanica diesel do jairo.png" },
  { name: "CJ Automotiva", src: "/logos-clientes/cj automotiva.png" },
];

// duplicate list so the marquee can loop seamlessly
const MARQUEE_LOGOS = [...LOGOS, ...LOGOS];

export default function Clients() {
  return (
    <section className={styles.section} id="clientes">
      <div className={styles.container}>
        <p className={styles.caption}>Empresas que confiam em nós</p>
      </div>
      <div className={styles.marqueeOuter}>
        <div className={`${styles.marqueeTrack} animate-marquee`}>
          {MARQUEE_LOGOS.map((logo, i) => (
            <div key={`${logo.name}-${i}`} className={styles.logoWrap}>
              <Image
                src={logo.src}
                alt={`${logo.name} Logo`}
                fill
                className={styles.logo}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}