import styles from './Nav.module.css';
import { Link } from 'react-scroll';
import Button from '../Button/Button';
import { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { useAppContext } from '../../context/AppContext';
import { useNavigate } from 'react-router';
import { sectionsList } from '../../constants/sections';

import LogoutButton from '../authorization/LogoutButton';

const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { openModal, isAuthenticated } = useAppContext();
  const navigate = useNavigate();

  const handleBurgerClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const [dropdownId, setDropdownId] = useState<string | null | number>(null);

  const clickDropdown = (id: string | null | number) => {
    if (id === dropdownId) setDropdownId(null);
    else setDropdownId(id);
  };

  return (
    <section className={styles.nav}>
      <div
        className={styles.logo}
        onClick={() => {
          navigate('/');
        }}>
        <span>Bodhi balance</span>
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
            {isAuthenticated ? (
              <div className={styles.buttons}>
                {' '}
                <div
                  onClick={() => {
                    navigate('/profile');
                  }}
                  className={styles.btn}>
                  <Button text='Profile' />
                </div>
                <LogoutButton />
              </div>
            ) : (
              <div onClick={openModal} className={styles.btn}>
                <Button text='Sign in' />
              </div>
            )}
          </li>
        </ul>
      </div>
    </section>
  );
};

export default Nav;
