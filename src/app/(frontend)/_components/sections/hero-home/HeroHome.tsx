'use client'

import { useRef } from 'react';
import { motion, useInView } from "framer-motion";
import styles from "./HeroHome.module.scss";

import { TextArc } from "../../ui";

export function HeroHome() {

    const ref = useRef(null);
    const isInView = useInView(ref, { margin: "0px 0px -10% 0px", once: true });

    const revealVariants = {
        hidden: { 
            y: "100%", 
            opacity: 0,
            filter: "blur(20px)", 
        },
        visible: {
            y: "0%", 
            opacity: 1,
            filter: "blur(0px)", 
            transition: {
                delay: 1,
                duration: 2, 
                ease: [0.16, 1, 0.3, 1] as const, 
            }
        }
    };

    const boldVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                delay: 1.5,
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1] as const
            }
        }
    };

    const textVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                delay: 2,
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1] as const
            }
        }
    };

    const buttonVariants = {
        hidden: { scale: 1.1, opacity: 0 },
        visible: {
            scale: 1,
            opacity: 1,
            transition: {
                delay: 3,
                duration: 1.5,
                ease: [0.16, 1, 0.3, 1] as const
            }
        }
    };

    function handleScroll() {
        window.scrollTo({
            top: window.innerHeight,
            behavior: "smooth"
        });
    }

    return (
        <section
            className={styles.hero}
            ref={ref}
        >
            <motion.div
                className={styles.heroWrapper}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
            >
                <div className={styles.heroTitle}>
                    <h1 className={styles.titleMask}>
                        <motion.span variants={revealVariants}>
                            Design de alta performance: transformando ideias em produtos digitais que escalam.
                        </motion.span>
                    </h1>
                </div>

                <div className={styles.heroContent}>
                    <div className={styles.heroContentText}>
                        <p className={styles.contentMask}>
                            <motion.span variants={boldVariants}>
                                <strong>Designer independente.</strong>
                            </motion.span>
                        </p>
                        <p className={styles.contentMask}>
                            <motion.span variants={textVariants}>
                                12 anos de experiência global, unindo design e tecnologia para elevar o faturamento e autoridade da sua marca.
                            </motion.span>
                        </p>
                    </div>
                    <motion.button
                        className={styles.heroContentButton}
                        onClick={handleScroll}
                        aria-label="Ir para a próxima seção"
                        variants={buttonVariants}
                    >
                        <div className={styles.heroContentMouse}>
                            <span></span>
                        </div>
                        <TextArc
                            text="VÁ PARA BAIXO PARA CONTINUAR NAVEGANDO"
                        />
                    </motion.button>
                </div>
            </motion.div>
        </section>
    );
}
