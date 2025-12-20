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
  description: "Conheça mais sobre o David Barros, especialista em produtos digitais e designer com mais de 12 anos de experiência criando produtos digitais, interfaces e soluções focadas na experiência do usuário."
}

export default async function SobrePage() {

    const payload = await getPayload({ config: configPromise });

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

    const { docs: depoimentos } = await payload.find({
      collection: 'testimonials',
      depth: 1, // Importante: Traz os dados do Cliente (nome, logo) em vez de só o ID
      limit: 5,
      sort: '-createdAt', // Mais recentes primeiro
    });

    const { docs: faqItems } = await payload.find({
        collection: 'faq',
        limit: 100, // Traz todas as perguntas
        sort: '-createdAt', // Mais recentes primeiro
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
            <SectionClients clients={clients as any} />
            <Divider size="large" />
            <TestimonialSection depoimentos={depoimentos as any} />
            <Divider size="large" />
            <SectionCuriosities />
            <Divider size="large" />
            <SectionFaq items={faqItems as any} />
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