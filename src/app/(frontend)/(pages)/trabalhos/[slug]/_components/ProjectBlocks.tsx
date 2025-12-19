'use client';

import { ProjectMedia } from "./ProjectMedia"; // Aquele componente que criamos
import { RichTextParser } from "./RichTextParser";
import styles from './ProjectBlocks.module.scss'; // Vamos usar o CSS existente ou adaptar

export function ProjectBlocks({ blocks }: { blocks: any[] }) {
    if (!blocks || !Array.isArray(blocks)) return null;

    return (
        <div className={styles.blocksContainer}>
            {blocks.map((block, index) => {
                const { blockType } = block;

                switch (blockType) {
                    case 'contentBlock':
                        return (
                            <div key={index} className={styles.textBlock}>
                                <RichTextParser content={block.content} />
                            </div>
                        );

                    case 'imageBlock':
                        return (
                            <figure key={index} className={styles.fullWidthImage}>
                                <ProjectMedia 
                                    resource={block.image} 
                                    className={styles.mediaItem}
                                    fill={true}
                                />
                                {block.caption && <figcaption>{block.caption}</figcaption>}
                            </figure>
                        );

                    case 'galleryBlock':
                        const isThreeCols = block.columns === '3';
                        return (
                            <div key={index} className={`${styles.galleryGrid} ${isThreeCols ? styles.cols3 : styles.cols2}`}>
                                {block.images?.map((img: any, imgIndex: number) => (
                                    <div key={imgIndex} className={styles.galleryItem}>
                                        <ProjectMedia 
                                            resource={img} 
                                            fill={true}
                                            className={styles.mediaItem}
                                        />
                                    </div>
                                ))}
                            </div>
                        );

                    default:
                        return null;
                }
            })}
        </div>
    );
}