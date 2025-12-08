import styles from './ContactForm.module.css';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Button from '../../../../shared/ui/button/Button';
import { useSendMessage } from '../../hooks/useSendMessage';

const schema = z.object({
  fullName: z.string().min(1, 'Name is required!'),
  email: z.string().min(1, 'Email is required!').email('Invalid email format!'),
  message: z.string().min(1, 'Message is required!'),
});

export type ContactData = z.infer<typeof schema>;

export const ContactForm = () => {
  const { mutate: sendMessage } = useSendMessage();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
  });
  const onSubmit = async (data: ContactData) => {
    sendMessage(data);
    reset();
  };
  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <input {...register('fullName')} placeholder='Full Name' />
      {errors.fullName && <p>{errors.fullName.message}</p>}

      <input {...register('email')} placeholder='Email' />
      {errors.email && <p>{errors.email.message}</p>}

      <textarea {...register('message')} placeholder='Message'></textarea>
      {errors.message && <p>{errors.message.message}</p>}

      <Button type='submit' className={styles.btn}>
        Send
      </Button>
    </form>
  );
};
