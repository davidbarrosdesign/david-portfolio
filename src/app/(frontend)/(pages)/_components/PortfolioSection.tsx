'use client';

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "@phosphor-icons/react"
import { PortfolioStack } from "./PortfolioStack";
import { Button, Divider } from "@/app/(frontend)/_components/ui";
import styles from './styles.module.scss';
import { PortfolioCardData } from "./types";

export interface PortfolioItem {
    id: string;
    title: string;
    client: string;
    year: string;
    services: string[];
    thumbnail: string;
    slug: string;
}

export function PortfolioSection({ trabalhos }: { trabalhos: PortfolioItem[] }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });

    const motionVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.9,
                ease: [0.16, 1, 0.3, 1] as [number, number, number, number]
            }
        }
    };

    // 1. ADAPTER: Transforma os dados do Notion para o formato que o Card espera
    const items: PortfolioCardData[] = trabalhos.map((t, i) => ({
        id: t.id,
        index: i,
        title: t.title,
        client: t.client,
        year: t.year,
        services: t.services,
        image: t.thumbnail, 
        link: `/trabalhos/${t.slug}`,
    }));

    return (
        <motion.section
            ref={ref}
            variants={motionVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
        >
            <PortfolioStack items={items} />

            <Divider size="medium" />

            <section className={styles.portfolioAll}>
                <div className={styles.portfolioAllContent}>
                    <h2>Desde sites de primeira linha, produtos digitais, marcas e experiências de usuário, criei soluções que transformam ideias em realidade.</h2>
                </div>
                <div className={styles.portfolioAllButton}>
                        <Button
                            href="/trabalhos"
                            target="_self"
                            size="large"
                            style="ghost"
                            color="black"
                            icon={ ArrowRight }
                        >
                            Ver todos os trabalhos
                        </Button>
                </div>
            </section>
        </motion.section>
    );
}