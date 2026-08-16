"use client";

import { useState, useRef, useEffect, FormEvent } from "react";
import { MapPin, Phone, Mail, Briefcase, ChevronDown } from "lucide-react";
import { WhatsappIcon } from "../../icons";
import styles from "./Contact.module.css";

const CONTACT_EMAIL = "fabiotrvicente@gmail.com";

const SUBJECTS = [
  "Solicitar Orçamento",
  "Trabalhe Conosco",
  "Dúvidas",
];





type Status = "idle" | "opened";

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

  // Sem backend: monta um link "mailto:" com os dados preenchidos e deixa o
  // próprio visitante enviar pelo aplicativo/webmail dele. Zero conta, zero
  // credencial, zero serviço terceiro — só depende de haver um cliente de
  // e-mail configurado no dispositivo de quem preenche o formulário.
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    const name = String(data.get("name") ?? "");
    const email = String(data.get("email") ?? "");
    const messageBody = String(data.get("message") ?? "");

    const mailSubject = `[Site TR Vicente] ${subject} — ${name}`;
    const mailBody = `Nome: ${name}\nE-mail: ${email}\nAssunto: ${subject}\n\nMensagem:\n${messageBody}`;

    const mailtoLink = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
      mailSubject
    )}&body=${encodeURIComponent(mailBody)}`;

    window.location.href = mailtoLink;
    setStatus("opened");
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
                    Fábio: (47) 99773-5219
                    <br />
                    Cláudio: (47) 99156-7121
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
              <a 
                aria-label="WhatsApp" 
                href="https://wa.me/5547991567121?text=Ol%C3%A1%20tudo%20bem%3F%20Gostaria%20de%20fazer%20um%20or%C3%A7amento%20com%20a%20Tr%20Vicente%21"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialCircle}
              >
                <WhatsappIcon size={18} />
              </a>
              {/* <a aria-label="Instagram" href="#" className={styles.socialCircle}>
                <InstagramIcon size={18} />
              </a> */}
              <a 
                aria-label="E-mail" 
                href="https://mail.google.com/mail/?view=cm&fs=1&to=fabiotrvicente@gmail.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className={styles.socialCircle}
              >
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
                <button type="submit" className={styles.submitButton}>
                  Enviar Mensagem
                </button>

                {status === "opened" && (
                  <p className={styles.statusMessage} role="status">
                    Abrimos seu aplicativo de e-mail com a mensagem pronta.<br />
                    É só conferir e clicar em enviar por lá.
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