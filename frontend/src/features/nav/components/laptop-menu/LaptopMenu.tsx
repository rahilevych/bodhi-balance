import { useState } from 'react';
import { sectionsList } from '../../../../constants/sections';

import styles from './LaptopMenu.module.css';
import { useAppContext } from '../../../../context/AppContext';
import { useLocation, useNavigate } from 'react-router';
import { scroller } from 'react-scroll';

import LogoutButton from '../../../auth/LogoutButton';
import { Dropdown } from '../../../../shared/ui/dropdown/Dropdown';
import Button from '../../../../shared/ui/button/Button';

export const LaptopMenu = () => {
  const [, setIsMenuOpen] = useState(false);
  const { openModal, isAuthenticated } = useAppContext();
  const navigate = useNavigate();
  const location = useLocation();
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
    <div className={styles.menu}>
      <div className={styles.links}>
        {' '}
        {sectionsList.map((section) => (
          <Dropdown
            title={section.name}
            subSections={section.subSections}
            onSelect={handleSectionClick}
          />
        ))}
      </div>
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
    </div>
  );
};
