"use client";

import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight, ArrowUp } from "@phosphor-icons/react";

import { Button, TransitionLink } from "../../../_components/ui"
import styles from "./Footer.module.scss";

import { useSpotlightHover } from "../../../_utils/useSpotlightHover";

export function Footer() {
    const footerContactsSpotlight = useSpotlightHover();
    const footerSocialSpotlight = useSpotlightHover();

    const ref = useRef(null);
    const isInView = useInView(ref, { margin: "0px 0px -100px 0px", once: true });

    const links = [
        { label: "+55 (22) 93618-2328", slug: "https://wa.me/5522936182328" },
        { label: "davidbarrosdesign@gmail.com", slug: "mailto:davidbarrosdesign@gmail.com" }
    ];

    const social = [
        { label: "LinkedIn", slug: "https://linkedin.com/in/davidbarrosdesign/" },
        { label: "Instagram", slug: "https://instagram.com/davidbarros.design/" }
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
                    <div className={styles.footerLogo}>
                        <TransitionLink href="/">
                            <Image
                                src="/brand/logo-branco-david-barros.svg"
                                width={32}
                                height={30}
                                alt="Logo"
                            />
                        </TransitionLink>
                    </div>

                    <div className={styles.footerLinks}>
                        <motion.nav
                            className={styles.footerContacts}
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
                                        normal: { opacity: 1, filter: "blur(0px)", x: 0 },
                                        hovered: { opacity: 1, filter: "blur(0px)", x: -2 },
                                        dimmed: { opacity: 0.3, filter: "blur(2px)" },
                                    }}
                                    {...footerContactsSpotlight.events(i)}
                                    animate={footerContactsSpotlight.animation(i)}
                                >
                                    {label}
                                </motion.a>
                            ))}
                        </motion.nav>

                        <motion.nav
                            className={styles.footerSocial}
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
                                    rel="noopener noreferrer"
                                    variants={{
                                        normal: { opacity: 1, filter: "blur(0px)" },
                                        hovered: { opacity: 1, filter: "blur(0px)" },
                                        dimmed: { opacity: 0.3, filter: "blur(2px)" },
                                    }}
                                    {...footerSocialSpotlight.events(i)}
                                    animate={footerSocialSpotlight.animation(i)}
                                >
                                    {label} <ArrowUpRight size={14} />
                                </motion.a>
                            ))}
                        </motion.nav>
                    </div>
                </motion.div>

                <motion.div className={styles.footerBottom} variants={itemFadeUp}>
                    <div className={styles.footerCopyright}>
                        <div className={styles.footerCopy}>
                            <small>David Barros © {year}. CNPJ: 20.075.827/0001-71</small>
                        </div>

                        <div className={styles.footerTime}>
                            <small>
                                <Button
                                    href="/privacidade"
                                    size="small"
                                    style="ghost"
                                    color="white"
                                >
                                    Políticas de privacidade
                                </Button>
                            </small>
                        </div>
                    </div>

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
                            <ArrowUp size={30} />
                        </button>
                    </div>

                </motion.div>
            </motion.div>
        </motion.footer>
    );
}