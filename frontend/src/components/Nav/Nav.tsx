import styles from './Nav.module.css';
import { Link } from 'react-scroll';
import Button from '../Button/Button';
import { useState } from 'react';

const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleBurgerClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const sectionsList = [
    {
      name: 'Home',
      link: 'home',
      dropdown: false,
    },
    {
      name: 'About',
      link: 'about',
      dropdown: true,
      subSections: [
        { name: 'About Us', link: 'about' },
        { name: 'Teachers', link: 'teachers' },
        { name: 'Atmosphere', link: 'atmosphere' },
      ],
    },
    {
      name: 'Classes',
      link: 'yogastyles',
      dropdown: true,
      subSections: [
        { name: 'Yoga Styles', link: 'yogastyles' },
        { name: 'Schedule', link: 'schedule' },
      ],
    },
    {
      name: 'Info',
      link: 'pricing',
      dropdown: true,
      subSections: [
        { name: 'Pricing', link: 'pricing' },
        { name: 'FAQ', link: 'faq' },
        { name: 'Contact', link: 'contact' },
      ],
    },
  ];
  const burgerMenu = [
    'home',
    'about',
    'yoga styles',
    'schedule',
    'pricing',
    'teachers',
    'atmosphere',
    'faq',
    'contact',
  ];

  return (
    <section className={styles.nav}>
      <div className={styles.logo}>
        <Link to='home' smooth={true}>
          <span>Bodhi balance</span>
        </Link>
      </div>
      <div className={styles.nav_menu}>
        {' '}
        <ul className={styles.menu}>
          {sectionsList.map((section) => (
            <li
              key={section.name}
              className={section.dropdown ? styles.dropdown : ''}>
              <Link
                to={section.link}
                smooth={true}
                className={styles.link}
                activeClass={styles.active}>
                {section.name}
              </Link>
              {section.dropdown && section.subSections && (
                <ul className={styles.dropdownMenu}>
                  {section.subSections.map((subSection) => (
                    <li key={subSection.link}>
                      <Link
                        to={subSection.link}
                        smooth={true}
                        className={styles.link}>
                        {subSection.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
        <Link to='/login' className={styles.btn}>
          <Button text='Sign in' />
        </Link>
      </div>
      <div
        className={`${styles.burger} ${isMenuOpen ? styles.burger_open : ''}`}
        onClick={handleBurgerClick}>
        <div className={styles.burger_icon}>
          <span className={styles.line}></span>
          <span className={styles.line}></span>
          <span className={styles.line}></span>
        </div>
        <ul className={styles.burger_menu}>
          {burgerMenu.map((section) => (
            <li key={section}>
              <Link
                to={section}
                smooth={true}
                onClick={() => setIsMenuOpen(false)}>
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </Link>
            </li>
          ))}
          <li>
            <Link to='/login' className={styles.btn}>
              <Button text='Sign in' />
            </Link>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default Nav;
