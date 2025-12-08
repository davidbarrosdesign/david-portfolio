'use client';

import Image from "next/image";
import styles from "./PortfolioHomeCard.module.scss";

import { ArrowUpRight } from "@phosphor-icons/react";
import { Button } from "../../ui";

export function PortfolioHomeCard({ data }: { data: any }) {

    const isVideo =
        data.image?.endsWith(".mp4") ||
        data.image?.endsWith(".webm") ||
        data.image?.includes("video");

    return (
        <section className={styles.card}>
            <article className={styles.portfolioBigCard}>
                <div className={styles.portfolioBigCardClient}>
                    <span>{data.client}</span>
                    <span>{data.year}</span>
                </div>

                <div className={styles.portfolioBigCardBanner}>
                    <div
                        className={styles.portfolioBigCardMedia}
                    >
                        {isVideo ? (
                            <video
                                src={data.image}
                                autoPlay
                                loop
                                muted
                                playsInline
                                className={styles.media}
                            />
                        ) : (
                            <Image
                                src={data.thumbnail}
                                alt={data.title}
                                fill
                            />
                        )}
                    </div>

                    <div className={styles.portfolioBigCardServices}>
                        <ul>
                            {data.services?.map((s: string) => (
                                <li key={s}>{s}</li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className={styles.portfolioBigCardButton}>
                    <Button
                        href={data.link}
                        size="large"
                        style="outline"
                        color="white"
                        icon={ArrowUpRight}
                        iconPosition="right"
                    >
                        Detalhes do projeto
                    </Button>
                </div>
            </article>
        </section>
    );
}
