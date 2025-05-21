import { useState } from 'react';

import styles from './Authorization.module.css';
import { RegistrationForm } from './RegistrationForm';
import { LoginForm } from './LoginForm';
export const Authorization = () => {
  const [type, setType] = useState<'signin' | 'signup'>('signin');

  return (
    <>
      {type === 'signin' ? (
        <div className={styles.content}>
          <h4>Sign in</h4>
          <LoginForm />
          <p>
            Don't have an account?{' '}
            <span
              onClick={() => {
                setType('signup');
              }}
              className={styles.link}>
              {' '}
              Sign up
            </span>
          </p>
        </div>
      ) : (
        <div className={styles.content}>
          <h4>Sign up</h4>
          <RegistrationForm />
          <p>
            Already have an account?{' '}
            <span
              onClick={() => {
                setType('signin');
              }}
              className={styles.link}>
              {' '}
              Sign in
            </span>
          </p>
        </div>
      )}
    </>
  );
};
