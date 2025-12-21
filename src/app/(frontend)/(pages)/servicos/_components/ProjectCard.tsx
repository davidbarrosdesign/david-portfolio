'use client';
import Link from 'next/link';
import { ProjectMedia } from '../../trabalhos/[slug]/_components/ProjectMedia';
import { Media } from "@/payload-types";

import styles from './styles.module.scss';

interface ProjectProps {
    item: { 
        url: string; 
        thumbnail: string | Media | null | undefined;  
        client: string; 
    }
}

export function ProjectCard({ item }: ProjectProps) {

    if (!item || !item.url) return null;

    return (
        <Link 
            href={item.url}
            target="_blank"
            className={styles.projectWrapper}
        >
            <div className={styles.projectCard}>
                <div className={styles.projectHeader}>
                    <span className={styles.projectTitle}>Case em Destaque</span>
                    <span className={styles.projectClient}>{item.client}</span>
                </div>
                <div className={styles.projectThumb}>
                    <ProjectMedia
                        resource={item.thumbnail}
                        alt={item.client}
                        fill={true}
                        className={styles.projectImage}
                    />
                </div>
            </div>
        </Link>
    )
}