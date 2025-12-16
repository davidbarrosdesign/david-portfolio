'use client';
import Link from 'next/link';
import Image from 'next/image';

import styles from './styles.module.scss';

import { StaticImageData } from 'next/image';

interface ProjectProps {
    item: { url: string; thumbnail: string | StaticImageData; client: string; }
}

export function ProjectCard({ item }: ProjectProps) {
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
                    <Image
                        src={item.thumbnail}
                        alt={item.client}
                        className={styles.projectImage}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        // height={128}
                        priority
                        objectFit='contain'
                    />
                </div>
            </div>
        </Link>
    )
}