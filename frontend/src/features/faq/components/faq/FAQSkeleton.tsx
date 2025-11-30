import Skeleton from 'react-loading-skeleton';
import styles from './FAQ.module.css';

export const FAQSkeleton = () => {
  return (
    <section id='faq' className={styles.faq}>
      <div className='container'>
        <h2>FAQ</h2>
        <div className={styles.content}>
          <ul className={styles.questions}>
            {Array(7)
              .fill(0)
              .map((_, i) => (
                <li key={i} className={styles.skeletonli}>
                  <Skeleton width='100%' height={50} />
                </li>
              ))}
          </ul>
          <div className={styles.image}>
            <img
              src='https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=799&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
              alt=''
            />
          </div>
        </div>
      </div>
    </section>
  );
};
