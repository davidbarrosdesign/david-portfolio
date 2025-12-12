import type { Metadata } from "next";
import { Typebot } from "./_components/Typebot";
import { Divider } from '../../_components/ui';
import { HeroPage } from '../../_components/sections';

export const metadata: Metadata = {
  title: "Contato | David Barros",
  description: "Entre em contato com o Geniozinho, assistente virtual que vai resolver seus problemas! Retornamos o contato em menos de 24h."
}

export default function ContatoPage() {
    return (
        <main>
            <HeroPage title="Contato" />
            <Divider size="small" />
            <Typebot />
        </main>
    );
}