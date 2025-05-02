import styles from './Contact.module.css';
import { ContactForm } from './ContactForm';

const Contact = () => {
  return (
    <section className={styles.contact} id='contact'>
      <div className='container'>
        <h2>Contact us</h2>
        <div className={styles.content}>
          {' '}
          <div>
            {' '}
            <ContactForm />
          </div>
          <div className={styles.image}>
            <img
              src='https://i.pinimg.com/736x/d0/00/b8/d000b850c636e2f0afdb6b627f24a59a.jpg'
              alt=''
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
