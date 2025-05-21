import { z } from 'zod';
import styles from '../Form.module.css';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import axios from 'axios';
import { useAppContext } from '../../../context/AppContext';
import { registerUser } from '../../../services/authService';
import Button from '../../button/Button';

const schema = z.object({
  fullName: z.string().min(3, 'Name is required!'),
  email: z.string().min(1, 'Email is required!').email('Invalid email format'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
});

export type RegisterFormData = z.infer<typeof schema>;

export const RegistrationForm = () => {
  const [serverError, setServerError] = useState<string | null>(null);
  const { setNotification } = useAppContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });
  const onSubmit = async (data: RegisterFormData) => {
    setServerError(null);
    try {
      await registerUser(data);
      setNotification('Successfully registered!');
    } catch (error: any) {
      setNotification('Registration failed!');
      if (axios.isAxiosError(error)) {
        setServerError(error.response?.data?.error || 'Server error');
      } else {
        setServerError('Unknown error');
      }
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <input {...register('fullName')} placeholder='Full Name' />
      {errors.fullName && <p>{errors.fullName.message}</p>}
      <input {...register('email')} placeholder='Email' />
      {errors.email && <p>{errors.email.message}</p>}
      <input type='password' {...register('password')} placeholder='Password' />
      {errors.password && <p>{errors.password.message}</p>}{' '}
      <Button text='Sign up' type='submit' className={styles.btn} />
      {serverError && <p className={styles.error}>{serverError}</p>}
    </form>
  );
};
