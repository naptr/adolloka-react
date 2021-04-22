import React from 'react';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import LoadingPage from '../Assets/LoadingPage';
import Header from '../../components/Header';
import MainView from '../../components/Home/MainView';
import styles from '../../styles/Home/Home.module.css';
import { ADD_USER_DATA, MAKE_LOGGEDIN, SAVE_TOKEN } from '../../constant/CONSTANT';

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true, 
      // userData: [], 
      getResult: null
    }
  }

  getUserData = () => {
    fetch(
      'https://adolloka.herokuapp.com/api/user', 
      {
        headers: {
          'Authorization': `Bearer ${this.props.location.state === undefined ? sessionStorage.getItem('token') : this.props.location.state.token}`
        }
      }
    )
    .then(async res => {
      if (res.status === 200) {
        const body = await res.json();
        const userData = body;
        // console.log(typeof(userData));
        // sessionStorage.setItem('token', this.props.location.state.token)
        // console.log(userData);
        this.props.addUserData(userData);
        this.props.makeLoggedIn();
        this.setState({
          isLoading: false, 
          getResult: 'success'
        })
        // console.log(sessionStorage.getItem('token'))
      }
      console.log(this.props);
      console.log(this.state);
      if (this.state.getResult !== null) {
        if (this.props.location.state === undefined) {
          return null
        } else { sessionStorage.setItem('token', this.props.location.state.token) }
      } else {
        return null
      }
      // console.log(sessionStorage.getItem('token'))
    })
    .catch(err => {
      console.log(`Error ${err}`);
      this.setState({isLoading: false})
    })
  }

  // getData = () => {
    //   this.setState(
  //     {isLoading: true}, 
  //     () => {
  //       fetch(
  //         'https://adolloka.herokuapp.com/api/home', 
  //         {
  //           headers: {
  //             'Authorization': `Bearer ${this.props.token}`
  //           }
  //         }
  //       )
  //       .then(async (res) => {
  //         var userData;
  //         if (res.status == 200) {
  //           const body = await res.json();
  //           userData = body;
  //         } else {
  //           userData = []
  //           console.trace();
  //         }
  //         this.setState({
  //           userData: userData, 
  //           getResult: 'success',
  //           isLoading: false
  //         })
  //       })
  //       .catch(err => {
  //         this.setState({
  //           userData: [], 
  //           isLoading: false
  //         })
  //         console.trace()
  //       });
  //     }
  //   )
  // }
  // componentWillUnmount() {
  //   window.location.reload();
  // }

  componentDidMount() {
    console.log(this.props)
    if (this.props.isLogin) {
      this.getUserData();
      if (this.props.location.state !== undefined) {
        this.props.saveToken(this.props.location.state.token);
      }
    } else if (((this.props.isLogin === false && sessionStorage.getItem('currentUserData') !== null) ||  sessionStorage.getItem('token') !== null) || (this.props.isLogin === false && sessionStorage.getItem('token') !== null)) {
      this.getUserData();
      if (this.props.location.state !== undefined) {
        this.props.saveToken(this.props.location.state.token);
      }
    } else if (this.props.isLogin === false) {
      this.setState({isLoading: false});
    }
    console.log(sessionStorage.getItem('currentUserData'), sessionStorage.getItem('token'))
  }

  // componentDidMount() {
  //   this.setState({isLoading: false});
  // }

  // componentDidUpdate() {
  //   this.setState({isLoading: true})
  // }

  render() {
    if (this.state.isLoading) {
      return <LoadingPage />
    } else {
      return (
        <>
          <Helmet>
            <title>Situs Jual Beli Pakaian Online Terbaik di Indonesia</title>
          </Helmet>
          <div className={styles.homeContainer}>
            <Header 
              mainProps={this.props.history}
            />
            
            <MainView />
          </div>
        </>
      )
    }
  }
}

const mapDispatchToProps = (dispatch) => {
  return ({
    addUserData: (userData) => {
      dispatch({
        type: ADD_USER_DATA,
        currentUserData: userData
      })
    }, 
    saveToken: (token) => {
      dispatch({
        type: SAVE_TOKEN, 
        token: token
      })
    }, 
    makeLoggedIn: () => {
      dispatch({
        type: MAKE_LOGGEDIN
      })
    }
  })
}

const mapStateToProps = (state) => {
  return {
    isLogin: state.isLogin, 
    token: state.token, 
    currentUserData: state.currentUserData
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);