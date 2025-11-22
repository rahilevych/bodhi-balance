import Nav from '../../../../features/nav/components/nav/Nav';
import styles from './Header.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      <Nav />
    </header>
  );
};

export default Header;
