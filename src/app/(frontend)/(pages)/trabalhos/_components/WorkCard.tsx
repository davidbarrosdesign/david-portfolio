'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import styles from './styles.module.scss';

interface WorkCardProps {
    data: any;
    view: 'grid' | 'list';
}

export function WorkCard({ data, view }: WorkCardProps) {
    const hasImage = data.thumbnail && data.thumbnail !== "";

    return (
        <motion.article 
            layout // Anima a mudança de posição/tamanho
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`${styles.card} ${styles[view]}`}
        >
            <Link href={`/trabalhos/${data.slug}`} className={styles.cardLink}>
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
                    <h3>{data.client}</h3>
                    <div className={styles.meta}>
                        <ul>
                            {data.services?.map((s: string) => (
                                <li key={s}>{s}</li>
                            ))}
                        </ul>
                        <span className={styles.year}>{data.year}</span>
                    </div>
                </div>
            </Link>
        </motion.article>
    );
}