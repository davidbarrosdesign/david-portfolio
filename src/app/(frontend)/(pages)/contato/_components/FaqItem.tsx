'use client';

import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "@phosphor-icons/react";

import styles from './styles.module.scss';

interface FaqItemProps {
    item: { question: string; answer: string };
    isOpen: boolean;
    onToggle: () => void;
}

export function FaqItem({ item, isOpen, onToggle }: FaqItemProps) {
    return (
        <motion.div
            layout
            onClick={onToggle}
            className={`${styles.faqItem} ${isOpen ? styles.open : ''}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
        >
            <div className={styles.faqHeader}>
                <span className={styles.question}>{item.question}</span>
                <div className={styles.icon}>
                    <AnimatePresence mode="wait" initial={false}>
                        {isOpen ? (
                            <motion.div
                                key="minus"
                                initial={{ rotate: -90, opacity: 0 }}
                                animate={{ rotate: 0, opacity: 1 }}
                                exit={{ rotate: 90, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className={styles.icon}
                            >
                                <Minus size={10} />
                            </motion.div>
                        ) : (
                            <motion.div
                                key="plus"
                                initial={{ rotate: 90, opacity: 0 }}
                                animate={{ rotate: 0, opacity: 1 }}
                                exit={{ rotate: -90, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className={styles.icon}
                            >
                                <Plus size={10} />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
                        className={styles.faqBody}
                    >
                        <div className={styles.answerWrapper}>
                            <p>{item.answer}</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}