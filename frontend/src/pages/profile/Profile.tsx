import { ProfileHeader } from '../../components/Header/ProfileHeader';
import { ProfileNav } from '../../components/Nav/ProfileNav';
import { PersonalData } from '../../components/profile/PersonalData';
import styles from './Profile.module.css';

const Profile = () => {
  return (
    <div className={styles.profile}>
      <div className='container'>
        <div className={styles.content}>
          <ProfileNav />
          <div className={styles.info}>
            <ProfileHeader />
            <PersonalData />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
