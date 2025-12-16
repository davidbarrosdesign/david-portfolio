'use client';

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

import styles from "./styles.module.scss";
import { TransitionLink } from "@/app/(frontend)/_components/ui";

interface PortfolioCardProps {
    data: any;
    index: number;
}

export function PortfolioCard({ data, index }: PortfolioCardProps) {
    const [isLoaded, setIsLoaded] = useState(false);

    // Lógica para alternar: Pares (0, 2...) normal, Ímpares (1, 3...) invertido
    const isReversed = index % 2 !== 0;

    const isVideo =
        data.image?.endsWith(".mp4") ||
        data.image?.endsWith(".webm") ||
        data.image?.includes("video");

    const hasThumbnail = data.image && data.image !== "";

    return (
        <TransitionLink href={data.link}>
            <article className={`${styles.card} ${isReversed ? styles.reversed : ''}`}>
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
                        {/* LOADER */}
                        <AnimatePresence>
                            {!isLoaded && (
                                <motion.div
                                    initial={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.5 }}
                                    className={styles.loaderSkeleton}
                                />
                            )}
                        </AnimatePresence>

                        {/* IMAGEM / VIDEO */}
                        {isVideo ? (
                            <video
                                src={data.image}
                                autoPlay
                                loop
                                muted
                                playsInline
                                onLoadedData={() => setIsLoaded(true)}
                            />
                        ) : hasThumbnail ? (
                            <Image
                                src={data.image}
                                alt={data.title}
                                fill
                                sizes="(max-width: 768px) 100vw, 50vw"
                                priority={index === 0} // Prioriza a primeira imagem
                                style={{
                                    objectFit: "contain",
                                    opacity: isLoaded ? 1 : 0,
                                    transition: "opacity 0.6s ease-out"
                                }}
                                onLoad={() => setIsLoaded(true)}
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