'use client';

import React, { createContext, useContext, useState, ReactNode } from "react";
import { useRouter } from "next/navigation";

interface TransitionContextProps {
    animatePageOut: (href: string) => void;
    startTransition: (callback: () => void) => void; // <--- NOVA FUNÇÃO
    isTransitioning: boolean;
    finishTransition: () => void;
}

const TransitionContext = createContext<TransitionContextProps | null>(null);

export const TransitionProvider = ({ children }: { children: ReactNode }) => {
    const router = useRouter();
    const [isTransitioning, setIsTransitioning] = useState(false);

    // Função padrão para Links (Navegação para frente)
    const animatePageOut = (href: string) => {
        setIsTransitioning(true);
        setTimeout(() => {
            router.push(href);
        }, 800); 
    };

    // --- NOVA FUNÇÃO GENÉRICA (Para Voltar, Submit, etc) ---
    const startTransition = (callback: () => void) => {
        setIsTransitioning(true);
        setTimeout(() => {
            callback(); // Executa o que você pediu (ex: router.back())
        }, 800); // Mesmo tempo da animação
    };
    // -------------------------------------------------------

    const finishTransition = () => {
        setIsTransitioning(false);
    }

    return (
        <TransitionContext.Provider value={{ animatePageOut, startTransition, isTransitioning, finishTransition }}>
            {children}
        </TransitionContext.Provider>
    );
};

export const useTransition = () => {
    const context = useContext(TransitionContext);
    if (!context) throw new Error("useTransition must be used within a TransitionProvider");
    return context;
};