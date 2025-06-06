import { useState } from 'react';
import styles from './ProfileNav.module.css';

export const ProfileNav = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const tabs = ['Profile', 'Abos', 'Booking', 'Invoice'];
  return (
    <div className={styles.nav}>
      <ul>
        {tabs.map((tab, index) => (
          <li
            key={tab}
            className={index === activeIndex ? styles.active : ''}
            onClick={() => setActiveIndex(index)}>
            {tab}
          </li>
        ))}
      </ul>
    </div>
  );
};
