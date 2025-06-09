import styles from './ProfileHeader.module.css';

type ProfileHaederProps = {
  text: string;
};
export const ProfileHeader = ({ text }: ProfileHaederProps) => {
  return (
    <div className={styles.header}>
      <div className={styles.title}>{text}</div>
    </div>
  );
};
