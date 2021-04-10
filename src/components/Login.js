import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { ADD_TOKEN } from '../constant/CONSTANT';
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
      isLoading: false
    }
  }

  handleOnChange = (ev) => {
    const field = ev.target.name;
    this.setState({[field]: ev.target.value});
  }
  
  handleKeyPress = (ev) => {
    if (ev.key === "Enter") {
      this.submitForm();
    }
  }

  submitForm = () => {
    this.setState(
      {isLoading: true} , 
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
          if (res.status == 200) {
            const token = await res.json();
            // this.props.history.push('/');
            // console.log(token.token);
            this.setState({
              token: token.token, 
              isLoading: false
            });
            this.props.sendToken(this.state.token);
            this.props.history.push('/');
          } else {
            alert('Cannot Login');
            this.setState({isLoading: false})
          }
        })
        .catch(err => {
          alert(`Error Catch ${err}`);
          this.setState({isLoading: false})
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

  render() {
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
            <img src="/assets/login-image.svg" className={styles.loginImage}/>
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
                    value={this.state.username}
                  />
                </div>
                <div className={styles.inputWrapper}>
                  <label className={styles.inputTitle}>Password</label>
                  <input
                    type="password"
                    name="password"
                    onChange={this.handleOnChange}
                    value={this.state.password}
                  />
                  <span className={styles.passwordValidation}></span>
                </div>
                {console.log(this.state.isLoading)}
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

const mapDispatchToProps = (dispatch) => {
  return {
    sendToken: (token) => {
      dispatch({
        type: ADD_TOKEN,
        token: token
      })
    }
  }
}

export default connect(null, mapDispatchToProps)(Login);