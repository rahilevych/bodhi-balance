import styles from './ContactForm.module.css';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Button from '../Button/Button';

const schema = z.object({
  fullName: z.string().min(1, 'Name ist required !'),

  email: z.string().email('Invalid email format').min(1, 'Email is required !'),
  phone: z
    .string()
    .regex(
      /^\+?\d{1,4}?[\s-]?\(?\d{1,4}?\)?[\s-]?\d{1,4}[\s-]?\d{1,4}$/,
      'Invalid phone number'
    )
    .min(1, 'Phone is required'),
  message: z.string().min(1, 'Message is required'),
});

type FormData = z.infer<typeof schema>;

export const ContactForm = () => {
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
      <input {...register('fullName')} placeholder='Full Name' />
      {errors.fullName && <p>{errors.fullName.message}</p>}

      <input {...register('email')} placeholder='Email' />
      {errors.email && <p>{errors.email.message}</p>}

      <input {...register('phone')} placeholder='Phone' />
      {errors.phone && <p>{errors.phone.message}</p>}

      <textarea {...register('message')} placeholder='Message'></textarea>
      {errors.message && <p>{errors.message.message}</p>}

      <Button text='Send' type='submit' />
    </form>
  );
};
