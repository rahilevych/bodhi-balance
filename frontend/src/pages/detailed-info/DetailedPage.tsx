import { useLocation, useNavigate, useParams } from 'react-router';
import styles from './DetailedPage.module.css';
import { TrainingDetailed } from '../../features/schedule/components/training-detailed/TrainingDetailed';
import { PlanDetailed } from '../../features/pricing/components/plan-detailed/PlanDetailed';
import Button from '../../shared/button/Button';

const DetailedPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const isTraining = location.pathname.includes('training');
  const isPlan = location.pathname.includes('plan');
  const handleBack = () => {
    navigate(-1);
  };
  return (
    id && (
      <div className={styles.detailed}>
        <div className='container'>
          {isTraining && (
            <div className={styles.type}>
              <div>
                <Button text='Back' onClick={handleBack} />
                <h2 className={styles.h2}>Training info</h2>
              </div>
              <TrainingDetailed id={id.toString()} />
            </div>
          )}

          {isPlan && (
            <div className={styles.type}>
              <div>
                <Button text='Back' onClick={handleBack} />
                <h2 className={styles.h2}>Subscription info</h2>
              </div>

              <PlanDetailed id={id.toString()} />
            </div>
          )}
        </div>
      </div>
    )
  );
};

export default DetailedPage;
