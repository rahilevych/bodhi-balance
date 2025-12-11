import { useNavigate } from 'react-router';
import { sectionsList } from '../../../../constants/sections';
import { MenuItem } from '../menu-item/MenuItem';
import styles from './Navigation.module.css';
import { motion } from 'framer-motion';
import LogoutButton from '../../../auth/ui/logout-btn/LogoutButton';
import Button from '../../../../shared/ui/button/Button';
import { useProfile } from '../../../auth/hooks/useProfile';
import { useAppContext } from '../../../../context/AppContext';
const navVariants = {
  open: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.2,
    },
  },
  closed: {
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
};
const buttonsVariants = {
  open: {
    opacity: 1,
    y: 0,
    transition: { delay: 0.3 },
  },
  closed: {
    opacity: 0,
    y: 20,
  },
};
interface NavigationProps {
  setIsOpen: (state: boolean) => void;
}
export const Navigation = ({ setIsOpen }: NavigationProps) => {
  const allSubSections = sectionsList.flatMap((section) => section.subSections);
  const navigate = useNavigate();
  const { token } = useAppContext();
  const { data: user } = useProfile();

  return (
    <div className={styles.nav}>
      {' '}
      <motion.ul variants={navVariants} className={styles.list}>
        {allSubSections.map((subSection, i) => (
          <MenuItem item={subSection} setIsOpen={setIsOpen} key={i} />
        ))}
      </motion.ul>
      <motion.div variants={buttonsVariants} className={styles.buttons}>
        {user && token !== null ? (
          <div className={styles.buttons}>
            <div onClick={() => navigate('/profile')} className={styles.btn}>
              <Button>Profile</Button>
            </div>
            <LogoutButton />
          </div>
        ) : (
          <div onClick={() => navigate('/auth')} className={styles.btn}>
            <Button>Sign in</Button>
          </div>
        )}
      </motion.div>
    </div>
  );
};
