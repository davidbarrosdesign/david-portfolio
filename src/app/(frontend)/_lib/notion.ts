import { Client } from "@notionhq/client";

export const notion = new Client({
    auth: process.env.NOTION_TOKEN
});

const DB = process.env.NOTION_DB_TRABALHOS;

export async function getRelationTitle(id: string) {
    if (!id) return "";
    try {
        const page = await notion.pages.retrieve({ page_id: id });
        if (!("properties" in page)) return "";
        
        const props = page.properties as any;
        
        // Tenta achar a propriedade de título (pode ser "Name", "Nome", "Título", etc)
        // Isso cobre tanto a base de Clientes quanto a de Serviços
        const titleProp = props.nome || props.Name || props.title || props.Título || props.Title;
        
        return titleProp?.title?.[0]?.plain_text || "";
    } catch (error) {
        console.error(`Erro ao buscar relação ${id}:`, error);
        return "";
    }
}

// Busca a página específica filtrando pelo Slug
export async function getPageBySlug(slug: string) {
    if (!DB) throw new Error("Database ID not defined");

    const response = await notion.databases.query({
        database_id: DB,
        filter: {
            property: "slug",
            rich_text: { equals: slug }
        },
    });

    if (response.results.length === 0) return null;
    return response.results[0];
}

// Busca os blocos (conteúdo interno) da página
export async function getPageBlocks(pageId: string) {
    const response = await notion.blocks.children.list({
        block_id: pageId,
        page_size: 100, // Aumente se tiver posts muito longos
    });
    return response.results;
}