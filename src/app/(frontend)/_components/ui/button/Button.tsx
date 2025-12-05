import clsx from 'clsx';
import Link from 'next/link';

import styles from './Button.module.scss';

export function Button({
    href,
    size = "medium",
    style = "solid",
    color = "black",
    target = "_self",
    icon: Icon,
    iconPosition = "left",
    children
}: {
    href: string;
    target?: "_self" | "_blank";
    size?: "small" | "medium" | "large";
    style?: "solid" | "outline" | "ghost";
    color?: "black" | "white";
    icon?: React.ElementType;          // icone opcional
    iconPosition?: "left" | "right";   // posição opcional
    children: string
}) {
  return (
    <Link
        href={href}
        target={target}
        className={clsx(styles.button, styles[size], styles[style], styles[color])}
    >
      {Icon && iconPosition === "left" && (
        <Icon size={14} weight="regular" className={styles.icon} />
      )}

      <span>{children}</span>

      {Icon && iconPosition === "right" && (
        <Icon size={14} weight="regular" className={styles.icon} />
      )}
    </Link>
  );
}