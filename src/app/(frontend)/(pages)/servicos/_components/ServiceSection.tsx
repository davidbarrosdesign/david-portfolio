'use client';

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { DeliverableAccordion } from "./DeliverableAccordion";
import { ProcessCard } from "./ProcessCard";
import styles from './styles.module.scss';

interface ServiceSectionProps {
    data: {
        title: string;
        description: string;
        deliverables: { title: string; description: string }[];
        process: { order: string; title: string; description: string }[];
    };
    index: number;
}

export function ServiceSection({ data, index }: ServiceSectionProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { margin: "0px 0px -20% 0px", once: true });

    // Estado para controlar qual item está aberto (null = nenhum)
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const handleToggle = (i: number) => {
        // Se clicar no que já está aberto, fecha (null). Se não, abre o novo (i).
        setOpenIndex(openIndex === i ? null : i);
    };

    return (
        <motion.section 
            ref={ref}
            className={styles.serviceSection}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: index * 0.1 }}
        >
            <div className={styles.serviceWrapper}>
                {/* COLUNA ESQUERDA (MANTÉM IGUAL) */}
                <div className={styles.leftColumn}>
                    <div className={styles.content}>
                        <h2 className={styles.title}>{data.title}</h2>
                        {data.description && (
                            <p className={styles.description}>{data.description}</p>
                        )}
                    </div>

                    <div className={styles.project}>
                        <p>Projeto</p>
                    </div>
                </div>

                {/* COLUNA DIREITA (Passamos o controle para os filhos) */}
                <div className={styles.rightColumn}>
                    <h5 className={styles.label}>Entregáveis</h5>
                    <div className={styles.deliverablesList}>
                        {data.deliverables.map((item, i) => (
                            <DeliverableAccordion 
                                key={i} 
                                item={item}
                                // O item está aberto se o índice dele for igual ao estado do pai
                                isOpen={i === openIndex}
                                // Passamos a função para ele avisar quando foi clicado
                                onToggle={() => handleToggle(i)}
                            />
                        ))}
                    </div>
                </div>
            </div>

            <div className={styles.processWrapper}>
                <h3>
                    Processos bem definidos,
                    <span>entregáveis claros e prazos realistas.</span>
                </h3>
                <div className={styles.processList}>
                    {data.process.map((item, i) => (
                        <ProcessCard 
                            key={i} 
                            item={item}
                        />
                    ))}
                </div>
            </div>
        </motion.section>
    );
}