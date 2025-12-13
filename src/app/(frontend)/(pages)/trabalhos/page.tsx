import type { Metadata } from "next";
import { HeroPage, CallToAction } from '../../_components/sections';
import { Divider } from '../../_components/ui';
import { WorkFeed } from './_components/WorkFeed';

import { getAllTrabalhos } from '@/app/(frontend)/_lib/notion';

export const dynamic = "force-static";
export const revalidate = 300;

export const metadata: Metadata = {
  title: "Trabalhos | David Barros",
  description: "Confira alguns dos trabalhos especialmente selecionados no portfolio do designer David Barros."
}

export default async function TrabalhosPage() {

    const trabalhos = await getAllTrabalhos();

    return (
        <main>
            <HeroPage title="Trabalhos selecionados" />

            {/* Conteúdo da página == lista de cards */}
            <WorkFeed initialData={trabalhos} />

            <Divider size="medium" />

            <CallToAction 
              title="Tem um projeto em mente?"
              content="Vamos criar juntos um website com estética forte e mensagem clara — pronto para converter e fazer sucesso."
              linkTitle="Vamos falar sobre isso!"
              url="/contato"
              target="_self"
            />

            <Divider size="medium" />
        </main>
    );
}