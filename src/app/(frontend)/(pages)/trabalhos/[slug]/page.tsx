import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPayload } from 'payload';
import configPromise from '@payload-config';
import { SectionThumbnail } from "./_components/SectionThumbnail";
import { SectionInfos } from "./_components/SectionInfos";
import { SectionContent } from "./_components/SectionContent";
import { SectionTestimonial } from "./_components/SectionTestimonial";
import { Divider } from "@/app/(frontend)/_components/ui";
import { HeroPage, CallToAction } from "@/app/(frontend)/_components/sections";
import styles from "./page.module.scss";

export const revalidate = 60;
export const dynamicParams = true;

// --- 1. SEO DINÂMICO ---
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const payload = await getPayload({ config: configPromise });

    const { docs } = await payload.find({
        collection: 'projects',
        where: { slug: { equals: slug } },
        depth: 1, // Traz imagens
    });

    const project = docs[0];

    if (!project) return { title: "Projeto não encontrado" };

    // Extração segura da URL da imagem para SEO
    let imageUrl = "";
    if (project.thumbnail && typeof project.thumbnail === 'object' && project.thumbnail.url) {
        imageUrl = project.thumbnail.url;
    }

    return {
        title: `${project.title} | David Barros`,
        description: project.metaDescription || project.subtitle || `Confira o projeto ${project.title}`,
        openGraph: {
            title: project.metaTitle || project.title,
            description: project.metaDescription || project.subtitle || '',
            url: `/trabalhos/${slug}`,
            images: imageUrl ? [{ url: imageUrl }] : [],
        },
    };
}

// --- 2. GERAÇÃO ESTÁTICA (BUILD) ---
export async function generateStaticParams() {
    const payload = await getPayload({ config: configPromise });
    const { docs } = await payload.find({
        collection: 'projects',
        limit: 100,
        select: { slug: true },
    });

    return docs.map((doc) => ({
        slug: doc.slug,
    }));
}

export default async function TrabalhoSingle({ params }: { params: Promise<{ slug: string }> }) {

    const { slug } = await params;
    const payload = await getPayload({ config: configPromise });

    // Busca o projeto
    const { docs } = await payload.find({
        collection: 'projects',
        where: { slug: { equals: slug } },
        depth: 2, // Depth 2 para trazer dados do Cliente dentro do Projeto
    });

    const project = docs[0];

    if (!project) notFound();

    // Depoimento Relacionado
    const testimonial = (typeof project.relatedTestimonial === 'object') ? project.relatedTestimonial : null;

    return (
        <main>
            <HeroPage
                page='Projeto'
                title={project.title}
            />

            <Divider size="small"/>

            <article className={styles.singleWrapper}>
                {/* Thumbnail do projeto */}
                <SectionThumbnail item={project}/>

                <Divider size="small"/>

                {/* Resumo do projeto */}
                <SectionInfos item={project}/>

                <Divider size="small"/>

                {/* Conteúdo principal (blocos) */}
                <SectionContent blocks={project.layout || []} />

                {/* Depoimento Relacionado (se houver) */}
                {testimonial && (
                    <>
                        <Divider size="medium" />
                        <SectionTestimonial testimonial={testimonial}/>
                    </>
                )}
            </article>

            <Divider size="medium" />

            <CallToAction 
              title="Gostou deste projeto?"
              content="Pronto para construir um projeto que dimensione com o seu negócio e o coloque no controle? Vamos criar uma base para o seu sucesso futuro juntos."
              linkTitle="Vamos falar sobre isso!"
              url="/contato"
              target="_self"
            />

            <Divider size="medium" />
        </main>
    );
}