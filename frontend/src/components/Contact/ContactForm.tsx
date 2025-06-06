import styles from './ContactForm.module.css';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Button from '../Button/Button';
import { sendMessage } from '../../services/contactService';
import { useAppContext } from '../../context/AppContext';

const schema = z.object({
  fullName: z.string().min(1, 'Name ist required !'),
  email: z.string().email('Invalid email format').min(1, 'Email is required !'),
  message: z.string().min(1, 'Message is required'),
});

export type ContactData = z.infer<typeof schema>;

export const ContactForm = () => {
  const { setNotification } = useAppContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });
  const onSubmit = async (data: ContactData) => {
    try {
      const res = await sendMessage(data);
      if (res.status === 200) {
        setNotification(res.data.message);
      }
    } catch (error) {
      setNotification('Try later, smth went wrong!');
    }
  };
  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <input {...register('fullName')} placeholder='Full Name' />
      {errors.fullName && <p>{errors.fullName.message}</p>}

      <input {...register('email')} placeholder='Email' />
      {errors.email && <p>{errors.email.message}</p>}

      <textarea {...register('message')} placeholder='Message'></textarea>
      {errors.message && <p>{errors.message.message}</p>}

      <Button text='Send' type='submit' className={styles.btn} />
    </form>
  );
};
