import styles from './ProfileHeader.module.css';

export const ProfileHeader = () => {
  return (
    <div className={styles.header}>
      <div className={styles.img}>
        <img
          src='https://i.pinimg.com/736x/07/fb/34/07fb3452c4640d881a16d08c2e314f3e.jpg'
          alt=''
        />
      </div>
      <div className={styles.title}>Welcome back, user</div>
    </div>
  );
};
