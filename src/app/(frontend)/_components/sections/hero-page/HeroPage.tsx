'use client';

import { ArrowLeft } from "@phosphor-icons/react";

import styles from "./HeroPage.module.scss";
import { Button } from "../../ui";

export function HeroPage({
    title
}: {
    title: string;
}) {
    return (
        <section className={styles.hero}>
            <div className={styles.heroWrapper}>
                <div className={styles.heroTitle}>
                    <Button
                        href="/trabalhos"
                        size="small"
                        style="outline"
                        color="white"
                        icon={ArrowLeft}
                        iconPosition="left"
                    >
                        Voltar
                    </Button>
                    <h1>{title}</h1>
                </div>
            </div>
        </section>
    );
}