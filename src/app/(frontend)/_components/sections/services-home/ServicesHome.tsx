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
                                    <p>Experiências digitais transformadoras para todos os setores e indústrias, com foco nas metas do seu negócio, excelência na usabilidade, visual incrível e orientado a boas práticas do digital.</p>
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
                                    <p>Leve seu negócio para o próximo nível com um site ou landing page incrível — e o melhor, no ar em poucos dias em plataformas low-code. Navegação imersiva, otimizados, acessíveis e escaláveis.</p>
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
                                    <h3>Design Estratégico</h3>
                                    <p>Design funcional e estratégico para elevar seu negócio a outro patamar, trazendo diferenciação e aumentando a percepção de valor da marca.</p>
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
                                    <h3>Conversão</h3>
                                    <p>Relatório completo de usabilidade, design, pontos de fricção e oportunidades de melhoria em seu website, sistema web, aplicativo ou landing page para aumentar a conversão e engajamento.</p>
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