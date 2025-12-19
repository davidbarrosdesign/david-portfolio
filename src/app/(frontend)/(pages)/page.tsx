// import styles from './page.module.scss';
import { getPayload } from 'payload';
import configPromise from '@payload-config';
import { Divider } from '@/app/(frontend)/_components/ui';
import { HeroHome, CallToAction } from '@/app/(frontend)/_components/sections';
import { TestimonialSection } from '@/app/(frontend)/_components/old';
import { getAllTrabalhos, getAllDepoimentos } from '@/app/(frontend)/_lib/notion';
import { PortfolioSection, ServicesSection, ClientsSection } from '@/app/(frontend)/(pages)/_components';

export const dynamic = "force-static";
export const revalidate = 300;

export default async function HomePage() {

  // 1. Busca Trabalhos diretamente (Server-side puro)
  let trabalhos = await getAllTrabalhos();
  trabalhos = trabalhos.slice(0, 5); // Pega só os 5 primeiros

  // 2. Busca Depoimentos diretamente
  let depoimentos = await getAllDepoimentos();
  depoimentos = depoimentos.slice(0, 5); // Pega só os 5 primeiros

  const payload = await getPayload({ config: configPromise });
  const { docs: services } = await payload.find({
    collection: 'services',
    sort: 'order',
    limit: 4,
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

  return (
    <main>
      <HeroHome />
      <PortfolioSection trabalhos={trabalhos} />
      <Divider size="large" />
      <ClientsSection clients={clients as any} />
      <Divider size="large" />
      <TestimonialSection depoimentos={depoimentos} />
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
