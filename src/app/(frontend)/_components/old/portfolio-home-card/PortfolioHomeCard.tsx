'use client';

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight } from "@phosphor-icons/react";

import styles from "./PortfolioHomeCard.module.scss";

import { Button } from "../../ui";

export function PortfolioHomeCard({ data }: { data: any }) {

    const [isLoaded, setIsLoaded] = useState(false);

    const isVideo =
        data.image?.endsWith(".mp4") ||
        data.image?.endsWith(".webm") ||
        data.image?.includes("video");

    const hasThumbnail = data.image && data.image !== "";

    return (
        <section className={styles.card}>
            <article className={styles.portfolioBigCard}>
                <div className={styles.portfolioBigCardClient}>
                    <span>{data.client}</span>
                    <span>{data.year}</span>
                </div>

                <div className={styles.portfolioBigCardBanner}>
                    <div
                        className={styles.portfolioBigCardMedia}
                    >
                        <AnimatePresence>
                            {!isLoaded && (
                                <motion.div
                                    initial={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.5 }}
                                    style={{
                                        position: "absolute",
                                        inset: 0,
                                        background: "#fff", // Cor de fundo do loader
                                        zIndex: 2,
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                >
                                    {/* Opcional: Um efeito de 'pulso' simples enquanto carrega */}
                                    <motion.div
                                        animate={{ opacity: [0.5, 1, 0.5] }}
                                        transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                                        style={{ width: "100%", height: "100%", background: "#fafafa" }}
                                    />
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {isVideo ? (
                            <video
                                src={data.image}
                                autoPlay
                                loop
                                muted
                                playsInline
                                className={styles.media}
                                onLoadedData={() => setIsLoaded(true)}
                            />
                        ) : (
                            hasThumbnail ? (
                            <Image
                                src={data.image}
                                alt={data.title}
                                fill
                                style={{
                                    objectFit: "contain",
                                    opacity: isLoaded ? 1 : 0,
                                    transition: "opacity 0.5s ease-in-out"
                                }}
                                onLoad={() => setIsLoaded(true)}
                            />
                            ) : (
                                /* Opcional: Fallback visual se não tiver imagem no Notion */
                                <div style={{ width: '100%', height: '100%', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <span style={{color: '#666'}}>Imagem não encontrada</span>
                                </div>
                            )
                        )}
                    </div>

                    <div className={styles.portfolioBigCardServices}>
                        <ul>
                            {data.services?.map((s: string) => (
                                <li key={s}>{s}</li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className={styles.portfolioBigCardButton}>
                    <Button
                        href={data.link}
                        size="large"
                        style="outline"
                        color="white"
                        icon={ArrowUpRight}
                        iconPosition="right"
                    >
                        Detalhes do projeto
                    </Button>
                </div>
            </article>
        </section>
    );
}
