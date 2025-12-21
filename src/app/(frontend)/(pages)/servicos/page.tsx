import type { Metadata } from "next";
import { getPayload } from 'payload';
import configPromise from '@payload-config';
import { Service, Project } from '@/payload-types';
import { Divider } from '../../_components/ui';
import { HeroPage, CallToAction } from '../../_components/sections';
import { ServicesList } from './_components/ServicesList';

// import styles from './page.module.scss';

export const dynamic = "force-static";
export const revalidate = 300;

export const metadata: Metadata = {
  title: "Serviços | David Barros",
  description: "Soluções em Design de Produto, Web Design Premium, CRO e Inteligência Artificial. Leve seu produto digital ao próximo nível com estratégias focadas em conversão, usabilidade e tecnologias escaláveis."
}

export default async function ServicosPage() {

    const payload = await getPayload({ config: configPromise });

    const { docs: servicesData } = await payload.find({
      collection: 'services',
      sort: 'order',
      depth: 2,
    });

    const services = servicesData.map((service: Service) => {
        
        // Tratamento do Projeto em Destaque
        const projectArray: { client: string; url: string; thumbnail: string | null | undefined }[] = [];
        
        if (service.relatedProject && typeof service.relatedProject === 'object') {
            const p = service.relatedProject as Project;
            
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
            // Garante que listas existam e tenham os campos obrigatórios (string)
            deliverables: (service.deliverables || []).map(d => ({
                title: d.title || '',
                description: d.description || ''
            })),
            process: (service.process || []).map(p => ({
                order: p.order || '',
                title: p.title || '',
                description: p.description || ''
            }))
        };
    });

    return (
        <>
            <HeroPage
                title="Design estratégico e tecnologia para marcas que buscam o próximo nível de impacto"
                page="Serviços"
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