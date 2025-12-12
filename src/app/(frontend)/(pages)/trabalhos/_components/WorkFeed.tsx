'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import Image from 'next/image';

import { WorkCard } from './WorkCard';
import { ViewToggle } from './ViewToggle';

import styles from './styles.module.scss';
import { WorkItem } from '../types';

export function WorkFeed({ initialData }: { initialData: WorkItem[] }) {
    const [view, setView] = useState<'grid' | 'list'>('grid');
    const [activeFilter, setActiveFilter] = useState('Todos');

    // 1. Extrair categorias únicas dos trabalhos carregados
    const categories = useMemo(() => {
        // Pega todos os serviços de todos os trabalhos e coloca num array plano
        const allServices = initialData.flatMap(work => work.services);
        // Remove duplicatas usando Set e ordena alfabeticamente
        return Array.from(new Set(allServices)).sort();
    }, [initialData]);

    // 2. Filtrar os dados com base na seleção
    const filteredData = useMemo(() => {
        if (activeFilter === 'Todos') return initialData;
        
        return initialData.filter(work => 
            work.services && work.services.includes(activeFilter)
        );
    }, [initialData, activeFilter]);

    // Estado para a imagem flutuante (Apenas URL)
    const [hoveredImg, setHoveredImg] = useState<string | null>(null);

    // --- Lógica do Mouse (Framer Motion) ---
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Configuração da física do movimento (Spring)
    const springConfig = { damping: 20, stiffness: 150, mass: 0.5 };
    const x = useSpring(mouseX, springConfig);
    const y = useSpring(mouseY, springConfig);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            // Só precisamos rastrear se estiver em modo lista
            if (view === 'list') {
                mouseX.set(e.clientX);
                mouseY.set(e.clientY);
            }
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [view, mouseX, mouseY]);

    return (
        <section className={styles.feedSection}>

            {/* Imagem flutuante */}
            <AnimatePresence>
                {view === 'list' && hoveredImg && (
                    <motion.div
                        className={styles.floatingImageContainer}
                        style={{ x, y }} // Vincula o movimento do mouse
                        initial={{ opacity: 0, scale: 0.5 }} // Começa pequeno e invisível
                        animate={{ opacity: 1, scale: 1 }}   // Aparece
                        exit={{ opacity: 0, scale: 0.5 }}    // Some suavemente
                        transition={{ duration: 0.2 }} // Rapidez do fade in/out
                    >
                        <Image 
                            src={hoveredImg} 
                            alt="Project Preview" 
                            fill 
                            sizes="400px" // Otimização
                            className={styles.floatingImage}
                            priority // Carrega rápido pois aparece no hover
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            <div className={styles.filtersWrapper}>
                <div className={styles.filtersOptions}>
                    <button 
                        onClick={() => setActiveFilter('Todos')}
                        className={`${styles.filterButton} ${activeFilter === 'Todos' ? styles.active : ''}`}
                    >
                        Todos
                    </button>
                    
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setActiveFilter(category)}
                            className={`${styles.filterButton} ${activeFilter === category ? styles.active : ''}`}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                <ViewToggle currentView={view} onToggle={setView} />
            </div>

            <motion.div 
                className={`${styles.gridContainer} ${styles[view]}`}
                layout // Anima o rearranjo do grid quando itens somem/aparecem
            >
                <AnimatePresence mode='popLayout'>
                    {filteredData.map((work) => (
                        <WorkCard 
                            key={work.id} 
                            data={work} 
                            view={view} 
                            setHoveredImg={setHoveredImg}
                        />
                    ))}
                </AnimatePresence>
            </motion.div>

            {/* Feedback visual se o filtro não retornar nada */}
            {filteredData.length === 0 && (
                <div className={styles.emptyState}>
                    <p>Nenhum trabalho encontrado nesta categoria.</p>
                </div>
            )}
        </section>
    );
}