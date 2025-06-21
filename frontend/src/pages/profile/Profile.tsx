import { useState } from 'react';
import { ProfileHeader } from '../../components/Header/ProfileHeader';
import { ProfileNav } from '../../components/Nav/ProfileNav';
import { PersonalData } from '../../components/profile/PersonalData';
import styles from './Profile.module.css';
import { SubscriptionSection } from '../../components/profile/Subscription';
import { Bookings } from '../../components/profile/Bookings';
import { Payments } from '../../components/profile/Payments';
import Button from '../../components/Button/Button';
import { useNavigate } from 'react-router';

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
            <Button
              className={styles.btn}
              text='Back'
              onClick={() => navigate(-1)}></Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
