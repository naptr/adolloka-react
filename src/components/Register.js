import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Logo from './Assets/Logo';
import LottieAnimation from '../components/Assets/Lottie';
import home from './Assets/animation.json';
import ReactLoading from 'react-loading';
import InlineLogo from '../components/Assets/InlineLogo';
import styles from '../styles/Register/Register.module.css';
import LoadingPage from './Assets/LoadingPage';


class Register extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '', 
      email: '', 
      phoneNumber: '',
      password: '', 
      confirmPassword: '',
      isLoading: false,
      loadingPage: true
    }
  }

  handleOnChange = (ev) => {
    const field = ev.target.name;
    this.setState({ [field]: ev.target.value });
  }

  handleKeyPress = (ev) => {
    if (ev.key === "Enter") {
      this.sumbitData();
    }
  }

  sumbitData() {
    this.setState(
      {isLoading: true}, 
      () => {
        fetch(
          'https://adolloka.herokuapp.com/api/register', 
          {
            method: 'POST',
            body: JSON.stringify(
              {
                username: this.state.username, 
                email: this.state.email, 
                no_hp: this.state.phoneNumber,
                password: this.state.password, 
                password_confirmation: this.state.confirmPassword
              }
            ), 
            headers: {
              'Content-Type': 'application/json', 
              'Accept': 'application/json'
            }
          }
        )
        .then(async (res) => {
          if (res.status === 201) {
            const body = await res.json();
            console.log('Register success');
            console.log(body);
          } else {
            alert(`error res: ${res.status}`);
          }
          this.setState({
            isLoading: false, 
            username: '', 
            email: '', 
            phoneNumber: '', 
            password: '', 
            confirmPassword: ''
          })
        })
        .catch(err => {
          alert(`error catch ${err}`);
          this.setState({isLoading: false})
        });
      }
    )
  }

  isFilled = () => {
    if (this.state.username === '' 
      || this.state.email === '' 
      || this.state.phoneNumber === '' 
      || this.state.password === '' 
      || this.state.confirmPassword === '') {
      return true
    } else {
      return false
    }
  }

  componentDidMount() {
    this.setState({loadingPage: false});
  }

  render() {
    if (this.state.loadingPage) {
      return <LoadingPage />
    } else {
      return (
        <div className={styles.backgroundContainer} style={{backgroundImage: "url(/assets/bg100.jpg"}}>
          <Helmet>
            <title>Daftar | adolloka</title>
          </Helmet>
          <div className={styles.registerContainer}>
            <div className={styles.logoContainer}>
              <Logo />
            </div>
            <main className={styles.registerContent}>
              <div className={styles.registerContentWrapper}>
                <LottieAnimation lotti={home} height={450} width={450}/>
                <div className={styles.registerForm}>
                  <h2 className={styles.boxTitle}>Daftar Sekarang</h2>
                  <div>
                    <span>Sudah punya akun <InlineLogo fontSize={1} fontWeight={700}/>? <Link to="/login" className={styles.link}>Masuk</Link></span>
                  </div>
                  <form className={styles.formContainer} onKeyPress={this.handleKeyPress}>
                    <div className={styles.inputWrapper}>
                      <label className={styles.inputTitle}>Username</label>
                      <input 
                        type="text"
                        name="username"
                        onChange={this.handleOnChange}
                        value={this.state.username}/>
                      <span style={{display: 'none'}}className={styles.bottomText}></span>
                    </div>
                    <div className={styles.inputWrapper}>
                      <label className={styles.inputTitle}>Email</label>
                      <input 
                        type="email" 
                        name="email"
                        onChange={this.handleOnChange}
                        value={this.state.email}
                        className={styles.ifInvalid}
                      />
                      <span className={styles.bottomText}></span>
                    </div>
                    <div className={styles.inputWrapper}>
                      <label className={styles.inputTitle}>Phone Number</label>
                      <input
                        type="tel"
                        name="phoneNumber"
                        onChange={this.handleOnChange}
                        value={this.state.phoneNumber}
                        className={styles.inputPhoneNumber}
                      />
                      <span style={{ display: 'none' }} className={styles.bottomText}></span>
                    </div>
                    <div className={styles.inputWrapper}>
                      <label className={styles.inputTitle}>Password</label>
                      <input 
                        type="password" 
                        name="password"
                        onChange={(ev) => this.setState({password: ev.target.value})}
                        value={this.state.password}
                      />
                      <span style={{ display: 'none' }} className={styles.bottomText}></span>
                    </div>
                    <div className={styles.inputWrapper}>
                      <label className={styles.inputTitle}>Confirm Password</label>
                      <input 
                        type="password"
                        name="confirmPassword"
                        onChange={(ev) => this.setState({confirmPassword: ev.target.value})}
                        value={this.state.confirmPassword}
                      />
                      <span className={
                        this.state.confirmPassword === '' ? 
                        styles.bottomTextNone :
                        this.state.password === this.state.confirmPassword ? 
                        styles.passwordSuccess : 
                        styles.passwordFail  
                      }></span>
                    </div>
                    <button 
                      type="button"
                      className={ this.isFilled() ? styles.submitButtonDisabled : styles.submitButton } 
                      {...(this.isFilled()) ? 
                        {disabled: 'disabled'} : 
                        null}
                      onClick={() => this.sumbitData()}
                    >
                      {
                        this.state.isLoading ? 
                        <ReactLoading type="bubbles" color="#fff"/> :
                        'Daftar'
                     }
                    </button>
                  </form>
                  <div className={styles.policy}>
                    <div>Dengan mendaftar, saya menyetujui</div>
                    <div>
                    <Link to='/easteregg'>Syarat & Ketentuan </Link>
                    <span>serta</span>
                    <Link to='/easteregg'> Kebijakan & Privasi</Link>
                    </div>
                  </div>
                </div>
              </div>
            </main>
  
            <footer className={styles.registerFooter}>
              <div className={styles.creditsContainer}>
                <span className={styles.credit}>@2021, <Link to="/"><InlineLogo fontSize={1} fontWeight={700} fontColor='3A86FF'/></Link></span>
                <span className={styles.creditLink}><InlineLogo fontSize={1} fontWeight={700} fontColor='FFF'/> Register</span>
              </div>
            </footer>
          </div>
        </div>
      )
    }
  };
};

export default Register;