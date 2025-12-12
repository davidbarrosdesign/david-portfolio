import type { Metadata } from "next";
import { HeroPage, CallToAction } from '../../_components/sections';
import { WorkFeed } from './_components/WorkFeed';

export const dynamic = "force-static";
export const revalidate = 300;

async function getTrabalhos() {
  const res = await fetch("http://localhost:3000/api/trabalhos", {
    next: { revalidate: 300, tags: ["trabalhos"] },
  });

  const json = await res.json();
  return json.works;
}

export const metadata: Metadata = {
  title: "Trabalhos | David Barros",
  description: "Confira alguns dos trabalhos especialmente selecionados no portfolio do designer David Barros."
}

export default async function TrabalhosPage() {

    const trabalhos = await getTrabalhos();

    return (
        <main>
            <HeroPage title="Trabalhos selecionados" />

            {/* Conteúdo da página == lista de cards */}
            <WorkFeed initialData={trabalhos} />

            <CallToAction 
              size="large"
              subTitle="Vamos trabalhar juntos?"
              title="Tem um projeto em mente?"
              linkTitle="Vamos falar sobre isso!"
              url="/contato"
              target="_self"
            />
        </main>
    );
}