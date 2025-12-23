import type { Metadata } from "next";
import { getPayload } from 'payload';
import configPromise from '@payload-config';
import { Divider } from '../../_components/ui';
import { HeroPage, CallToAction } from '../../_components/sections';
import { ServicesList } from './_components/ServicesList';
import { ClientsSection } from './_components/ClientsSection';

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

    const { docs: clientsData } = await payload.find({
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
        <>
            <HeroPage
                title="Design estratégico e tecnologia para marcas que buscam o próximo nível de impacto"
                page="Serviços"
            />
            <Divider size="small" />
            <ServicesList services={servicesData} />
            <ClientsSection clients={clientsData} />
            <Divider size="large" />
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