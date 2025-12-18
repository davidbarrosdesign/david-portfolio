'use client'

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Button } from "../../ui";

import styles from './ServicesHome.module.scss';

export function ServicesHome() {

    const ref = useRef(null);
    const isInView = useInView(ref, { margin: "0px 0px -100px 0px", once: true });

    const motionVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }
        }
    };

    return (
        <motion.section
            ref={ref}
            className={styles.services}
            variants={motionVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
        >
            <div className={styles.servicesWrapper}>
                <div className={styles.servicesTitle}>
                    <span>Serviços</span>
                </div>

                <div className={styles.servicesList}>
                    <div className={styles.servicesStack}>
                        <motion.div
                            className={styles.serviceRow}
                            initial={{ opacity: 0, y: 30 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{
                                duration: 0.7,
                                delay: 0.25,
                                ease: [0.16, 1, 0.3, 1]
                            }}
                        >
                            <article className={styles.serviceCard}>
                                <div className={styles.serviceCardContent}>
                                    <h3>Produtos digitais</h3>
                                    <p>Soluções completas que equilibram estética de ponta com usabilidade intuitiva. Desenvolvo interfaces focadas em resolver problemas complexos e gerar valor real para o seu negócio e para o usuário final.</p>
                                </div>
                            </article>
                        </motion.div>
                        <motion.div
                            className={styles.serviceRow}
                            initial={{ opacity: 0, y: 30 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{
                                duration: 0.7,
                                delay: 0.50,
                                ease: [0.16, 1, 0.3, 1]
                            }}
                        >
                            <article className={styles.serviceCard}>
                                <div className={styles.serviceCardContent}>
                                    <h3>Web Design</h3>
                                    <p>Crio experiências web de alto nível, com foco em performance, acessibilidade e SEO, utilizando tecnologias modernas e plataformas low-code para agilizar o lançamento.</p>
                                </div>
                            </article>
                        </motion.div>
                        <motion.div
                            className={styles.serviceRow}
                            initial={{ opacity: 0, y: 30 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{
                                duration: 0.7,
                                delay: 0.75,
                                ease: [0.16, 1, 0.3, 1]
                            }}
                        >
                            <article className={styles.serviceCard}>
                                <div className={styles.serviceCardContent}>
                                    <h3>Design Estratégico & Inovação</h3>
                                    <p>Design com intenção! Vou além do visual para construir identidades memoráveis e experiências imersivas, utilizando Inteligência Artificial Generativa e tecnologia para destacar sua marca no mercado.</p>
                                </div>
                            </article>
                        </motion.div>
                        <motion.div
                            className={styles.serviceRow}
                            initial={{ opacity: 0, y: 30 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{
                                duration: 0.7,
                                delay: 1,
                                ease: [0.16, 1, 0.3, 1]
                            }}
                        >
                            <article className={styles.serviceCard}>
                                <div className={styles.serviceCardContent}>
                                    <h3>Otimização & Conversão (CRO)</h3>
                                    <p>O design não termina no lançamento. Analiso o comportamento dos usuários para identificar gargalos e implementar melhorias contínuas que aumentam o engajamento, a retenção e, consequentemente, o seu faturamento.</p>
                                </div>
                            </article>
                        </motion.div>
                        <motion.div
                            className={styles.serviceButtons}
                            initial={{ opacity: 0, y: 30 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{
                                duration: 0.7,
                                delay: 1.25,
                                ease: [0.16, 1, 0.3, 1]
                            }}
                        >
                            <Button
                                href="/contato"
                                size="large"
                                style="solid"
                                color="black"
                            >
                                Solicitar orçamento
                            </Button>

                            <Button
                                href="/servicos"
                                size="large"
                                style="ghost"
                                color="black"
                            >
                                Saiba mais
                            </Button>
                        </motion.div>
                    </div>
                </div>
            </div>
        </motion.section>
    );
}