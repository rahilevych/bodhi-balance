import { useState } from 'react';
import { ProfileHeader } from '../../layouts/header/components/profile-header/ProfileHeader';
import { ProfileNav } from '../../features/nav/profile-nav/ProfileNav';
import { PersonalData } from '../../features/profile/components/personal-data/PersonalData';
import styles from './Profile.module.css';
import { SubscriptionSection } from '../../features/profile/components/subscription/Subscription';
import { Bookings } from '../../features/profile/components/bookings/Bookings';
import { Payments } from '../../features/profile/components/payments/Payments';

import { useNavigate } from 'react-router';
import Button from '../../shared/ui/button/Button';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('Profile');
  const navigate = useNavigate();
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };
  return (
    <div className={styles.profile}>
      <div className='container'>
        <div className={styles.content}>
          <ProfileNav activeTab={activeTab} onTabChange={handleTabChange} />
          <ProfileHeader text={activeTab} />
          <div className={styles.line}></div>
          <div className={styles.tabs}>
            {' '}
            {activeTab === 'Profile' ? (
              <PersonalData />
            ) : activeTab === 'Subscription' ? (
              <SubscriptionSection />
            ) : activeTab === 'My bookings' ? (
              <Bookings />
            ) : (
              <Payments />
            )}
          </div>
          <div className={styles.button}>
            <Button className={styles.btn} onClick={() => navigate(-1)}>
              Back
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
