'use client';

import { useTransition } from "@/app/(frontend)/_context/TransitionContext";
import { usePathname } from "next/navigation";
import React from "react";

interface TransitionLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    href: string;
    children: React.ReactNode;
}

export function TransitionLink({ href, children, className, onClick, ...props }: TransitionLinkProps) {
    const pathname = usePathname();
    const { animatePageOut } = useTransition();

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        // Se tiver um onClick passado por prop (ex: analytics), executa ele
        if (onClick) onClick(e);

        // Se for a mesma página ou comando de abrir em nova aba, deixa o navegador lidar
        if (pathname === href || e.metaKey || e.ctrlKey) return;

        // Caso contrário, previne o padrão e anima
        e.preventDefault();
        animatePageOut(href);
    };

    return (
        <a 
            href={href} 
            onClick={handleClick}
            className={className}
            {...props}
        >
            {children}
        </a>
    );
}