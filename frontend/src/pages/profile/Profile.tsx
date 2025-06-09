import { useState } from 'react';
import { ProfileHeader } from '../../components/Header/ProfileHeader';
import { ProfileNav } from '../../components/Nav/ProfileNav';
import { PersonalData } from '../../components/profile/PersonalData';
import styles from './Profile.module.css';
import { Subscription } from '../../components/profile/Subscription';
import { Bookings } from '../../components/profile/Bookings';
import { Payments } from '../../components/profile/Payments';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('Profile');

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };
  return (
    <div className={styles.profile}>
      <div className='container'>
        <div className={styles.content}>
          <div>
            {' '}
            <ProfileNav activeTab={activeTab} onTabChange={handleTabChange} />
          </div>

          <div className={styles.info}>
            <div>
              {' '}
              <ProfileNav activeTab={activeTab} onTabChange={handleTabChange} />
            </div>
            <ProfileHeader text={activeTab} />
            <div className={styles.line}></div>
            <div className={styles.tabs}>
              {' '}
              {activeTab === 'Profile' ? (
                <PersonalData />
              ) : activeTab === 'Subscription' ? (
                <Subscription />
              ) : activeTab === 'My bookings' ? (
                <Bookings />
              ) : (
                <Payments />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
