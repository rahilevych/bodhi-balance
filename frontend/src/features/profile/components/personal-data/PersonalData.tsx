import { useState } from 'react';
import Button from '../../../../shared/button/Button';
import styles from './PersonalData.module.css';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAppContext } from '../../../../context/AppContext';
import { deleteUser, updateUser } from '../../../../services/userService';
import { useNavigate } from 'react-router';
import { ConfirmationWindow } from '../../../../styles/modal/ConfirmationWindow';
import { BounceLoader } from 'react-spinners';

const schema = z.object({
  name: z.string().min(3, 'Name must be at least 3 symbols'),
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
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const { user, setUser, setNotification, setIsAuthenticated, color } =
    useAppContext();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: UserFormData) => {
    setIsLoading(true);
    setError(null);
    try {
      const updatedUser = user && (await updateUser(data, user?._id));
      setUser(updatedUser);
      setIsEditing(false);
    } catch (error) {
      console.error(error);
      setError('Failed to update user. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteUser = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await deleteUser();
      setNotification(res);
      setUser(null);
      setIsAuthenticated(false);
      navigate('/');
    } catch (error) {
      setNotification('Something went wrong. Please try again!');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  if (isLoading) {
    return (
      <div className={styles.centered}>
        <BounceLoader data-testid='loader' color={color} loading={isLoading} />
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.centered}>
        Something went wrong. Please try again later.
      </div>
    );
  }

  return (
    <div className={styles.data}>
      <div className={styles.img}>
        <img
          src='https://i.pinimg.com/736x/07/fb/34/07fb3452c4640d881a16d08c2e314f3e.jpg'
          alt=''
        />
      </div>
      {!isEditing && user ? (
        <div className={styles.info}>
          {' '}
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
          <div className={styles.btns}>
            <Button
              text='Edit'
              className={styles.btn}
              onClick={() => setIsEditing(true)}
            />
            <>
              {' '}
              <Button
                text='Delete'
                className={styles.delete}
                onClick={() => setIsModalOpen(true)}
              />
              <ConfirmationWindow
                isOpen={isModalOpen}
                message='Are you sure you want to delete your account?'
                onConfirm={() => {
                  setIsModalOpen(false);
                  handleDeleteUser();
                }}
                onCancel={() => setIsModalOpen(false)}
              />{' '}
            </>
          </div>
        </div>
      ) : (
        <div className={styles.info}>
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
