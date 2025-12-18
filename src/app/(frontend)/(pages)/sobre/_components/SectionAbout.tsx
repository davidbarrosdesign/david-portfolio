'use client';

import { useRef } from "react";
import { motion, useInView } from 'framer-motion';
import { ScrollRevealText } from '../../../_components/ui';

import styles from './styles.module.scss';

export function SectionAbout() {

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
            className={styles.aboutWrapper}
        >
            <div className={styles.aboutTitle}>
                <ScrollRevealText>
                    Com mais de 12 anos de experiência global, uno design de alta performance, tecnologia e inteligência artificial para transformar desafios complexos em resultados de negócio.
                </ScrollRevealText>
            </div>

            <div className={styles.aboutContent}>
                <ScrollRevealText>
                    Minha trajetória como designer de produtos digitais é pautada por um único objetivo: criar soluções que não apenas funcionem, mas que impulsionem o crescimento real. Ao longo de mais de uma década, colaborei com empresas no Brasil, Estados Unidos, Espanha e Itália, desenvolvendo desde ecossistemas complexos de SaaS até estratégias agressivas de conversão (CRO).
                </ScrollRevealText>
            </div>

            <div className={styles.aboutContent}>
                <ScrollRevealText>
                    Acredito que o design de alto nível é a intersecção entre estética refinada, psicologia do usuário e eficiência tecnológica. Por isso, meu processo integra ferramentas de ponta e Inteligência Artificial para acelerar o time-to-market sem abrir mão da precisão técnica e do cuidado artesanal com a interface.
                </ScrollRevealText>
            </div>
        </motion.section>
    );
}