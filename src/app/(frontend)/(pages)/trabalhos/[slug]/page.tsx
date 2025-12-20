import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPayload } from 'payload';
import configPromise from '@payload-config';
// import Image from "next/image";
import { ProjectBlocks } from "./_components/ProjectBlocks";
import { ProjectMedia } from "./_components/ProjectMedia";
import { ProjectTestimonial } from "./_components/ProjectTestimonial";
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

    if (!project) return { title: "Trabalho não encontrado" };

    // Extração segura da URL da imagem para SEO
    let imageUrl = "";
    if (project.thumbnail && typeof project.thumbnail === 'object' && project.thumbnail.url) {
        imageUrl = project.thumbnail.url;
    }

    return {
        title: `${project.title} | David Barros`,
        description: project.metaDescription || project.subtitle || `Confira o case ${project.title}`,
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

    // Serviços (Extraindo títulos)
    const serviceNames = Array.isArray(project.services) 
        ? project.services.map((s: any) => s.title) 
        : [];

    // Cliente (Extraindo nome e país/sobre)
    const clientName = (typeof project.client === 'object') ? project.client.name : 'Cliente Confidencial';
    const clientCountry = (typeof project.client === 'object') ? project.client.country : 'Brasil';

    // Depoimento Relacionado
    const testimonial = (typeof project.relatedTestimonial === 'object') ? project.relatedTestimonial : null;

    return (
        <main>
            <HeroPage
                title={project.title}
            />

            <Divider size="small"/>

            <article className={styles.singleWrapper}>
                    <div className={styles.heroThumbnail}>
                        <ProjectMedia 
                            resource={project.thumbnail} 
                            fill={true}
                            alt={project.title}
                            className={styles.heroThumbnailImg}
                        />
                    </div>

                <Divider size="small"/>

                <section className={styles.infosWrapper}>
                    <div className={styles.infoList}>
                        <div className={styles.infoItem}>
                            <span className={styles.infoItemTitle}>Cliente</span>
                            <span className={styles.infoItemValue}>{ clientName }</span>
                        </div>
                        <div className={styles.infoItem}>
                            <span className={styles.infoItemTitle}>País</span>
                            <span className={styles.infoItemValue}>{ clientCountry }</span>
                        </div>
                        <div className={styles.infoItem}>
                            <span className={styles.infoItemTitle}>Ano</span>
                            <span className={styles.infoItemValue}>{ project.year }</span>
                        </div>
                    </div>
                    <div className={styles.infoResume}>
                        <div className={styles.infoItem}>
                            <ul className={styles.servicesList}>
                                {serviceNames.length > 0 ? (
                                    serviceNames.map((name, index) => (
                                        <li key={index}>{name}</li>
                                    ))
                                ) : (
                                    <li>Geral</li>
                                )}
                            </ul>
                        </div>

                        <h2>
                            { project.subtitle }
                        </h2>
                    </div>
                </section>

                <Divider size="small"/>

                {/* CONTEÚDO PRINCIPAL (BLOCOS) */}
                <section className={styles.contentWrapper}>
                    <ProjectBlocks blocks={project.layout || []} />
                </section>

                {/* DEPOIMENTO RELACIONADO (OPCIONAL) */}
                {testimonial && (
                    <>
                        <Divider size="medium" />
                        <ProjectTestimonial 
                            author={testimonial.author}
                            role={testimonial.authorRole}
                            company={clientName} // Ou testimonial.client se preferir
                            content={testimonial.content}
                        />
                    </>
                )}
            </article>

            <Divider size="medium" />

            <CallToAction 
              title="Tem um projeto em mente?"
              content="Vamos criar juntos um website com estética forte e mensagem clara — pronto para converter e fazer sucesso."
              linkTitle="Vamos falar sobre isso!"
              url="/contato"
              target="_self"
            />

            <Divider size="medium" />
        </main>
    );
}