import { About } from '../../components/About/About';
import Atmosphere from '../../components/Atmosphere/Atmosphere';
import Contact from '../../components/Contact/Contact';
import FAQ from '../../components/FAQ/FAQ';
import Home from '../../components/Home/Home';
import { AuthorizationWindow } from '../../components/ModalWindow/AuthorizationWindow';
import Pricing from '../../components/Pricing/Pricing';
import Schedule from '../../components/Schedule/Schedule';
import Teachers from '../../components/Teachers/Teachers';
import YogaStyles from '../../components/YogaStyles/YogaStyles';
import { useAppContext } from '../../context/AppContext';
import { Registration } from '../../components/Registration/Registration';
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
          <Registration />
        </AuthorizationWindow>
      )}
    </main>
  );
};

export default Landing;
