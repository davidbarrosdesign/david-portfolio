'use client'

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { MarqueeClients } from "@/app/(frontend)/_components/ui";

import { Client } from "@/payload-types";
import styles from "./styles.module.scss";

// Interface para receber os dados
interface SectionClientsProps {
  clients: Client[];
}

export function SectionClients({ clients }: SectionClientsProps) {

    const ref = useRef(null);
    const isInView = useInView(ref, { margin: "0px 0px -100px 0px", once: true });

    const motionVariants = {
        hidden: { opacity: 0, y: 50, scale: 1.05 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }
        }
    };

    return (
        <motion.section
            ref={ref}
            className={styles.clients}
            variants={motionVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
        >
            <div className={styles.clientsContent}>
                <h2>Colaborando com os melhores</h2>

                <p>Atuo tanto como consultor direto para fundadores quanto como braço estratégico de UX/UI para agências de performance líderes no mercado.</p>
            </div>

            <MarqueeClients clients={clients} />
        </motion.section>
    );
}