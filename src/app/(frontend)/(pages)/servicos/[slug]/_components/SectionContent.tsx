'use client';

import { useRef } from "react";
import { motion, useInView } from 'framer-motion';
import { Service } from "@/payload-types";
import { DeliverablesList } from "./DeliverablesList";
import styles from "./styles.module.scss";

export function SectionContent({ item }: { item: Service }) {

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
        <div className={styles.serviceSection} ref={ref}>
            <motion.article
                className={styles.serviceWrapper}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                variants={motionVariants}
            >
                <div className={styles.serviceContent}>
                    <p>{item.description}</p>
                </div>
                <div className={styles.serviceDeliverables}>
                    {item.deliverables && (
                        <DeliverablesList deliverables={item.deliverables} />
                    )}
                </div>
            </motion.article>
        </div>
    );
}