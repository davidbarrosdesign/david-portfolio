// src/app/(frontend)/trabalhos/_components/ViewToggle.tsx
'use client';

import styles from './styles.module.scss';

interface ViewToggleProps {
    currentView: 'grid' | 'list';
    onToggle: (view: 'grid' | 'list') => void;
}

export function ViewToggle({ currentView, onToggle }: ViewToggleProps) {
    return (
        <div className={styles.viewToggle}>
            <button 
                onClick={() => onToggle('grid')}
                className={currentView === 'grid' ? styles.active : ''}
                aria-label="Visualização em Grid"
            >
                Grid
            </button>
            <button 
                onClick={() => onToggle('list')}
                className={currentView === 'list' ? styles.active : ''}
                aria-label="Visualização em Lista"
            >
                Lista
            </button>
        </div>
    );
}