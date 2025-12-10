'use client'
import clsx from 'clsx';

import styles from "./Divider.module.scss";

export function Divider({
    size = 'large',
    children
}: {
    size?: 'large' | 'medium' | 'small';
    children?: React.ReactNode
}) {
    return (
        <div
            className={clsx(styles.divider, styles[size])}
        >
            { children }
        </div>
    )
}