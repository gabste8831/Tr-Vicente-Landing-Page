import styles from "./Team.module.css";

export default function Team() {
  return (
    <section className={styles.section} id="equipe">
      <div className={styles.container}>
        <div className={styles.layout}>
          <div className={styles.imageWrap}>
            <div className={styles.imageFrame}>
              <img src="/images/carrospaiefilho.jpg" className={styles.image} alt="Cláudio e Fábio Vicente, responsáveis pela gestão da TR Vicente" />
            </div>
          </div>

          <div className={styles.content}>
            <h2 className={styles.title}>
              <span className={styles.highlightRed}>Há 15 anos</span> na estrada, com{" "}
              <span className={styles.highlightRed}>gestão direta</span> de pai e filho
            </h2>
            <p className={styles.text}>
              A Vicente Transportes é administrada por{" "}
              <span className={styles.text}>Cláudio e Fábio Vicente</span>, que
              acompanham de perto cada etapa da operação: da rota ao atendimento.
              Isso significa decisão rápida, resposta direta e{" "}
              <span className={styles.highlightRed}>responsabilidade clara</span> em
              cada frete.
            </p>
            <p className={styles.text}>
              Quinze anos de trabalho constante consolidaram a empresa como{" "}
              <span className={styles.highlightRed}>referência regional</span> em
              transporte no Alto Vale, com estrutura própria e processos que
              garantem prazo e segurança em cada entrega.
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
