import { useNavigate } from 'react-router';
import styles from './MenuItem.module.css';
import { motion } from 'framer-motion';
import { scroller } from 'react-scroll';

type MenuItemType = {
  name: string;
  link: string;
};
interface MenuItemProps {
  item: MenuItemType;
  setIsOpen: (state: boolean) => void;
}
const menuItemVariants = {
  open: {
    y: 0,
    opacity: 1,
    transition: { y: { stiffness: 1000, velocity: -100 } },
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: { y: { stiffness: 1000 } },
  },
};
export const MenuItem = ({ item, setIsOpen }: MenuItemProps) => {
  const navigate = useNavigate();

  const handleSectionClick = (sectionLink: string) => {
    setIsOpen(false);
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
    <motion.li
      variants={menuItemVariants}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className={styles['list-item']}
    >
      <div
        onClick={() => {
          handleSectionClick(item.link);
        }}
        className={styles['text-placeholder']}
      >
        {item.name}
      </div>
      <div
        onClick={() => {
          handleSectionClick(item.link);
        }}
        className={styles['icon-placeholder']}
      />
    </motion.li>
  );
};
