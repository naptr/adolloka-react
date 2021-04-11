import 
  React, 
  { useState, 
    useHistory
  } from 'react';
// import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { 
  Search, 
  CartFill, 
  BellFill,
  EnvelopeFill
} from 'react-bootstrap-icons';
import Logo from '../components/Assets/Logo';
import styles from '../styles/Header/Header.module.css';


const LeftHeader = () => {
  const [categoryHovered, setCategoryHovered] = useState(false);

  return (
    <>
      <div className={styles.logoContainer}>
        <Logo />
      </div>
      <div className={styles.categorySection}>
        <div 
          className={styles.categoryAsButton}
          {
            ...categoryHovered ? 
            {style: {
              color: "#3A86FF", 
              borderRadius: 4+"px", 
              backgroundColor: "rgba(49, 53, 59, 0.12)"
            }} : 
            null
          }
          onMouseEnter={() => setCategoryHovered(true)}
          onMouseLeave={() => setCategoryHovered(false)}>
          Kategori
        </div>
      </div>
    </>
  )
}

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div 
        className={styles.searchBarContainer}
        {
        ...this.props.isLogin ?
          { style: { width: 90 + "%" } } :
          { style: { width: 70 + "%" } }
        }
      >
        <form className={styles.searchBarForm}>
          <div className={styles.searchBar}>
            <div className={styles.searchBarWrapper}>
              <div className={styles.searchBarMiddle}>
                <input 
                  className={styles.searchBarInput}
                  placeholder="Cari Fashionmu"/>
                <button
                  type="button"
                  className={styles.searchBarButton}
                  ><Search /></button>
              </div>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

const Button = (props) => {
  const [buttonHovered, setButtonHovered] = useState(false);

  return (
    <div
      className={styles.button}
      {
      ...buttonHovered ? {
        style: {
          backgroundColor: "rgba(49, 53, 59, 0.12)",
          borderRadius: 4 + "px"
        }
      } :
        null
      }
      onMouseEnter={() => setButtonHovered(true)}
      onMouseLeave={() => setButtonHovered(false)}
    >
      <props.buttonName size={18} />
    </div>
  )
}

const RightHeader = (props) => {

  if (props.isLogin) {
    return (
      <>
        <div className={styles.buttonsContainer}>
          <div className={styles.buttonLoggedIn}>
            <Button buttonName={CartFill} />
          </div>
          <div className={styles.buttonLoggedIn}>
            <Button buttonName={BellFill} />
          </div>
          <div className={styles.buttonLoggedIn}>
            <Button buttonName={EnvelopeFill} />
          </div>
        </div>
        <div className={styles.verticalLine}>
        </div>
        <div className={styles.userButtonContainer}>

        </div>
        <div className={styles.userButtonContainer}>
          <div className={styles.userAccount}>
            <div>User {props.userid}</div>
          </div>
        </div>
      </>
    )
  } else {
    return (
      <>
        <div className={styles.buttonCartBeforeLoggin}>
          <Button buttonName={CartFill} />
        </div>
        <div className={styles.verticalLine}>
        </div>
        <div className={styles.loginRegisterContainer}>
          <button 
            className={styles.loginButton}
            onClick={() => props.mainProps.history.push('/login')}>
            Masuk
          </button>
          <button 
            className={styles.registerButton}
            onClick={() => props.mainProps.history.push('/register')}>
            Daftar
          </button>
        </div>
      </>
    )
  }
}

class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props.mainProps)
    return (
      <div style={{marginTop: 88+"px"}}>
        <div className={styles.headerContainer}>
          <div className={styles.headerContentTop}>
            <LeftHeader />
            <SearchBar isLogin={this.props.isLogin}/>
            <RightHeader isLogin={this.props.isLogin} mainProps={this.props.mainProps} userid={this.props.userid}/>
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