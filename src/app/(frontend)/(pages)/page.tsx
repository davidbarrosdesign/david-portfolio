// import styles from './page.module.scss';

import { Divider } from '@/app/(frontend)/_components/ui';
import { HeroHome, ClientsHome, ServicesHome, CallToAction } from '@/app/(frontend)/_components/sections';
import { TestimonialSection, PortfolioSection } from '@/app/(frontend)/_components/old';
import { getAllTrabalhos, getAllDepoimentos } from '@/app/(frontend)/_lib/notion';

export const dynamic = "force-static";
export const revalidate = 300;

export default async function HomePage() {

  // 1. Busca Trabalhos diretamente (Server-side puro)
  let trabalhos = await getAllTrabalhos();
  trabalhos = trabalhos.slice(0, 5); // Pega só os 5 primeiros

  // 2. Busca Depoimentos diretamente
  let depoimentos = await getAllDepoimentos();
  depoimentos = depoimentos.slice(0, 5); // Pega só os 5 primeiros

  return (
    <main>
      <HeroHome />
      <PortfolioSection trabalhos={trabalhos} />
      <Divider size="large" />
      <ClientsHome />
      <Divider size="large" />
      <TestimonialSection depoimentos={depoimentos} />
      <Divider size="large" />
      <ServicesHome />
      <Divider size="large" />
      <CallToAction 
        title="Tem um projeto em mente?"
        content="Vamos criar juntos um website com estética forte e mensagem clara — pronto para converter e fazer sucesso."
        linkTitle="Vamos falar sobre isso!"
        url="/contato"
        target="_self"
      />
      <Divider size="large" />
    </main>
  )
}
