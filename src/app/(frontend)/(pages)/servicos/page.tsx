import type { Metadata } from "next";
import Link from "next/link";
import { Divider } from '../../_components/ui';
import { HeroPage } from '../../_components/sections';
import { ServicesList } from './_components/ServicesList';

import styles from './page.module.scss';

export const metadata: Metadata = {
  title: "Serviços | David Barros",
  description: "Serviços do David Barros"
}

export default function ServicosPage() {
    return (
        <>
            <HeroPage
                title="Te ajudo a criar produtos e marcas do zero — ou a levar o que já existe para o próximo nível."
            />
            <Divider size="small" />
            <ServicesList />
        </>
    );
}