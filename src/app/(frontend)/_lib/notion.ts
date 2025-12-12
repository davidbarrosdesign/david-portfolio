import { Client } from "@notionhq/client";

export const notion = new Client({
    auth: process.env.NOTION_TOKEN
});

const DB_TRABALHOS = process.env.NOTION_DB_TRABALHOS;
const DB_DEPOIMENTOS = process.env.NOTION_DB_DEPOIMENTOS;

// --- Interfaces ---

export interface WorkItem {
    id: string;
    title: string;
    year: number | string;
    client: string;
    services: string[];
    thumbnail: string;
    slug: string;
}

export interface Testimonial {
    id: string;
    title: string;
    jobTitle: string | undefined;
    company: string | undefined;
    testimonial: string | undefined;
}

// --- Funções Auxiliares ---

export async function getRelationTitle(id: string) {
    if (!id) return "";
    try {
        const page = await notion.pages.retrieve({ page_id: id });
        if (!("properties" in page)) return "";
        
        const props = page.properties as any;
        const titleProp = props.nome || props.Name || props.title || props.Título || props.Title;
        return titleProp?.title?.[0]?.plain_text || "";
    } catch (error) {
        console.error(`Erro ao buscar relação ${id}:`, error);
        return "";
    }
}

export async function getClientDetails(id: string) {
    if (!id) return null;
    try {
        const page = await notion.pages.retrieve({ page_id: id });
        if (!("properties" in page)) return null;
        
        const props = page.properties as any;
        
        const titleProp = props.nome || props.Name || props.title || props.Título;
        const name = titleProp?.title?.[0]?.plain_text || "";

        const aboutProp = props.sobre || props.Sobre || props.About;
        const about = aboutProp?.rich_text?.[0]?.plain_text || "";

        return { name, about };
    } catch (error) {
        console.error(`Erro ao buscar detalhes do cliente ${id}:`, error);
        return null;
    }
}

// --- Funções Principais de Dados (Substituem as rotas API no build) ---

export async function getAllTrabalhos(): Promise<WorkItem[]> {
    if (!DB_TRABALHOS) return [];

    try {
        const response = await (notion.databases as any).query({
            database_id: DB_TRABALHOS,
            filter: { property: "status", status: { equals: "Publicado" } },
            sorts: [],
            page_size: 50,
        });

        const works: WorkItem[] = [];

        for (const page of response.results) {
            if (!("properties" in page)) continue;
            
            const props = page.properties as any;

            const title = props.título?.title?.[0]?.plain_text || "";
            const year = props.ano?.number || "";
            const slug = props.slug?.rich_text?.[0]?.plain_text || page.id.slice(0, 8);

            // Thumbnail
            let thumbnail = "";
            const thumbnailProp = props.thumbnail || props.Thumbnail || props.Capa;

            if (thumbnailProp?.files?.length > 0) {
                const fileItem = thumbnailProp.files[0];
                if (fileItem.type === "file" && fileItem.file?.url) {
                    thumbnail = fileItem.file.url;
                } else if (fileItem.type === "external" && fileItem.external?.url) {
                    thumbnail = fileItem.external.url;
                }
            }

            // Relations
            const clientId = props.cliente?.relation?.[0]?.id || "";
            const serviceIds = props.serviços?.relation?.map((r: any) => r.id) || [];

            const client = clientId ? await getRelationTitle(clientId) : "";

            const services: string[] = [];
            for (const sid of serviceIds) {
                const serviceTitle = await getRelationTitle(sid);
                if (serviceTitle) services.push(serviceTitle);
            }

            works.push({
                id: page.id,
                title,
                year,
                client,
                services,
                thumbnail,
                slug,
            });
        }
        
        return works;

    } catch (err) {
        console.error("Erro ao buscar trabalhos:", err);
        return [];
    }
}

export async function getAllDepoimentos(): Promise<Testimonial[]> {
    if (!DB_DEPOIMENTOS) return [];

    try {
        const response = await (notion.databases as any).query({
            database_id: DB_DEPOIMENTOS,
            sorts: [],
            page_size: 20,
        });

        const testimonials: Testimonial[] = [];

        for (const page of response.results) {
            if (!("properties" in page)) continue;
            const props = page.properties as any;

            const title = props.nome?.title?.[0]?.plain_text || "";
            const jobTitle = props.cargo?.rich_text?.[0]?.plain_text;
            const testimonial = props.depoimento?.rich_text?.[0]?.plain_text;

            const clientId = props.empresa?.relation?.[0]?.id || "";
            const company = clientId ? await getRelationTitle(clientId) : "";

            testimonials.push({
                id: page.id,
                title,
                jobTitle,
                company,
                testimonial
            });
        }

        return testimonials;
    } catch (err) {
        console.error("Erro ao buscar depoimentos:", err);
        return [];
    }
}

// --- Funções de Single Page ---

export async function getPageBySlug(slug: string) {
    if (!DB_TRABALHOS) throw new Error("Database ID not defined");

    const response = await notion.databases.query({
        database_id: DB_TRABALHOS,
        filter: {
            property: "slug",
            rich_text: { equals: slug }
        },
    });

    if (response.results.length === 0) return null;
    return response.results[0];
}

export async function getPageBlocks(pageId: string) {
    const response = await notion.blocks.children.list({
        block_id: pageId,
        page_size: 100,
    });
    return response.results;
}