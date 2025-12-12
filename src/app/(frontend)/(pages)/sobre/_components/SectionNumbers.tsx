'use client';

import { useRef  } from "react";
import { motion, useInView } from 'framer-motion';

import styles from './styles.module.scss';

export function SectionNumbers() {
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
            className={styles.numbersWrapper}
        >
            <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                    duration: 0.7,
                    delay: 0.25,
                    ease: [0.16, 1, 0.3, 1]
                }}
                className={styles.numbersContent}
            >
                <span className={styles.numbersContentNumber}>12+</span>
                <span className={styles.numbersContentText}>anos de experiência</span>
            </motion.div>

            <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                    duration: 0.7,
                    delay: 0.50,
                    ease: [0.16, 1, 0.3, 1]
                }}
                className={styles.numbersContent}
            >
                <span className={styles.numbersContentNumber}>36</span>
                <span className={styles.numbersContentText}>anos de idade</span>
            </motion.div>

            <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                    duration: 0.7,
                    delay: 0.75,
                    ease: [0.16, 1, 0.3, 1]
                }}
                className={styles.numbersContent}
            >
                <span className={styles.numbersContentNumber}>04</span>
                <span className={styles.numbersContentText}>países atendidos</span>
            </motion.div>

            <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                    duration: 0.7,
                    delay: 1.00,
                    ease: [0.16, 1, 0.3, 1]
                }}
                className={styles.numbersContent}
            >
                <span className={styles.numbersContentNumber}>50+</span>
                <span className={styles.numbersContentText}>clientes atendidos</span>
            </motion.div>
        </motion.section>
    );
}