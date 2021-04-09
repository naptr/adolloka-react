import { Link } from 'react-router-dom';
import styles from '../styles/Logo/Logo.module.css';

const Logo = () => {
  return (
    <div className={styles.logoContainer}>
      <Link to="/" style={{zIndex: 2}}>
        <img src="/assets/logo192.png" />
      </Link>
    </div>
  )
};

export default Logo;