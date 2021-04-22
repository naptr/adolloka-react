import React from 'react';
// import { Link } from 'react-router-dom';
import styles from '../../styles/User/User.module.css';


class DashboardNavigation extends React.Component {
  // constructor(props) {
  //   super(props);

  // }

  // componentDidMount() {
  //   console.log(this.props);
  // }

  render() {
    const { currentUserData } = this.props
    return (
        <div className={styles.userDashboardMenu}>
          <div className={styles.dashboardUserInfo}>
            <img 
              src={ 
                currentUserData === false ? 
                null : (
                  currentUserData.user.profile === undefined ? 
                    (currentUserData.profile.foto === null ? "/assets/user-alt-icon.png" :
                      currentUserData.profile.foto.foto) : "/assets/user-alt-icon.png"
                )
              } 
              alt="profilePic"
            />
            <div className={styles.dashboardNavigationUserName}>
              <h5>
                {
                currentUserData === false ? 
                null : (
                  currentUserData.user.profile === undefined ? 
                  currentUserData.profile.nama : 
                  currentUserData.user.username
                )
              }
              </h5>
              <h6>{
                currentUserData === false ? 
                null : currentUserData.user.username
              }</h6>
            </div>
          </div>
          <div className={styles.dashboardUserMenu}></div>
          {/* {console.log(this.props)} */}
          {/* <Link to={`/user/${this.props.currentUserData.user.id}?tab=address`}>Address</Link>
          <Link to={`/user/${this.props.currentUserData.user.id}?tab=settings`}>Settings</Link> */}
        </div>
    )
  }
}

export default DashboardNavigation;