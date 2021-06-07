import React from 'react';
import {
  Switch, 
  Route
} from 'react-router-dom';
import Home from '../components/Home';
import Login from '../components/Login';
import Register from '../components/Register';
import CreateToko from './CreateShop';
import ItemPage from '../components/ItemPage';
import EasterEgg from '../components/Assets/EasterEgg';
import User from '../components/User';
import styles from '../styles/App/App.module.css';
import LoadingPage from './Assets/LoadingPage';
import { connect } from 'react-redux';
import { MAKE_LOGGEDIN, SAVE_TOKEN } from '../constant/CONSTANT';
import CategoryPage from '../components/CategoryPage';


class App extends React.Component {
  state = {
    isLoading: true
  }

  componentDidMount() {
    console.log(this.props)
    const token = sessionStorage.getItem('token');

    if ((this.props.token === null && this.props.isLogin === true) || (sessionStorage.getItem('token') !== null && this.props.isLogin === false) || this.props.isLogin === true) {
      this.props.makeLoggedIn();
      this.props.saveToken(token);
    } else {
      this.setState({isLoading: false})
    }
    this.setState({isLoading: false})
  }

  render() {
    if (this.state.isLoading) {
      return <LoadingPage />
    } else {
      return (
        <div className={styles.mainContainer}>
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route path="/user/:id" component={User}/>
            <Route path="/login" component={Login}/>
            <Route path="/register" component={Register}/>
            <Route path="/createshop" component={CreateToko} />
            <Route path="/item/:domain_toko/:id" component={ItemPage} />
            <Route path="/category" component={CategoryPage} />
            <Route path="/easteregg" exact component={EasterEgg}/>
          </Switch>
        </div>
      )
    };
  };
};

const mapStateToProps = (state) => {
  return {
    isLogin: state.isLogin, 
    token: state.token
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
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
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);