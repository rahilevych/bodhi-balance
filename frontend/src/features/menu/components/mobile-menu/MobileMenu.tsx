import { useRef, useState } from 'react';
import styles from './MobileMenu.module.css';
import { motion, Variants } from 'framer-motion';
import { useDimensions } from '../../hooks/useDimensions';
import { Navigation } from '../../ui/navigation/Navigation';
import { MenuToggle } from '../../ui/menu-toggle/MenuToggle';

const sidebarVariants: Variants = {
  open: (height = 1000) => ({
    clipPath: `circle(${height * 2 + 200}px at calc(100% - 40px) 40px)`,
    transition: {
      type: 'spring',
      stiffness: 20,
      restDelta: 2,
    },
  }),
  closed: {
    clipPath: 'circle(30px at calc(100% - 40px) 40px)',
    transition: {
      delay: 0.2,
      type: 'spring',
      stiffness: 400,
      damping: 40,
    },
  },
};
export const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { height } = useDimensions(containerRef);

  return (
    <div>
      <div className={styles.container}>
        <motion.nav
          initial={false}
          animate={isOpen ? 'open' : 'closed'}
          custom={height}
          ref={containerRef}
          className={`${styles.nav} ${isOpen ? styles.open : ''}`}
        >
          <motion.div
            variants={sidebarVariants}
            className={styles.background}
          />
          <Navigation setIsOpen={setIsOpen} />
          <MenuToggle toggle={() => setIsOpen(!isOpen)} />
        </motion.nav>
      </div>
    </div>
  );
};
