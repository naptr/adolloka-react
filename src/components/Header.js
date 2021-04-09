import React from 'react';
import styles from '../styles/Header/Header.module.css';
import { Link } from 'react-router-dom';


class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={styles.headerContainer}>
        
        <div>
          <Link to='/'>Home</Link>
          <Link to='/login'>Login</Link>
          <Link to='/register'>Register</Link>
        </div>
      </div>
    )
  };
};

export default Header;