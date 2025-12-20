'use client'

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

import TestimonialStack from "../testimonial-card/TestimonialStack";
import styles from "./TestimonialSection.module.scss";
import { Testimonial } from "@/payload-types";

export function TestimonialSection({ depoimentos }: { depoimentos: Testimonial[] }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { margin: "0px 0px -100px 0px", once: true });

    if (!Array.isArray(depoimentos)) return null;

    // MAPEAMENTO: Payload -> Formato do Card
    const items = depoimentos.map((t: Testimonial) => {
        // Tratamento de segurança para o nome da empresa
        const clientName = (typeof t.client === 'object' && t.client?.name) 
            ? t.client.name 
            : '';

        return {
            index: t.id,
            // No Payload criamos 'author' para o nome da pessoa
            title: t.author, 
            // No Payload criamos 'authorRole' para o cargo
            jobTitle: t.authorRole, 
            // Pegamos o nome do cliente através do relacionamento
            company: clientName ? `- ${clientName}` : '', 
            // No Payload o texto é 'content'
            testimonial: t.content, 
        };
    });



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