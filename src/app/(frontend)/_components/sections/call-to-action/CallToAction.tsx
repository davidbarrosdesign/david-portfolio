'use client'

import Link from "next/link";
import clsx from 'clsx';
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

import styles from './CallToAction.module.scss';

export function CallToAction({
    size = "large",
    subTitle = "Vamos trabalhar juntos?",
    title = "Tem um projeto em mente?",
    linkTitle = "Vamos falar sobre isso!",
    url = "/contato",
    target = "_blank",
}: {
    size?: "fit" | "medium" | "large";
    subTitle?: string;
    title?: string;
    linkTitle?: string;
    url?: string;
    target?: "_blank" | "_self";
}) {

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
            className={styles.cta}
            variants={motionVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
        >
            <div className={clsx(styles.ctaWrapper, styles[size])}>
                <motion.span
                        className={styles.ctaTitle}
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{
                            duration: 0.7,
                            delay: 0.25,
                            ease: [0.16, 1, 0.3, 1]
                        }}
                    >
                        { subTitle }
                </motion.span>
                <motion.span
                    className={styles.ctaHeadline}
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{
                        duration: 0.7,
                        delay: 0.50,
                        ease: [0.16, 1, 0.3, 1]
                    }}
                >
                    <span>{ title }</span>
                    <span>
                        <Link
                            href={ url }
                            target={ target}
                        >
                            { linkTitle }
                        </Link>
                    </span>
                </motion.span>
            </div>
        </motion.section>
    )
}
