import { FaFacebookF, FaInstagram, FaWhatsapp } from 'react-icons/fa';
import styles from './Footer.module.css';

import { scroller } from 'react-scroll';
import { useLocation, useNavigate } from 'react-router-dom';
import { sectionsList } from '../../../../constants/sections';

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = (sectionName: string) => {
    if (location.pathname !== '/') {
      navigate('/', { state: { scrollTo: sectionName } });
    } else {
      scroller.scrollTo(sectionName, { smooth: true, duration: 500 });
    }
  };
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
                    <p
                      onClick={() => handleClick(subSection.link)}
                      className={styles.link}
                    >
                      {' '}
                      {subSection.name}
                    </p>
                  </li>
                )),
              )}
            </ul>
          </div>
          <div className={styles.social}>
            <a
              href='https://instagram.com'
              target='_blank'
              rel='noopener noreferrer'
            >
              <FaInstagram className={styles.icon} />
            </a>
            <a
              href='https://facebook.com'
              target='_blank'
              rel='noopener noreferrer'
            >
              <FaFacebookF className={styles.icon} />
            </a>
            <a
              href='https://www.whatsapp.com/'
              target='_blank'
              rel='noopener noreferrer'
            >
              <FaWhatsapp className={styles.icon} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
