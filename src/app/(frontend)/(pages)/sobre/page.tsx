
import type { Metadata } from "next";
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

import { getAllDepoimentos } from '@/app/(frontend)/_lib/notion';

export const metadata: Metadata = {
  title: "Sobre | David Barros",
  description: "Conheça mais sobre o David Barros, especialista em produtos digitais e designer com mais de 12 anos de experiência criando produtos digitais, interfaces e soluções focadas na experiência do usuário."
}

export default async function SobrePage() {

    let depoimentos = await getAllDepoimentos();
    depoimentos = depoimentos.slice(0, 5); // Pega só os 5 primeiros

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
            <SectionClients />
            <Divider size="large" />
            <TestimonialSection depoimentos={depoimentos} />
            <Divider size="large" />
            <SectionCuriosities />
            <Divider size="large" />
            <SectionFaq />
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