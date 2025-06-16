import { useLocation, useParams } from 'react-router';
import styles from './DetailedPage.module.css';
import { TrainingDetailed } from '../../components/detailedInfo/TrainingDetailed';
import { PlanDetailed } from '../../components/detailedInfo/PlanDetailed';

const DetailedPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const isTraining = location.pathname.includes('training');
  const isPlan = location.pathname.includes('plan');

  return (
    id && (
      <div className={styles.booking}>
        <div className='container'>
          {isTraining && (
            <div className={styles.type}>
              <h2>Training info</h2>
              <TrainingDetailed id={id.toString()} />
            </div>
          )}

          {isPlan && (
            <div className={styles.type}>
              <h2>Subscription info</h2>
              <PlanDetailed id={id.toString()} />
            </div>
          )}
        </div>
      </div>
    )
  );
};

export default DetailedPage;
