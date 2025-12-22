'use client';

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ServiceSection } from "./ServiceSection";
import { Service } from "../types";
import styles from './styles.module.scss';

gsap.registerPlugin(ScrollTrigger);

export function ServicesList({ services }: { services: Service[] }) {

    const containerRef = useRef<HTMLDivElement>(null);
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

    useGSAP(() => {
        if (!cardRefs.current.length) return;
        
        // Filtra nulos para segurança
        const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];

        cards.forEach((card, i) => {
            const isLast = i === cards.length - 1;

            // 1. Efeito de PIN (Fixar o card no topo)
            if (!isLast) {
                ScrollTrigger.create({
                    trigger: card,
                    start: "top top", // Começa quando o topo do card bate no topo da tela
                    endTrigger: cards[cards.length - 1], // Termina quando o último card chega
                    end: "top top",
                    pin: true,
                    pinSpacing: false, // Importante para que o próximo passe "por cima"
                    // markers: true, // Descomente para debugar
                });
            }

            // 2. Efeito de Escala e Escurecimento (Profundidade)
            if (!isLast) {
                ScrollTrigger.create({
                    trigger: cards[i + 1], // Gatilho é a entrada do PRÓXIMO card
                    start: "top bottom",   // Quando o topo do próximo entra na base da tela
                    end: "top top",        // Até o topo do próximo bater no topo da tela
                    scrub: true,           // Vincula ao scroll
                    onUpdate: (self) => {
                        const p = self.progress;
                        // Card de trás diminui levemente (0.95)
                        const scale = 1 - p * 0.05; 
                        // Overlay escuro aumenta opacidade
                        const afterOpacity = p * 0.4; 

                        gsap.set(card, {
                            scale: scale,
                            "--after-opacity": afterOpacity,
                        });
                    },
                });
            }
        });

    }, { scope: containerRef, dependencies: [services] });

    if (!services || !Array.isArray(services)) {
        return <p>Carregando serviços...</p>;
    }
    
    return (
        <div className={styles.mainWrapper} ref={containerRef}>
            {services.map((service, i) => (
                // Wrapper que o GSAP vai controlar (o "Card" físico)
                <div 
                    key={i} 
                    className={styles.serviceCardWrapper}
                    ref={(el) => { cardRefs.current[i] = el; }}
                >
                    <ServiceSection
                        data={service} 
                        index={i} 
                    />
                </div>
            ))}
        </div>
    );
}