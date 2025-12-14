'use client';

import styles from './styles.module.scss';

interface ProcessProps {
    item: { order: string; title: string; description: string }
}

export function ProcessCard({ item }: ProcessProps) {
    return (
        <div className={styles.processCard}>
            <div className={styles.processHeader}>
                <span>{item.order}</span>
            </div>
            <div className={styles.processContent}>
                <span>{item.title}</span>
                <p>{item.description}</p>
            </div>
        </div>
    )
}