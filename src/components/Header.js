import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Logo from '../components/Assets/Logo';
import styles from '../styles/Header/Header.module.css';


const LeftHeader = () => {
  return (
    <>
      <div className={styles.logoContainer}>
        <Logo />
      </div>
      <div clasName={styles.categorySection}>
        Kategori
      </div>
    </>
  )
}

class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div style={{marginTop: 88+"px"}}>
        <div className={styles.headerContainer}>
          <div className={styles.headerContentTop}>
          {
            this.props.isLogin ? 
            <>
              <LeftHeader />
              <Link to={'/user/'+this.props.userid.id}>Username {this.props.userid.id}</Link>
            </> :
            <>
              <LeftHeader />
              <Link to='/login'>Login</Link>
              <Link to='/register'>Register</Link>
            </>
          }
          </div>
        </div>
      </div>
    )
  };
};

const mapStateToProps = (state) => {
  return {
    isLogin: state.isLogin
  }
}

export default connect(mapStateToProps)(Header);