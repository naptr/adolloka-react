import React from 'react';
import ReactLoading from 'react-loading';
import styles from '../../styles/Animation/LoadingPage/LoadingPage.module.css';


const LoadingPage = () => {
  return (
    <div className={styles.loadingPage}>
      <ReactLoading type={'spinningBubbles'} color="#3A86FF" width={'2.5%'} />
    </div>
  )
}

export default LoadingPage;