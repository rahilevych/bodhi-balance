import { useState } from 'react';
import Button from '../Button/Button';
import styles from './PersonalData.module.css';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAppContext } from '../../context/AppContext';
import { updateUser } from '../../services/userService';

const schema = z.object({
  name: z.string().min(3, 'Name is required'),
  email: z.string().email('Invalid email format'),
  phone: z
    .string()
    .optional()
    .refine((val) => !val || /^[0-9()+\- ]+$/.test(val), {
      message: 'Invalid phone number',
    }),
  address: z.string().optional(),
});

export type UserFormData = z.infer<typeof schema>;
export const PersonalData = () => {
  const [isEditing, setIsEditing] = useState(false);
  const { user, setUser } = useAppContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: UserFormData) => {
    try {
      const updatedUser = user && (await updateUser(data, user?._id));
      console.log(updateUser);
      setUser(updatedUser);
    } catch (error) {
      console.error(error);
    }
    setIsEditing(false);
    reset();
  };
  console.log(user);
  return (
    <div className={styles.data}>
      {!isEditing && user ? (
        <div className={styles.info}>
          {' '}
          <div className={styles.img}>
            <img
              src='https://i.pinimg.com/736x/07/fb/34/07fb3452c4640d881a16d08c2e314f3e.jpg'
              alt=''
            />
          </div>
          <p>
            <strong>Full Name:</strong> {user?.name}
          </p>
          <p>
            <strong>Email:</strong> {user?.email}
          </p>
          <p>
            <strong>Phone:</strong> {user?.phone || 'not provided'}
          </p>
          <p>
            <strong>Address:</strong> {user?.address || 'not provided'}
          </p>
          <Button
            text='Edit'
            className={styles.btn}
            onClick={() => setIsEditing(true)}
          />
        </div>
      ) : (
        <div className={styles['user-info']}>
          {' '}
          <div className={styles.img}>
            <img
              src='https://i.pinimg.com/736x/07/fb/34/07fb3452c4640d881a16d08c2e314f3e.jpg'
              alt=''
            />
          </div>
          <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
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
              {errors.name && (
                <p className={styles.error}>{errors.name.message}</p>
              )}
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

              {errors.email && (
                <p className={styles.error}>{errors.email.message}</p>
              )}
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
              {errors.phone && (
                <p className={styles.error}>{errors.phone.message}</p>
              )}
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
        </div>
      )}
    </div>
  );
};
