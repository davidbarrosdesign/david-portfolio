'use client'

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "@phosphor-icons/react"
import { Button } from "@/app/(frontend)/_components/ui";

import styles from './CallToAction.module.scss';

export function CallToAction({
    content = "Vamos criar juntos um website com estética forte e mensagem clara — pronto para converter.",
    title = "Tem um projeto em mente?",
    linkTitle = "Vamos falar sobre isso!",
    url = "/contato",
    target = "_blank",
}: {
    content?: string;
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
            <div className={styles.ctaWrapper}>
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
                </motion.span>
                <motion.span
                    className={styles.ctaText}
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{
                        duration: 0.7,
                        delay: 0.75,
                        ease: [0.16, 1, 0.3, 1]
                    }}
                >
                    <span>{ content }</span>
                </motion.span>
                <motion.div
                    className={styles.ctaButton}
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{
                        duration: 0.7,
                        delay: 1.00,
                        ease: [0.16, 1, 0.3, 1]
                    }}
                >
                    <Button
                        href={ url }
                        target={ target }
                        size="large"
                        style="ghost"
                        color="black"
                        icon={ ArrowRight }
                    >
                        { linkTitle }
                    </Button>
                </motion.div>
            </div>
        </motion.section>
    )
}
