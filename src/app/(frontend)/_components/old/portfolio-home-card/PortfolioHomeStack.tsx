'use client';

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { PortfolioHomeCard } from "./PortfolioHomeCard";
import styles from "./PortfolioHomeCard.module.scss";

gsap.registerPlugin(ScrollTrigger);

export function PortfolioHomeStack({ items }: { items: any[] }) {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

    useGSAP(
        () => {
            const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];

            cards.forEach((card, i) => {
                const isLast = i === cards.length - 1;

                // PIN como antes
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

                // scale / rotate / overlay como antes
                if (!isLast) {
                    ScrollTrigger.create({
                        trigger: cards[i + 1],
                        start: "top bottom",
                        end: "top top",
                        onUpdate: (self) => {
                            const p = self.progress;
                            const scale = 1 - p * 0.25;
                            const rotation = (i % 2 === 0 ? 5 : -5) * p;
                            const afterOpacity = p;

                            gsap.set(card, {
                                scale,
                                rotation,
                                "--after-opacity": afterOpacity,
                            });
                        },
                    });
                }
            });

            // Blur no último card
            const last = cards[cards.length - 1];

            if (last) {
                ScrollTrigger.create({
                    trigger: last,
                    start: "top top",
                    end: "bottom top",
                    scrub: true,
                    onUpdate: (self) => {
                        const p = self.progress;
                        gsap.set(last, {
                            "--exit-blur": `${p * 12}px`,
                            "--exit-blur-opacity": p,
                        });
                    },
                });
            }
        },
        { scope: containerRef }
    );

    return (
        <section className={styles.portfolioBigCards} ref={containerRef}>
            {items.map((item, i) => (
                <div
                    key={item.id ?? i}
                    ref={(el) => {
                        cardRefs.current[i] = el;
                    }}
                >
                    <PortfolioHomeCard data={item} />
                </div>
            ))}
        </section>
    );
}
