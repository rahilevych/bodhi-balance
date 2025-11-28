import { useAppContext } from '../../../../context/AppContext';
import { Logo } from '../../../../shared/ui/logo/Logo';
import { LaptopMenu } from '../../../menu/components/laptop-menu/LaptopMenu';
import { MobileMenu } from '../../../menu/components/mobile-menu/MobileMenu';

import styles from './Nav.module.css';

const Nav = () => {
  const { isMobile } = useAppContext();

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
