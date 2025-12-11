import Image from "next/image";
import Link from "next/link";
import styles from "./NotionRenderer.module.scss";

// Função auxiliar para renderizar texto com negrito/itálico/links
const Text = ({ text }: { text: any[] }) => {
    if (!text) return null;
    return text.map((value, i) => {
        const {
            annotations: { bold, italic, code, color, underline, strikethrough },
            text,
        } = value;
        return (
            <span
                key={i}
                className={[
                    bold ? styles.bold : "",
                    italic ? styles.italic : "",
                    code ? styles.code : "",
                    underline ? styles.underline : "",
                    strikethrough ? styles.strikethrough : "",
                ].join(" ")}
                style={color !== "default" ? { color } : {}}
            >
                {text.link ? (
                    <a href={text.link.url} target="_blank" rel="noreferrer">
                        {text.content}
                    </a>
                ) : (
                    text.content
                )}
            </span>
        );
    });
};

export function NotionRenderer({ blocks }: { blocks: any[] }) {
    return (
        <div className={styles.contentBody}>
            {blocks.map((block) => {
                const { type, id } = block;
                const value = block[type];

                switch (type) {
                    case "paragraph":
                        return (
                            <p key={id} className={styles.paragraph}>
                                <Text text={value.rich_text} />
                            </p>
                        );
                    case "heading_1":
                        return (
                            <h1 key={id} className={styles.h1}>
                                <Text text={value.rich_text} />
                            </h1>
                        );
                    case "heading_2":
                        return (
                            <h2 key={id} className={styles.h2}>
                                <Text text={value.rich_text} />
                            </h2>
                        );
                    case "heading_3":
                        return (
                            <h3 key={id} className={styles.h3}>
                                <Text text={value.rich_text} />
                            </h3>
                        );
                    case "bulleted_list_item":
                    case "numbered_list_item":
                        return (
                            <li key={id} className={styles.listItem}>
                                <Text text={value.rich_text} />
                            </li>
                        );
                    case "image":
                        const src =
                            value.type === "external" ? value.external.url : value.file.url;
                        const caption = value.caption ? value.caption[0]?.plain_text : "";
                        return (
                            <figure key={id} className={styles.imageBlock}>
                                <div className={styles.imgWrapper}>
                                    <Image
                                        src={src}
                                        alt={caption || "Imagem do projeto"}
                                        fill
                                        className={styles.img}
                                    />
                                </div>
                                {caption && <figcaption>{caption}</figcaption>}
                            </figure>
                        );
                    case "video":
                         const videoSrc =
                            value.type === "external" ? value.external.url : value.file.url;
                        return (
                            <div key={id} className={styles.videoBlock}>
                                <video src={videoSrc} controls muted loop playsInline />
                            </div>
                        )
                    case "divider":
                        return <hr key={id} className={styles.divider} />;
                    default:
                        return null; // Ignora blocos não suportados
                }
            })}
        </div>
    );
}