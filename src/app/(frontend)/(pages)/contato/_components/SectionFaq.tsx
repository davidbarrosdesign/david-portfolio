'use client';

import { useRef, useState } from "react";
import { motion, useInView } from 'framer-motion';
import { FaqItem } from "./FaqItem";
import { Faq } from "@/payload-types";
import styles from './styles.module.scss';

export function SectionFaq({ items }: { items: Faq[] }) {

    const ref = useRef(null);
    const isInView = useInView(ref, { margin: "0px 0px -100px 0px", once: true });

    // Estado para controlar qual item está aberto (0 = primeiro aberto por padrão)
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const handleToggle = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const motionVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }
        }
    };

    // Se não tiver itens, não renderiza a seção (ou renderiza vazia)
    if (!items || items.length === 0) return null;

    return (
        <motion.section
            ref={ref}
            variants={motionVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className={styles.faqSection}
        >
            <div className={styles.faqTitle}>
                <div className={styles.faqTitleWrapper}>
                    <h2>Tire suas dúvidas sobre meu trabalho e como posso te ajudar</h2>
                </div>
            </div>

            <div className={styles.faqContent}>
                {items.map((item, i) => (
                    <FaqItem 
                        key={item.id || i}
                        item={item}
                        isOpen={i === openIndex}
                        onToggle={() => handleToggle(i)}
                    />
                ))}
            </div>
        </motion.section>
    );
}