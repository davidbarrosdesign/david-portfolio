'use client';

import { useRef } from 'react';
import { motion, useInView } from "framer-motion";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "@phosphor-icons/react";

import { useTransition } from "@/app/(frontend)/_context/TransitionContext";
import { Button } from "../../ui";
import styles from "./HeroPage.module.scss";

export function HeroPage({
    title,
    page
}: {
    title: string;
    page?: string;
}) {

    const router = useRouter();

    const { startTransition } = useTransition();

    const handleGoBack = () => {
        startTransition(() => {
            router.back();
        });
    };

    const ref = useRef(null);
    const isInView = useInView(ref, { margin: "0px 0px -10% 0px", once: true });

    const revealVariants = {
        hidden: { 
            y: "100%",
            opacity: 0,
            filter: "blur(20px)",
        },
        visible: {
            y: "0%",
            opacity: 1,
            filter: "blur(0px)",
            transition: {
                delay: 1,
                duration: 2,
                ease: [0.16, 1, 0.3, 1] as const,
            }
        }
    };

    return (
        <section className={styles.hero} ref={ref}>
            <motion.div
                className={styles.heroWrapper}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
            >
                <div className={styles.heroTitle}>
                    <Button
                        onClick={handleGoBack}
                        target="_self"
                        size="large"
                        style="ghost"
                        color="black"
                        icon={ArrowLeft}
                        iconPosition="left"
                    >
                        Voltar
                    </Button>
                    <div className={styles.titleMask}>
                        <motion.span variants={revealVariants} className={styles.pageName}>
                            { page }
                        </motion.span>
                    </div>
                    <h1 className={styles.titleMask}>
                        <motion.span variants={revealVariants} className={styles.title}>
                            { title }
                        </motion.span>
                    </h1>
                </div>
            </motion.div>
        </section>
    );
}