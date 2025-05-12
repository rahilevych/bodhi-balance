import { FaFacebookF, FaInstagram, FaWhatsapp } from 'react-icons/fa';
import styles from './Footer.module.css';
import { sectionsList } from '../../constants/sections';
import { Link } from 'react-scroll';

const Footer = () => {
  return (
    <div className={styles.footer}>
      <div className='container'>
        <div className={styles.content}>
          <div className={styles.logo}>
            <h2>Bodhi Balance</h2>
          </div>
          <div className={styles.nav}>
            <ul>
              {sectionsList.flatMap((section) =>
                section.subSections.map((subSection) => (
                  <li key={subSection.link}>
                    <Link to={subSection.link} smooth={true}>
                      <p className={styles.link}> {subSection.name}</p>
                    </Link>
                  </li>
                ))
              )}
            </ul>
          </div>
          <div className={styles.social}>
            <a
              href='https://instagram.com'
              target='_blank'
              rel='noopener noreferrer'>
              <FaInstagram className={styles.icon} />
            </a>
            <a
              href='https://facebook.com'
              target='_blank'
              rel='noopener noreferrer'>
              <FaFacebookF className={styles.icon} />
            </a>
            <a
              href='https://www.whatsapp.com/'
              target='_blank'
              rel='noopener noreferrer'>
              <FaWhatsapp className={styles.icon} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
