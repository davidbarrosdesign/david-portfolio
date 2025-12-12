
import type { Metadata } from "next";
import { Divider } from '../../_components/ui';
import { HeroPage } from '../../_components/sections';
import { SectionImage } from './_components/SectionImage';
import { SectionAbout } from './_components/SectionAbout';
import { SectionNumbers } from './_components/SectionNumbers';
import { SectionBenefits } from './_components/SectionBenefits';
import { MarqueeClients } from '../../_components/parts';
import { TestimonialSection } from '../../_components/old';
import { CallToAction } from '../../_components/sections';

async function getDepoimentos() {
  const res = await fetch("http://localhost:3000/api/depoimentos", {
    next: { revalidate: 300, tags: ["depoimentos"] },
  });

  const json = await res.json();
  return json.testimonials;
}

export const metadata: Metadata = {
  title: "Sobre | David Barros",
  description: "Conheça mais sobre o David Barros, especialista em produtos digitais e designer com mais de 12 anos de experiência criando produtos digitais, interfaces e soluções focadas na experiência do usuário."
}

export default async function SobrePage() {

    let depoimentos = await getDepoimentos();
    depoimentos = depoimentos.slice(0, 5); // só os 5 primeiros

    return (
        <main>
            <HeroPage title="Me chamo David Barros. Sou especialista em produtos digitais." />
            <Divider size="small" />
            <SectionImage />
            <Divider size="medium" />
            <SectionAbout />
            <Divider size="medium" />
            <SectionNumbers />
            <Divider size="medium" />
            <SectionBenefits />
            <Divider size="medium" />
            <MarqueeClients />
            <Divider size="medium" />
            <TestimonialSection depoimentos={depoimentos} />
            {/* <Divider size="medium" /> */}
            <CallToAction 
                size="medium"
                subTitle="Vamos trabalhar juntos?"
                title="Tem um projeto em mente?"
                linkTitle="Vamos falar sobre isso!"
                url="/contato"
                target="_self"
            />
        </main>
    );
}