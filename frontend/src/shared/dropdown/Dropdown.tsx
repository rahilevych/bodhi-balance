import { useRef, useState } from 'react';
import { useClickOutside } from '../../hooks/useClickOutside';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Dropdown.module.css';
interface subSection {
  name: string;
  link: string;
}
interface DropdownProps {
  title: string;
  subSections?: subSection[];
  onSelect?: (link: string) => void;
}
export const Dropdown = ({ title, subSections, onSelect }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useClickOutside(ref, () => setIsOpen(false));

  return (
    <div className={styles.dropdown} ref={ref}>
      <span className={styles.link} onClick={() => setIsOpen((prev) => !prev)}>
        {title}
      </span>
      {subSections && (
        <AnimatePresence>
          {isOpen && (
            <motion.ul
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className={styles.dropdownMenu}
            >
              {subSections.map((sub) => (
                <li key={sub.link}>
                  <span
                    className={styles.sublink}
                    onClick={() => onSelect?.(sub.link)}
                  >
                    {sub.name}
                  </span>
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      )}
    </div>
  );
};
