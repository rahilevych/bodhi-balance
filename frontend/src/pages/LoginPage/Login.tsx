import styles from './Login.module.css';
import { LoginForm } from './LoginForm';

const Login = () => {
  return (
    <div className={styles.login}>
      <h4>Sign in</h4>
      <LoginForm />
      <p>
        Don't have an account? <span className={styles.link}> Sign up</span>
      </p>
    </div>
  );
};

export default Login;
