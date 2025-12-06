"use client";

import styles from "./TextArc.module.scss";

export function TextArc({
    text = "Seu texto aqui girando lindamente",
}) {

    return (
        <>
            <svg viewBox="-126 -126 252 252" xmlns="http://www.w3.org/2000/svg" className={styles.textArcSvg}>
                <path id="path" d="M-125 0a125 125 0 10250 0 125 125 0 10-250 0" fill="none" />
                <text y="40" className={styles.textArc}>
                    <textPath href="#path" startOffset="20">
                        {text}
                    </textPath>
                </text>
            </svg>
        </>
    );
}
