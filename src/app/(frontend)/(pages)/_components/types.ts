import { Media } from "@/payload-types";

export interface PortfolioCardData {
    id: string;
    index: number;
    title: string;
    client: string;
    year: string | number;
    services: string[];
    image: string | Media | null | undefined;
    link: string;
}
