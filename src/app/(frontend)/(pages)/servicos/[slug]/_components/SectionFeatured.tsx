'use client';

import { useRef } from "react";
import { motion, useInView } from 'framer-motion';
import { Service, Project, Testimonial, Client } from "@/payload-types";
import { ArrowUpRightIcon } from "@phosphor-icons/react";
import { ProjectMedia } from "../../../trabalhos/[slug]/_components/ProjectMedia";
import { TransitionLink } from "@/app/(frontend)/_components/ui";
import styles from "./styles.module.scss";

export function SectionFeatured({ item }: { item: Service }) {

    const ref = useRef(null);
    const isInView = useInView(ref, { margin: "0px 0px -100px 0px", once: true });

    const motionVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }
        }
    };

    // 1. Verificações de Segurança: O projeto existe? É um objeto populado?
    if (!item.relatedProject || typeof item.relatedProject !== 'object') {
        return null;
    }

    const project = item.relatedProject as Project;

    // 2. Extrair dados do Testimonial (se houver)
    const testimonial = (project.relatedTestimonial && typeof project.relatedTestimonial === 'object')
        ? (project.relatedTestimonial as Testimonial)
        : null;

    // 3. Extrair nome do Cliente
    const clientName = (project.client && typeof project.client === 'object')
        ? (project.client as Client).name
        : 'Cliente';
    
    
    return (
        <motion.section
            ref={ref}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={motionVariants}
            className={styles.featuredWrapper}
        >
            <div className={styles.featuredContainer}>
                {testimonial ? (
                    <div className={styles.featuredContent}>
                        <blockquote className={styles.quote}>
                            {testimonial.content}
                        </blockquote>

                        <div className={styles.author}>
                            <span className={styles.name}>{testimonial.author}</span>
                            <span className={styles.role}>
                                {testimonial.authorRole} {clientName}
                            </span>
                        </div>
                    </div>
                ) : (
                    <div className={styles.contentEmpty}>
                        <h2>Confira como transformei este desafio em resultado</h2>
                        <p>Este é um dos cases de destaque em {item.title}. Veja mais detalhes no projeto.</p>
                    </div>
                )}
                <div className={styles.featuredProject}>
                    <TransitionLink
                        href={`/trabalhos/${project.slug}`}
                        className={styles.projectCard}
                        target="_self"
                    >
                        <div className={styles.projectImageContainer}>
                            <ProjectMedia 
                                resource={project.thumbnail}
                                alt={project.title}
                                fill={true}
                                className={styles.projectImage}
                            />
                        </div>

                        <div className={styles.projectTitle}>
                            <span>{project.title}</span>
                            <ArrowUpRightIcon size={40} />
                        </div>
                    </TransitionLink>
                </div>
            </div>
        </motion.section>
    );
}