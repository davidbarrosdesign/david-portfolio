'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { WorkCard } from './WorkCard';
import { ViewToggle } from './ViewToggle';

import styles from './styles.module.scss';

export function WorkFeed({ initialData }: { initialData: any[] }) {
    const [view, setView] = useState<'grid' | 'list'>('grid');
    const [filter, setFilter] = useState('all'); // Preparado para o futuro

    // Aqui você filtrará os dados quando implementar as categorias
    const filteredData = initialData;

    return (
        <section className={styles.feedSection}>
            <div className={styles.filtersWrapper}>
                <div className={styles.filtersOptions}>
                    {/* Futuro componente de filtros aqui */}
                    <span>Todos</span>
                    <span>Design</span>
                    <span>Tech</span>
                </div>

                <ViewToggle currentView={view} onToggle={setView} />
            </div>

            <motion.div 
                className={`${styles.gridContainer} ${styles[view]}`}
                layout // Propriedade mágica do Framer Motion para animar layout
            >
                <AnimatePresence>
                    {filteredData.map((work) => (
                        <WorkCard 
                            key={work.id} 
                            data={work} 
                            view={view} 
                        />
                    ))}
                </AnimatePresence>
            </motion.div>
        </section>
    );
}