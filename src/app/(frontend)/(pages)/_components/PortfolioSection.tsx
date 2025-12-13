'use client';

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "@phosphor-icons/react"
import { PortfolioStack } from "./PortfolioStack";
import { Button, Divider } from "@/app/(frontend)/_components/ui";
import styles from './styles.module.scss';

export function PortfolioSection({ trabalhos }: { trabalhos: any[] }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });

    // 1. ADAPTER: Transforma os dados do Notion para o formato que o Card espera
    const items = trabalhos.map((t, i) => ({
        id: t.id,
        index: i, // Importante para a lógica de alternância (par/ímpar)
        title: t.title,
        client: t.client,
        year: t.year,
        services: t.services,
        // O Notion chama de 'thumbnail', o Card espera 'image'
        image: t.thumbnail, 
        link: `/trabalhos/${t.slug}`,
    }));

    return (
        <motion.section
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
            <PortfolioStack items={items} />

            <Divider size="medium" />

            <section className={styles.portfolioAll}>
                <div className={styles.portfolioAllContent}>
                    <h2>From beautiful marketing websites to fun, intuitive mobile apps, all the way to powerful, data-driven SaaS dashboards that your clients will love to use.</h2>
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