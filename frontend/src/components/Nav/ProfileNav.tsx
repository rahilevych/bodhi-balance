import { useState } from 'react';
import styles from './ProfileNav.module.css';
import Button from '../Button/Button';
import { useNavigate } from 'react-router';

type ProfileNavProps = {
  onTabChange: (tab: string) => void;
  activeTab: string;
};
export const ProfileNav = ({ activeTab, onTabChange }: ProfileNavProps) => {
  const tabs = ['Profile', 'Subscription', 'My bookings', 'Payments'];

  return (
    <div className={styles.nav}>
      <ul>
        {tabs.map((tab, index) => (
          <li
            key={index}
            className={tab === activeTab ? styles.active : ''}
            onClick={() => onTabChange(tab)}>
            {tab}
          </li>
        ))}
      </ul>
    </div>
  );
};
