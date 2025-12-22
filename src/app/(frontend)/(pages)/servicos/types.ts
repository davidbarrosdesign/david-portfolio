import { Media } from "@/payload-types";

export interface Service {
    id: string;
    title: string;
    slug: string;
    description: string;
    order: number;
    project: { 
        client: string; 
        url: string; 
        thumbnail: string | Media | null | undefined; // Aceita string (URL) ou objeto Media
    }[];
    deliverables: {
        title: string;
        description: string;
    }[];
    process: {
        order: string;
        title: string;
        description: string;
    }[];
    metaTitle: string;
    metaDescription: string;
    metaImage: string;
}