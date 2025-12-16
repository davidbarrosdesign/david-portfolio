'use client';

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useTransition } from "@/app/(frontend)/_context/TransitionContext";
import styles from "./PageTransition.module.scss";

export function PageTransition() {
    const pathname = usePathname();
    const { isTransitioning, finishTransition } = useTransition();
    
    // Estado local para controlar a animação de SAÍDA (revelar nova página)
    // Precisamos disso para desatrelar do estado global 'isTransitioning' visualmente
    const [showLayers, setShowLayers] = useState(false);

    // 1. Quando o contexto diz "tá transitando", mostramos as layers (Animação de cobrir)
    useEffect(() => {
        if (isTransitioning) {
            setShowLayers(true);
        }
    }, [isTransitioning]);

    // 2. Quando a rota muda (pathname altera), iniciamos a animação de revelar
    useEffect(() => {
        // Se a rota mudou e as layers estão visíveis, hora de tirar elas
        if (showLayers) {
            // Pequeno delay para garantir que a página nova carregou o DOM
            const timeout = setTimeout(() => {
                setShowLayers(false);
                finishTransition();
            }, 500); 
            return () => clearTimeout(timeout);
        }
    }, [pathname]); 

    return (
        <AnimatePresence mode="wait">
            {showLayers && (
                <>
                    {/* LAYER 1: PRETA (Sobe primeiro, desce por último ou sobe junto) */}
                    <motion.div
                        className={styles.layerBlack}
                        initial={{ y: "100%" }}
                        animate={{ y: "0%" }}
                        exit={{ y: "-100%" }}
                        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                    />
                    
                    {/* LAYER 2: OFF-WHITE (Sobe com delay, sai com delay) */}
                    <motion.div
                        className={styles.layerWhite}
                        initial={{ y: "100%" }}
                        animate={{ y: "0%" }}
                        exit={{ y: "-100%" }}
                        transition={{ duration: 0.8, delay: 0.5, ease: [0.76, 0, 0.24, 1] }}
                    />
                </>
            )}
        </AnimatePresence>
    );
}