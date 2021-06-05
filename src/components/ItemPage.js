import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
// import { Redirect } from 'react-router-dom';
import { ADD_CART_COUNT, ADD_USER_DATA, SUBTRACT_CART_COUNT } from '../constant/CONSTANT';
import Header from './Header';
import styles from '../styles/ItemPage/ItemPage.module.css';


class ItemPage extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      userData: null
    }
  }

  getBarangIdBased = () => {
    fetch(
      `http://adolloka.herokuapp.com/api/barang/${this.props.match.params.id}/show`
    )
    .then(async res => {
      if (res.status === 200) {
        console.log(await res.json());
      } else {
        console.log(res.status)
      }
    })
    .catch(err => {
      console.log(err)
    })
  }

  getUserData = () => {
    fetch(
      'https://adolloka.herokuapp.com/api/user', 
      {
        headers: {
          'Authorization': `Bearer ${this.props.token}`
        }
      }
    )
    .then(async res => {
      if (res.status === 200) {
        const body = await res.json();
        this.setState({userData: body})
        this.props.saveData(this.state.userData)
        console.log(this.props)
      }
    })
    .catch(err => {
      console.log(err)
    })
  }

  componentDidMount() {
    this.getUserData()
    this.getBarangIdBased()
  }

  render() {
    return (
      <>
        <Header mainProps={this.props.history} />
        <div className={styles.productDisplayContainer}>
          <div className={styles.productTitleBar}>
            <ol>
              <li>
                <Link to="/category/celana">Celana</Link>
              </li>
              <li></li>
              <li></li>
            </ol>
          </div>
          <div className={styles.productDisplayWrapper}>

          </div>
        </div>
      </>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isLogin: state.isLogin,
    currentUserData: state.currentUserData, 
    token: state.token,
    cartCounter: state.cartCounter
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    saveData: (userData) => {
      dispatch({
        type: ADD_USER_DATA, 
        currentUserData: userData
      })
    }, 
    addTest: () => {
      dispatch({
        type: ADD_CART_COUNT
      })
    }, 
    subtractTest: () => {
      dispatch({
        type: SUBTRACT_CART_COUNT
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemPage);
// export default ItemPage;