import React from 'react';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import LoadingPage from '../Animation/LoadingPage';
import Header from '../../components/Header';
import styles from '../../styles/Home/Home.module.css';

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false, 
      userData: []
    }
  }

  getData = () => {
    this.setState(
      {isLoading: true}, 
      () => {
        fetch(
          'https://adolloka.herokuapp.com/api/home', 
          {
            headers: {
              'Authorization': `Bearer ${this.props.token}`
            }
          }
        )
        .then(async (res) => {
          var userData;
          if (res.status == 200) {
            const body = await res.json();
            userData = body;
          } else {
            userData = []
            console.trace();
          }
          this.setState({
            userData: userData, 
            isLoading: false
          })
        })
        .catch(err => {
          this.setState({
            userData: [], 
            isLoading: false
          })
          console.trace()
        });
      }
    )
  }

  componentDidMount() {
    if (this.props.isLogin) {
      this.getData();
    }
    console.log(this.props)
  }

  render() {
    if (this.state.isLoading) {
      return (
        <LoadingPage />
      )
    } else {
      return (
        <>
          <Helmet>
            <title>Situs Jual Beli Pakaian Online Terbaik di Indonesia</title>
          </Helmet>
          <div className={styles.homeContainer}>
            <Header />
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