'use client';

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { PortfolioCard } from "./PortfolioCard";
import styles from "./styles.module.scss";

gsap.registerPlugin(ScrollTrigger);

import { PortfolioCardData } from "./types";

export function PortfolioStack({ items }: { items: PortfolioCardData[] }) {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

    useGSAP(
        () => {
            const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];

            cards.forEach((card, i) => {
                const isLast = i === cards.length - 1;

                // Efeito de PIN (Fixar o card enquanto o próximo sobe)
                if (!isLast) {
                    ScrollTrigger.create({
                        trigger: card,
                        start: "top top",
                        endTrigger: cards[cards.length - 1],
                        end: "top top",
                        pin: true,
                        pinSpacing: false,
                    });
                }

                // Efeito de Escala e Rotação suave ao sair
                if (!isLast) {
                    ScrollTrigger.create({
                        trigger: cards[i + 1],
                        start: "top bottom",
                        end: "top top",
                        onUpdate: (self) => {
                            const p = self.progress;
                            // Reduz um pouco a escala do card de trás para dar profundidade
                            const scale = 1 - p * 0.05; 
                            
                            // Removemos a rotação para este layout split, fica mais elegante
                            // Mas se quiser manter, descomente: 
                            // const rotation = (i % 2 === 0 ? 2 : -2) * p;

                            // Opacidade do overlay escuro
                            const afterOpacity = p * 0.4; 

                            gsap.set(card, {
                                scale,
                                // rotation, 
                                "--after-opacity": afterOpacity,
                            });
                        },
                    });
                }
            });
        },
        { scope: containerRef }
    );

    return (
        <section className={styles.portfolioStackContainer} ref={containerRef}>
            {items.map((item, i) => (
                <div
                    key={item.id ?? i}
                    ref={(el) => { cardRefs.current[i] = el; }}
                    className={styles.cardWrapper} // Wrapper para o GSAP controlar
                >
                    {/* Passamos o index para controlar o lado da imagem */}
                    <PortfolioCard data={item} index={i} />
                </div>
            ))}
        </section>
    );
}