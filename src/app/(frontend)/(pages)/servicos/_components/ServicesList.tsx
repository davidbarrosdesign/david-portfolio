'use client';
import { Media } from "@/payload-types";
import { ServiceSection } from "./ServiceSection";
import styles from './styles.module.scss';

interface ServiceDoc {
    id: string;
    title: string;
    description: string;
    order: string;
    deliverables?: {
        title: string;
        description: string;
        id?: string | null;
    }[] | null;
    process?: {
        order?: string | null;
        title?: string | null;
        description?: string | null;
        id?: string | null;
    }[] | null;
    // Como ainda não temos Projetos no banco, vamos tratar isso no mapeamento
}

interface ServicesListProps {
    services: ServiceDoc[];
}

export function ServicesList({ services }: ServicesListProps) {

    if (!services || !Array.isArray(services)) {
        return <p>Carregando serviços ou nenhum serviço encontrado...</p>;
    }
    
    return (
        <div className={styles.mainWrapper}>
            {services.map((service, i) => {
                const formattedData = {
                    title: service.title,
                    description: service.description,
                    // Garante que é um array, mesmo se vier null do banco
                    deliverables: service.deliverables?.map(d => ({
                        title: d.title,
                        description: d.description
                    })) || [],
                    process: service.process?.map(p => ({
                        order: p.order || '',
                        title: p.title || '',
                        description: p.description || ''
                    })) || [],
                    project: [] 
                };

                return (
                    <ServiceSection 
                        key={service.id} 
                        data={formattedData} 
                        index={i} 
                    />
                );
            })}
        </div>
    );
}