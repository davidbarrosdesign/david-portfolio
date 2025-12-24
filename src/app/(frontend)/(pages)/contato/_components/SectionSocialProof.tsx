'use client';

import { useRef } from "react";
import { motion, useInView } from 'framer-motion';
import { Button } from "@/app/(frontend)/_components/ui";
import styles from './styles.module.scss';

export function SectionSocialProof() {

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

    function handleScroll() {
        window.scrollTo({
            top: document.getElementById("typebot")?.offsetTop || 0,
            behavior: "smooth"
        });
    }

    return (
        <motion.section
            className={styles.sectionSocialProof}
            ref={ref}
            variants={motionVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
        >
            <div className={styles.sectionWrapper}>
                <div className={styles.sectionTitle}>
                    <h2>Por que agora é o momento de conversarmos?</h2>
                </div>

                <div className={styles.sectionContent}>
                    <motion.div
                        className={styles.sectionItem}
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{
                            duration: 0.7,
                            delay: 0.25,
                            ease: [0.16, 1, 0.3, 1]
                        }}
                    >
                        <h4>Experiência global</h4>
                        <p>Mais de 12 anos atuando com empresas no Brasil, EUA, Espanha e Itália.</p>
                    </motion.div>

                    <motion.div
                        className={styles.sectionItem}
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{
                            duration: 0.7,
                            delay: 0.50,
                            ease: [0.16, 1, 0.3, 1]
                        }}
                    >
                        <h4>Foco em resultados</h4>
                        <p>Estratégias de UX e CRO validadas que já geraram mais de 110% de aumento em conversão.</p>
                    </motion.div>

                    <motion.div
                        className={styles.sectionItem}
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{
                            duration: 0.7,
                            delay: 0.75,
                            ease: [0.16, 1, 0.3, 1]
                        }}
                    >
                        <h4>Inovação com IA</h4>
                        <p>Projetos que utilizam o que há de mais moderno em IA Generativa e automação para otimizar processos.</p>
                    </motion.div>

                    <motion.div
                        className={styles.sectionItem}
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{
                            duration: 0.7,
                            delay: 1,
                            ease: [0.16, 1, 0.3, 1]
                        }}
                    >
                        <Button
                            style='solid'
                            color='black'
                            size='large'
                            onClick={handleScroll}
                        >
                            Solicite um orçamento
                        </Button>
                    </motion.div>
                </div>
            </div>
        </motion.section>
    );
}