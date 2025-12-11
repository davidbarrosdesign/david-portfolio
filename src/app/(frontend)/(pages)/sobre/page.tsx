// import styles from './page.module.scss';

import { Divider } from '../../_components/ui';
import { HeroPage } from '../../_components/sections';
import { SectionAbout } from './_components/SectionAbout';
import { SectionNumbers } from './_components/SectionNumbers';

export default function SobrePage() {
    return (
        <main>
            <HeroPage title="Me chamo David Barros. Sou especialista em produtos digitais." />
            <Divider size="small" />
            Imagem
            <Divider size="medium" />
            <SectionAbout />
            <Divider size="medium" />
            <SectionNumbers />
            <Divider size="medium" />
        </main>
    );
}