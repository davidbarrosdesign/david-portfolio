import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPayload } from 'payload';
import configPromise from '@payload-config';
import { Divider } from "@/app/(frontend)/_components/ui";
import { HeroPage, CallToAction } from "@/app/(frontend)/_components/sections";
import { SectionContent } from "./_components/SectionContent";
import { SectionFeatured } from "./_components/SectionFeatured";
import { SectionMethod } from "./_components/SectionMethod";
// import styles from "./page.module.scss";

export const revalidate = 60;
export const dynamicParams = true;

type Props = {
    params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const payload = await getPayload({ config: configPromise });
    
    const { docs } = await payload.find({
        collection: 'services',
        where: { slug: { equals: slug } },
        depth: 0,
    });
    
    const service = docs[0];

    return {
        title: service ? `${service.title} | David Barros` : 'Serviço | David Barros',
        description: service?.metaDescription || `Detalhes sobre o serviço de ${service?.title || ''}`,
    }
}

export default async function ServicoSingle({ params }: Props) {

    const { slug } = await params;
    const payload = await getPayload({ config: configPromise });

    const { docs } = await payload.find({
        collection: 'services',
        where: { slug: { equals: slug } },
        depth: 2,
    });

    const service = docs[0];

    if (!service) notFound();

    return (
        <main>
            <HeroPage
                page='Serviços'
                title={service.title}
            />

            <Divider size="small"/>

            <SectionContent item={service} />

            <Divider size="medium" />

            <SectionFeatured item={service} />

            <Divider size="medium" />

            <SectionMethod item={service} />

            <Divider size="medium" />

            <CallToAction 
              title="Acho a solução perfeita para você?"
              content="Não trabalho com pacotes fechados, cada projeto é único e personalizado para atender às suas necessidades."
              linkTitle="Vamos falar sobre isso!"
              url="/contato"
              target="_self"
            />

            <Divider size="medium" />
        </main>
    );
}