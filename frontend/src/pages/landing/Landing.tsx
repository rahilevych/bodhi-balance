import { About } from '../../components/about/About';
import Atmosphere from '../../components/atmosphere/Atmosphere';
import Contact from '../../components/contact/Contact';
import FAQ from '../../components/faq/FAQ';
import Home from '../../components/home/Home';
import { AuthorizationWindow } from '../../components/modal/AuthorizationWindow';
import Pricing from '../../components/pricing/Pricing';
import Schedule from '../../components/schedule/Schedule';
import Teachers from '../../components/trainers/Teachers';
import YogaStyles from '../../components/yogaStyles/YogaStyles';
import { useAppContext } from '../../context/AppContext';
import { Authorization } from '../../components/authorization/Authorization';
import styles from './Landing.module.css';

const Landing = () => {
  const { isModalOpen, closeModal } = useAppContext();
  return (
    <main className={styles.main}>
      <Home />
      <About />
      <YogaStyles />
      <Schedule />
      <Pricing />
      <Teachers />
      <Atmosphere />
      <FAQ />
      <Contact />
      {isModalOpen && (
        <AuthorizationWindow onClose={closeModal}>
          <Authorization />
        </AuthorizationWindow>
      )}
    </main>
  );
};

export default Landing;
