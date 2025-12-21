import { getPayload } from 'payload';
import configPromise from '@payload-config';
import type { Metadata } from "next";
import { Project, Service } from '@/payload-types';
import { HeroPage, CallToAction } from '../../_components/sections';
import { Divider } from '../../_components/ui';
import { WorkFeed } from './_components/WorkFeed';
import { SectionClients } from './_components/SectionClients';
import { SectionServices } from './_components/SectionServices';

export const dynamic = "force-static";
export const revalidate = 300;

export const metadata: Metadata = {
  title: "Trabalhos | David Barros",
  description: "Portfólio de Design e Tecnologia: Confira cases de sucesso em e-commerce, SaaS e produtos complexos desenvolvidos por David Barros ao longo de 12 anos de carreira. Soluções reais para desafios de negócio globais."
}

export default async function TrabalhosPage() {

    const payload = await getPayload({ config: configPromise });

    // 1. BUSCA: Todos os projetos (com limite de segurança)
    const { docs: projects } = await payload.find({
        collection: 'projects',
        sort: '-createdAt',
        limit: 100,
        depth: 1,
        where: {
            // Opcional: Se quiser esconder projetos "rascunho" ou não listados
            // status: { equals: 'published' } 
        }
    });

    // 2. ADAPTER: Transforma dados do Payload -> WorkItem (Tipagem do Front)
    const trabalhos = projects.map((doc: Project) => {
        // Extrai URL da imagem com segurança
        const thumbnail = (doc.thumbnail && typeof doc.thumbnail === 'object') 
            ? (doc.thumbnail.url || '') 
            : '';

        // Extrai nome do Cliente
        const clientName = (doc.client && typeof doc.client === 'object') 
            ? doc.client.name 
            : 'Confidencial';

        // Extrai array de strings dos Serviços
        const serviceList = Array.isArray(doc.services)
            ? doc.services.map((s: string | Service) => (typeof s === 'object' ? s.title : ''))
            : [];

        return {
            id: doc.id,
            title: doc.title,
            year: doc.year,
            client: clientName,
            services: serviceList,
            thumbnail: thumbnail,
            slug: doc.slug,
        };
    });

    const { docs: clients } = await payload.find({
        collection: 'clients',
        where: {
            featured: {
                equals: 'true',
            },
        },
        limit: 0,
        sort: 'name',
    });

    return (
        <main>
            <HeroPage
            title="Projetos que unem design estratégico e tecnologia de ponta."
            page="Trabalhos"
            />

            {/* Conteúdo da página == lista de cards */}
            <WorkFeed initialData={trabalhos} />

            <Divider size="medium" />

            <SectionServices />

            <Divider size="medium" />

            <SectionClients clients={clients} />

            <Divider size="medium" />

            <CallToAction 
              title="Viu algo que se conecta com o seu desafio atual?"
              content="Estou pronto para ajudar sua empresa a alcançar esses mesmos níveis de resultado através do design e da tecnologia."
              linkTitle="Iniciar conversa"
              url="/contato"
              target="_self"
            />

            <Divider size="medium" />
        </main>
    );
}