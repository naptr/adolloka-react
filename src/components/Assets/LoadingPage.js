import React from 'react';
// import ReactLoading from 'react-loading';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from 'react-loader-spinner';
import styles from '../../styles/Animation/LoadingPage/LoadingPage.module.css';

const LoadingPage = () => {
  return (
    <div className={styles.loadingPage}>
      {/* <ReactLoading type={'spinningBubbles'} color="#3A86FF" width={'2.5%'} /> */}
      <Loader type="MutatingDots" color="#3A86FF" secondaryColor="#0EAD69" width="100" height="100" />
    </div>
  )
}

export default LoadingPage;