import styles from "./Team.module.css";

export default function Team() {
  return (
    <section className={styles.section} id="equipe">
      <div className={styles.container}>
        <div className={styles.layout}>
          <div className={styles.imageWrap}>
            <div className={styles.imageFrame}>
              <img src="/images/download.jpg" className={styles.image} alt="Fotografia pai e filho representando raízes familiares na empresa TR Vicente" />
            </div>
          </div>

          <div className={styles.content}>
            <h2 className={styles.title}>
              <span className={styles.highlightRed}>Há 15 anos</span> construindo uma{" "}
              <span className={styles.highlightRed}>história de família</span>
            </h2>
            <p className={styles.text}>
              Tudo começou como um sonho compartilhado entre{" "}
              <span className={styles.text}>pai e filho</span>: transformar
              dedicação e trabalho duro em uma transportadora de confiança para o
              Alto Vale. Quinze anos depois, essa mesma essência{" "}
              <span className={styles.highlightRed}>familiar</span> segue no centro
              de cada rota, e transformou a empresa em{" "}
              <span className={styles.highlightRed}>referência regional</span>.
            </p>
            <p className={styles.text}>
              Mais do que uma estrutura corporativa, a Vicente Transportes carrega um
              sobrenome, uma história e um compromisso pessoal com cada cliente
              atendido - algo que só uma empresa de{" "}
              <span className={styles.text}>raízes familiares</span> pode
              oferecer.
            </p>

            <div className={styles.signature}>
              <div className={styles.signatureBar} />
              <div className={styles.signatureText}>
                <span className={styles.signatureNames}>
                  Cláudio Vicente <span className={styles.signatureAmp}>&amp;</span> Fábio
                  Vicente
                </span>
                <span className={styles.signatureRole}>Fundadores da Vicente Transportes</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
