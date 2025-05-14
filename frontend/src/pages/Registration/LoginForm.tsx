import { z } from 'zod';
import styles from './Form.module.css';
import Button from '../../components/Button/Button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import axios from 'axios';
import { useAppContext } from '../../context/AppContext';
import { loginUser } from '../../services/authService';

const schema = z.object({
  email: z.string().email('Invalid email format').min(1, 'Email is required !'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
});

export type FormData = z.infer<typeof schema>;

export const LoginForm = () => {
  const { setUser, setIsAuthenticated, setNotification } = useAppContext();
  const [serverError, setServerError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setServerError(null);
    try {
      const result = await loginUser(data);
      console.log(result);
      setUser(result);
      setIsAuthenticated(true);
      setNotification('Successfully logged in!');
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        setServerError(error.response?.data?.error || 'Server error');
      } else {
        setServerError('Unknown error');
      }
      setNotification('Login failed!');
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <input {...register('email')} placeholder='Email' />
      {errors.email && <p>{errors.email.message}</p>}
      <input type='password' {...register('password')} placeholder='Password' />
      {errors.password && <p>{errors.password.message}</p>}{' '}
      <Button text='Sign in' type='submit' className={styles.btn} />
      {serverError && <p className={styles.error}>{serverError}</p>}
    </form>
  );
};
