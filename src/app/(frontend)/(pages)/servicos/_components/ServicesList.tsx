'use client';

import { ServiceSection } from "./ServiceSection";
import styles from './styles.module.scss';

import Thumbnail from "public/images/about-image.webp"

const data = [
    {
        id: "produtos",
        title: "Produtos Digitais",
        description: "Soluções completas que equilibram estética de ponta com usabilidade intuitiva. Desenvolvo interfaces focadas em resolver problemas complexos e gerar valor real para o seu negócio e para o usuário final.",
        project: [
            { client: "Kraxá", url: "#", thumbnail: Thumbnail }
        ],
        deliverables: [
            { title: "SaaS & Plataformas Complexas", description: "Design de fluxos lógicos e interfaces intuitivas para sistemas robustos, garantindo que a complexidade técnica se torne uma experiência simples para o usuário." },
            { title: "E-commerces de Alta Conversão", description: "Estruturação de lojas virtuais focadas na jornada de compra, eliminando fricções e otimizando cada etapa para aumentar o ticket médio e as vendas." },
            { title: "Aplicativos Mobile", description: "Criação de apps nativos ou híbridos com foco em retenção e engajamento, priorizando a performance e a usabilidade na palma da mão." },
            { title: "Dashboards Estratégicos", description: "Visualização de dados inteligente para facilitar a tomada de decisão, transformando métricas complexas em painéis claros e funcionais." },
            { title: "Design Systems Escaláveis", description: "Criação de bibliotecas de componentes e padrões visuais que garantem consistência de marca e agilidade exponencial para o time de desenvolvimento." }
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
        title: "Web Design",
        description: "Crio experiências web de alto nível, com foco em performance, acessibilidade e SEO, utilizando tecnologias modernas e plataformas low-code para agilizar o lançamento.",
        project: [
            { client: "stock.cash", url: "#", thumbnail: Thumbnail }
        ],
        deliverables: [
            { title: "Sites Institucionais Premium", description: "Presença digital de alto impacto que transmite autoridade imediata, alinhando a narrativa visual aos objetivos estratégicos da empresa." },
            { title: "Landing Pages de Alta Performance", description: "Páginas focadas em um único objetivo: conversão. Design persuasivo e arquitetura de informação otimizada para campanhas de tráfego pago." },
            { title: "Desenvolvimento Low-code", description: "Implementação ágil e robusta (em plataformas como Webflow ou Framer), garantindo autonomia para o cliente e código limpo sem perder a liberdade criativa." },
            { title: "MVPs com Integração de IA", description: "Desenvolvimento rápido de produtos viáveis que utilizam o poder da inteligência artificial para automatizar processos e validar hipóteses de mercado." }
        ],
        process: [
            { order: "1", title: "Imersão", description: "Entendimento profundo do negócio, do público e dos objetivos. Onde a mágica começa." },
            { order: "2", title: "Ideação", description: "Brainstorming, rascunhos e definição dos caminhos visuais e funcionais." },
            { order: "3", title: "Prototipagem", description: "Criação de telas de alta fidelidade e protótipos navegáveis para validação." },
            { order: "4", title: "Entrega", description: "Documentação completa para desenvolvimento e acompanhamento do build." }
        ]
    },
    {
        id: "design",
        title: "Design Estratégico & Inovação",
        description: "Design com intenção! Vou além do visual para construir identidades memoráveis e experiências imersivas, utilizando Inteligência Artificial Generativa e tecnologia para destacar sua marca no mercado.",
        project: [
            { client: "Service Brothers", url: "#", thumbnail: Thumbnail }
        ],
        deliverables: [
            { title: "Direção de Arte", description: "Curadoria visual e narrativa que define a personalidade da marca, garantindo que toda a comunicação seja coesa, elegante e impactante." },
            { title: "Identidade Visual", description: "Criação de sistemas visuais (logos, tipografia e cores) que diferenciam o negócio no mercado e constroem um reconhecimento de marca duradouro." },
            { title: "Design com IA Generativa", description: "Uso de tecnologias de ponta para criar imagens, assets e conceitos visuais exclusivos que seriam impossíveis ou extremamente caros em métodos tradicionais." },
            { title: "Motion e 3D Design", description: "Adição de profundidade e movimento à interface, aumentando a percepção de valor e criando uma experiência digital mais dinâmica e moderna." },
            { title: "Experiências em AR/VR", description: "Exploração de realidade aumentada e virtual para criar pontos de contato imersivos, colocando a marca na vanguarda da tecnologia." }
        ],
        process: [
            { order: "1", title: "Imersão", description: "Entendimento profundo do negócio, do público e dos objetivos. Onde a mágica começa." },
            { order: "2", title: "Ideação", description: "Brainstorming, rascunhos e definição dos caminhos visuais e funcionais." },
            { order: "3", title: "Prototipagem", description: "Criação de telas de alta fidelidade e protótipos navegáveis para validação." },
            { order: "4", title: "Entrega", description: "Documentação completa para desenvolvimento e acompanhamento do build." }
        ]
    },
    {
        id: "conversao",
        title: "Otimização & Conversão (CRO)",
        description: "O design não termina no lançamento. Analiso o comportamento dos usuários para identificar gargalos e implementar melhorias contínuas que aumentam o engajamento, a retenção e, consequentemente, o seu faturamento.",
        project: [
            { client: "Aço Cearense", url: "#", thumbnail: Thumbnail }
        ],
        deliverables: [
            { title: "Auditoria de UX & CRO", description: "Análise técnica detalhada para identificar pontos de abandono e gargalos no produto, resultando em um plano de ação direto para aumentar a conversão." },
            { title: "Otimização de SEO", description: "Ajustes estruturais e de conteúdo para garantir que o seu produto seja encontrado pelos motores de busca e pelas novas IAs de pesquisa (LLMs)." },
            { title: "Testes de Usabilidade", description: "Validação real com usuários para entender comportamentos, coletar feedbacks e ajustar o produto com base em dados, não em suposições." },
            { title: "Evolução Contínua de Produto", description: "Consultoria recorrente para implementar melhorias graduais e constantes, garantindo que o produto nunca fique defasado frente à concorrência." }
        ],
        process: [
            { order: "1", title: "Imersão", description: "Entendimento profundo do negócio, do público e dos objetivos. Onde a mágica começa." },
            { order: "2", title: "Ideação", description: "Brainstorming, rascunhos e definição dos caminhos visuais e funcionais." },
            { order: "3", title: "Prototipagem", description: "Criação de telas de alta fidelidade e protótipos navegáveis para validação." },
            { order: "4", title: "Entrega", description: "Documentação completa para desenvolvimento e acompanhamento do build." }
        ]
    },
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