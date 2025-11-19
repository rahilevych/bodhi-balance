import styles from './Nav.module.css';
import { scroller } from 'react-scroll';
import Button from '../../../shared/button/Button';
import { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { useAppContext } from '../../../context/AppContext';
import { useLocation, useNavigate } from 'react-router-dom';
import { sectionsList } from '../../../constants/sections';
import LogoutButton from '../../auth/LogoutButton';

const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { openModal, isAuthenticated } = useAppContext();
  const navigate = useNavigate();
  const location = useLocation();

  const handleBurgerClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const [dropdownId, setDropdownId] = useState<string | null | number>(null);

  const clickDropdown = (id: string | null | number) => {
    if (id === dropdownId) setDropdownId(null);
    else setDropdownId(id);
  };
  const handleSectionClick = (sectionLink: string) => {
    setIsMenuOpen(false);
    if (location.pathname !== '/') {
      navigate('/', { state: { scrollTo: sectionLink } });
    } else {
      scroller.scrollTo(sectionLink, {
        smooth: true,
        duration: 500,
      });
    }
  };

  return (
    <section className={styles.nav}>
      <div className='container '>
        <div
          data-testid='logo'
          className={styles.logo}
          onClick={() => {
            navigate('/');
          }}
        >
          <span>Bodhi balance</span>
        </div>
        <div className={styles.nav_menu}>
          {' '}
          <div
            data-testid='burger'
            className={`${styles.burger_icon} ${
              isMenuOpen ? styles.burger_open : ''
            }`}
            onClick={handleBurgerClick}
          >
            <span className={styles.line}></span>
            <span className={styles.line}></span>
            <span className={styles.line}></span>
          </div>
          <ul
            data-testid='burger-menu'
            className={`${styles.menu} ${isMenuOpen ? styles.menu_opened : ''}`}
          >
            {sectionsList.map((section, id) => (
              <li className={styles.dropdown} key={id}>
                <span
                  className={styles.link}
                  onClick={() => {
                    clickDropdown(id);
                  }}
                >
                  {' '}
                  {section.name}
                  {id === dropdownId ? (
                    <FaChevronUp className={styles.arrow} />
                  ) : (
                    <FaChevronDown className={styles.arrow} />
                  )}
                </span>

                {section.subSections && (
                  <ul
                    className={`${styles.dropdownMenu} ${
                      id === dropdownId ? styles.open : ''
                    }`}
                  >
                    {section.subSections.map((subSection) => (
                      <li key={subSection.link}>
                        <span
                          className={styles.sublink}
                          onClick={() => handleSectionClick(subSection.link)}
                        >
                          {subSection.name}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
            <li>
              {isAuthenticated ? (
                <div className={styles.buttons}>
                  {' '}
                  <div
                    onClick={() => {
                      navigate('/profile');
                    }}
                    className={styles.btn}
                  >
                    <Button>Profile</Button>
                  </div>
                  <LogoutButton />
                </div>
              ) : (
                <div onClick={openModal} className={styles.btn}>
                  <Button>Sign in</Button>
                </div>
              )}
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Nav;
