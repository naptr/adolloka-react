import React from 'react';
import {
  Switch, 
  Route
} from 'react-router-dom';
import Home from '../components/Home';
import Login from '../components/Login';
import Register from '../components/Register';
import User from '../components/User';
import EasterEgg from '../components/Assets/EasterEgg';
import styles from '../styles/App/App.module.css';

class App extends React.Component {
  render() {
    return (
      <div className={styles.mainContainer}>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/login" component={Login}/>
          <Route path="/register" component={Register}/>
          <Route path="/user/:id" component={User}/>
          <Route path="/easteregg" exact component={EasterEgg}/>
        </Switch>
      </div>
    )
  };
};

export default App;