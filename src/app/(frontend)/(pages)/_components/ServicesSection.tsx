'use client'

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/app/(frontend)/_components/ui";

import styles from './styles.module.scss';

// Definimos o que esperamos receber
interface ServicesHomeProps {
    services: {
        id: string;
        title: string;
        description: string;
        order: string;
    }[];
}

export function ServicesSection({ services }: ServicesHomeProps) {

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

    // Blindagem: Garante que é um array para não quebrar
    const safeServices = Array.isArray(services) ? services : [];

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
                        {safeServices.map((service, index) => (
                            <motion.div
                                key={service.id}
                                className={styles.serviceRow}
                                initial={{ opacity: 0, y: 30 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{
                                    duration: 0.7,
                                    delay: 0.25 + (index * 0.25),
                                    ease: [0.16, 1, 0.3, 1]
                                }}
                            >
                                <article className={styles.serviceCard}>
                                    <div className={styles.serviceCardContent}>
                                        <h3>{service.title}</h3>
                                        <p>{service.description}</p>
                                    </div>
                                </article>
                            </motion.div>
                        ))}

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