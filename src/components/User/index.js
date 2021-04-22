import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import Header from '../../components/Header';
import MainViewWithContext from './MainViewWithContext';
import LoadingPage from '../../components/Assets/LoadingPage';
import styles from '../../styles/User/User.module.css';
import { ADD_USER_DATA } from '../../constant/CONSTANT';
import {
  TokenContext, 
  UserDataContext
} from '../../context/userContext';

// const TokenContext  = React.createContext(null);
// const UserDataContext = React.createContext(null);


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

  // getUserData = () => {
  //   fetch(
  //     'https://adolloka.herokuapp.com/api/user', 
  //     {
  //       headers: {
  //         'Authorization': `Bearer ${this.props.token}`
  //       }
  //     }
  //   )
  //   .then(async (res) => {
  //     if (res.status == 200) {
  //       const body = await res.json();
  //       console.log(body);
  //     }
  //   })
  // }

  componentDidMount() {
    // this.getUserData();
    this.setState({isLoading: false})
    console.log(this.props);

    if (this.props.currentUserData !== null) {
      sessionStorage.setItem('currentUserData', JSON.stringify(this.props.currentUserData));
      // const currentUserData = sessionStorage.getItem('currentUserData');
      // console.log(JSON.parse(currentUserData))
    } else if (this.props.currentUserData === null) {
      const userData = sessionStorage.getItem('currentUserData');
      this.props.addUserData(JSON.parse(userData))
      // console.log(this.props)
      console.log(userData)
    }
  }

  // componentDidUpdate() {
  //   this.setState({isLoading: true})
  // }

  render() {
    const {token, currentUserData} = this.props;
    // console.log(this.props)
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
              <Header mainProps={this.props.history}/>
              {/* {console.log(this.props)} */}
              <div className={styles.userInfoContainer}>
                <TokenContext.Provider value={token}>
                  <UserDataContext.Provider value={currentUserData}>
                    <MainViewWithContext globalProps={this.props}/>
                  </UserDataContext.Provider>
                </TokenContext.Provider>
              </div>
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
    isLogin: state.isLogin, 
    currentUserData: state.currentUserData
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addUserData: (userData) => {
      dispatch({
        type: ADD_USER_DATA, 
        currentUserData: userData
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(User);