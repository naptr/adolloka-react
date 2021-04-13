import React from 'react';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import LoadingPage from '../Assets/LoadingPage';
import Header from '../../components/Header';
import MainView from '../../components/Home/MainView';
import styles from '../../styles/Home/Home.module.css';

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true, 
      // userData: [], 
      // getResult: null
    }
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
// 


  componentDidMount() {
    this.setState({isLoading: false});
  }

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
              //{...this.state.getResult === null ?
              //null : 
              //this.state.getResult === "success" ? 
              //data: this.state.userData.user, mainProps: this.props} : 
              //null}
              mainProps={this.props}
              {...this.props.isLogin ? {token: this.props.token} : null}
            />
            
            <MainView />
          </div>
        </>
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

export default connect(mapStateToProps)(Home);