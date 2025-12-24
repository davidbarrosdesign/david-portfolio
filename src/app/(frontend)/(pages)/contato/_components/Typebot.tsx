'use client';

import { useRef } from "react";
import { motion, useInView } from 'framer-motion';
import { Standard } from "@typebot.io/react";
import styles from './styles.module.scss';

export function Typebot() {
    
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
        <motion.div
            ref={ref}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={motionVariants}
            className={styles.typebotSection}
            id="typebot"
        >
            <Standard
                typebot="my-typebot-a0v7k3o"
                apiHost="https://typebot.io"
                style={{ width: "100%", height: "800px" }}
            />
        </motion.div>
    );
}