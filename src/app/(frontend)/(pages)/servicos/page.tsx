import type { Metadata } from "next";
import { Divider } from '../../_components/ui';
import { HeroPage, CallToAction } from '../../_components/sections';
import { ServicesList } from './_components/ServicesList';
import { getPayload } from 'payload';
import configPromise from '@payload-config';

// import styles from './page.module.scss';

export const metadata: Metadata = {
  title: "Serviços | David Barros",
  description: "Serviços do David Barros"
}

export default async function ServicosPage() {

    const payload = await getPayload({ config: configPromise });

    const { docs: services } = await payload.find({
      collection: 'services',
      sort: 'order', // Se você tiver campo de ordem, ou use '-createdAt'
      depth: 1, // Traz os relacionamentos se houver
    });

    return (
        <>
            <HeroPage
                title="Design estratégico e tecnologia para marcas que buscam o próximo nível de impacto"
            />
            <Divider size="small" />
            <ServicesList services={services as any} />
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