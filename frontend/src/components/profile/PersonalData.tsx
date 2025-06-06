import { useState } from 'react';
import Button from '../Button/Button';
import styles from './PersonalData.module.css';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const schema = z.object({
  fullName: z.string().min(3, 'Name is required'),
  email: z.string().email('Invalid email format'),
  phone: z.string().optional(),
  address: z.string().optional(),
});

export type UserFormData = z.infer<typeof schema>;
export const PersonalData = () => {
  const [isEditing, setIsEditing] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: UserFormData) => {
    console.log('Updated user data:', data);
    setIsEditing(false);
  };
  return (
    <div className={styles.data}>
      {!isEditing ? (
        <div className={styles.info}>
          <p>
            <strong>Full Name:</strong> Name Surname
          </p>
          <p>
            <strong>Email:</strong> user@gmail.com
          </p>
          <p>
            <strong>Phone:</strong> +49123456789
          </p>
          <p>
            <strong>Address:</strong> Berlin Germany
          </p>
          <Button
            text='Edit'
            className={styles.btn}
            onClick={() => setIsEditing(true)}
          />
        </div>
      ) : (
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.fields}>
            <label>
              <p>
                <strong>Full Name:</strong>
              </p>
              <input
                {...register('fullName')}
                placeholder='Full Name'
                defaultValue='Name Surname'
              />
            </label>
            {errors.fullName && <p>{errors.fullName.message}</p>}
            <label>
              <p>
                <strong>Email:</strong>
              </p>
              <input
                {...register('email')}
                placeholder='Email'
                disabled
                defaultValue='user@gmail.com'
              />
            </label>

            {errors.email && <p>{errors.email.message}</p>}
            <label>
              <p>
                <strong>Phone:</strong>
              </p>
              <input
                {...register('phone')}
                placeholder='Phone (optional)'
                defaultValue='+49123456789'
              />
            </label>
            {errors.phone && <p>{errors.phone.message}</p>}
            <label>
              <p>
                <strong>Address:</strong>
              </p>
              <input
                {...register('address')}
                placeholder='Address (optional)'
                defaultValue='Berlin Germany'
              />
            </label>

            {errors.address && <p>{errors.address.message}</p>}
          </div>

          <div className={styles.buttons}>
            {' '}
            <Button
              text='Cancel'
              type='button'
              className={styles.cancel}
              onClick={() => setIsEditing(false)}
            />
            <Button text='Save' type='submit' className={styles.confirm} />
          </div>
        </form>
      )}
    </div>
  );
};
