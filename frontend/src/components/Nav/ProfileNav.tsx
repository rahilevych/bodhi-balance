import { useState } from 'react';
import styles from './ProfileNav.module.css';

type ProfileNavProps = {
  onTabChange: (tab: string) => void;
  activeTab: string;
};
export const ProfileNav = ({ activeTab, onTabChange }: ProfileNavProps) => {
  const tabs = ['Profile', 'Subscription', 'My bookings', 'Payments'];
  return (
    <div className={styles.nav}>
      <div className={styles.img}>
        <img
          src='https://i.pinimg.com/736x/07/fb/34/07fb3452c4640d881a16d08c2e314f3e.jpg'
          alt=''
        />
      </div>
      <ul>
        {tabs.map((tab, index) => (
          <li
            key={tab}
            className={tab === activeTab ? styles.active : ''}
            onClick={() => onTabChange(tab)}>
            {tab}
          </li>
        ))}
      </ul>
    </div>
  );
};
