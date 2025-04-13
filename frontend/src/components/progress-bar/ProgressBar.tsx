import styles from './ProgressBar.module.css';
interface Props {
  progress: number;
}
const ProgressBar = ({ progress }: Props) => {
  return (
    <div className={styles.progressContainer}>
      <span className={styles.progressBackground}></span>
      <span
        className={styles.progressBar}
        style={{ width: `${progress}%` }}></span>
    </div>
  );
};

export default ProgressBar;
