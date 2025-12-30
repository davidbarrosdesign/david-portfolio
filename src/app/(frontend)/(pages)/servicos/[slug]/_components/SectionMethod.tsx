'use client';

import Image from 'next/image';
import { useRef } from "react";
import { motion, useInView } from 'framer-motion';
import { AnimatedIcon } from "@/app/(frontend)/_components/ui";
import { Service } from "@/payload-types";
import styles from "./styles.module.scss";

export function SectionMethod({ item }: { item: Service }) {

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
            className={styles.methodWrapper}
        >
            <div className={styles.methodTitle}>
                <span>Workflow</span>
            </div>

            <div className={styles.methodContent}>
                {item.process?.map((process, index) => (
                    <motion.div
                        key={index}
                        className={styles.methodItem}
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{
                            duration: 0.7,
                            delay: 0.25 + (index * 0.25),
                            ease: [0.16, 1, 0.3, 1]
                        }}
                    >
                        <div className={styles.methodOrder}>
                            <div className={styles.iconWrapper}>
                                {process.iconCode ? (
                                    <div className={styles.iconContainer}>
                                        <AnimatedIcon 
                                            svgCode={process.iconCode} 
                                            className={styles.iconCode} 
                                        />
                                    </div>
                                ) : (
                                (() => {
                                    const iconSrc = typeof process.icon === 'string' ? process.icon : process.icon?.url;

                                    return iconSrc ? (
                                        <Image
                                            src={iconSrc}
                                            alt={process.title || ''}
                                            width={100}
                                            height={100}
                                            className={styles.icon}
                                        />
                                    ) : null;
                                })()
                                )}
                            </div>
                        </div>

                        <div className={styles.methodText}>
                            <h4>{process.title}</h4>
                            <p>{process.description}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.section>
    );
}