'use client';

import { useRef } from "react";
import { motion, useInView } from 'framer-motion';
import { ArrowUpRight } from '@phosphor-icons/react';
import { TransitionLink } from "@/app/(frontend)/_components/ui";
import styles from './styles.module.scss';

export function SectionProjects() {

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
            className={styles.projectsSection}
        >
            <TransitionLink
                href="/trabalhos"
                className={styles.projectsWrapper}
            >
                <div className={styles.projectsContent}>
                    <h2>Ainda não conheceu meus cases de sucesso?</h2>
                    <p>Conheça os projetos que participei e que ajudaram as empresas a alcançarem seus objetivos.</p>
                </div>

                <div className={styles.projectsButton}>
                    <ArrowUpRight size={24} />
                </div>
            </TransitionLink>
        </motion.section>
    );
}