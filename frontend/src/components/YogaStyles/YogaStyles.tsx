import { Element } from 'react-scroll';
import YogaCard from '../YogaCard/YogaCard';
import styles from './YogaStyles.module.css';

import Slider from '../Slider/Slider';
export const yogaStyles = [
  {
    id: 1,
    title: 'Hatha Yoga',
    image:
      'https://i.pinimg.com/236x/1a/68/70/1a6870a508683982b0aefab9eec9aca4.jpg',
    duration: 60,
    days: ['Monday', 'Wednesday', 'Friday'],
    description:
      'Hatha Yoga is a traditional style that combines physical postures (asanas), breathing techniques (pranayama), and meditation. ' +
      'It helps improve posture, strengthen muscles, increase flexibility, and reduce stress. ' +
      'Perfect for beginners and those looking for a gentle yet effective practice.',
  },
  {
    id: 2,
    title: 'Vinyasa Yoga',
    image:
      'https://i.pinimg.com/236x/a4/26/60/a426606923a554b40cecc4dc56588b5c.jpg',
    duration: 75,
    days: ['Tuesday', 'Thursday', 'Saturday'],
    description:
      'Vinyasa Yoga is a dynamic practice where poses flow smoothly in sync with breath. ' +
      'Each movement is performed on an inhale or exhale, making the practice energetic and fluid. ' +
      'It helps develop strength, endurance, balance, and mental focus.',
  },
  {
    id: 3,
    title: 'Ashtanga Yoga',
    image:
      'https://i.pinimg.com/236x/38/6e/1f/386e1fb51fa525550c81e0b1c308c0eb.jpg',
    duration: 90,
    days: ['Monday', 'Thursday'],
    description:
      'Ashtanga Yoga is a highly structured and physically demanding practice with a fixed sequence of poses. ' +
      'It requires discipline and builds strength, flexibility, and stamina. ' +
      'Ideal for those looking for a challenging and rigorous yoga style.',
  },
  {
    id: 4,
    title: 'Bikram Yoga',
    image:
      'https://i.pinimg.com/236x/9f/bd/11/9fbd1145556a4af56a57d45b26ec2d1d.jpg',
    duration: 90,
    days: ['Tuesday', 'Thursday', 'Sunday'],
    description:
      'Bikram Yoga consists of 26 postures practiced in a heated room (around 40°C). ' +
      'This helps increase flexibility, improve blood circulation, and detoxify the body. ' +
      'Best suited for those who enjoy hot and intense workouts.',
  },
  {
    id: 5,
    title: 'Kundalini Yoga',
    image:
      'https://i.pinimg.com/236x/18/c1/37/18c1374337c028e41f68e5e1b8f6fb8d.jpg',
    duration: 90,
    days: ['Wednesday', 'Saturday'],
    description:
      'Kundalini Yoga is a spiritual practice that includes breathing exercises, dynamic movements, mantras, and meditation. ' +
      'It aims to awaken inner energy (Kundalini) and enhance self-awareness. ' +
      'Perfect for those looking to connect mind, body, and spirit on a deeper level.',
  },
  {
    id: 6,
    title: 'Yin Yoga',
    image:
      'https://i.pinimg.com/236x/22/4b/5a/224b5a0801f8145a32c0052e7771fa55.jpg',
    duration: 60,
    days: ['Wednesday', 'Sunday'],
    description:
      'Yin Yoga is a slow-paced practice where poses are held for 3 to 5 minutes. ' +
      'It helps stretch deep connective tissues, improve joint mobility, and relieve stress. ' +
      'Ideal for relaxation and recovery.',
  },
  {
    id: 7,
    title: 'Power Yoga',
    image:
      'https://i.pinimg.com/236x/05/87/ea/0587ea175f5a896873f475179cfc35b4.jpg',
    duration: 60,
    days: ['Monday', 'Wednesday', 'Saturday'],
    description:
      'Power Yoga is an intense, fast-paced practice that combines Vinyasa-style flows with strength-building exercises. ' +
      'It improves physical fitness, increases endurance, and boosts energy levels. ' +
      'Great for those who want a dynamic and challenging workout.',
  },
  {
    id: 8,
    title: 'Restorative Yoga',
    image:
      'https://i.pinimg.com/236x/d9/92/4e/d9924ee71042798978bd596b6ba3e89c.jpg',
    duration: 75,
    days: ['Tuesday', 'Friday'],
    description:
      'Restorative Yoga is a deeply relaxing practice using props like bolsters and blocks to support the body. ' +
      'Poses are held for an extended time to promote relaxation and healing. ' +
      'Perfect for stress relief, better sleep, and nervous system balance.',
  },
];
const YogaStyles = () => {
  return (
    <Element name='yogastyles'>
      <section className={styles.yogastyles}>
        <div className='container'>
          <h2>Yoga styles</h2>
          <div className={styles.content}>
            <ul className={styles.types}>
              {yogaStyles.map((type, index) => (
                <li key={index}>{type.title}</li>
              ))}
            </ul>
            <div>
              {' '}
              <Slider
                items={yogaStyles}
                renderCard={(item) => <YogaCard card={item} />}
              />
            </div>
          </div>
        </div>
      </section>
    </Element>
  );
};

export default YogaStyles;
