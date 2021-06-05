import React from 'react';
import { 
  Redirect, 
  // Link
} from 'react-router-dom';
import { connect } from 'react-redux';
import Header from './Header';
import styles from '../styles/CreateStore/CreateShop.module.css';
import { ADD_USER_DATA } from '../constant/CONSTANT';
import LoadingPage from './Assets/LoadingPage';


class CreateShop extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: true,
      userData: null
    }
  }

  getUserData = () => {
    this.setState(
      {loading: true}, 
      () => {
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
            // console.log(body)

            this.setState({userData: body})
          } else {
            console.log("Error while getting data")
          }
          this.props.saveData(this.state.userData)
          this.setState({loading: false})
        })
        .catch(err => {
          console.log(err)
          this.setState({loading: false})
        })
      }
    )
  }

  componentDidMount() {
    this.getUserData()
  }

  componentDidUpdate() {
    console.log(this.props)
  }

  render() {
    if (this.props.isLogin) {
      if (this.state.loading) {
        return <LoadingPage />
      } else if (this.state.loading === false) {
        if (this.state.userData.user.profile === null) {
          alert('Lengkapi profile terlebih dahulu');
          this.props.history.push(`/user/${this.state.userData.user.id}`)
        } else {
          return (
            <> 
              <Header mainProps={this.props.history}/>
              <div className={styles.createStoreContainer}>
                <div className={styles.storeImageWrapper}>
                  <img src="/assets/store-assets-01.png" alt="create shop" />
                </div>
                <div>
                  <div className={styles.createShopForm}>
                    <p className={styles.createShopTitle}>Halo, <b>{this.state.userData.profile.nama}</b> ayo isi detail tokomu!</p>
                    <div className={styles.createShopInput} style={{height: 302+'px'}}>
                      <div className={styles.inputHeader}>
                        <div className={styles.inputLabel}>1</div>
                        <h4>Masukan Nama Toko dan Domain</h4>
                      </div>
                      <div className={styles.inputContent}>
  
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {console.log(this.props)}
            </>
          )
        }
      }
    } else if (this.props.isLogin === false) {
      return (
        <Redirect to="/login" />
      )
    }
  }
}

const mapStateToProps = (state) => {
  return {
    isLogin: state.isLogin,
    currentUserData: state.currentUserData, 
    token: state.token  
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    saveData: (userData) => {
      dispatch({
        type: ADD_USER_DATA,
        currentUserData: userData
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateShop);