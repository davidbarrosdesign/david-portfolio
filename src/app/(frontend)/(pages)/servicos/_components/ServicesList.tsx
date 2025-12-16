'use client';

import { ServiceSection } from "./ServiceSection";
import styles from './styles.module.scss';

import Thumbnail from "public/images/about-image.webp"

// --- DADOS REAIS DO SEU LAYOUT ---
const data = [
    {
        id: "produtos",
        title: "Produtos digitais",
        description: "Experiências digitais transformadoras para todos os setores e indústrias, com foco nas metas do seu negócio, excelência na usabilidade e visual incrível.",
        project: [
            { client: "Kraxá", url: "#", thumbnail: Thumbnail }
        ],
        deliverables: [
            { title: "Websites", description: "Sites institucionais de alta performance, SEO otimizado e gestão de conteúdo fácil." },
            { title: "Apps Mobile", description: "Aplicativos nativos ou híbridos com foco em retenção e experiência do usuário." },
            { title: "Dashboards", description: "Painéis administrativos complexos transformados em interfaces visuais simples e acionáveis." },
            { title: "SaaS", description: "Software como serviço escalável, focado em conversão e churn reduction." },
            { title: "Landing Pages", description: "Páginas focadas em conversão direta para campanhas de marketing." }
        ],
        process: [
            { order: "1", title: "Imersão", description: "Entendimento profundo do negócio, do público e dos objetivos. Onde a mágica começa." },
            { order: "2", title: "Ideação", description: "Brainstorming, rascunhos e definição dos caminhos visuais e funcionais." },
            { order: "3", title: "Prototipagem", description: "Criação de telas de alta fidelidade e protótipos navegáveis para validação." },
            { order: "4", title: "Entrega", description: "Documentação completa para desenvolvimento e acompanhamento do build." }
        ]
    },
    {
        id: "web",
        title: "Webdesign",
        description: "Experiências digitais transformadoras para todos os setores e indústrias, com foco nas metas do seu negócio, excelência na usabilidade e visual incrível.",
        project: [
            { client: "stock.cash", url: "#", thumbnail: Thumbnail }
        ],
        deliverables: [
            { title: "Websites", description: "Sites institucionais de alta performance, SEO otimizado e gestão de conteúdo fácil." },
            { title: "Apps Mobile", description: "Aplicativos nativos ou híbridos com foco em retenção e experiência do usuário." },
            { title: "Dashboards", description: "Painéis administrativos complexos transformados em interfaces visuais simples e acionáveis." },
            { title: "SaaS", description: "Software como serviço escalável, focado em conversão e churn reduction." },
            { title: "Landing Pages", description: "Páginas focadas em conversão direta para campanhas de marketing." }
        ],
        process: [
            { order: "1", title: "Imersão", description: "Entendimento profundo do negócio, do público e dos objetivos. Onde a mágica começa." },
            { order: "2", title: "Ideação", description: "Brainstorming, rascunhos e definição dos caminhos visuais e funcionais." },
            { order: "3", title: "Prototipagem", description: "Criação de telas de alta fidelidade e protótipos navegáveis para validação." },
            { order: "4", title: "Entrega", description: "Documentação completa para desenvolvimento e acompanhamento do build." }
        ]
    },
    // Adicione mais seções aqui...
];

export function ServicesList() {
    return (
        <div className={styles.mainWrapper}>
            {data.map((section, i) => (
                <ServiceSection key={section.id} data={section} index={i} />
            ))}
        </div>
    );
}