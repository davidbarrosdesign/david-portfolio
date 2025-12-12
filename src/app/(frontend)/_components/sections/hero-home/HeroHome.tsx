'use client'

import { motion } from "framer-motion";
import styles from "./HeroHome.module.scss";

import { TextArc } from "../../ui";

export function HeroHome() {

    function handleScroll() {
        window.scrollTo({
            top: window.innerHeight,
            behavior: "smooth"
        });
    }

    return (
        <motion.section
            className={styles.hero}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
        >
            <div className={styles.heroWrapper}>
                <div className={styles.heroTitle}>
                    <h1>Olá, sou David — Diretor Criativo e Designer de Produto para fundadores, startups e marcas da nova geração.</h1>
                </div>

                <div className={styles.heroContent}>
                    <div className={styles.heroContentText}>
                        <p><strong>Designer independente.</strong></p>
                        <p>Entregas de alto nível no ritmo de grandes agências — sem abrir mão da excelência.</p>
                    </div>
                    <button
                        className={styles.heroContentButton}
                        onClick={handleScroll}
                        aria-label="Ir para a próxima seção"
                    >
                        <div className={styles.heroContentMouse}>
                            <span></span>
                        </div>
                        <TextArc
                            text="VÁ PARA BAIXO PARA CONTINUAR NAVEGANDO"
                        />
                    </button>
                </div>
            </div>
        </motion.section>
    );
}
