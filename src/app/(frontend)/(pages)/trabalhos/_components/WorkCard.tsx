'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { TransitionLink } from '@/app/(frontend)/_components/ui';
import styles from './styles.module.scss';
import { WorkItem } from '../types';

interface WorkCardProps {
    data: WorkItem;
    view: 'grid' | 'list';
    setHoveredImg?: (img: string | null) => void;
}

export function WorkCard({ data, view, setHoveredImg }: WorkCardProps) {
    const hasImage = data.thumbnail && data.thumbnail !== "";

    return (
        <motion.article 
            layout // Anima a mudança de posição/tamanho
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`${styles.card} ${styles[view]}`}
            // Eventos para o modo LISTA
            onMouseEnter={() => {
                if (view === 'list' && setHoveredImg && hasImage) {
                    setHoveredImg(data.thumbnail);
                }
            }}
            onMouseLeave={() => {
                if (view === 'list' && setHoveredImg) {
                    setHoveredImg(null);
                }
            }}
        >
            <TransitionLink href={`/trabalhos/${data.slug}`} className={styles.cardLink}>
                <div className={styles.imageContainer}>
                    {hasImage ? (
                        <Image 
                            src={data.thumbnail} 
                            alt={data.title} 
                            fill 
                            className={styles.image}
                            sizes={view === 'grid' ? "(max-width: 768px) 100vw, 50vw" : "100vw"}
                        />
                    ) : (
                        <div className={styles.placeholder}>Sem imagem</div>
                    )}
                </div>
                
                <div className={styles.info}>
                    <h4>{data.client}</h4>
                    <div className={styles.meta}>
                        <ul>
                            {data.services?.map((s: string) => (
                                <li key={s}>{s}</li>
                            ))}
                        </ul>
                        <span className={styles.year}>{data.year}</span>
                    </div>
                </div>
            </TransitionLink>
        </motion.article>
    );
}