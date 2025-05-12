import { Element, Link } from 'react-scroll';
import styles from './About.module.css';

export const About = () => {
  const description =
    "Welcome to Bodhi Balance, a serene space where mind, body, and soul unite. Our studio is designed to provide a peaceful and inspiring environment for your yoga journey, whether you're a beginner or an experienced practitioner.";
  const links = [
    {
      name: '8 Yoga styles',
      link: 'yogastyles',
    },
    {
      name: 'Certified instructors with years of practice and teaching experience',
      link: 'trainers',
    },
    {
      name: ' A warm and welcoming space designed for comfort and mindfulness',
      link: 'atmosphere',
    },
    {
      name: ' Morning, afternoon, and evening sessions to fit your lifestyle',
      link: 'schedule',
    },
    {
      name: 'Choose from single sessions, memberships, or package deals',
      link: 'price',
    },
  ];
  return (
    <Element name='about'>
      <section className={styles.about}>
        <div className='container'>
          <h2 className={styles.h2}>About us</h2>
          <div className={styles.content}>
            <div className={styles.image}>
              <img
                src='https://i.pinimg.com/236x/41/fd/27/41fd27979325f866d134b077de5d9bca.jpg'
                alt=''
              />
            </div>
            <div className={styles.text}>
              <p>{description}</p>
              <ul>
                {links.map((link, index) => (
                  <li key={index}>
                    <Link to={link.link} className={styles.link} smooth={true}>
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </Element>
  );
};
