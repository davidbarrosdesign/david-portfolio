import { NextResponse } from "next/server";
import { notion } from "../../_lib/notion";

// Verifica variável de ambiente
if (!process.env.NOTION_DB_TRABALHOS) throw new Error("NOTION_DB_TRABALHOS ausente");

const DB = process.env.NOTION_DB_TRABALHOS;

// --- Interfaces (Tipagem) ---

interface WorkItem {
    id: string;
    title: string;
    year: number | string;
    client: string;
    services: string[];
    thumbnail: string;
    slug: string;
}

// Interface para arquivos do Notion (Uploads ou Links Externos)
interface NotionFileItem {
    type: 'file' | 'external';
    file?: { url: string; expiry_time?: string };
    external?: { url: string };
    name?: string;
}

// Interfaces auxiliares das propriedades
interface NotionPropTitle { title: { plain_text: string }[] }
interface NotionPropRichText { rich_text: { plain_text: string }[] }
interface NotionPropRelation { relation: { id: string }[] }
interface NotionPropNumber { number: number }
interface NotionPropFiles { files: NotionFileItem[] }

// Interface das Propriedades da Página (Genérica para ajudar no autocomplete)
interface PageProps {
    título?: NotionPropTitle;
    ano?: NotionPropNumber;
    thumbnail?: NotionPropFiles;
    slug?: NotionPropRichText;
    cliente?: NotionPropRelation;
    serviços?: NotionPropRelation;
    nome?: NotionPropTitle; 
}

// --- Cache Local em Memória ---
let cache: { timestamp: number; data: { success: boolean, total: number, works: WorkItem[] } } | null = null;
const TTL = 1000 * 60 * 5; // 5 minutos

// --- Funções Auxiliares ---

// Busca título de relações (Cliente/Serviços)
async function getRelationTitle(id: string) {
    if (!id) return "";
    try {
        const page = await notion.pages.retrieve({ page_id: id });
        if (!("properties" in page)) return "";
        
        const props = page.properties as any; // Any para flexibilidade
        // Tenta encontrar o título em várias chaves comuns
        const titleProp = props.nome || props.Name || props.title || props.Título;
        return titleProp?.title?.[0]?.plain_text || "";
    } catch {
        return "";
    }
}

// --- Rota da API ---

export async function GET() {
    try {
        // 1. Verifica Cache de Memória
        if (cache && Date.now() - cache.timestamp < TTL) {
            console.log("⚡ Usando cache local para trabalhos");
            return NextResponse.json(cache.data);
        }

        console.log("🔍 Buscando dados frescos no Notion...");

        // 2. Query no Notion
        const response = await (notion.databases as any).query({
            database_id: DB,
            filter: { property: "status", status: { equals: "Publicado" } },
            sorts: [],
            page_size: 20,
        });

        const works: WorkItem[] = [];

        for (const page of response.results) {
            if (!("properties" in page)) continue;
            
            // Usamos 'any' para debug e flexibilidade
            const props = page.properties as any;
            
            // --- LOG DE DEBUG PARA ENCONTRAR O ERRO ---
            // Isso vai imprimir no seu terminal o objeto "thumbnail" exato que vem do Notion
            // Procure por isso no terminal se a imagem não carregar
            // console.log(`[DEBUG] Item: ${page.id}`, JSON.stringify(props.thumbnail || props.Thumbnail, null, 2));
            // ------------------------------------------

            // Dados básicos
            const title = props.título?.title?.[0]?.plain_text || "";
            const year = props.ano?.number || "";
            const slug = props.slug?.rich_text?.[0]?.plain_text || page.id.slice(0, 8);

            // --- LÓGICA ROBUSTA DE IMAGEM ---
            let thumbnail = "";
            
            // Tenta pegar a propriedade com minúscula ou maiúscula
            const thumbnailProp = props.thumbnail || props.Thumbnail || props.Capa;

            if (thumbnailProp?.files?.length > 0) {
                const fileItem = thumbnailProp.files[0];
                
                if (fileItem.type === "file" && fileItem.file?.url) {
                    thumbnail = fileItem.file.url;
                } else if (fileItem.type === "external" && fileItem.external?.url) {
                    thumbnail = fileItem.external.url;
                }
            }

            // Busca dados das relações
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

        const payload = { success: true, total: works.length, works };

        // Atualiza cache
        cache = { timestamp: Date.now(), data: payload };

        return NextResponse.json(payload);

    } catch (err: unknown) {
        console.error("❌ Erro fatal na API Notion:", err);
        return NextResponse.json(
            { success: false, error: err instanceof Error ? err.message : String(err) },
            { status: 500 }
        );
    }
}