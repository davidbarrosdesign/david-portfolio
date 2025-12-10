// import styles from './page.module.scss';
import { Divider } from '../../_components/ui';
import { HeroPage } from '../../_components/sections';
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

export default async function TrabalhosPage() {

    const trabalhos = await getTrabalhos();

    return (
        <main>
            <HeroPage title="Trabalhos selecionados" />

            {/* Conteúdo da página == lista de cards */}
            <WorkFeed initialData={trabalhos} />

            <Divider size="medium" />
        </main>
    );
}