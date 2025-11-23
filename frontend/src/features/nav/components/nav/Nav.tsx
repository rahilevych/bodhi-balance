import { useWindowSize } from '../../../../hooks/useWindowSize';
import { Logo } from '../../../../shared/ui/logo/Logo';
import { LaptopMenu } from '../../../menu/components/laptop-menu/LaptopMenu';
import { MobileMenu } from '../../../menu/components/mobile-menu/MobileMenu';

import styles from './Nav.module.css';

const Nav = () => {
  const { width } = useWindowSize();
  const isMobile = width < 768;

  return (
    <section className={styles.nav}>
      <div className={`container  ${styles.container}`}>
        <Logo />
        {isMobile ? <MobileMenu /> : <LaptopMenu />}
      </div>
    </section>
  );
};

export default Nav;
