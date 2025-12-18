'use client';

import { useRef } from "react";
import { motion, useInView } from 'framer-motion';
import { ArrowUpRight } from '@phosphor-icons/react';

import styles from './styles.module.scss';
import { TransitionLink } from "@/app/(frontend)/_components/ui";

export function SectionServices() {

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
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={motionVariants}
            className={styles.servicesSection}
        >
            <TransitionLink
                href="/servicos"
                className={styles.servicesWrapper}
            >
                <div className={styles.servicesContent}>
                    <h2>Veja como posso contribuir para o seu negócio</h2>
                    <p>Conheça meus serviços e metodologia para criar produtos digitais que escalam e marcas que lideram.</p>
                </div>

                <div className={styles.servicesButton}>
                    <ArrowUpRight size={24} />
                </div>
            </TransitionLink>
        </motion.section>
    );
}