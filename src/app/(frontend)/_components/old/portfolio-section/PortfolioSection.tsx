'use client'

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

import { PortfolioHomeStack } from "../portfolio-home-card/PortfolioHomeStack";

export function PortfolioSection({ trabalhos }: { trabalhos: any[] }) {

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

    const items = trabalhos.map((t: any) => ({
        index: t.id,
        image: t.thumbnail,
        title: t.title,
        services: t.services,
        client: t.client,
        year: t.year,
        link: `/trabalhos/${t.slug}`,
    }));

    return (
        <motion.section
            ref={ref}
            variants={motionVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
        >
            <PortfolioHomeStack items={items} />
        </motion.section>
    );
}