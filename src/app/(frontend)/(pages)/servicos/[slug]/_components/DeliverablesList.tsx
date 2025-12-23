'use client';

import { useState } from "react";
import { DeliverableAccordion } from "./DeliverableAccordion";
import { Service } from "@/payload-types";
import styles from "./styles.module.scss";

interface DeliverablesListProps {
    deliverables: NonNullable<Service['deliverables']>;
}

export function DeliverablesList({ deliverables }: DeliverablesListProps) {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const handleToggle = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className={styles.deliverablesList}>
            {deliverables.map((item, i) => (
                <DeliverableAccordion 
                    key={i} 
                    item={item}
                    isOpen={i === openIndex}
                    onToggle={() => handleToggle(i)}
                />
            ))}
        </div>
    );
}
