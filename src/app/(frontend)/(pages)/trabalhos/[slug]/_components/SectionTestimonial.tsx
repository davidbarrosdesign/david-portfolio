'use client';

import { useRef } from "react";
import { motion, useInView } from 'framer-motion';
import { Testimonial } from "@/payload-types";
import styles from './styles.module.scss';

export function SectionTestimonial({ testimonial }: { testimonial: Testimonial }) {

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

    const company = (typeof testimonial.client === 'object') ? testimonial.client.name : 'Cliente Confidencial';

    return (
        <motion.article
            className={styles.testimonialWrapper}
            ref={ref}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={motionVariants}
        >            
            <blockquote className={styles.quote}>
                &quot;{testimonial.content}&quot;
            </blockquote>

            <div className={styles.authorInfo}>
                <span className={styles.name}>{testimonial.author}</span>
                <span className={styles.role}>
                    {testimonial.authorRole} {company && `• ${company}`}
                </span>
            </div>
        </motion.article>
    );
}
    