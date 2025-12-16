import clsx from 'clsx';
import { TransitionLink } from '../transition-link/TransitionLink';

import styles from './Button.module.scss';

export function Button({
    href,
    size = "medium",
    style = "solid",
    color = "black",
    target = "_self",
    icon: Icon,
    iconPosition = "left",
    children,
    onClick
}: {
    href?: string;
    target?: "_self" | "_blank";
    size?: "small" | "medium" | "large";
    style?: "solid" | "outline" | "ghost";
    color?: "black" | "white";
    icon?: React.ElementType;
    iconPosition?: "left" | "right";
    children: string;
    onClick?: () => void;
}) {
    // Gera as classes CSS complexas do seu módulo
    const className = clsx(styles.button, styles[size], styles[style], styles[color]);

    // O conteúdo interno (ícones + texto)
    const content = (
        <>
            {Icon && iconPosition === "left" && (
                <Icon size={14} weight="regular" className={styles.icon} />
            )}

            <span>{children}</span>

            {Icon && iconPosition === "right" && (
                <Icon size={14} weight="regular" className={styles.icon} />
            )}
        </>
    );

    // LÓGICA DE RENDERIZAÇÃO
    if (href) {
        // Verifica se é link interno (começa com /) e não abre em nova aba
        const isInternal = href.startsWith('/');
        const isSelfTarget = target === "_self" || !target;

        if (isInternal && isSelfTarget) {
            // ✅ CASO 1: Link interno com animação
            // Passamos a 'className' do botão para o TransitionLink
            return (
                <TransitionLink href={href} className={className}>
                    {content}
                </TransitionLink>
            );
        }

        // ✅ CASO 2: Link externo ou nova aba (Next/Link padrão)
        return (
            <TransitionLink
                href={href}
                target={target}
                className={className}
            >
                {content}
            </TransitionLink>
        );
    }

    // ✅ CASO 3: Botão comum (sem href)
    return (
        <button
            onClick={onClick}
            className={className}
            type="button"
        >
            {content}
        </button>
    );
}