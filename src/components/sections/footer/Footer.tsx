import { Mail } from "lucide-react";
import { WhatsappIcon } from "../../icons";
import styles from "./Footer.module.css";

/* Logos de marca (SVG inline). fill="currentColor" herda a cor de .socialLink
   e .contactLink, então o hover existente continua valendo. */


// function InstagramIcon({ size = 18 }: { size?: number }) {
//   return (
//     <svg
//       width={size}
//       height={size}
//       viewBox="0 0 24 24"
//       fill="currentColor"
//       aria-hidden="true"
//     >
//       <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
//     </svg>
//   );
// }

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