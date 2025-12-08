'use client'

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

import TestimonialStack from "../testimonial-card/TestimonialStack";
import styles from "./TestimonialSection.module.scss";

export function TestimonialSection({ depoimentos }: { depoimentos: any[] }) {
    if (!Array.isArray(depoimentos)) return null;

    const items = depoimentos.map((t: any) => ({
        index: t.id,
        title: t.title,
        jobTitle: t.jobTitle,
        company: t.company,
        testimonial: t.testimonial,
    }));

    const ref = useRef(null);
    const isInView = useInView(ref, { margin: "0px 0px -100px 0px", once: true });

    const motionVariants = {
        hidden: { opacity: 0, y: 100 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }
        }
    };

    return (
        <motion.section
            ref={ref}
            className={styles.testimonialsSection}
            variants={motionVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
        >
            <TestimonialStack items={items} />
        </motion.section>
    );
}