import { z } from 'zod';
import styles from '../Form.module.css';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Button from '../../../../shared/ui/button/Button';
import { useLogin } from '../../hooks/useLogin';
import { useAppContext } from '../../../../context/AppContext';

const schema = z.object({
  email: z.string().min(1, 'Email is required!').email('Invalid email format'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
});

export type LoginFormData = z.infer<typeof schema>;

export const LoginForm = () => {
  const { closeModal } = useAppContext();

  const { mutate: login } = useLogin();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: LoginFormData) => {
    login(data);
    closeModal();
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <input {...register('email')} placeholder='Email' />
      {errors.email && <p>{errors.email.message}</p>}
      <input type='password' {...register('password')} placeholder='Password' />
      {errors.password && <p>{errors.password.message}</p>}{' '}
      <Button type='submit' className={styles.btn}>
        {' '}
        Sign in
      </Button>
    </form>
  );
};
