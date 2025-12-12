import { NextResponse } from "next/server";
import { notion } from "../../_lib/notion";

// Interfaces
interface Testimonial {
    id: string;
    title: string;
    jobTitle: string | undefined;
    company: string | undefined;
    testimonial: string | undefined;
}

interface NotionPropTitle { title: { plain_text: string }[] }
interface NotionPropRichText { rich_text: { plain_text: string }[] }
interface NotionPropRelation { relation: { id: string }[] }

interface PageProps {
    nome?: NotionPropTitle;
    cargo?: NotionPropRichText;
    depoimento?: NotionPropRichText;
    empresa?: NotionPropRelation;
}

if (!process.env.NOTION_DB_DEPOIMENTOS) throw new Error("NOTION_DB_DEPOIMENTOS ausente");
const DB = process.env.NOTION_DB_DEPOIMENTOS;

// Mini-cache local
let cache: { timestamp: number; data: { success: boolean, total: number, testimonials: Testimonial[] } } | null = null;
const TTL = 1000 * 60 * 5; // 5 min

async function getRelationTitle(id: string) {
    if (!id) return "";
    try {
        const page = await notion.pages.retrieve({ page_id: id });
        if (!("properties" in page)) return "";
        const props = page.properties as unknown as PageProps;
        return props.nome?.title?.[0]?.plain_text || "";
    } catch {
        return "";
    }
}

export async function GET() {
    try {
        // Cache
        if (cache && Date.now() - cache.timestamp < TTL) {
            return NextResponse.json(cache.data);
        }

        // Query Notion
        const response = await (notion.databases as any).query({
            database_id: DB,
            sorts: [],
            page_size: 20,
        });

        const testimonials: Testimonial[] = [];

        for (const page of response.results) {
            if (!("properties" in page)) continue;
            const props = page.properties as unknown as PageProps;

            const title = props.nome?.title?.[0]?.plain_text || "";
            const jobTitle = props.cargo?.rich_text?.[0]?.plain_text;
            const testimonial = props.depoimento?.rich_text?.[0]?.plain_text;

            // Relações (IDs)
            const clientId = props.empresa?.relation?.[0]?.id || "";

            // Resolver títulos reais
            const company = clientId ? await getRelationTitle(clientId) : "";

            testimonials.push({
                id: page.id,
                title,
                jobTitle,
                company,
                testimonial
            });
        }

        const payload = { success: true, total: testimonials.length, testimonials };

        cache = { timestamp: Date.now(), data: payload };

        return NextResponse.json(payload);

    } catch (err: unknown) {
        return NextResponse.json(
            { success: false, error: err instanceof Error ? err.message : String(err) },
            { status: 500 }
        );
    }
}
