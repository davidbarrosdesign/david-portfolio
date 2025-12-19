// import styles from './page.module.scss';
import { getPayload } from 'payload';
import configPromise from '@payload-config';
import { Divider } from '@/app/(frontend)/_components/ui';
import { HeroHome, CallToAction } from '@/app/(frontend)/_components/sections';
import { TestimonialSection } from '@/app/(frontend)/_components/old';
import { PortfolioSection, ServicesSection, ClientsSection } from '@/app/(frontend)/(pages)/_components';

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
        equals: 'true', // Importante: no seu print você definiu como string 'true', não boolean
      },
    },
    limit: 0, // 0 = Traz todos que derem match (sem limite)
    sort: 'name', // Opcional: ordena alfabeticamente
  });

  const { docs: projectsData } = await payload.find({
    collection: 'projects',
    where: {
      featured: { equals: 'true' }, // Traz apenas os destacados
    },
    sort: '-createdAt',
    limit: 5,
    depth: 1, // Traz os dados do Cliente e a URL da imagem
  });

  const trabalhos = projectsData.map((doc: any) => {
    // Tratamento de Imagem (Pode ser objeto ou string)
    const thumbnail = (doc.thumbnail && typeof doc.thumbnail === 'object') 
      ? doc.thumbnail.url 
      : doc.thumbnail;

    // Tratamento de Cliente (Pode ser objeto ou ID)
    const clientName = (doc.client && typeof doc.client === 'object') 
      ? doc.client.name 
      : 'Cliente';

    // Tratamento de Serviços (Array de objetos -> Array de strings)
    const serviceList = Array.isArray(doc.services)
      ? doc.services.map((s: any) => (typeof s === 'object' ? s.title : s))
      : [];

    return {
      id: doc.id,
      title: doc.title,
      client: clientName,
      year: doc.year,
      services: serviceList,
      thumbnail: thumbnail, // Agora é uma URL string (video ou img)
      slug: doc.slug,
    };
  });

  return (
    <main>
      <HeroHome />
      <PortfolioSection trabalhos={trabalhos} />
      <Divider size="large" />
      <ClientsSection clients={clients as any} />
      <Divider size="large" />
      <TestimonialSection depoimentos={depoimentos as any} />
      <Divider size="large" />
      <ServicesSection services={services as any} />
      <Divider size="large" />
      <CallToAction 
        title="Pronto para levar seu projeto ao próximo nível?"
        content="Vamos conversar sobre como meu método pode ajudar sua empresa a crescer através do design e da tecnologia."
        linkTitle="Entre em contato"
        url="/contato"
        target="_self"
      />
      <Divider size="large" />
    </main>
  )
}
