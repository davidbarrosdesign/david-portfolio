'use client'

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { MarqueeClients } from "@/app/(frontend)/_components/ui";

import styles from "./styles.module.scss";

// Interface para receber os dados
interface ClientsSectionProps {
  clients: any[]; // Tipagem rápida, pode melhorar depois
}

export function ClientsSection({ clients }: ClientsSectionProps) {

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
                <h2>Sempre trabalhando ao lado de grandes marcas do mercado.</h2>

                <p>Cada cliente é um novo desafio e uma nova vontade de resolver problemas complexos. Tenho a sorte de trabalhar com muitas marcas e empresas que valorizam a criatividade e a qualidade.</p>

                <p>Conheça algumas delas:</p>
            </div>

            <MarqueeClients clients={clients} />
        </motion.section>
    );
}