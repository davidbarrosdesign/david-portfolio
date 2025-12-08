import { NextResponse } from "next/server";
import { notion } from "../../_lib/notion";

if (!process.env.NOTION_DB_TRABALHOS) throw new Error("NOTION_DB_TRABALHOS ausente");

const DB = process.env.NOTION_DB_TRABALHOS;

// Interface definitions
interface WorkItem {
    id: string;
    title: string;
    year: number | string;
    client: string;
    services: string[];
    thumbnail: string;
    slug: string;
}

interface NotionPropTitle { title: { plain_text: string }[] }
interface NotionPropRichText { rich_text: { plain_text: string }[] }
interface NotionPropRelation { relation: { id: string }[] }
interface NotionPropNumber { number: number }
interface NotionPropFiles { files: { file: { url: string } }[] }

interface PageProps {
    título?: NotionPropTitle;
    ano?: NotionPropNumber;
    thumbnail?: NotionPropFiles;
    slug?: NotionPropRichText;
    cliente?: NotionPropRelation;
    serviços?: NotionPropRelation;
    nome?: NotionPropTitle; // For relation pages (client/service)
}

// Mini-cache local
let cache: { timestamp: number; data: { success: boolean, total: number, works: WorkItem[] } } | null = null;
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
            filter: { property: "status", status: { equals: "Publicado" } },
            sorts: [],
            page_size: 20,
        });

        const works: WorkItem[] = [];

        for (const page of response.results) {
            if (!("properties" in page)) continue;
            const props = page.properties as unknown as PageProps;

            const title = props.título?.title?.[0]?.plain_text || "";
            const year = props.ano?.number || "";
            const thumbnail = props.thumbnail?.files?.[0]?.file?.url || "";
            const slug = props.slug?.rich_text?.[0]?.plain_text || page.id.slice(0, 8);

            // Relações (IDs)
            const clientId = props.cliente?.relation?.[0]?.id || "";
            const serviceIds = props.serviços?.relation?.map((r) => r.id) || [];

            // Resolver títulos reais
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

        const payload = { success: true, total: works.length, works };

        cache = { timestamp: Date.now(), data: payload };

        return NextResponse.json(payload);

    } catch (err: unknown) {
        return NextResponse.json(
            { success: false, error: err instanceof Error ? err.message : String(err) },
            { status: 500 }
        );
    }
}
