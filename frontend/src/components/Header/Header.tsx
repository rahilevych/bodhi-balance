import Nav from '../nav/Nav';
import styles from './Header.module.css';

const Header = () => {
  return (
    <div className={`container ${styles.container}`}>
      {' '}
      <header className={styles.header}>
        <Nav />
      </header>
    </div>
  );
};

export default Header;
