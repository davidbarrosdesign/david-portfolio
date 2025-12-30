'use client';

import { useRef } from "react";
import { motion, useInView } from 'framer-motion';
import { ProjectMedia } from "@/app/(frontend)/_utils/ProjectMedia";
import { Project } from "@/payload-types";
import styles from './styles.module.scss';

export function SectionThumbnail({ item }: { item: Project }) {

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
        <section className={styles.heroThumbnail} ref={ref}>
            <motion.div
                className={styles.heroThumbnailWrapper}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                variants={motionVariants}
            >
                <ProjectMedia 
                    resource={item.thumbnail} 
                    fill={true}
                    alt={item.title}
                    className={styles.heroThumbnailImg}
                />
            </motion.div>
        </section>
    );
}