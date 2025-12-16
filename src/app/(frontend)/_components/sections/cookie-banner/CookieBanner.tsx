'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from '@phosphor-icons/react';
import { Button, TransitionLink } from '@/app/(frontend)/_components/ui';
import styles from './CookieBanner.module.scss';

export function CookieBanner() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Verifica se o usuário já escolheu
        const consent = localStorage.getItem('cookie_consent');
        
        // Se não tiver escolha salva, mostra o banner após 2 segundos
        if (!consent) {
            const timer = setTimeout(() => setIsVisible(true), 2000);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('cookie_consent', 'true');
        setIsVisible(false);
        
        // Avisa o site que o consentimento foi aceito
        window.dispatchEvent(new Event('cookie_consent_updated'));
    };

    const handleDecline = () => {
        localStorage.setItem('cookie_consent', 'false');
        setIsVisible(false);
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    className={styles.bannerWrapper}
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                    <div className={styles.content}>
                        <p>
                            Usamos cookies para melhorar sua experiência e analisar o tráfego. 
                            Ao continuar, você concorda com nossa{' '}
                            <TransitionLink href="/privacidade" className={styles.link}>
                                Política de Privacidade
                            </TransitionLink>.
                        </p>
                    </div>
                    
                    <div className={styles.actions}>
                        <Button
                            onClick={handleDecline}
                            style="outline"
                            color="white"
                            size="medium"
                        >
                            Recusar
                        </Button>
                        <Button
                            onClick={handleAccept}
                            style="solid"
                            color="black"
                            size="medium"
                        >
                            Aceitar
                        </Button>
                    </div>

                    <button 
                        onClick={() => setIsVisible(false)} 
                        className={styles.btnClose}
                        aria-label="Fechar"
                    >
                        <X size={16} />
                    </button>
                </motion.div>
            )}
        </AnimatePresence>
    );
}