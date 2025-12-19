import type { Metadata } from "next";
import { getPayload } from 'payload';
import configPromise from '@payload-config';
import { Divider } from '../../_components/ui';
import { HeroPage, CallToAction } from '../../_components/sections';
import { ServicesList } from './_components/ServicesList';

// import styles from './page.module.scss';

export const dynamic = "force-static";
export const revalidate = 300;

export const metadata: Metadata = {
  title: "Serviços | David Barros",
  description: "Serviços do David Barros"
}

export default async function ServicosPage() {

    const payload = await getPayload({ config: configPromise });

    const { docs: servicesData } = await payload.find({
      collection: 'services',
      sort: 'order',
      depth: 2,
    });

    const services = servicesData.map((service: any) => {
        
        // Tratamento do Projeto em Destaque
        const projectArray: any[] = [];
        
        if (service.relatedProject && typeof service.relatedProject === 'object') {
            const p = service.relatedProject;
            
            // Extrai dados seguros do projeto
            const clientName = (p.client && typeof p.client === 'object') 
                ? p.client.name 
                : 'Cliente';

            const thumbnail = (p.thumbnail && typeof p.thumbnail === 'object')
                ? p.thumbnail.url
                : p.thumbnail;

            projectArray.push({
                client: clientName,
                url: `/trabalhos/${p.slug}`,
                thumbnail: thumbnail
            });
        }

        return {
            ...service,
            // O componente ServiceSection espera um array 'project'
            project: projectArray,
            // Garante que listas existam para não quebrar o map
            deliverables: service.deliverables || [],
            process: service.process || []
        };
    });

    return (
        <>
            <HeroPage
                title="Design estratégico e tecnologia para marcas que buscam o próximo nível de impacto"
            />
            <Divider size="small" />
            <ServicesList services={services} />
            <CallToAction 
              title="Tem um projeto em mente?"
              content="Vamos criar juntos um website com estética forte e mensagem clara — pronto para converter e fazer sucesso."
              linkTitle="Vamos falar sobre isso!"
              url="/contato"
              target="_self"
            />
            <Divider size="medium" />
        </>
    );
}