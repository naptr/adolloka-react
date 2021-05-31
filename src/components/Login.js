import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { MAKE_LOGGEDIN } from '../constant/CONSTANT';
import InlineLogo from '../components/Assets/InlineLogo';
import Logo from './Assets/Logo';
import ReactLoading from 'react-loading';
import styles from '../styles/Login/Login.module.css';


class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '', 
      password: '', 
      token: null, 
      invalidAccount: false,
      isLoading: false, 
      redirect: null
    }
  }

  handleOnChange = (ev) => {
    const field = ev.target.name;
    this.setState({ [field]: ev.target.value });
  }
  
  handleFocus = () => {
    this.setState({ invalidAccount: false })
  }

  handleKeyPress = (ev) => {
    if (ev.key === "Enter") {
      this.submitForm();
    }
  }

  submitForm = () => {
    this.setState(
      {
        isLoading: true, 
        invalidAccount: false
      } , 
      () => {
        fetch(
          'https://adolloka.herokuapp.com/api/login', 
          {
            method: 'POST', 
            body: JSON.stringify({
              username: this.state.username, 
              password: this.state.password
            }), 
            headers: {
              'Content-Type': 'application/json', 
              'Accept': 'application/json'
            }
          }
        )
        .then(async (res) => {
          if (res.status === 200) {
            const token = await res.json();
            // this.props.history.push('/');
            // console.log(token.token);
            // console.log(token)
            // this.setState({isLoading: false})
            this.setState(
              {token: token.token, 
              isLoading: false, 
              redirect: "/"}, 
              () => this.props.makeLoggedIn()
            );
            // this.props.history.push('/');
            // console.log(this.props);
          } else if (res.status === 400) {
            this.setState({ 
              isLoading: false,
              invalidAccount: true
            })
          } else {
            console.log(res)
            this.setState({ isLoading: false })
          }
        })
        .catch(err => {
          alert(`Error Catch ${err}`);
          this.setState({ isLoading: false })
        });
      }
    )
  }

  isFilled = () => {
    if (
      this.state.username === ''
      || this.state.password === ''
    ) {
      return true
    } else {
      return false
    }
  }

  componentDidMount() {
    console.log(this.props)
  }

  render() {
    if (this.state.redirect) {
      return <Redirect 
        to={{
          pathname: this.state.redirect, 
          state: {token: this.state.token}
        }}/>
    } else {
      return (
        <>
          <Helmet>
            <title>Masuk | adolloka</title>
          </Helmet>
          <div className={styles.loginContainer}>
            <div className={styles.logoContainer}>
              <Logo />
            </div>
            <main className={styles.loginContent}>
              <img src="/assets/login-image.svg" className={styles.loginImage} alt="login"/>
              <div className={styles.loginForm}>
                <div className={styles.loginTitle}>
                  <h3>Masuk</h3>
                  <Link to="/register" className={styles.registerLink}>Daftar</Link>
                </div>
                <form className={styles.formContainer} onKeyPress={this.handleKeyPress}>
                  <div className={styles.inputWrapper}>
                    <label className={styles.inputTitle}>Username</label>
                    <input 
                      type="text"
                      name="username"
                      onChange={this.handleOnChange}
                      onFocus={this.handleFocus}
                      value={this.state.username}
                      className={this.state.invalidAccount ? styles.invalidActivated : styles.validActivated}
                    />
                    <span className={this.state.invalidAccount ? styles.invalidMessageOn : styles.invalidMessageOff}></span>
                  </div>
                  <div className={styles.inputWrapper}>
                    <label className={styles.inputTitle}>Password</label>
                    <input
                      type="password"
                      name="password"
                      onChange={this.handleOnChange}
                      onFocus={this.handleFocus}
                      value={this.state.password}
                      className={this.state.invalidAccount ? styles.invalidActivated : styles.validActivated}
                    />
                    <span className={this.state.invalidAccount ? styles.invalidMessageOnPassword : styles.invalidMessageOff}></span>
                  </div>
                  {/* {console.log(this.state.isLoading)} */}
                  <button 
                    type="button"
                    onClick={this.submitForm}
                    className={
                      this.isFilled() ? styles.submitButtonDisabled : styles.submitButton
                    }
                    {
                      ...this.isFilled() ? 
                      {disabled: 'disabled'} : 
                      null
                    }
                  >
                    {
                      this.state.isLoading ? 
                      <ReactLoading type="bubbles" color="#fff"/> :
                      'Masuk'
                    }
                  </button>
                </form>
                <div className={styles.registerRedirect}>
                  <span>Belum punya akun <InlineLogo fontSize={1} fontWeight={700}/>? <Link to="/register">Daftar</Link></span>
                </div>
              </div>
            </main>
  
            <footer className={styles.loginFooter}>
              <div className={styles.creditsContainer}>
                <span className={styles.credit}>@2021, <Link to="/"><InlineLogo fontSize={1} fontWeight={700} /></Link></span>
                <span className={styles.creditLink}><InlineLogo fontSize={1} fontWeight={700} fontColor='3A86FF' /> Login</span>
              </div>
            </footer>
          </div>
        </>
      )
    }
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    makeLoggedIn: () => {
      dispatch({
        type: MAKE_LOGGEDIN
      })
    }
  }
}

const mapStateToProps = (state) => {
  return {
    isLogin: state.isLogin
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);