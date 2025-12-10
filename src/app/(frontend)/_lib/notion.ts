import { Client } from "@notionhq/client";

export const notion = new Client({
    auth: process.env.NOTION_TOKEN
});

const DB = process.env.NOTION_DB_TRABALHOS;

// 1. Busca a página específica filtrando pelo Slug
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

// 2. Busca os blocos (conteúdo interno) da página
export async function getPageBlocks(pageId: string) {
    const response = await notion.blocks.children.list({
        block_id: pageId,
        page_size: 100, // Aumente se tiver posts muito longos
    });
    return response.results;
}