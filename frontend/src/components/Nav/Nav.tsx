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
      name: 'About',
      subSections: [
        { name: 'About Us', link: 'about' },
        { name: 'Teachers', link: 'teachers' },
        { name: 'Atmosphere', link: 'atmosphere' },
      ],
    },
    {
      name: 'Classes',
      subSections: [
        { name: 'Yoga Styles', link: 'yogastyles' },
        { name: 'Schedule', link: 'schedule' },
      ],
    },
    {
      name: 'Info',
      subSections: [
        { name: 'Pricing', link: 'pricing' },
        { name: 'FAQ', link: 'faq' },
        { name: 'Contact', link: 'contact' },
      ],
    },
  ];

  const [dropdownId, setDropdownId] = useState<string | null | number>(null);

  const clickDropdown = (id: string | null | number) => {
    if (id === dropdownId) setDropdownId(null);
    else setDropdownId(id);
  };

  return (
    <section className={styles.nav}>
      <div className={styles.logo}>
        <Link to='home' smooth={true}>
          <span>Bodhi balance</span>
        </Link>
      </div>
      <div className={styles.nav_menu}>
        {' '}
        <div
          className={`${styles.burger_icon} ${
            isMenuOpen ? styles.burger_open : ''
          }`}
          onClick={handleBurgerClick}>
          <span className={styles.line}></span>
          <span className={styles.line}></span>
          <span className={styles.line}></span>
        </div>
        <ul
          className={`${styles.menu} ${isMenuOpen ? styles.menu_opened : ''}`}>
          {sectionsList.map((section, id) => (
            <li className={styles.dropdown} key={id}>
              <span
                className={styles.link}
                onClick={() => {
                  clickDropdown(id);
                }}>
                {' '}
                {section.name}
              </span>

              {section.subSections && (
                <ul
                  className={`${styles.dropdownMenu} ${
                    id === dropdownId ? styles.open : ''
                  }`}>
                  {section.subSections.map((subSection) => (
                    <li key={subSection.link}>
                      <Link
                        to={subSection.link}
                        smooth={true}
                        className={styles.sublink}
                        onClick={() => setIsMenuOpen(false)}>
                        {subSection.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
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
