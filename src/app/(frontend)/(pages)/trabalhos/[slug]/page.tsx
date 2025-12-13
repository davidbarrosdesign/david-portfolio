import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { getPageBySlug, getPageBlocks, getRelationTitle, getClientDetails, notion } from "@/app/(frontend)/_lib/notion";
import { NotionRenderer } from "./_components/NotionRenderer";
import { Divider } from "@/app/(frontend)/_components/ui";
import { HeroPage, CallToAction } from "@/app/(frontend)/_components/sections";
import styles from "./page.module.scss";

export const revalidate = 60; // Revalida a cada 60s

// --- SEO DINÂMICO ---
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const page = await getPageBySlug(slug);

    if (!page || !('properties' in page)) {
        return {
            title: "Trabalho não encontrado",
        };
    }

    const props = (page as unknown as PageObjectResponse).properties;
    
    // Dados para SEO
    let title = "Projeto";
    if (props.título?.type === 'title') {
        title = props.título.title[0]?.plain_text || "Projeto";
    }

    let description = `Confira os detalhes do projeto ${title}.`;
    if (props.intro?.type === 'rich_text') {
        description = props.intro.rich_text[0]?.plain_text || description;
    }
    
    // Extração da Imagem para o Card de Compartilhamento (Twitter/WhatsApp/LinkedIn)
    let imageUrl = "";
    const thumbnailProp = props.thumbnail || props.Thumbnail || props.Capa;
    if (thumbnailProp?.type === 'files' && thumbnailProp.files.length > 0) {
        const file = thumbnailProp.files[0];
        if (file.type === 'file') {
             imageUrl = file.file.url;
        } else if (file.type === 'external') {
             imageUrl = file.external.url;
        }
    }

    return {
        title: `${title} | David Barros`, // Ex: stock.cash | David Barros
        description: description,
        openGraph: {
            title: title,
            description: description,
            url: `/trabalhos/${slug}`,
            siteName: 'David Barros',
            images: imageUrl ? [
                {
                    url: imageUrl,
                    width: 1200,
                    height: 630,
                    alt: title,
                }
            ] : [],
            locale: 'pt_BR',
            type: 'article',
        },
        twitter: {
            card: 'summary_large_image',
            title: title,
            description: description,
            images: imageUrl ? [imageUrl] : [],
        },
    };
}

// Gera as rotas estáticas no build
export async function generateStaticParams() {
    const databaseId = process.env.NOTION_DB_TRABALHOS;
    if (!databaseId) return [];

    const response = await notion.databases.query({
        database_id: databaseId,
        filter: { property: "status", status: { equals: "Publicado" } },
    });

    return response.results.map((page) => {
        if (!('properties' in page)) return { slug: page.id };
        const props = (page as unknown as PageObjectResponse).properties;
        let slug = page.id;
        if (props.slug?.type === 'rich_text') {
            slug = props.slug.rich_text[0]?.plain_text || page.id;
        }
        return {
            slug: slug,
        };
    });
}

export default async function TrabalhoSingle({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const page = await getPageBySlug(slug);

    if (!page || !('properties' in page)) notFound();

    const blocks = await getPageBlocks(page.id);
    const props = (page as unknown as PageObjectResponse).properties;

    // --- 1. Extração de Dados Básicos ---
    let title = "Sem título";
    if (props.título?.type === 'title') {
        title = props.título.title[0]?.plain_text || "Sem título";
    }

    let resume = "Sem resumo";
    if (props.intro?.type === 'rich_text') {
        resume = props.intro.rich_text[0]?.plain_text || "Sem resumo";
    }

    let year = 2025;
    if (props.ano?.type === 'number') {
        year = props.ano.number || 2025;
    }

    // --- 2. Resolvendo CLIENTE (Nome e Sobre) ---
    let clientId = "";
    if (props.cliente?.type === 'relation' && props.cliente.relation.length > 0) {
        clientId = props.cliente.relation[0].id;
    }
    
    let clientName = "Cliente Confidencial";
    let clientAbout = "";

    if (clientId) {
        const clientData = await getClientDetails(clientId);
        if (clientData) {
            clientName = clientData.name;
            clientAbout = clientData.about;
        }
    }

    // --- 3. Resolvendo SERVIÇOS (Relação Múltipla) ---
    let serviceIds: string[] = [];
    if (props.serviços?.type === 'relation') {
        serviceIds = props.serviços.relation.map(r => r.id);
    }
    
    // Busca os nomes (mantém como array, NÃO faz join)
    const serviceNames = await Promise.all(
        serviceIds.map((id: string) => getRelationTitle(id))
    );
    
    // Remove vazios caso algum ID falhe
    const validServices = serviceNames.filter((s): s is string => !!s);

    // --- 4. Tratamento da Imagem de Capa (Hero) ---
    let coverUrl = "";
    const thumbnailProp = props.thumbnail || props.Thumbnail || props.Capa;
    if (thumbnailProp?.type === 'files' && thumbnailProp.files.length > 0) {
        const file = thumbnailProp.files[0];
        if (file.type === 'file') {
             coverUrl = file.file.url;
        } else if (file.type === 'external') {
             coverUrl = file.external.url;
        }
    }

    return (
        <main>
            <HeroPage
                title={title}
            />

            <Divider size="small"/>

            <article className={styles.singleWrapper}>
                {coverUrl && (
                    <div className={styles.heroThumbnail}>
                        <Image 
                            src={coverUrl} 
                            alt={title}
                            fill 
                            priority
                            className={styles.heroThumbnailImg} 
                        />
                    </div>
                )}

                <Divider size="small"/>

                <section className={styles.infosWrapper}>
                    <div className={styles.infoResume}>
                        <p><span>Sobre o cliente:</span> { clientAbout }</p>
                        <p><span>Resumo do projeto:</span> { resume }</p>
                    </div>
                    <div className={styles.infoList}>
                        <div className={styles.infoItem}>
                            <span className={styles.infoItemTitle}>Cliente</span>
                            <span className={styles.infoItemValue}>{ clientName }</span>
                        </div>
                        <div className={styles.infoItem}>
                            <span className={styles.infoItemTitle}>Serviços</span>
                            <ul className={styles.servicesList}>
                                {validServices.length > 0 ? (
                                    validServices.map((service, index) => (
                                        <li key={index}>{service}</li>
                                    ))
                                ) : (
                                    <li>Sem categoria</li>
                                )}
                            </ul>
                        </div>
                        <div className={styles.infoItem}>
                            <span className={styles.infoItemTitle}>Ano</span>
                            <span className={styles.infoItemValue}>{ year }</span>
                        </div>
                    </div>
                </section>

                <Divider size="small"/>

                <section className={styles.contentWrapper}>
                    <NotionRenderer blocks={blocks} />
                </section>
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