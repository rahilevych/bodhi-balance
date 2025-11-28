import Skeleton from 'react-loading-skeleton';
import { ScheduleCardSkeleton } from '../schedule-card/ScheduleCardSkeleton';
import styles from './ScheduleTable.module.css';
import { useAppContext } from '../../../../context/AppContext';

export const ScheduleTableSkeleton = () => {
  const { isMobile } = useAppContext();
  return (
    <>
      {isMobile ? (
        <div className={styles.cardsWrapper}>
          {Array.from({ length: 5 }).map((_, i) => (
            <ScheduleCardSkeleton key={i} />
          ))}
        </div>
      ) : (
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>
                  <Skeleton width={60} />
                </th>
                <th>
                  <Skeleton width={50} />
                </th>
                <th>
                  <Skeleton width={60} />
                </th>
                <th>
                  <Skeleton width={70} />
                </th>
                <th>
                  <Skeleton width={70} />
                </th>
                <th>
                  <Skeleton width={100} />
                </th>
              </tr>
            </thead>

            <tbody>
              {Array.from({ length: 5 }).map((_, i) => (
                <tr key={i}>
                  <td>
                    <Skeleton height={20} />
                  </td>
                  <td>
                    <Skeleton height={20} />
                  </td>
                  <td>
                    <Skeleton height={20} />
                  </td>
                  <td>
                    <Skeleton height={20} />
                  </td>
                  <td>
                    <Skeleton height={20} />
                  </td>
                  <td>
                    <Skeleton height={28} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};
