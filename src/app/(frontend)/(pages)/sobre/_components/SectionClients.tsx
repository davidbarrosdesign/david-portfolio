'use client';

import { useRef } from "react";
import { motion, useInView } from 'framer-motion';
import { MarqueeClients } from '@/app/(frontend)/_components/ui';

import { Client } from "@/payload-types";

import styles from './styles.module.scss';

// Interface para receber os dados
interface ClientsSectionProps {
  clients: Client[];
}

export function SectionClients({ clients }: ClientsSectionProps) {

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
            className={styles.clientsSection}
        >
            <span>Algumas marcas e agências que atendi</span>    
            <MarqueeClients clients={clients} />
        </motion.section>
    );
}