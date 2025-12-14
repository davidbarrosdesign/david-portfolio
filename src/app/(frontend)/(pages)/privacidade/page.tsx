import type { Metadata } from "next";
import Link from "next/link";
import { Divider } from '../../_components/ui';
import { HeroPage } from '../../_components/sections';

import styles from './page.module.scss';

export const metadata: Metadata = {
  title: "Políticas de privacidade | David Barros",
  description: "Políticas de privacidade do David Barros"
}

export default function Privacidade() {
    return (
        <>
            <HeroPage
                title="Políticas de privacidade"
            />
            <Divider size="small" />

            <article className={styles.content}>
                <p>Se você compartilhar informações potencialmente confidenciais comigo, não compartilharei com mais ninguém, a menos que eu tenha sua permissão explícita para fazê-lo, ou a menos que seja obrigado por lei.</p>

                <p>Eu armazeno todas as informações que você me envia através dos vários contatos e formulários de contato no meu site ou por e-mail. Se você me pedir, excluirei qualquer informação pessoal que você me enviou.</p>

                <p>Eu uso o Google Analytics e Microsoft Clarity para coletar dados sobre como as pessoas usam meu site. A maioria desses dados é anonimizada, mas alguns podem não ser. Saiba mais lendo suas respectivas políticas de privacidade.</p>

                <p>Se você tiver alguma dúvida ou preocupação sobre a Política de Privacidade, entre em contato comigo em: <Link href="mailto:davidbarrosdesign@gmail.com">davidbarrosdesign@gmail.com</Link>.</p>

                <p>Última atualização em: 13 de dezembro de 2025</p>
            </article>
            
            <Divider size="medium" />
        </>
    );
}