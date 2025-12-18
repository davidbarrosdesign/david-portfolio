'use client';

import { useRef, useState } from "react";
import { motion, useInView } from 'framer-motion';
import { FaqItem } from "./FaqItem";

import styles from './styles.module.scss';

const faq_data = [
    {
        question: "Você faz apenas o design ou também entrega o produto implementado?",
        answer: "Ofereço soluções completas, desde a estratégia e o design de interface até a implementação técnica. Como designer e desenvolvedor, utilizo tecnologias modernas como Next.js ou plataformas low-code para garantir que a visão criativa seja executada com precisão e performance."
    },
    {
        question: "Como a Inteligência Artificial é integrada aos seus projetos?",
        answer: "Utilizo IA para acelerar processos de pesquisa, gerar assets visuais únicos e otimizar o código. Isso permite entregar projetos mais robustos em menos tempo, focando a energia humana onde ela é insubstituível: na estratégia e na empatia com o usuário."
    },
    {
        question: "Você tem experiência atendendo empresas de outros países?",
        answer: "Sim, tenho experiência global colaborando com empresas no Brasil, Estados Unidos, Espanha e Itália, adaptando o design e a comunicação para diferentes contextos culturais e fusos horários."
    },
    {
        question: "Quais tecnologias você utiliza para garantir sites rápidos e inovadores?",
        answer: "Meu stack principal envolve Next.js e React para alta performance, Framer Motion para animações fluidas e integrações headless (como Notion ou CMS dedicados) para facilitar a gestão de conteúdo."
    },
    {
        question: "Como seu trabalho ajuda a aumentar o faturamento da minha empresa?",
        answer: "Através de Design Estratégico e CRO (Otimização de Conversão). Não crio apenas telas bonitas; projeto fluxos que eliminam fricção, transmitem autoridade e guiam o usuário intuitivamente até a compra ou contato."
    },
    {
        question: "Você trabalha com sistemas complexos ou apenas sites institucionais?",
        answer: "Trabalho com ambos. Tenho vasta experiência em Dashboards, SaaS e plataformas complexas, onde o desafio é transformar grandes volumes de dados em interfaces simples e acionáveis."
    }
];

export function SectionFaq() {

    const ref = useRef(null);
    const isInView = useInView(ref, { margin: "0px 0px -100px 0px", once: true });

    // Estado para controlar qual item está aberto (0 = primeiro aberto por padrão)
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const handleToggle = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const motionVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }
        }
    };

    return (
        <motion.section
            ref={ref}
            variants={motionVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className={styles.faqSection}
        >
            <div className={styles.faqTitle}>
                <div className={styles.faqTitleWrapper}>
                    <h2>Tire suas dúvidas sobre meu trabalho e como posso te ajudar</h2>
                </div>
            </div>

            <div className={styles.faqContent}>
                {faq_data.map((item, i) => (
                    <FaqItem 
                        key={i}
                        item={item}
                        isOpen={i === openIndex}
                        onToggle={() => handleToggle(i)}
                    />
                ))}
            </div>
        </motion.section>
    )
}