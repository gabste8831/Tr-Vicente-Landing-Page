import { Mail } from "lucide-react";
import { WhatsappIcon } from "../../icons";
import styles from "./Footer.module.css";

/* Logos de marca (SVG inline). fill="currentColor" herda a cor de .socialLink
   e .contactLink, então o hover existente continua valendo. */




export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.brandCol}>
            <img
              src="/images/logo_tr_branca.svg"
              alt="Vicente Transportes"
              className={styles.logo}
            />
            <p className={styles.brandText}>
              Logística sob medida, segura e eficiente para levar a sua empresa ao destino certo.
            </p>
            <div className={styles.socials}>
              {/* <a aria-label="Instagram" href="#" className={styles.socialLink}>
                <InstagramIcon size={18} />
              </a> */}
              <a 
                aria-label="WhatsApp" 
                href="https://wa.me/5547999990000?text=Ol%C3%A1%20tudo%20bem%3F%20Gostaria%20de%20fazer%20um%20or%C3%A7amento%20com%20a%20Tr%20Vicente%21" 
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
              >
                <WhatsappIcon size={18} />
              </a>
              <a
                aria-label="E-mail"
                href="https://mail.google.com/mail/?view=cm&fs=1&to=fabiotrvicente@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
              >
                <Mail size={18} />
              </a>
            </div>
          </div>

          <div className={styles.navCol}>
            <h4 className={styles.colTitle}>Navegação</h4>
            <ul className={styles.linkList}>
              <li><a href="#sobre">Sobre Nós</a></li>
              <li><a href="#servicos">Serviços</a></li>
              <li><a href="#diferenciais">Diferenciais</a></li>
              <li><a href="#cobertura">Cobertura</a></li>
            </ul>
          </div>

          <div className={styles.contactCol}>
            <h4 className={styles.colTitle}>Contato</h4>
            <ul className={styles.linkList}>
              <li>
                <a className={styles.contactLink} href="mailto:fabiotrvicente@gmail.com">
                  <Mail size={16} className={styles.contactIcon} /> fabiotrvicente@gmail.com
                </a>
              </li>
              <li>
                <a 
                  className={styles.contactLink} 
                  href="https://wa.me/5547999990000?text=Ol%C3%A1%20tudo%20bem%3F%20Gostaria%20de%20fazer%20um%20or%C3%A7amento%20com%20a%20Tr%20Vicente%21"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className={styles.contactIcon}><WhatsappIcon size={16} /></span> (47) 99999-0000
                </a>
              </li>
            </ul>
          </div>

          <div className={styles.locationCol}>
            <h4 className={styles.colTitle}>Localização</h4>
            <p className={styles.address}>
              Rio do Sul - SC
              <br />
              Alto Vale do Itajaí
            </p>
          </div>
        </div>

        <div className={styles.bottom}>
          <div>
            <p className={styles.copy}>
              © {new Date().getFullYear()} Vicente Transportes. Todos os direitos reservados.
            </p>
            <p className={styles.tagline}>Excelência em Logística Regional</p>
          </div>

          <a
            href="https://gabrielsteffens.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.credit}
          >
            <img
              src="/images/logo_gabdev_2.svg"
              alt=""
              aria-hidden="true"
              className={styles.creditLogo}
            />
            <span className={styles.creditText}>Desenvolvido por <p>Gabriel Steffens</p></span>
          </a>
        </div>
      </div>
    </footer>
  );
}