'use client';

import { useRef } from "react";
import { motion, useInView } from 'framer-motion';
import Image from "next/image";

import styles from './styles.module.scss';

import Profile from "@/../public/images/david-barros-profile-wide.webp";

export function SectionImage() {

    const ref = useRef(null);
    const isInView = useInView(ref, { margin: "0px 0px -100px 0px", once: true });

    const motionVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                delay: 2,
                duration: 0.9,
                ease: [0.16, 1, 0.3, 1] as [number, number, number, number]
            }
        }
    };

    return (
        <section
            ref={ref}
            className={styles.imageWrapper}
        >
            <motion.div 
                className={styles.imageContainer}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                variants={motionVariants}
            >
                <Image
                    src={Profile}
                    alt="David Barros - Designer"
                    loading="lazy"
                    fill
                    style={{ objectFit: 'contain' }}
                />
            </motion.div>
        </section>
    );
}