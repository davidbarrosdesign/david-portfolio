import { notFound } from "next/navigation";
import Image from "next/image";
import { getPageBySlug, getPageBlocks, getRelationTitle, notion } from "@/app/(frontend)/_lib/notion";
import { NotionRenderer } from "./_components/NotionRenderer";
import { Divider } from "@/app/(frontend)/_components/ui";
import { HeroPage } from "@/app/(frontend)/_components/sections";
import styles from "./page.module.scss";

export const revalidate = 60; // Revalida a cada 60s

// Gera as rotas estáticas no build
export async function generateStaticParams() {
    const databaseId = process.env.NOTION_DB_TRABALHOS;
    if (!databaseId) return [];

    const response = await notion.databases.query({
        database_id: databaseId,
        filter: { property: "status", status: { equals: "Publicado" } },
    });

    return response.results.map((page: any) => ({
        slug: page.properties.slug?.rich_text?.[0]?.plain_text || page.id,
    }));
}

export default async function TrabalhoSingle({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const page: any = await getPageBySlug(slug);

    if (!page) notFound();

    const blocks = await getPageBlocks(page.id);
    const props = page.properties;

    // --- 1. Extração de Dados Básicos ---
    const title = props.título?.title?.[0]?.plain_text || "Sem título";
    const resume = props.intro?.rich_text?.[0]?.plain_text || "Sem resumo";
    const year = props.ano?.number || "2025";

    // --- 2. Resolvendo CLIENTE (Relação Única) ---
    const clientId = props.cliente?.relation?.[0]?.id;
    // Se tiver ID, busca o nome. Se não, fallback.
    const clientName = clientId ? await getRelationTitle(clientId) : "Cliente Confidencial";

    // --- 3. Resolvendo SERVIÇOS (Relação Múltipla) ---
    const serviceIds = props.serviços?.relation?.map((r: any) => r.id) || [];
    
    // Busca os nomes (mantém como array, NÃO faz join)
    const serviceNames = await Promise.all(
        serviceIds.map((id: string) => getRelationTitle(id))
    );
    
    // Remove vazios caso algum ID falhe
    const validServices = serviceNames.filter(Boolean);

    // --- 4. Tratamento da Imagem de Capa (Hero) ---
    let coverUrl = "";
    const thumbnailProp = props.thumbnail || props.Thumbnail || props.Capa;
    if (thumbnailProp?.files?.length > 0) {
        const file = thumbnailProp.files[0];
        coverUrl = file.type === "file" ? file.file.url : file.external.url;
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
                        <p>{ resume }</p>
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

                <Divider size="medium"/>

            </article>
        </main>
    );
}