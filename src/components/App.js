import React from 'react';
import {
  Switch, 
  Route
} from 'react-router-dom';
import Home from '../components/Home';
import Login from '../components/Login';
import Register from '../components/Register';
import EasterEgg from '../components/EasterEgg';
import styles from '../styles/App/App.module.css';

class App extends React.Component {
  render() {
    return (
      <div className={styles.mainContainer}>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/login" component={Login}/>
          <Route path="/register" component={Register}/>
          <Route path="/easteregg" exact component={EasterEgg}/>
          {/* <Route path="/user" component={User}/> */}
        </Switch>
      </div>
    )
  };
};

export default App;