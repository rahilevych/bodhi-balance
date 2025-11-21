import { useNavigate } from 'react-router';
import { sectionsList } from '../../../../constants/sections';
import { MenuItem } from '../menu-item/MenuItem';
import styles from './Navigation.module.css';
import { motion, stagger } from 'framer-motion';
import { useAppContext } from '../../../../context/AppContext';
import Button from '../../../button/Button';
import LogoutButton from '../../../../features/auth/LogoutButton';
const navVariants = {
  open: {
    transition: { delayChildren: stagger(0.07, { startDelay: 0.2 }) },
  },
  closed: {
    transition: { delayChildren: stagger(0.05, { from: 'last' }) },
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
  const { openModal, isAuthenticated } = useAppContext();
  return (
    <div className={styles.nav}>
      {' '}
      <motion.ul variants={navVariants} className={styles.list}>
        {allSubSections.map((subSection, i) => (
          <MenuItem item={subSection} setIsOpen={setIsOpen} key={i} />
        ))}
      </motion.ul>
      <motion.div variants={buttonsVariants} className={styles.buttons}>
        {isAuthenticated ? (
          <div className={styles.buttons}>
            <div onClick={() => navigate('/profile')} className={styles.btn}>
              <Button>Profile</Button>
            </div>
            <LogoutButton />
          </div>
        ) : (
          <div onClick={openModal} className={styles.btn}>
            <Button>Sign in</Button>
          </div>
        )}
      </motion.div>
    </div>
  );
};
