'use client';

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from 'framer-motion';
import { ArrowDown } from '@phosphor-icons/react';
import styles from "./styles.module.scss";

import Profile from "@/../public/images/david-barros-profile-wide.webp";

export function SectionContent() {

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

    function handleScroll() {
        window.scrollTo({
            top: document.getElementById("typebot")?.offsetTop || 0,
            behavior: "smooth"
        });
    }

    return (
        <div className={styles.contentSection} ref={ref}>
            <motion.div
                className={styles.contentWrapper}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                variants={motionVariants}
            >
                <div className={styles.description}>
                    <div className={styles.title}>
                        <h2>Seja para criar algo do zero, otimizar sua conversão ou integrar Inteligência Artificial ao seu fluxo, estou pronto para ajudar seu negócio a escalar.</h2>
                    </div>

                    <div className={styles.contact}>
                        <h4>Consultoria Instantânea e Inteligente</h4>

                        <p>Fale com o Geniozinho, meu assistente virtual, abaixo para descrever seu projeto em menos de 2 minutos. Isso me ajuda a chegar na nossa primeira reunião já com uma análise prévia e soluções em mente.</p>

                        <div
                            className={styles.button}
                            onClick={handleScroll}
                        >
                            <ArrowDown size={20} />
                        </div>
                    </div>
                </div>

                <div className={styles.image}>
                    <div className={styles.imageWrapper}>
                        <Image
                            src={Profile}
                            alt="David Barros - Designer brasileiro com mais de 12 anos de experiência"
                            loading="lazy"
                            fill
                        />
                    </div>
                </div>
            </motion.div>
        </div>
    );
}