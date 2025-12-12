"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import styles from "./Header.module.scss";

import { Button, MenuToggle } from "../../ui";
import { useSpotlightHover } from "../../../_hooks/useSpotlightHover";

// Sons
const openSound =
  typeof Audio !== "undefined" ? new Audio("/sounds/menu-open.wav") : null;
const closeSound =
  typeof Audio !== "undefined" ? new Audio("/sounds/menu-close.wav") : null;

function play(s: HTMLAudioElement | null) {
  if (!s) return;
  s.pause();
  s.currentTime = 0;
  s.volume = 1;
  s.play();
}

export function Header() {
  const [open, setOpen] = useState(false);
  const menuSpotlight = useSpotlightHover();
  const socialSpotlight = useSpotlightHover();

  // abre OU fecha
  const toggleMenu = useCallback(() => {
    if (open) {
      play(closeSound);
    } else {
      play(openSound);
    }

    // dá tempo do morph acontecer
    setTimeout(() => {
      setOpen((prev) => !prev);
    }, 100);
  }, [open]);

  // ESC fecha
  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (open) toggleMenu();
      }
    };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [open, toggleMenu]);

  // scroll lock
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  const links = [
    { label: "Sobre mim", slug: "sobre" },
    { label: "Trabalhos", slug: "trabalhos" },
    // { label: "Serviços", slug: "servicos" },
    { label: "Contato", slug: "contato" },
  ];

  const socials = [
    { label: "LinkedIn", href: "https://linkedin.com/in/davidbarrosdesign/" },
    { label: "Instagram", href: "https://instagram.com/davidbarros.design/" },
    // { label: "Bluesky", href: "https://bsky.app/profile/davidbarrosdesign.bsky.social" },
    // { label: "Newsletter", href: "https://curadoriatalks.substack.com/" },
  ];

  return (
    <>
      {/* HEADER FIXO */}
      <header className={styles.header}>
        <div className={styles.headerContainer}>
          <div className={styles.logoSlot}>
            <Link href="/">
              <Image
                src="/brand/logo-preto-david-barros.svg"
                width={32}
                height={30}
                alt="Logo"
              />
            </Link>
          </div>

          <div className={styles.headerRight}>
            <Button href="/contato" size="medium" style="solid" color="black">
              Contato
            </Button>

            <button className={styles.toggleBtn} onClick={toggleMenu}>
              <MenuToggle open={open} />
            </button>
          </div>
        </div>
      </header>

      {/* MENU ABERTO */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className={styles.backdrop}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={toggleMenu}
            />

            <motion.div
              className={styles.menuOverlay}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "100vh", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className={styles.menuInner}>
                <div className={styles.menuTop}>
                  <div className={styles.logoSlot}>
                    <Link href="/">
                      <Image
                        src="/brand/logo-preto-david-barros.svg"
                        width={32}
                        height={30}
                        alt="Logo"
                      />
                    </Link>
                  </div>

                  <button className={styles.toggleBtn} onClick={toggleMenu}>
                    <MenuToggle open={open} />
                  </button>
                </div>

                <motion.nav
                  className={styles.menuLinks}
                  initial="closed"
                  animate="open"
                  exit="closed"
                  variants={{ open: { transition: { staggerChildren: 0.08 } } }}
                >
                  {links.map(({ label, slug }, i) => (
                    <motion.a
                      key={slug}
                      href={`/${slug}`}
                      variants={{
                        normal: { opacity: 1, filter: "blur(0px)" },
                        hovered: { opacity: 1, filter: "blur(0px)", x: 2 },
                        dimmed: { opacity: 0.3, filter: "blur(2px)" },
                      }}
                      {...menuSpotlight.events(i)}
                      animate={menuSpotlight.animation(i)}
                    >
                      {label}
                    </motion.a>
                  ))}
                </motion.nav>

                <footer className={styles.menuFooter}>
                  <motion.nav
                    className={styles.menuSocials}
                    initial="closed"
                    animate="open"
                    exit="closed"
                    variants={{ open: { transition: { staggerChildren: 0.1 } } }}
                  >
                    {socials.map(({ label, href }, i) => (
                      <motion.a
                        key={label}
                        href={href}
                        target="_blank"
                        variants={{
                          normal: { opacity: 1, filter: "blur(0px)" },
                          hovered: { opacity: 1, filter: "blur(0px)" },
                          dimmed: { opacity: 0.3, filter: "blur(2px)" },
                        }}
                        {...socialSpotlight.events(i)}
                        animate={socialSpotlight.animation(i)}
                      >
                        {label}
                      </motion.a>
                    ))}
                  </motion.nav>

                  <span className={styles.time}>
                    {new Date().toLocaleTimeString("pt-BR", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}{" "}
                    Brasil
                  </span>
                </footer>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}