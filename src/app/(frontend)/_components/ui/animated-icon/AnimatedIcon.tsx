'use client';

import { motion, Variants } from 'framer-motion';
import parse, { DOMNode, Element, domToReact } from 'html-react-parser';
import styles from './AnimatedIcon.module.scss';

interface AnimatedIconProps {
    svgCode: string; // Agora recebemos a string direta
    className?: string;
}

export function AnimatedIcon({ svgCode, className }: AnimatedIconProps) {
    if (!svgCode) return null;

    // --- Configuração da Animação para Ícones Preenchidos ---
    
    // O Container controla o tempo dos filhos (staggerChildren)
    const containerVariant = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1, // Cada pedaço do ícone aparece com 0.1s de atraso
                delayChildren: 0.2
            }
        }
    };

    // Cada pedaço do ícone faz isso:
    const childVariant: Variants = {
        hidden: { 
            opacity: 0, 
            scale: 0.5, 
            y: 10 
        },
        visible: { 
            opacity: 1, 
            scale: 1, 
            y: 0,
            transition: { 
                type: "spring", 
                stiffness: 200, 
                damping: 15 
            }
        }
    };


    
    // Pequeno helper caso o parser precise serializar de volta (opcional, mas o parse direto costuma resolver)
    // Para simplificar, vamos deixar o parser fazer o trabalho recursivo padrão acima.
    
    // OBS: O html-react-parser às vezes precisa de ajuste fino para SVG complexo. 
    // Uma abordagem mais robusta e simples para o "replace" dos filhos:
    
    const simpleOptions = {
        replace: (domNode: DOMNode) => {
            if (domNode instanceof Element) {
                // Se for o SVG pai
                if (domNode.name === 'svg') {
                    const { width: _width, height: _height, ...rest } = domNode.attribs;
                    return (
                        <motion.svg
                            {...rest}
                            className={`${className} ${styles.svgIcon}`}
                            variants={containerVariant}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-10%" }}
                        >
                            {domToReact(domNode.children as DOMNode[], simpleOptions)}
                        </motion.svg>
                    );
                }
                // Se for elemento filho desenhável
                if (['path', 'circle', 'rect', 'polygon'].includes(domNode.name)) {
                    const MotionComponent = motion[domNode.name as keyof typeof motion] as React.ElementType; // Cast para ElementType para evitar 'any'

                    return (
                        <MotionComponent
                            {...domNode.attribs}
                            variants={childVariant}
                        />
                    );
                }
            }
        }
    };
    
    // Vamos usar uma versão simplificada que funciona em 99% dos casos
    // Convertemos a string limpando width/height hardcoded
    const cleanSvg = svgCode
        .replace(/width=".*?"/, '')
        .replace(/height=".*?"/, '');

    return <>{parse(cleanSvg, simpleOptions)}</>;
}
