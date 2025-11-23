import { useForm } from 'react-hook-form';
import { useUpdateUser } from '../../hooks/useUpdateUser';
import styles from './PersonalDataForm.module.css';
import { zodResolver } from '@hookform/resolvers/zod';
import { useProfile } from '../../../auth/hooks/useProfile';
import { schemaPersonalData, UserFormData } from './schema';
import { CancelBtn } from '../../ui/cancel-btn/CancelBtn';
import { SaveBtn } from '../../ui/save-btn/SaveBtn';

interface PersonalDataFormProps {
  onEditing: (state: boolean) => void;
}

export const PersonalDataForm = ({ onEditing }: PersonalDataFormProps) => {
  const { mutate: updateUser } = useUpdateUser();
  const { data: user } = useProfile();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schemaPersonalData),
  });
  const onSubmit = (data: UserFormData) => {
    updateUser({
      id: user._id,
      data: { ...data },
    });
    onEditing(false);
  };
  return (
    <form
      data-testid='form'
      className={styles.form}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className={styles.fields}>
        <label>
          <p>
            <strong>Full Name:</strong>
          </p>
          <input
            {...register('name')}
            placeholder='Full Name'
            defaultValue={user?.name}
          />
        </label>
        {errors.name && <p className={styles.error}>{errors.name.message}</p>}
        <label>
          <p>
            <strong>Email:</strong>
          </p>
          <input
            {...register('email')}
            placeholder='Email'
            disabled
            defaultValue={user?.email}
          />
        </label>

        {errors.email && <p className={styles.error}>{errors.email.message}</p>}
        <label>
          <p>
            <strong>Phone:</strong>
          </p>
          <input
            {...register('phone')}
            placeholder='Phone (optional)'
            defaultValue={user?.phone || ''}
          />
        </label>
        {errors.phone && <p className={styles.error}>{errors.phone.message}</p>}
        <label>
          <p>
            <strong>Address:</strong>
          </p>
          <input
            {...register('address')}
            placeholder='Address (optional)'
            defaultValue={user?.address || ''}
          />
        </label>

        {errors.address && (
          <p className={styles.error}>{errors.address.message}</p>
        )}
      </div>
      <div className={styles.buttons}>
        <CancelBtn onEditing={onEditing} />
        <SaveBtn />
      </div>
    </form>
  );
};
