'use client';

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { DeliverableAccordion } from "./DeliverableAccordion";
import { ProcessCard } from "./ProcessCard";
import { ProjectCard } from "./ProjectCard";
import styles from './styles.module.scss';

interface ServiceSectionProps {
    data: {
        title: string;
        description: string;
        // Atualizamos a tipagem para ser flexível com o Payload
        project: { 
            client: string; 
            url: string; 
            thumbnail: any; // Aceita string ou objeto Media
        }[];
        deliverables: { title: string; description: string }[];
        process: { order: string; title: string; description: string }[];
    };
    index: number;
}

export function ServiceSection({ data, index }: ServiceSectionProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { margin: "0px 0px -20% 0px", once: true });

    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const handleToggle = (i: number) => {
        setOpenIndex(openIndex === i ? null : i);
    };

    // Verificação de segurança para garantir que existe projeto antes de renderizar
    const hasProject = data.project && data.project.length > 0;

    return (
        <motion.section 
            ref={ref}
            className={styles.serviceSection}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: index * 0.1 }}
        >
            <div className={styles.serviceWrapper}>
                {/* COLUNA ESQUERDA */}
                <div className={styles.leftColumn}>
                    <div className={styles.content}>
                        <h2 className={styles.title}>{data.title}</h2>
                        {data.description && (
                            <p className={styles.description}>{data.description}</p>
                        )}
                    </div>

                    {/* Renderiza o Card do Projeto se houver */}
                    {hasProject && (
                        <div className={styles.project}>
                            {data.project.map((item, i) => (
                                <ProjectCard key={i} item={item} />
                            ))}
                        </div>
                    )}
                </div>

                {/* COLUNA DIREITA */}
                <div className={styles.rightColumn}>
                    <h5 className={styles.label}>Entregáveis</h5>
                    <div className={styles.deliverablesList}>
                        {data.deliverables.map((item, i) => (
                            <DeliverableAccordion 
                                key={i} 
                                item={item}
                                isOpen={i === openIndex}
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