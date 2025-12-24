import type { Metadata } from "next";
import { getPayload } from 'payload';
import configPromise from '@payload-config';
import { SectionContent } from "./_components/SectionContent";
import { Typebot } from "./_components/Typebot";
import { SectionSocialProof } from './_components/SectionSocialProof';
import { SectionProjects } from './_components/SectionProjects';
import { SectionFaq } from './_components/SectionFaq';
import { Divider } from '../../_components/ui';
import { HeroPage } from '../../_components/sections';

export const metadata: Metadata = {
  title: "Contato | David Barros",
  description: "Vamos tirar seu projeto do papel? Entre em contato com David Barros para consultoria em design e tecnologia. Utilize nossa triagem inteligente para um atendimento ágil e especializado."
}

export default async function ContatoPage() {

    const payload = await getPayload({ config: configPromise });

    const { docs: faqItems } = await payload.find({
        collection: 'faq',
        limit: 100,
        sort: '-createdAt',
    });

    return (
        <main>
            <HeroPage
                page="Contato"
                title="Vamos transformar sua ideia em um produto de alto impacto?"
            />
            <Divider size="small" />
            <SectionContent />
            <Divider size="medium" />
            <Typebot />
            <Divider size="large" />
            <SectionSocialProof />
            <Divider size="large" />
            <SectionProjects />
            <Divider size="large" />
            <SectionFaq items={faqItems} />
            <Divider size="medium" />
        </main>
    );
}