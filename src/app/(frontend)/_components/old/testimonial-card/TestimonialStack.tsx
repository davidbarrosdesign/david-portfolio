'use client';

import { useRef, useState, useEffect } from "react";
import { ArrowLeft, ArrowRight } from "@phosphor-icons/react";

import TestimonialCard from "./TestimonialCard";
import styles from "./TestimonialCard.module.scss";

export default function TestimonialStack({ items }: { items: any[] }) {
    const trackRef = useRef<HTMLDivElement | null>(null);
    const [index, setIndex] = useState(0);

    const hasMultiple = items.length > 1;
    // Função para ir para o slide anterior
    function prev() {
        if (!hasMultiple) return;
        setIndex((i) => Math.max(i - 1, 0));
    }

    // Função para ir para o próximo slide
    function next() {
        if (!hasMultiple) return;
        setIndex((i) => Math.min(i + 1, items.length - 1));
    }

    // Drag manual
    useEffect(() => {
        if (!trackRef.current) return;

        const track = trackRef.current;
        let startX = 0;
        let dragging = false;

        function onDown(e: any) {
            dragging = true;
            startX = e.touches ? e.touches[0].clientX : e.clientX;
        }

        function onMove(e: any) {
            if (!dragging) return;

            const x = e.touches ? e.touches[0].clientX : e.clientX;
            const diff = x - startX;

            // se arrastar mais de 60px já troca
            if (diff > 60) {
                prev();
                dragging = false;
            }
            if (diff < -60) {
                next();
                dragging = false;
            }
        }

        function onUp() {
            dragging = false;
        }

        track.addEventListener("mousedown", onDown);
        track.addEventListener("mousemove", onMove);
        track.addEventListener("mouseup", onUp);
        track.addEventListener("mouseleave", onUp);

        track.addEventListener("touchstart", onDown);
        track.addEventListener("touchmove", onMove);
        track.addEventListener("touchend", onUp);

        return () => {
            track.removeEventListener("mousedown", onDown);
            track.removeEventListener("mousemove", onMove);
            track.removeEventListener("mouseup", onUp);
            track.removeEventListener("mouseleave", onUp);

            track.removeEventListener("touchstart", onDown);
            track.removeEventListener("touchmove", onMove);
            track.removeEventListener("touchend", onUp);
        };
    }, []);

    // Atalhos de teclado ← e →
    useEffect(() => {
        function handleKey(e: KeyboardEvent) {
            if (e.key === "ArrowLeft") prev();
            if (e.key === "ArrowRight") next();
        }

        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, []);

    return (
        <div className={styles.carouselShell}>

            <div className={styles.carouselViewport}>
                <div
                    className={styles.carouselTrack}
                    ref={trackRef}
                    style={{
                        transform: `translateX(-${index * 100}%)`,
                    }}
                >
                    {items.map((item, i) => (
                        <div
                            key={i}
                            className={`${styles.carouselItem} ${i === index ? styles.active : styles.inactive
                                }`}
                        >
                            <TestimonialCard data={item} />
                        </div>
                    ))}
                </div>
            </div>

            {hasMultiple && (
                <div className={styles.carouselArrows}>
                    <button className={styles.arrowLeft} onClick={prev}><ArrowLeft size={16} /></button>
                    <button className={styles.arrowRight} onClick={next}><ArrowRight size={16} /></button>
                </div>
            )}
        </div>
    );
}