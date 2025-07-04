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
import { useLocation } from 'react-router';
import { useEffect } from 'react';
import { scroller } from 'react-scroll';

const Landing = () => {
  const location = useLocation();
  const { isModalOpen, closeModal } = useAppContext();

  useEffect(() => {
    if (location.state?.scrollTo) {
      const scrollTarget = location.state.scrollTo;
      setTimeout(() => {
        scroller.scrollTo(scrollTarget, {
          smooth: true,
          duration: 500,
        });
      }, 200);
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);
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
