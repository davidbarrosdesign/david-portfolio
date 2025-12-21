'use client';

import { ServiceSection } from "./ServiceSection";
import { Media } from "@/payload-types";
import styles from './styles.module.scss';

// A interface agora reflete os dados já tratados que vêm da Page
interface FormattedService {
    title: string;
    description: string;
    deliverables: { title: string; description: string }[];
    process: { order: string; title: string; description: string }[];
    project: { 
        client: string; 
        url: string; 
        thumbnail: string | Media | null | undefined; // Aceita string (URL) ou objeto Media
    }[];
}

interface ServicesListProps {
    services: FormattedService[];
}

export function ServicesList({ services }: ServicesListProps) {

    if (!services || !Array.isArray(services)) {
        return <p>Carregando serviços...</p>;
    }
    
    return (
        <div className={styles.mainWrapper}>
            {services.map((service, i) => (
                <ServiceSection 
                    key={i} 
                    data={service} 
                    index={i} 
                />
            ))}
        </div>
    );
}