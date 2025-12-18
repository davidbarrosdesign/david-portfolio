'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import styles from './ScrollRevealText.module.scss';

interface ScrollRevealTextProps {
    children: string;
    className?: string;
}

export function ScrollRevealText({ children, className = '' }: ScrollRevealTextProps) {
    // Referência ao container ALTO (que dá o espaço de scroll)
    const containerRef = useRef<HTMLDivElement>(null);
    
    // Monitoramos o scroll APENAS deste container específico
    const { scrollYProgress } = useScroll({
        target: containerRef,
        // A animação começa quando o topo do container bate no topo da tela ('start start')
        // E termina quando o fundo do container bate no fundo da tela ('end end')
        offset: ['start start', 'end end']
    });

    const words = children.split(" ");

    return (
        // 1. O TRILHO (Track): Tem altura extra (ex: 200vh ou 300vh) para permitir o scroll
        <div ref={containerRef} className={styles.track}>
            
            {/* 2. O PALCO (Sticky): Fica fixo no centro enquanto o trilho passa */}
            <div className={styles.stickyContainer}>
                <p className={`${styles.paragraph} ${className}`}>
                    {words.map((word, i) => {
                        // Calcula o "momento" de cada palavra baseado no total de palavras
                        const start = i / words.length;
                        const end = start + (1 / words.length);
                        
                        return (
                            <Word key={i} range={[start, end]} progress={scrollYProgress}>
                                {word}
                            </Word>
                        );
                    })}
                </p>
            </div>
        </div>
    );
}

const Word = ({ children, progress, range }: { children: string, progress: MotionValue<number>, range: [number, number] }) => {
    // Opacidade vai de 0.1 (apagado) a 1 (aceso)
    const opacity = useTransform(progress, range, [0.1, 1]);
    
    return (
        <span className={styles.wordWrapper}>
            <motion.span style={{ opacity }} className={styles.word}>
                {children}
            </motion.span>
        </span>
    );
}