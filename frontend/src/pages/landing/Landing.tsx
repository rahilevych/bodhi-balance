import { About } from '../../components/About/About';
import Atmosphere from '../../components/Atmosphere/Atmosphere';
import Contact from '../../components/Contact/Contact';
import FAQ from '../../components/FAQ/FAQ';
import Home from '../../components/Home/Home';
import { AuthorizationWindow } from '../../components/modal/AuthorizationWindow';
import { Pricing } from '../../components/Pricing/Pricing';
import Schedule from '../../components/Schedule/Schedule';
import YogaStyles from '../../components/YogaStyles/YogaStyles';
import { useAppContext } from '../../context/AppContext';
import { Authorization } from '../../components/authorization/Authorization';
import styles from './Landing.module.css';
import Trainers from '../../components/trainers/Trainers';

const Landing = () => {
  const { isModalOpen, closeModal } = useAppContext();
  return (
    <main className={styles.main}>
      <Home />
      <About />
      <YogaStyles />
      <Schedule />
      <Pricing />
      <Trainers />
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
