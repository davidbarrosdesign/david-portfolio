'use client';

import { useRouter } from "next/navigation";
import { ArrowLeft } from "@phosphor-icons/react";

import styles from "./HeroPage.module.scss";
import { Button } from "../../ui";

export function HeroPage({
    title
}: {
    title: string;
}) {

    const router = useRouter();

    return (
        <section className={styles.hero}>
            <div className={styles.heroWrapper}>
                <div className={styles.heroTitle}>
                    <Button
                        onClick={() => router.back()}
                        target="_self"
                        size="large"
                        style="ghost"
                        color="black"
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