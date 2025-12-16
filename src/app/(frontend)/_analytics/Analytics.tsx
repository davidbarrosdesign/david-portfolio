'use client';

import { useEffect, useState } from "react";
import { GoogleAnalytics } from "@next/third-parties/google";

export function Analytics() {
    const [hasConsent, setHasConsent] = useState(false);

    useEffect(() => {
        // 1. Verifica se já tem consentimento salvo ao carregar a página
        const consent = localStorage.getItem('cookie_consent');
        if (consent === 'true') {
            setHasConsent(true);
        }

        // 2. Escuta o evento que criamos no CookieBanner
        // Isso serve para ativar o GA no momento exato que o usuário clica em "Aceitar"
        const handleConsentUpdate = () => {
            if (localStorage.getItem('cookie_consent') === 'true') {
                setHasConsent(true);
            }
        };

        window.addEventListener('cookie_consent_updated', handleConsentUpdate);

        // Limpeza do evento
        return () => {
            window.removeEventListener('cookie_consent_updated', handleConsentUpdate);
        };
    }, []);

    // Se não tiver consentimento, não renderiza nada (nem carrega scripts)
    if (!hasConsent) return null;

    // Se tiver, carrega o GA oficial
    // Substitua 'G-XXXXXXXXXX' pelo seu ID do GA4
    return <GoogleAnalytics gaId="G-ZS8F719SWC" />;
}