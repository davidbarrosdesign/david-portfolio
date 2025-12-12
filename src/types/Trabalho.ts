export interface Trabalho {
    id: string;
    title: string;
    year: number;
    client: string;
    services: string[];
    color: string;
    thumbnail: string;
    blurDataURL?: string;
    slug: string;
    content?: string;
}
