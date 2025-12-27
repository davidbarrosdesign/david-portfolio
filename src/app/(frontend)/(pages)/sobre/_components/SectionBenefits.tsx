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
                                <h3>Eficiência e agilidade</h3>
                                <p>Processos otimizados e uso de ferramentas low-code e IA para entregar protótipos e produtos finais em tempo recorde, reduzindo custos operacionais, sem abrir mão da qualidade.</p>
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
                                <h3>Comunicação direta</h3>
                                <p>Sem intermediários. Você fala diretamente com o especialista que entende do seu negócio e executa a solução, garantindo alinhamento total.</p>
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
                                <h3>Visão de produto 360º</h3>
                                <p>Minha expertise não acaba no design. Entrego soluções que consideram SEO, acessibilidade, performance de carregamento e escalabilidade técnica.</p>
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
                                <h3>Foco total em resultados</h3>
                                <p>Cada pixel tem um propósito. Meu trabalho é orientado por métricas e comportamento do usuário para garantir que o design aumente o seu faturamento.</p>
                            </div>
                        </article>
                </motion.div>
            </div>
        </motion.section>
    );
}