import { z } from 'zod';
import styles from './Form.module.css';
import Button from '../../components/Button/Button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const schema = z.object({
  email: z.string().email('Invalid email format').min(1, 'Email is required !'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
});

type FormData = z.infer<typeof schema>;
export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });
  const onSubmit = (data: FormData) => {
    console.log('Form submitted:', data);
  };
  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <input {...register('email')} placeholder='Email' />
      {errors.email && <p>{errors.email.message}</p>}
      <input type='password' {...register('password')} placeholder='Password' />
      {errors.password && <p>{errors.password.message}</p>}{' '}
      <Button text='Login' type='submit' className={styles.btn} />
    </form>
  );
};
