import { useState } from 'react';
import { sectionsList } from '../../../../constants/sections';
import styles from './LaptopMenu.module.css';
import { useLocation, useNavigate } from 'react-router';
import { scroller } from 'react-scroll';

import LogoutButton from '../../../auth/ui/logout-btn/LogoutButton';
import { Dropdown } from '../../../../shared/ui/dropdown/Dropdown';
import Button from '../../../../shared/ui/button/Button';
import { useProfile } from '../../../auth/hooks/useProfile';

export const LaptopMenu = () => {
  const { data: user } = useProfile();
  const [, setIsMenuOpen] = useState(false);

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
        {sectionsList.map((section, index) => (
          <Dropdown
            key={index}
            title={section.name}
            subSections={section.subSections}
            onSelect={handleSectionClick}
          />
        ))}
      </div>
      {user ? (
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
        <div onClick={() => navigate('/auth')} className={styles.btn}>
          <Button>Sign in</Button>
        </div>
      )}
    </div>
  );
};
