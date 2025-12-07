'use client'

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

import styles from "./ClientsHome.module.scss";

import { MarqueeClients } from "../../parts";

export function ClientsHome() {

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
                <h2>Sempre trabalhando ao lado de <span>grandes marcas</span> do mercado.</h2>

                <p>De produtos digitais a estratégias criativas, eu defino, projeto e lanço ideias que revelam potencial oculto. O sucesso dos meus clientes é o meu também!</p>
            </div>

            <MarqueeClients />
        </motion.section>
    );
}