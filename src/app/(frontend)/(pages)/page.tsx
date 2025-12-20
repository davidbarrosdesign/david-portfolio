// import styles from './page.module.scss';
import { getPayload } from 'payload';
import configPromise from '@payload-config';
import { Divider } from '@/app/(frontend)/_components/ui';
import { HeroHome, CallToAction } from '@/app/(frontend)/_components/sections';
import { TestimonialSection } from '@/app/(frontend)/_components/old';
import { PortfolioSection, ServicesSection, ClientsSection } from '@/app/(frontend)/(pages)/_components';
import { Project, Media, Client, Service } from '@/payload-types';
import { PortfolioItem } from '@/app/(frontend)/(pages)/_components/PortfolioSection';

export const dynamic = "force-static";
export const revalidate = 300;

export default async function HomePage() {

  const payload = await getPayload({ config: configPromise });

  const { docs: depoimentos } = await payload.find({
    collection: 'testimonials',
    depth: 1, // Importante: Traz os dados do Cliente (nome, logo) em vez de só o ID
    limit: 5,
    sort: '-createdAt', // Mais recentes primeiro
  });

  const { docs: services } = await payload.find({
    collection: 'services',
    sort: 'order',
    limit: 0,
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

  const { docs: projectsData } = await payload.find({
    collection: 'projects',
    where: {
      featured: { equals: 'true' },
    },
    sort: '-createdAt',
    limit: 5,
    depth: 1,
  });

  const trabalhos: PortfolioItem[] = projectsData.map((doc: Project) => {
    // Tratamento de Imagem (Pode ser objeto ou string)
    const thumbnailObj = doc.thumbnail as Media | string; // Cast para auxiliar verificação
    const thumbnail = (typeof thumbnailObj === 'object' && thumbnailObj !== null && 'url' in thumbnailObj) 
      ? thumbnailObj.url || ''
      : (typeof thumbnailObj === 'string' ? thumbnailObj : '');

    // Tratamento de Cliente (Pode ser objeto ou ID)
    const clientObj = doc.client as Client | string;
    const clientName = (typeof clientObj === 'object' && clientObj !== null && 'name' in clientObj) 
      ? clientObj.name 
      : 'Cliente';

    // Tratamento de Serviços (Array de objetos -> Array de strings)
    const serviceList = Array.isArray(doc.services)
      ? doc.services.map((s) => {
          const serviceObj = s as Service | string;
          return (typeof serviceObj === 'object' && serviceObj !== null && 'title' in serviceObj) ? serviceObj.title : String(serviceObj);
      })
      : [];

    return {
      id: doc.id,
      title: doc.title,
      client: clientName,
      year: doc.year,
      services: serviceList,
      thumbnail: thumbnail,
      slug: doc.slug,
    };
  });

  return (
    <main>
      <HeroHome />
      <PortfolioSection trabalhos={trabalhos} />
      <Divider size="large" />
      <ClientsSection clients={clients} />
      <Divider size="large" />
      <TestimonialSection depoimentos={depoimentos} />
      <Divider size="large" />
      <ServicesSection services={services} />
      <Divider size="large" />
      <CallToAction 
        title="Pronto para levar seu projeto ao próximo nível?"
        content="Vamos conversar sobre como meu método pode ajudar sua empresa a crescer através do design e da tecnologia."
        linkTitle="Entre em contato"
        url="/contato"
        target="_self"
      />
      <Divider size="medium" />
    </main>
  )
}
