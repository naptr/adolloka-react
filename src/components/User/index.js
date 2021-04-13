import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import Header from '../../components/Header';
import MainView from '../../components/User/MainView';
import LoadingPage from '../../components/Assets/LoadingPage';
import styles from '../../styles/User/User.module.css';


class User extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true
    }
  }

  // constructor(props) {
  //   super(props);

  //   this.state = {
  //     userName: '', 
  //     userGender: '', 
  //     userBirthDate: ''
  //   }
  // }

  

  // updateUserData = () => {
  //   fetch(
  //     'https://adolloka.herokuapp.com/api/user/update/', 
  //     { 
  //       method: 'POST',
  //       body: {
  //         nama: this.state.userName, 
  //         gender: this.state.userGender, 
  //         tgl_lahir: this.state.userBirthDate,
  //         alamat: this.state.userAddress
  //       }
  //     }
  //   )
  // }

  getUserData = () => {
    fetch(
      'https://adolloka.herokuapp.com/api/user', 
      {
        headers: {
          'Authorization': `Bearer ${this.props.token}`
        }
      }
    )
    .then(async (res) => {
      if (res.status == 200) {
        console.log(res.json())
      }
    })
  }

  componentDidMount() {
    this.getUserData();
    this.setState({isLoading: false})
  }

  // componentDidUpdate() {
  //   this.setState({isLoading: true})
  // }

  render() {
    if (this.props.isLogin) {
      if (this.state.isLoading) {
        return (
          <LoadingPage />
        )
      } else {
        return (
          <>
            <Helmet>
              <title>Biodata Diri | adolloka</title>
            </Helmet>
            <div className={styles.userContainer}>
              <Header token={this.props.token} mainProps={this.props}/>
              
              <MainView token={this.props.token}/>
            </div>
          </>
        )
      }

    } else {
      return (
        <Redirect to="/login" />
      )
    }
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.token, 
    isLogin: state.isLogin
  }
}

export default connect(mapStateToProps)(User);