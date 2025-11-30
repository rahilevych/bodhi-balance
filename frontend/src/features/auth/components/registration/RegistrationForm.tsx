import { z } from 'zod';
import styles from '../Form.module.css';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Button from '../../../../shared/ui/button/Button';
import { useRegistration } from '../../hooks/useRegistration';
import { useNavigate } from 'react-router';
import { Loader } from '../../../../shared/ui/loader/Loader';

const schema = z.object({
  fullName: z.string().min(3, 'Name is required!'),
  email: z.string().min(1, 'Email is required!').email('Invalid email format'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
});

export type RegisterFormData = z.infer<typeof schema>;
export const RegistrationForm = () => {
  const { mutate: registeration, isPending } = useRegistration();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });
  const onSubmit = async (data: RegisterFormData) => {
    registeration(data);
    navigate('/');
  };
  if (isPending) return <Loader />;
  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <input {...register('fullName')} placeholder='Full Name' />
      {errors.fullName && <p>{errors.fullName.message}</p>}
      <input {...register('email')} placeholder='Email' />
      {errors.email && <p>{errors.email.message}</p>}
      <input type='password' {...register('password')} placeholder='Password' />
      {errors.password && <p>{errors.password.message}</p>}{' '}
      <Button type='submit' className={styles.btn}>
        Sign up
      </Button>
    </form>
  );
};
