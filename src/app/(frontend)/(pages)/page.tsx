import styles from './page.module.scss';

import { HeroHome, ClientsHome } from '@/app/(frontend)/_components/sections';


export const dynamic = "force-static";
export const revalidate = 300;

export default async function HomePage() {
  return (
    <main>
      <HeroHome />
      <ClientsHome />
      <hr className={styles.divider} />
    </main>
  )
}
