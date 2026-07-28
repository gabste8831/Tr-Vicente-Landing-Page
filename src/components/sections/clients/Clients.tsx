import Image from "next/image";
import styles from "./Clients.module.css";

const LOGOS = [
  { name: "TR Vicente", src: "/logos-clientes/expresso-sao-miguel.png" },
  { name: "TR Vicente", src: "/logos-clientes/alnak.png" },
  { name: "TR Vicente", src: "/logos-clientes/expresso-sao-miguel.png" },
  { name: "TR Vicente", src: "/images/logo_tr.svg" },
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