'use client';

import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "@phosphor-icons/react";
import styles from './styles.module.scss';

interface AccordionProps {
    item: { title: string; description: string };
    isOpen: boolean;       // Recebe do pai: "Estou aberto?"
    onToggle: () => void;  // Recebe do pai: "Função para avisar clique"
}

export function DeliverableAccordion({ item, isOpen, onToggle }: AccordionProps) {
    
    return (
        <motion.div 
            layout 
            onClick={onToggle} // Ao clicar, avisa o pai
            className={`${styles.accordionItem} ${isOpen ? styles.open : ''}`}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
            <motion.div layout="position" className={styles.header}>
                <span className={styles.itemTitle}>{item.title}</span>
                <div className={styles.icon}>
                    {/* Animação suave do ícone */}
                    <AnimatePresence mode="wait" initial={false}>
                        {isOpen ? (
                            <motion.div
                                key="minus"
                                initial={{ rotate: -90, opacity: 0 }}
                                animate={{ rotate: 0, opacity: 1 }}
                                exit={{ rotate: 90, opacity: 0 }}
                                transition={{ duration: 0.2 }}
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
                            >
                                <Plus size={10} />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className={styles.content}
                    >
                        <p>{item.description}</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}