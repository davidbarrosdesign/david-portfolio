import { Media } from "@/payload-types";

export function getImageUrl(media: string | Media | null | undefined): string {
    if (!media) return ''; // Retorna vazio ou uma imagem placeholder
    
    // Se for apenas o ID (string)
    if (typeof media === 'string') return media;

    // Se for o objeto Media completo vindo do Payload
    if (media.url) return media.url;

    return '';
}