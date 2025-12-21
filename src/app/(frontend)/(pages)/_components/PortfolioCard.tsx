'use client';

import { useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { ProjectMedia } from "../trabalhos/[slug]/_components/ProjectMedia";
import { TransitionLink } from "@/app/(frontend)/_components/ui";

import styles from "./styles.module.scss";

import { PortfolioCardData } from "./types";

interface PortfolioCardProps {
    data: PortfolioCardData;
    index: number;
}

export function PortfolioCard({ data, index }: PortfolioCardProps) {
    const isReversed = index % 2 !== 0;

    const [isHovered, setIsHovered] = useState(false);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const smoothX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
    const smoothY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

    const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
        // Pega a posição do mouse relativa ao card
        const rect = e.currentTarget.getBoundingClientRect();
        x.set(e.clientX - rect.left);
        y.set(e.clientY - rect.top);
    };

    return (
        <TransitionLink
            href={data.link}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <article
                className={`${styles.card} ${isReversed ? styles.reversed : ''}`}
                onMouseMove={handleMouseMove}
            >
                <motion.div 
                    className={`${styles.gridHoverCursor} ${isHovered ? styles.visible : ''}`}
                    style={{ 
                        left: smoothX, 
                        top: smoothY 
                    }}
                >
                    Visualizar
                </motion.div>
                
                {/* COLUNA DE CONTEÚDO (Texto) */}
                <div className={styles.cardContent}>
                    <div className={styles.metaTop}>
                        <span className={styles.client}>{data.client}</span>
                        <span className={styles.year}>{data.year}</span>
                    </div>

                    <h3 className={styles.title}>
                        {data.title}
                    </h3>

                    <div className={styles.servicesList}>
                        <ul>
                            {data.services?.map((s: string) => (
                                <li key={s}>{s}</li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* COLUNA DE MÍDIA (Imagem/Vídeo) */}
                <div className={styles.cardMedia}>
                    <div className={styles.mediaWrapper}>
                        {data.image ? (
                            <ProjectMedia
                                resource={data.image}
                                alt={data.title}
                                fill={true} // Preenche o pai (mediaWrapper)
                                className={styles.projectImage} // Mantém sua classe de estilo para bordas/etc
                            />
                        ) : (
                            <div className={styles.fallback}>
                                <span>Preview indisponível</span>
                            </div>
                        )}
                    </div>
                </div>
            </article>
        </TransitionLink>
    );
}