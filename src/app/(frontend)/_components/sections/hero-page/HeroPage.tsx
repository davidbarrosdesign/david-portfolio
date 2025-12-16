'use client';

import { useRouter } from "next/navigation";
import { ArrowLeft } from "@phosphor-icons/react";

import { useTransition } from "@/app/(frontend)/_context/TransitionContext";
import { Button } from "../../ui";
import styles from "./HeroPage.module.scss";

export function HeroPage({
    title
}: {
    title: string;
}) {

    const router = useRouter();

    const { startTransition } = useTransition();

    const handleGoBack = () => {
        // Inicia a animação (tela preta) e depois roda o router.back()
        startTransition(() => {
            router.back();
        });
    };

    return (
        <section className={styles.hero}>
            <div className={styles.heroWrapper}>
                <div className={styles.heroTitle}>
                    <Button
                        onClick={handleGoBack}
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