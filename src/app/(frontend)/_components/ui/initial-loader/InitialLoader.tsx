'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import styles from './InitialLoader.module.scss';

export function InitialLoader() {
    // Começa true para garantir que apareça no primeiro render
    const [isLoading, setIsLoading] = useState(true);
    // Estado para controlar a barra de progresso (0 a 100)
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        // 1. VERIFICAÇÃO DE SESSÃO
        // Se já tiver o item no sessionStorage, significa que não é a primeira visita na aba.
        // Pulamos o loader imediatamente.
        if (sessionStorage.getItem("site_loaded_in_this_session")) {
            setIsLoading(false);
            return;
        }

        // Se chegou aqui, é a primeira visita. Marcamos no storage.
        sessionStorage.setItem("site_loaded_in_this_session", "true");

        // 2. LÓGICA DA BARRA DE PROGRESSO
        // Inicia uma animação "fake" da barra até 90% em 2.5 segundos
        const progressInterval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 90) {
                    clearInterval(progressInterval);
                    return 90;
                }
                // Aumenta um pouco por vez, aleatoriamente para parecer real
                return prev + Math.random() * 10;
            });
        }, 200);


        // 3. DETECÇÃO DO CARREGAMENTO REAL
        const handleLoad = () => {
            // Quando tudo carregar:
            clearInterval(progressInterval); // Para a animação fake
            setProgress(100); // Força a barra para 100%

            // Dá um pequeno delay para o usuário ver a barra cheia antes de subir a cortina
            setTimeout(() => {
                setIsLoading(false);
            }, 500);
        };

        // Verifica se a página já carregou (caso o script rode depois do evento)
        if (document.readyState === "complete") {
            handleLoad();
        } else {
            // Se não, espera o evento oficial do navegador
            window.addEventListener('load', handleLoad);
        }

        // Limpeza
        return () => {
            window.removeEventListener('load', handleLoad);
            clearInterval(progressInterval);
        };
    }, []);

    return (
        // AnimatePresence permite animar a saída do componente do DOM
        <AnimatePresence>
            {isLoading && (
                <motion.div 
                    className={styles.loaderContainer}
                    // Animação de saída "Curtain Down" (Deslizar para baixo)
                    initial={{ y: 0 }}
                    exit={{ 
                        y: "100%", 
                        transition: { duration: 1, ease: [0.76, 0, 0.24, 1] } // Easing suave estilo "Awwwards"
                    }}
                >
                    <div className={styles.contentWrapper}>
                        {/* SEU LOGO AQUI */}
                        <div className={styles.logoWrapper}>
                            <Image
                                src="/brand/logo-branco-david-barros.svg"
                                alt="Logo"
                                width={32}
                                height={30}
                                priority
                            />
                        </div>

                        {/* BARRA DE PROGRESSO */}
                        <div className={styles.progressContainer}>
                            <motion.div 
                                className={styles.progressBar}
                                // Anima a largura baseada no estado 'progress'
                                initial={{ width: "0%" }}
                                animate={{ width: `${progress}%` }}
                                transition={{ ease: "easeOut" }} // Transição suave da largura
                            />
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}