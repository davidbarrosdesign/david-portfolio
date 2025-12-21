import type { Metadata } from "next";
import { getPayload } from 'payload';
import configPromise from '@payload-config';
import { Divider } from '../../_components/ui';
import { HeroPage } from '../../_components/sections';
import { SectionImage } from './_components/SectionImage';
import { SectionAbout } from './_components/SectionAbout';
import { SectionNumbers } from './_components/SectionNumbers';
import { SectionBenefits } from './_components/SectionBenefits';
import { SectionServices } from './_components/SectionServices';
import { SectionClients } from './_components/SectionClients';
import { SectionFaq } from './_components/SectionFaq';
import { SectionCuriosities } from './_components/SectionCuriosities';
import { TestimonialSection } from '../../_components/old';
import { CallToAction } from '../../_components/sections';

export const metadata: Metadata = {
  title: "Sobre | David Barros",
  description: "Conheça David Barros, designer sênior com vasta experiência no Brasil, EUA, Espanha e Itália. Especialista em unir design estratégico, UX/UI e automação com IA para impulsionar o faturamento de grandes negócios."
}

export default async function SobrePage() {

    const payload = await getPayload({ config: configPromise });

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

    const { docs: depoimentos } = await payload.find({
      collection: 'testimonials',
      depth: 1,
      limit: 5,
      sort: '-createdAt',
    });

    const { docs: faqItems } = await payload.find({
        collection: 'faq',
        limit: 100,
        sort: '-createdAt',
    });

    return (
        <main>
            <HeroPage title="Design estratégico para produtos que escalam e marcas que lideram." />
            <Divider size="small" />
            <SectionImage />
            <SectionAbout />
            <Divider size="large" />
            <SectionNumbers />
            <Divider size="large" />
            <SectionBenefits />
            <Divider size="large" />
            <SectionServices />
            <Divider size="large" />
            <SectionClients clients={clients} />
            <Divider size="large" />
            <TestimonialSection depoimentos={depoimentos} />
            <Divider size="large" />
            <SectionCuriosities />
            <Divider size="large" />
            <SectionFaq items={faqItems} />
            <Divider size="large" />
            <CallToAction 
              title="Vamos falar sobre o seu projeto"
              content="Pronto para elevar o nível do seu produto digital?"
              linkTitle="Entre em contato"
              url="/contato"
              target="_self"
            />
            <Divider size="medium" />
        </main>
    );
}