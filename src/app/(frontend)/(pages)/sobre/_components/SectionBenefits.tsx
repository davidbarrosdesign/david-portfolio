'use client';

import { useRef } from "react";
import { motion, useInView } from 'framer-motion';

import styles from './styles.module.scss';

export function SectionBenefits() {

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
            variants={motionVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className={styles.benefitsWrapper}
        >
            <div className={styles.benefitsTitle}>
                <span>Por que me contratar?</span>
            </div>

            <div className={styles.benefitsContent}>
                <motion.div
                        className={styles.benefitsRow}
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{
                            duration: 0.7,
                            delay: 0.25,
                            ease: [0.16, 1, 0.3, 1]
                        }}
                    >
                        <article className={styles.benefitsCard}>
                            <div className={styles.benefitsCardContent}>
                                <h3>Ritmo rápido, sem enrolação</h3>
                                <p>Entregamos sempre o melhor, com máxima velocidade e qualidade, respeitando rigorosamente os prazos estabelecidos.</p>
                            </div>
                        </article>
                </motion.div>

                <motion.div
                        className={styles.benefitsRow}
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{
                            duration: 0.7,
                            delay: 0.50,
                            ease: [0.16, 1, 0.3, 1]
                        }}
                    >
                        <article className={styles.benefitsCard}>
                            <div className={styles.benefitsCardContent}>
                                <h3>Comunicação facilitada</h3>
                                <p>Durante o projeto, fico à disposição para esclarecer dúvidas, receber sugestões e realizar tantas reuniões quanto se fizerem necessárias.</p>
                            </div>
                        </article>
                </motion.div>

                <motion.div
                        className={styles.benefitsRow}
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{
                            duration: 0.7,
                            delay: 0.75,
                            ease: [0.16, 1, 0.3, 1]
                        }}
                    >
                        <article className={styles.benefitsCard}>
                            <div className={styles.benefitsCardContent}>
                                <h3>Equipe enxuta, resultado máximo</h3>
                                <p>Embora trabalhe de forma independente, conto com outros profissionais experientes de confiança para colaborar nos projetos — sem custo adicional para você.</p>
                            </div>
                        </article>
                </motion.div>

                <motion.div
                        className={styles.benefitsRow}
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{
                            duration: 0.7,
                            delay: 1.00,
                            ease: [0.16, 1, 0.3, 1]
                        }}
                    >
                        <article className={styles.benefitsCard}>
                            <div className={styles.benefitsCardContent}>
                                <h3>Garantia de excelência</h3>
                                <p>Não paro de trabalhar até que o projeto esteja plenamente de acordo com suas expectativas e seja aprovado por você.</p>
                            </div>
                        </article>
                </motion.div>
            </div>
        </motion.section>
    );
}