"use client";

import { useState, useRef, useEffect, FormEvent } from "react";
import { MapPin, Phone, Mail, Briefcase, ChevronDown } from "lucide-react";
import styles from "./Contact.module.css";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/xojgvnro";

const SUBJECTS = [
  "Solicitar Orçamento",
  "Trabalhe Conosco",
  "Dúvidas",
];

/* Logos de marca (SVG inline). fill="currentColor" faz herdarem a cor
   das classes .socialCircle / .socialLink, mantendo o hover funcionando. */
function WhatsappIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
    </svg>
  );
}

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

type Status = "idle" | "sending" | "success" | "error";

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");

  // Dropdown customizado (substitui o <select> nativo p/ permitir estilo/animação)
  const [subject, setSubject] = useState(SUBJECTS[0]);
  const [open, setOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  // fecha ao clicar fora
  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (selectRef.current && !selectRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  // fecha com Escape
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    if (open) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    setStatus("sending");
    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        setStatus("success");
        form.reset();
        setSubject(SUBJECTS[0]); // reseta também o dropdown customizado
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className={styles.section} id="contato">
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* Left Column: Contact Info */}
          <div className={styles.info}>
            <div>
              <span className={styles.eyebrow}>Contato</span>
              <h3 className={styles.title}>Vamos conversar sobre sua logística?</h3>
              <p className={styles.lead}>
                Nossa equipe está pronta para oferecer soluções personalizadas
                para o seu negócio no Alto Vale.
              </p>
            </div>
            <div className={styles.detailsList}>
              <div className={styles.detailRow}>
                <Phone size={20} className={styles.detailIcon} strokeWidth={1.5} />
                <div>
                  <p className={styles.detailLabel}>Telefones</p>
                  <p className={styles.detailText}>
                    (47) 3521-0000 | (47) 99999-0000
                  </p>
                </div>
              </div>
              <div className={styles.detailRow}>
                <Mail size={20} className={styles.detailIcon} strokeWidth={1.5} />
                <div>
                  <p className={styles.detailLabel}>E-mail</p>
                  <p className={styles.detailText}>
                    fabiotrvicente@gmail.com
                  </p>
                </div>
              </div>
            </div>
            <div className={styles.socialRow}>
              <a aria-label="WhatsApp" href="https://wa.me/5547999990000" className={styles.socialCircle}>
                <WhatsappIcon size={18} />
              </a>
              {/* <a aria-label="Instagram" href="#" className={styles.socialCircle}>
                <InstagramIcon size={18} />
              </a> */}
              <a aria-label="E-mail" href="mailto:fabiotrvicente@gmail.com" className={styles.socialCircle}>
                <Mail size={18} />
              </a>
            </div>
          </div>

          {/* Right Column: Form */}
          <div className={styles.formWrap}>
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formRow}>
                <div className={styles.field}>
                  <label htmlFor="name" className={styles.label}>
                    Nome Completo
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    className={styles.input}
                    placeholder="Seu nome"
                  />
                </div>
                <div className={styles.field}>
                  <label htmlFor="email" className={styles.label}>
                    E-mail Corporativo
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className={styles.input}
                    placeholder="seu@email.com"
                  />
                </div>
              </div>

              {/* Assunto — dropdown customizado */}
              <div className={styles.field}>
                <span className={styles.label} id="subject-label">
                  Assunto
                </span>
                <div className={styles.customSelect} ref={selectRef}>
                  {/* valor real enviado no formulário */}
                  <input type="hidden" name="subject" value={subject} />

                  <button
                    type="button"
                    className={styles.selectTrigger}
                    aria-haspopup="listbox"
                    aria-expanded={open}
                    aria-labelledby="subject-label"
                    onClick={() => setOpen((o) => !o)}
                  >
                    <span>{subject}</span>
                    <ChevronDown
                      size={18}
                      className={`${styles.selectChevron} ${open ? styles.selectChevronOpen : ""}`}
                    />
                  </button>

                  <ul
                    className={`${styles.selectOptions} ${open ? styles.selectOptionsOpen : ""}`}
                    role="listbox"
                    aria-labelledby="subject-label"
                  >
                    {SUBJECTS.map((opt) => (
                      <li
                        key={opt}
                        role="option"
                        aria-selected={opt === subject}
                        className={`${styles.selectOption} ${opt === subject ? styles.selectOptionActive : ""}`}
                        onClick={() => {
                          setSubject(opt);
                          setOpen(false);
                        }}
                      >
                        {opt}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className={styles.field}>
                <label htmlFor="message" className={styles.label}>
                  Mensagem
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  className={styles.textarea}
                  placeholder="Descreva sua necessidade"
                />
              </div>

              <div className={styles.submitWrap}>
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className={styles.submitButton}
                >
                  {status === "sending" ? "Enviando..." : "Enviar Mensagem"}
                </button>

                {status === "success" && (
                  <p className={styles.statusMessage} role="status">
                    Mensagem enviada com sucesso!<br />Nossa equipe entrará em contato em breve.
                  </p>
                )}
                {status === "error" && (
                  <p className={styles.statusMessage} role="alert">
                    Não foi possível enviar sua mensagem. Tente novamente ou fale com a gente pelo WhatsApp.
                  </p>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}