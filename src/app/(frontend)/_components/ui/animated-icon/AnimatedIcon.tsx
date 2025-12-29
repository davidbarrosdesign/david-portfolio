'use client';

import { motion } from 'framer-motion';
import parse, { DOMNode, Element, domToReact } from 'html-react-parser';
import styles from './AnimatedIcon.module.scss';

interface AnimatedIconProps {
    svgCode: string;
    className?: string;
}

// 1. Mapa de correção de atributos SVG (kebab-case -> camelCase)
// Isso resolve o erro "Invalid DOM property clip-path"
const attributeMap: Record<string, string> = {
    'clip-path': 'clipPath',
    'fill-opacity': 'fillOpacity',
    'stroke-width': 'strokeWidth',
    'stroke-linecap': 'strokeLinecap',
    'stroke-linejoin': 'strokeLinejoin',
    'stroke-miterlimit': 'strokeMiterlimit',
    'stop-color': 'stopColor',
    'stop-opacity': 'stopOpacity',
    'fill-rule': 'fillRule',
    'clip-rule': 'clipRule',
};

function fixAttributes(attribs: Record<string, string>) {
    const newAttribs: Record<string, any> = {};
    Object.keys(attribs).forEach((key) => {
        const newKey = attributeMap[key] || key;
        newAttribs[newKey] = attribs[key];
    });
    return newAttribs;
}

export function AnimatedIcon({ svgCode, className }: AnimatedIconProps) {
    if (!svgCode) return null;

    // Limpeza básica
    const cleanSvg = svgCode
        .replace(/width=".*?"/g, '')
        .replace(/height=".*?"/g, '');

    // --- Configuração da Animação de DESENHO (Stroke) ---
    const containerVariant = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1, // Desenha um traço depois do outro
                delayChildren: 0.2
            }
        }
    };

    const pathVariant = {
        hidden: { 
            pathLength: 0, // Começa "apagado"
            opacity: 0 
        },
        visible: { 
            pathLength: 1, // Desenha até o final
            opacity: 1,
            transition: { 
                duration: 1.5, // Tempo para desenhar
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "reverse" as const, // Desenha... Apaga...
                repeatDelay: 1
            }
        }
    };

    const options = {
        replace: (domNode: DOMNode) => {
            if (domNode instanceof Element && domNode.attribs) {
                const { name, attribs, children } = domNode;
                
                // Aplica a correção de atributos (clip-path -> clipPath)
                const fixedAttribs = fixAttributes(attribs);

                // 1. SVG Pai
                if (name === 'svg') {
                    const { width, height, style, ...rest } = fixedAttribs;
                    return (
                        <motion.svg
                            {...rest}
                            className={`${styles.svgIcon} ${className}`}
                            variants={containerVariant}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                        >
                            {domToReact(children as DOMNode[], options)}
                        </motion.svg>
                    );
                }

                // 2. Elementos de Desenho (Path, Circle, etc)
                if (['path', 'rect', 'circle', 'ellipse', 'polygon', 'polyline', 'line'].includes(name)) {
                    
                    const MotionComponent = motion[name as keyof typeof motion] as any;

                    return (
                        <MotionComponent
                            {...fixedAttribs}
                            // Força propriedades visuais para garantir o efeito de linha
                            initial={{ pathLength: 0, opacity: 0 }} 
                            variants={pathVariant}
                            // Opcional: Se quiser garantir que não tenha preenchimento, descomente:
                            // style={{ fill: 'transparent', stroke: 'currentColor', strokeWidth: 2 }}
                        >
                            {children.length > 0 && domToReact(children as DOMNode[], options)}
                        </MotionComponent>
                    );
                }
                
                // 3. Grupos e Defs (importante para clip-paths funcionarem)
                if (['g', 'defs', 'clipPath', 'mask'].includes(name)) {
                     // Para tags estruturais, apenas corrigimos os atributos e renderizamos normal (sem motion)
                     // ou usamos motion.g se for grupo
                     if (name === 'g') {
                         return <motion.g {...fixedAttribs}>{domToReact(children as DOMNode[], options)}</motion.g>;
                     }
                     // React.createElement é usado internamente pelo domToReact, mas aqui retornamos a tag corrigida
                     const TagName = name as any;
                     return <TagName {...fixedAttribs}>{domToReact(children as DOMNode[], options)}</TagName>;
                }
            }
        }
    };

    return <>{parse(cleanSvg, options)}</>;
}