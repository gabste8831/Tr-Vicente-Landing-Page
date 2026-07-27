"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import styles from "./Header.module.css";

const NAV_LINKS = [
  { href: "#home", label: "Home" },
  { href: "#sobre", label: "Sobre" },
  { href: "#servicos", label: "Serviços" },
  { href: "#diferenciais", label: "Diferenciais" },
  { href: "#equipe", label: "Equipe" },
  { href: "#contato", label: "Contato" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <a href="#home" className={styles.logoLink} aria-label="TR Vicente início">
          <img src="/images/logo_tr.svg" alt="Logo TR Vicente" className={styles.logo} />
        </a>

        <div className={styles.links}>
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={styles.link}
            >
              {link.label}
            </a>
          ))}
        </div>

        <button
          className={styles.menuButton}
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </nav>

      <div className={`${styles.mobileMenu} ${open ? styles.mobileMenuOpen : ""}`}>
        {NAV_LINKS.map((link) => (
          <a
            key={link.href}
            href={link.href}
            onClick={() => setOpen(false)}
            className={styles.mobileLink}
          >
            {link.label}
          </a>
        ))}
      </div>
    </header>
  );
}
