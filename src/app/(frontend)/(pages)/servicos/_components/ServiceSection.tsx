'use client';

import Image from 'next/image';
import { Button, AnimatedIcon } from "@/app/(frontend)/_components/ui";
import { Service } from "@/payload-types";
import styles from './styles.module.scss';

export function ServiceSection({ data, index }: { data: Service; index: number }) {

    return (
        <section
            className={styles.serviceSection}
            data-index={index}
        >
            <div className={styles.serviceWrapper}>
                {/* COLUNA ESQUERDA */}
                <div className={styles.leftColumn}>
                    <div className={styles.iconWrapper}>
                        {/* Lógica Híbrida:
                           1. Se tiver código SVG (novo), usa o AnimatedIcon.
                           2. Se não, tenta usar a imagem antiga (fallback).
                        */}
                        {data.iconCode ? (
                            <div className={styles.iconContainer}>
                                <AnimatedIcon 
                                    svgCode={data.iconCode} 
                                    className={styles.iconCode} 
                                />
                            </div>
                        ) : (
                           /* Seu código antigo de imagem ou ícone padrão aqui */
                           (typeof data.icon !== 'string' && data.icon.url) && (
                               <Image
                                    src={data.icon.url}
                                    alt={data.icon.alt}
                                    fill
                                    style={{ objectFit: 'contain' }}
                                    className={styles.iconImage}
                                />
                           )
                        )}
                    </div>
                </div>

                {/* COLUNA DIREITA */}
                <div className={styles.rightColumn}>
                    <div className={styles.content}>
                        <h2 className={styles.title}>{data.title}</h2>

                        {data.description && (
                            <p className={styles.description}>{data.description}</p>
                        )}
                    </div>

                    <div className={styles.deliverablesList}>
                        <ul>
                            {data.deliverables?.map((item, i) => (
                                <li key={i}>{item.title}</li>
                            ))}
                        </ul>
                    </div>

                    <div className={styles.buttonWrapper}>
                        <Button
                            href="/contato"
                            size="large"
                            style="solid"
                            color="black"
                        >
                            Solicitar orçamento
                        </Button>

                        <Button
                            href={`/servicos/${data.slug}`}
                            size="large"
                            style="ghost"
                            color="black"
                        >
                            Saiba mais
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}