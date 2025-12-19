'use client';

import { useState } from 'react';
import { useMotionValue, motion, useSpring } from 'framer-motion';
// 1. Removemos o import de Image
import { TransitionLink } from '@/app/(frontend)/_components/ui';
// 2. Importamos o ProjectMedia
import { ProjectMedia } from '../[slug]/_components/ProjectMedia';
import styles from './styles.module.scss';
import { WorkItem } from '../types';

interface WorkCardProps {
    data: WorkItem;
    view: 'grid' | 'list';
    setHoveredImg?: (img: string | null) => void;
}

export function WorkCard({ data, view, setHoveredImg }: WorkCardProps) {
    // Verificação simples se existe thumbnail
    const hasImage = data.thumbnail && data.thumbnail !== "";
    
    const [isHovered, setIsHovered] = useState(false);

    // Valores crus do mouse
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // Valores suavizados (Spring Physics)
    const smoothX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
    const smoothY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

    const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
        // Se não for grid, nem gasta processamento
        if (view !== 'grid') return;

        // Pega a posição do mouse relativa ao card
        const rect = e.currentTarget.getBoundingClientRect();
        x.set(e.clientX - rect.left);
        y.set(e.clientY - rect.top);
    };

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
                if (view === 'grid') setIsHovered(true);
            }}
            onMouseLeave={() => {
                if (view === 'list' && setHoveredImg) {
                    setHoveredImg(null);
                }
                if (view === 'grid') setIsHovered(false);
            }}
        >
            <TransitionLink 
                href={`/trabalhos/${data.slug}`}
                className={styles.cardLink}
                onMouseMove={handleMouseMove}
            >
                {/* Cursor "Visualizar" apenas no Grid */}
                {view === 'grid' && (
                    <motion.div 
                        className={`${styles.gridHoverCursor} ${isHovered ? styles.visible : ''}`}
                        style={{ 
                            left: smoothX, 
                            top: smoothY 
                        }}
                    >
                        Visualizar
                    </motion.div>
                )}
                
                {/* --- ÁREA DA IMAGEM/VÍDEO --- */}
                <div className={styles.imageContainer}>
                    {hasImage ? (
                        <ProjectMedia 
                            resource={data.thumbnail} 
                            alt={data.title} 
                            fill={true} 
                            className={styles.image}
                            // Nota: Removemos 'sizes' pois o ProjectMedia não o utiliza para vídeos,
                            // e para imagens ele já tem valores padrão inteligentes.
                        />
                    ) : (
                        <div className={styles.placeholder}>Sem imagem</div>
                    )}
                </div>
                
                {/* Infos do Card */}
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