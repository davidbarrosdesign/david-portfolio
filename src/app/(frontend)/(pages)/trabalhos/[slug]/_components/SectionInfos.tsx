'use client';

import { useRef } from "react";
import { motion, useInView } from 'framer-motion';
import { Project, Service } from "@/payload-types";
import styles from './styles.module.scss';

export function SectionInfos({ item }: { item: Project }) {

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

    // Serviços (Extraindo títulos)
    const services = Array.isArray(item.services) 
        ? item.services.map((s) => {
            if (typeof s === 'object' && s !== null && 'title' in s) {
                return (s as Service).title;
            }
            return null;
        }).filter((title): title is string => title !== null)
        : [];

    // Cliente (Extraindo nome e país/sobre)
    const clientName = (typeof item.client === 'object') ? item.client.name : 'Cliente Confidencial';
    const clientCountry = (typeof item.client === 'object') ? item.client.country : 'Brasil';
    
    return (
        <motion.section
            className={styles.infosWrapper}
            ref={ref}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={motionVariants}
        >
            <div className={styles.infoList}>
                <div className={styles.infoItem}>
                    <span className={styles.infoItemTitle}>Cliente</span>
                    <span className={styles.infoItemValue}>{ clientName }</span>
                </div>
                <div className={styles.infoItem}>
                    <span className={styles.infoItemTitle}>País</span>
                    <span className={styles.infoItemValue}>{ clientCountry }</span>
                </div>
                <div className={styles.infoItem}>
                    <span className={styles.infoItemTitle}>Ano</span>
                    <span className={styles.infoItemValue}>{ item.year }</span>
                </div>
            </div>
            <div className={styles.infoResume}>
                <div className={styles.infoItem}>
                    <ul className={styles.servicesList}>
                        {services.length > 0 ? (
                            services.map((service, index) => (
                                <li key={index}>{service}</li>
                            ))
                        ) : (
                            <li>Geral</li>
                        )}
                    </ul>
                </div>

                <h2>
                    { item.subtitle }
                </h2>
            </div>
        </motion.section>
    );
}