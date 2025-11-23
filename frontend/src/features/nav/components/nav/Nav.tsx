import { useWindowSize } from '../../../../hooks/useWindowSize';
import { Logo } from '../../../../shared/ui/logo/Logo';
import { Menu } from '../../../mobile-menu/components/menu/Menu';

import { LaptopMenu } from '../laptop-menu/LaptopMenu';

import styles from './Nav.module.css';

const Nav = () => {
  const { width } = useWindowSize();
  const isMobile = width < 768;

  return (
    <section className={styles.nav}>
      <div className={`container  ${styles.container}`}>
        <Logo />
        {isMobile ? <Menu /> : <LaptopMenu />}
      </div>
    </section>
  );
};

export default Nav;
