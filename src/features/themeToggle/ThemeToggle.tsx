import { BsFillMoonFill, BsFillSunFill } from 'react-icons/bs';

import { useAppContext } from '../../app/context';
import styles from './themeToggle.module.css';

const ThemeToggle = () => {
  const { isDarkTheme, toggleDarkTheme } = useAppContext();
  return (
    <section className={styles.toggleContainer}>
      <button className={styles.darkToggle} onClick={toggleDarkTheme}>
        {isDarkTheme ? (
          <BsFillSunFill className={styles.toggleIcon} />
        ) : (
          <BsFillMoonFill className={styles.toggleIcon} />
        )}
      </button>
    </section>
  );
};

export default ThemeToggle;
