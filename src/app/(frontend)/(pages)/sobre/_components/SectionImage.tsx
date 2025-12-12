'use client';

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from 'framer-motion';

import styles from './styles.module.scss';

import Profile from "@/../public/images/about-image.webp";

export function SectionImage() {

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

    return (
        <motion.section
            ref={ref}
            variants={motionVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className={styles.imageWrapper}
        >
            <div className={styles.imageContainer}>
                <Image
                    src={Profile}
                    alt="Profile"
                    loading="lazy"
                    fill
                    style={{ objectFit: 'contain' }}
                />
            </div>
        </motion.section>
    );
}