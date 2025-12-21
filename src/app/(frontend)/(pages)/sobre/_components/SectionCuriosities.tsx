'use client';

import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue, useInView } from "framer-motion";
import Image, { StaticImageData } from "next/image";

import styles from "./styles.module.scss";

import PortoAlegre from "@/../public/images/porto-alegre-ccmq.webp";
import Niteroi from "@/../public/images/niteroi-mac.webp";
import PoaIbereCamargo from "@/../public/images/poa-ibere-camargo.webp";
import NovaFriburgo from "@/../public/images/nova-friburgo.webp";
import Montanhas from "@/../public/images/montanhas.webp";
import Piano from "@/../public/images/piano.webp";
import Confeitaria from "@/../public/images/confeitaria.webp";

export const data_curiosities = [
    {
        id: 1,
        text: "Nasci em Porto Alegre, no sul do Brasil, em 1989",
        image: PortoAlegre,
        imageAlt: "Casa de Cultura Mario Quintana, em Porto Alegre"
    },
    {
        id: 2,
        text: "Me mudei para a cidade de Niterói, no Rio de Janeiro, em 2005",
        image: Niteroi,
        imageAlt: "Museu de Arte Contemporânea, o MAC, em Niterói"
    },
    {
        id: 3,
        text: "Antes do design, fui músico profissional por cerca de 5 anos",
        image: Piano,
        imageAlt: "Músico tocando piano"
    },
    {
        id: 4,
        text: "Sou apaixonado por arquitetura, fotografia, design e música",
        image: PoaIbereCamargo,
        imageAlt: "Museu Iberê Camargo, em Porto Alegre"
    },
    {
        id: 5,
        text: "Hoje moro em Nova Friburgo, na região serrana do Rio de Janeiro",
        image: NovaFriburgo,
        imageAlt: "Country Clube de Nova Friburgo"
    },
    {
        id: 6,
        text: "Também tenho formação em confeitaria e barista",
        image: Confeitaria,
        imageAlt: "Curso de confeitaria"
    },
    // {
    //     id: 6,
    //     text: "Casado com Mazinha Ouverney e pai da Ana Isabel",
    //     image: Image1,
    // },
    // {
    //     id: 7,
    //     text: "Também pai da Zoe e da Enola, e apaixonado por animais",
    //     image: Image1,
    // },
    {
        id: 8,
        text: "Amo o frio e sua estética, que influencia no meu estilo de design",
        image: Montanhas,
        imageAlt: "Neblina nas montanhas"
    },
];

export function SectionCuriosities() {
    const containerRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(containerRef, { margin: "0px 0px -100px 0px", once: true });

    // Monitora o scroll de TODA a seção
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    const motionVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.9,
                ease: [0.16, 1, 0.3, 1] as [number, number, number, number]
            }
        }
    };

    return (
        <motion.section
            ref={containerRef}
            className={styles.curiositiesContainer}
            variants={motionVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
        >
            <div className={styles.stickyWrapper}>
                
                {/* TEXTO DE FUNDO FIXO */}
                <div className={styles.backgroundTitle}>
                    <span>Curiosidades</span>
                </div>

                {/* PILHA DE CARDS */}
                <div className={styles.curiositiesCards}>
                    {data_curiosities.map((item, index) => {
                        // Calcula o "tempo" de entrada de cada card
                        // O primeiro card já aparece (targetScale 1), os outros entram
                        const rangeStart = index * (1 / data_curiosities.length);
                        const rangeEnd = rangeStart + (1 / data_curiosities.length);

                        return (
                            <Card 
                                key={item.id} 
                                item={item} 
                                index={index}
                                range={[rangeStart, rangeEnd]}
                                progress={scrollYProgress}
                                total={data_curiosities.length}
                            />
                        );
                    })}
                </div>
            </div>
        </motion.section>
    );
}

// --- SUB-COMPONENTE CARD ---
interface CardProps {
    item: { id: number; text: string; image: string | StaticImageData; imageAlt: string };
    index: number;
    range: [number, number];
    progress: MotionValue<number>;
    total: number;
}

function Card({ item, index, range, progress, total }: CardProps) {
    // Se for o primeiro card, ele não precisa "entrar", ele já está lá (ou entra diferente)
    // Para os outros, definimos a entrada vindo da direita/baixo
    
    // Animação de Entrada (X e Y e Rotação)
    // Quando progress é 0 (no inicio do range), ele está longe. Quando é 1, está no centro.
    
    // Ajuste esses valores para mudar a direção da "vinda"
    const x = useTransform(progress, [range[0], range[1]], index === 0 ? ["0%", "0%"] : ["100%", "0%"]);
    const y = useTransform(progress, [range[0], range[1]], index === 0 ? ["0%", "0%"] : ["20%", "0%"]);
    
    // Rotação: começa torto, termina levemente inclinado (randomizado para parecer natural)
    const randomRotate = (index % 2 === 0 ? 2 : -2); 
    const rotate = useTransform(progress, [range[0], range[1]], index === 0 ? [0, randomRotate] : [15, randomRotate]);
    
    // Opacidade: garante que ele não apareça antes da hora
    const opacity = useTransform(progress, [range[0], range[0] + 0.05], index === 0 ? [1, 1] : [0, 1]);

    // Efeito de escala ao ir para trás (quando o próximo entra)
    // O range do próximo card
    const nextStart = range[1];
    const nextEnd = nextStart + (1 / total);
    const scale = useTransform(progress, [nextStart, nextEnd], [1, 0.95]);

    return (
        <motion.div 
            className={styles.cardWrapper}
            style={{ 
                x, 
                y, 
                rotate, 
                opacity,
                scale,
                zIndex: index + 1 // Garante ordem de empilhamento
            }}
        >
            <div className={styles.cardInner}>
                <Image 
                    src={item.image} 
                    alt={item.imageAlt} 
                    fill 
                    className={styles.cardImage}
                />
                <div className={styles.cardOverlay}>
                    <p>{item.text}</p>
                </div>
            </div>
        </motion.div>
    );
}