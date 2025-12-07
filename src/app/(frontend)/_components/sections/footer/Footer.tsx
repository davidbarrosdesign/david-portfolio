"use client";

import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

import { WhatsappLogo, Mailbox, CalendarDots } from "@phosphor-icons/react";
import styles from "./Footer.module.scss";

import { Button } from "../../ui";
import { useSpotlightHover } from "../../../_hooks/useSpotlightHover";

export function Footer() {
    const footerShortcutsSpotlight = useSpotlightHover();
    const footerSocialSpotlight = useSpotlightHover();

    const ref = useRef(null);
    const isInView = useInView(ref, { margin: "0px 0px -100px 0px", once: true });

    const links = [
        { label: "Trabalhos", slug: "trabalhos" },
        { label: "Serviços", slug: "servicos" },
        { label: "Sobre mim", slug: "sobre" },
        { label: "Contato", slug: "contato" },
    ];

    const social = [
        { label: "LinkedIn", slug: "https://linkedin.com/in/davidbarrosdesign/" },
        { label: "Instagram", slug: "https://instagram.com/davidbarros.design/" },
        { label: "Bluesky", slug: "https://bsky.app/profile/davidbarrosdesign.bsky.social" },
        { label: "Newsletter", slug: "https://curadoriatalks.substack.com/" },
    ];

    const year = new Date().getFullYear();

    const footerVariants = {
        hidden: { opacity: 0, y: 40 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }
        }
    };

    const containerStagger = {
        visible: {
            transition: {
                delayChildren: 0.3,
                staggerChildren: 0.12
            }
        }
    };

    const itemFadeUp = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }
        }
    };

    return (
        <motion.footer
            ref={ref}
            className={styles.footer}
            variants={footerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
        >
            <motion.div
                className={styles.footerWrapper}
                variants={containerStagger}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
            >
                <motion.div className={styles.footerTop} variants={itemFadeUp}>
                    <div className={styles.footerContact}>
                        <div className={styles.footerCTA}>
                            <div className={styles.calendarStatus}>
                                Agenda aberta para novos projetos
                            </div>
                            <h4>Entre em contato, vamos trabalhar em seu projeto.</h4>
                            <nav className={styles.footerButtons}>
                                <Button href="/" size="large" style="solid" color="white" icon={CalendarDots} target="_blank">
                                    Agende uma reunião
                                </Button>

                                <Button href="https://wa.me/5522936182328" size="large" style="outline" color="black" icon={WhatsappLogo} target="_blank">
                                    WhatsApp
                                </Button>

                                <Button href="mailto:davidbarrosdesign@gmail.com" size="large" style="outline" color="black" icon={Mailbox} target="_blank">
                                    Enviar e-mail
                                </Button>
                            </nav>
                        </div>

                        <div className={styles.footerLegal}>
                            <small>Ao utilizar este site ou enviar um pedido de consulta, você concorda com nossos <Link href='/politicas-de-privacidade'>Termos, Política de Privacidade e Política de Cookies</Link>. Seus dados são armazenados com segurança e nunca compartilhados sem o seu consentimento.</small>

                            <small>CNPJ: 20.075.827/0001-71</small>
                        </div>
                    </div>

                    <div className={styles.footerMenus}>
                        <div className={styles.footerMenu}>
                            <h6>Navegação</h6>

                            <motion.nav
                                className={styles.footerLinks}
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
                                        {...footerShortcutsSpotlight.events(i)}
                                        animate={footerShortcutsSpotlight.animation(i)}
                                    >
                                        {label}
                                    </motion.a>
                                ))}
                            </motion.nav>
                        </div>

                        <div className={styles.footerMenu}>
                            <h6>Encontre-me</h6>

                            <motion.nav
                                className={styles.footerLinks}
                                initial="closed"
                                animate="open"
                                exit="closed"
                                variants={{ open: { transition: { staggerChildren: 0.08 } } }}
                            >
                                {social.map(({ label, slug }, i) => (
                                    <motion.a
                                        key={slug}
                                        href={slug}
                                        target="_blank"
                                        variants={{
                                            normal: { opacity: 1, filter: "blur(0px)" },
                                            hovered: { opacity: 1, filter: "blur(0px)", x: 2 },
                                            dimmed: { opacity: 0.3, filter: "blur(2px)" },
                                        }}
                                        {...footerSocialSpotlight.events(i)}
                                        animate={footerSocialSpotlight.animation(i)}
                                    >
                                        {label}
                                    </motion.a>
                                ))}
                            </motion.nav>
                        </div>
                    </div>
                </motion.div>

                <motion.div className={styles.footerBottom} variants={itemFadeUp}>
                    <div className={styles.footerToTop}>
                        <button
                            onClick={() => {
                                // Safari iOS fix
                                document.documentElement.scrollTo({
                                    top: 0,
                                    behavior: "smooth"
                                });
                            }}
                            aria-label="Voltar ao topo"
                        >
                            <small>Voltar ao topo</small>
                        </button>
                    </div>

                    <div className={styles.footerCopyright}>
                        <div className={styles.footerTime}>
                            <small>
                                Nova Friburgo - RJ - Brasil
                            </small>
                        </div>
                        <div className={styles.footerCopy}>
                            <small>© {year} David Barros</small>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </motion.footer>
    );
}