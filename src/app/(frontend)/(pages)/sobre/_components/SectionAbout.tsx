'use client';

import { useRef } from "react";
import { motion, useInView } from 'framer-motion';

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
                <span>Sobre mim</span>
            </div>

            <div className={styles.aboutContent}>
                <p>Sou designer com mais de 12 anos de experiência criando produtos digitais, interfaces e soluções focadas na experiência do usuário para empresas no Brasil, Estados Unidos, Espanha e Itália. Atuo com design de produto, UX/UI, CRO e design systems, sempre com foco em clareza, conversão, eficiência e impacto real no negócio.</p>

                <p>Desenvolvo interfaces para e-commerce, SaaS, apps e plataformas que precisam elevar sua maturidade digital, melhorar usabilidade, otimizar jornadas e transformar métricas de conversão. Já colaborei com marcas e empresas em redesign de fluxos críticos, melhoria de checkout, evolução de produtos digitais e criação de sistemas de design escaláveis.</p>

                <ul>
                    <li>Design de produtos digitais</li>
                    <li>UI/UX para e-commerce e conversão</li>
                    <li>Apps e plataformas SaaS</li>
                    <li>Redesign e otimização de fluxos</li>
                    <li>Design Systems e UI escalável</li>
                    <li>Desenvolvimento low-code</li>
                </ul>

                <p>Também atuo com Motion Design, Direção de Arte e Design com IA generativa, trazendo mais consistência visual, dinamismo e escala aos projetos.</p>
            </div>
        </motion.section>
    );
}