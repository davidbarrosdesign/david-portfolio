'use client';

import { Quotes } from "@phosphor-icons/react"; // Ícone de aspas para dar um charme
import styles from './ProjectTestimonial.module.scss';

interface ProjectTestimonialProps {
    author: string;
    role: string;
    company: string;
    content: string;
}

export function ProjectTestimonial({ author, role, company, content }: ProjectTestimonialProps) {
    return (
        <article className={styles.testimonialWrapper}>
            <div className={styles.icon}>
                <Quotes size={32} weight="fill" />
            </div>
            
            <blockquote className={styles.quote}>
                &quot;{content}&quot;
            </blockquote>

            <div className={styles.authorInfo}>
                <span className={styles.name}>{author}</span>
                <span className={styles.role}>
                    {role} {company && `• ${company}`}
                </span>
            </div>
        </article>
    );
}