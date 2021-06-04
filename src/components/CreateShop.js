import React from 'react';
import { 
  Redirect, 
  // Link
} from 'react-router-dom';
import { connect } from 'react-redux';
import Header from './Header';
import styles from '../styles/CreateStore/CreateShop.module.css';


class CreateShop extends React.Component {
  // constructor(props) {
  //   super(props)
  // }

  render() {
    if (this.props.isLogin) {
      return (
        <> 
          <Header mainProps={this.props.history}/>
          <div className={styles.createStoreContainer}>
            <div className={styles.storeImageWrapper}>
              <img src="/assets/store-assets-01.png" alt="create shop" />
            </div>
            <div>
              <div className={styles.createShopForm}>
                <div className={styles.createShopTitle}>
                  <p>Halo, <b>{this.props.currentUserData.profile.nama}</b> ayo isi detail tokomu!</p>
                </div>
                <div className={styles.createShopInput}>
                  <div className={styles.inputHeader}>
                    <div className={styles.inputLabel}>1</div>
                    
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
    } else {
      return (
        <Redirect to="/login" />
      )
    }
  }
}

const mapStateToProps = (state) => {
  return {
    isLogin: state.isLogin,
    currentUserData: state.currentUserData  
  }
}

export default connect(mapStateToProps, null)(CreateShop);