// import styles from './page.module.scss';

import { Divider } from '@/app/(frontend)/_components/ui';
import { HeroHome, ClientsHome, ServicesHome, CallToAction } from '@/app/(frontend)/_components/sections';
import { TestimonialSection, PortfolioSection } from '@/app/(frontend)/_components/old';

export const dynamic = "force-static";
export const revalidate = 300;

async function getTrabalhos() {
  const res = await fetch("http://localhost:3000/api/trabalhos", {
    next: { revalidate: 300, tags: ["trabalhos"] },
  });

  const json = await res.json();
  return json.works;
}

async function getDepoimentos() {
  const res = await fetch("http://localhost:3000/api/depoimentos", {
    next: { revalidate: 300, tags: ["depoimentos"] },
  });

  const json = await res.json();
  return json.testimonials;
}

export default async function HomePage() {

  let trabalhos = await getTrabalhos();
  trabalhos = trabalhos.slice(0, 5); // só os 5 primeiros

  let depoimentos = await getDepoimentos();
  depoimentos = depoimentos.slice(0, 5); // só os 5 primeiros

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
      <CallToAction 
        size="medium"
        subTitle="Vamos trabalhar juntos?"
        title="Tem um projeto em mente?"
        linkTitle="Vamos falar sobre isso!"
        url="/contato"
        target="_self"
      />
    </main>
  )
}
