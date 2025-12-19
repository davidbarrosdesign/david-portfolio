import { getPayload } from 'payload';
import configPromise from '@payload-config';
import type { Metadata } from "next";
import { HeroPage, CallToAction } from '../../_components/sections';
import { Divider } from '../../_components/ui';
import { WorkFeed } from './_components/WorkFeed';

export const dynamic = "force-static";
export const revalidate = 300;

export const metadata: Metadata = {
  title: "Trabalhos | David Barros",
  description: "Confira alguns dos trabalhos especialmente selecionados no portfolio do designer David Barros."
}

export default async function TrabalhosPage() {

    const payload = await getPayload({ config: configPromise });

    // 1. BUSCA: Todos os projetos (com limite de segurança)
    const { docs: projects } = await payload.find({
        collection: 'projects',
        sort: '-year', // Ordena dos mais recentes para os antigos
        limit: 100,    // Traz até 100 projetos (paginação pode ser futura)
        depth: 1,      // Traz os dados populados (URL da imagem, Nome do cliente)
        where: {
            // Opcional: Se quiser esconder projetos "rascunho" ou não listados
            // status: { equals: 'published' } 
        }
    });

    // 2. ADAPTER: Transforma dados do Payload -> WorkItem (Tipagem do Front)
    const trabalhos = projects.map((doc: any) => {
        // Extrai URL da imagem com segurança
        const thumbnail = (doc.thumbnail && typeof doc.thumbnail === 'object') 
            ? doc.thumbnail.url 
            : '';

        // Extrai nome do Cliente
        const clientName = (doc.client && typeof doc.client === 'object') 
            ? doc.client.name 
            : 'Confidencial';

        // Extrai array de strings dos Serviços
        const serviceList = Array.isArray(doc.services)
            ? doc.services.map((s: any) => (typeof s === 'object' ? s.title : ''))
            : [];

        return {
            id: doc.id,
            title: doc.title,
            year: doc.year,
            client: clientName,
            services: serviceList, // O WorkFeed usa isso para criar os filtros automáticos
            thumbnail: thumbnail,
            slug: doc.slug,
        };
    });

    return (
        <main>
            <HeroPage title="Trabalhos selecionados" />

            {/* Conteúdo da página == lista de cards */}
            <WorkFeed initialData={trabalhos} />

            <Divider size="medium" />

            <CallToAction 
              title="Tem um projeto em mente?"
              content="Vamos criar juntos um website com estética forte e mensagem clara — pronto para converter e fazer sucesso."
              linkTitle="Vamos falar sobre isso!"
              url="/contato"
              target="_self"
            />

            <Divider size="medium" />
        </main>
    );
}