import { About } from '../../features/about/About';
import Atmosphere from '../../features/atmosphere/components/atmosphere/Atmosphere';
import Contact from '../../features/contact/components/contact/Contact';
import FAQ from '../../features/faq/components/faq/FAQ';
import Hero from '../../features/hero/components/hero/Hero';
import { AuthorizationWindow } from '../../styles/modal/AuthorizationWindow';
import { Pricing } from '../../features/pricing/components/pricing/Pricing';
import Schedule from '../../features/schedule/components/schedule/Schedule';
import YogaStyles from '../../components/YogaStyles/YogaStyles';
import { useAppContext } from '../../context/AppContext';
import { Authorization } from '../../features/auth/Authorization';
import styles from './Landing.module.css';
import Trainers from '../../features/trainers/components/trainers/Trainers';
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
      <Hero />
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
