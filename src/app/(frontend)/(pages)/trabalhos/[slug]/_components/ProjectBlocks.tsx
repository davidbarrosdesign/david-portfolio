'use client';

import { motion } from 'framer-motion';
import type { Project } from '@/payload-types';
import { ProjectMedia } from "./ProjectMedia";
import { RichTextParser } from "./RichTextParser";
import styles from './ProjectBlocks.module.scss';

const blockAnimation = {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-10%" },
    transition: { duration: 0.95, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }
};

export function ProjectBlocks({ blocks }: { blocks: Project['layout'] }) {
    if (!blocks || !Array.isArray(blocks)) return null;

    return (
        <div className={styles.blocksContainer}>
            {blocks.map((block, index) => {
                const { blockType } = block;

                switch (blockType) {
                    case 'contentBlock':
                        return (
                            <motion.div
                                key={index}
                                className={styles.textBlock}
                                {...blockAnimation}
                            >
                                <RichTextParser content={block.content} />
                            </motion.div>
                        );

                    case 'imageBlock':
                        return (
                            <motion.figure
                                key={index}
                                className={styles.fullWidthImage}
                                {...blockAnimation}
                            >
                                <ProjectMedia 
                                    resource={block.image} 
                                    className={styles.mediaItem}
                                    fill={true}
                                />
                                {block.caption && <figcaption>{block.caption}</figcaption>}
                            </motion.figure>
                        );

                    case 'galleryBlock':
                        const isThreeCols = block.columns === '3';
                        return (
                            <motion.div
                                key={index}
                                className={`${styles.galleryGrid} ${isThreeCols ? styles.cols3 : styles.cols2}`}
                                {...blockAnimation}
                            >
                                {block.images?.map((img, imgIndex) => (
                                    <div key={imgIndex} className={styles.galleryItem}>
                                        <ProjectMedia 
                                            resource={img} 
                                            fill={true}
                                            className={styles.mediaItem}
                                        />
                                    </div>
                                ))}
                            </motion.div>
                        );

                    default:
                        return null;
                }
            })}
        </div>
    );
}