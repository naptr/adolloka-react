import React, { useState } from 'react';
import queryString from 'query-string';
import styled from 'styled-components';
import DashboardNavigation from './DashboardNavigation';
import AddressView from './AddressView';
import SettingsView from './SettingsView';
import {
  TokenContext, 
  UserDataContext
} from '../../context/userContext';
import { PersonFill } from 'react-bootstrap-icons';
import styles from '../../styles/User/User.module.css';


const RenderBasedQuery = (props) => {
  switch (props.tab) {
    case 'settings':
      // return <SettingsView token={props.token} currentUserData={props.currentUserData} />
      return <SettingsView token={props.token} />

    case 'address':
      // return <AddressView token={props.token} currentUserData={props.currentUserData} />
      return <AddressView token={props.token} />

    default:
      // return <SettingsView token={props.token} currentUserData={props.currentUserData} />
      return <SettingsView token={props.token} />

  }
}

const IndicatorLine = styled.div`
  min-width: 16px;
  width: ${props => props.dynamicWidth || 159}px;
  background-color: #3A86FF;
  height: 2px;
  border-radius: 1px;
  position: absolute;
  bottom: 0px;
  left: 0px;
  transition: all 280ms ease 0s;
  transform: translateX(${props => props.dynamicTranslate || 0}px);
`

const DashboardTabSection = (props) => {
  const { values, currentUserData, tabWidth, navigation } = props;
  const [indicatorLine, setIndicatorLine] = useState({
    indicatorLineWidth: 0, 
    indicatorTranslateX: 0
  })
  return (
    <>
      <div className={styles.dashboardContentTabSection}>
        <div className={styles.dashboardContentTabSectionHolder}>
          {/* <div ref={this.testWidth} className={values.tab === 'settings' || JSON.stringify(values) === '{}' ? styles.activeTabButton : styles.nonActiveTabButton} onClick={() => props.history.push(`/user/${currentUserData.user.id}?tab=settings`)}>Profile Settings</div> */}
          <div
            {...values.tab === 'settings' || JSON.stringify(values) === '{}' ?
              {
                ref: tabWidth,
                className: styles.activeTabButton
              } :
              {
                ref: null,
                className: styles.nonActiveTabButton
              }
            }
            onClick={() => {
              navigation.history.push(`/user/${currentUserData.user.id}?tab=settings`)
              setIndicatorLine({
                indicatorTranslateX: 0,
                indicatorLineWidth: 159
              })
            }}
          >
            Profile Settings
          </div>
          {/* <div className={values.tab === 'address' ? styles.activeTabButton : styles.nonActiveTabButton} onClick={() => props.history.push(`/user/${currentUserData.user.id}?tab=address`)}>Address</div> */}
          <div
            {
            ...values.tab === 'address' ?
              {
                ref: tabWidth,
                className: styles.activeTabButton
              } :
              {
                ref: null,
                className: styles.nonActiveTabButton
              }
            }
            onClick={() => {
              navigation.history.push(`/user/${currentUserData.user.id}?tab=address`)
              setIndicatorLine({
                indicatorTranslateX: 159,
                indicatorLineWidth: 106
              })
            }}
          >
            Address
          </div>
          <IndicatorLine dynamicWidth={indicatorLine.indicatorLineWidth} dynamicTranslate={indicatorLine.indicatorTranslateX} />
        </div>
      </div>
    </>
  )
}

class MainViewWithContext extends React.Component {
  constructor(props) {
    super(props);

    // this.state = {
    //   indicatorLineWidth: 159, 
    //   indicatorTranslateX: 0, 
    //   indicatorLineCache: 0
    // }

    this.testWidth = React.createRef();
  }

  componentDidUpdate() {
    console.log(this.testWidth.current.offsetWidth)
    
  }

  // isEmpty = (data) => {
  //   if (typeof (data) === 'object') {
  //     if (JSON.stringify(data) === '{}' || JSON.stringify(data) === '[]') {
  //       return (`{} or [] ${true}`);
  //     } else if (!data) {
  //       return `!data ${true}`;
  //     }
  //     return false;
  //   } else if (typeof (data) === 'string') {
  //     if (!data.trim()) {
  //       return `!data.trim() ${true}`;
  //     }
  //     return false;
  //   } else if (typeof (data) === 'undefined') {
  //     return `undefined ${true}`;
  //   } else {
  //     return false;
  //   }
  // }

  render() {
    const props = this.props.globalProps
    const values = queryString.parse(props.location.search)
    // console.log(this.isEmpty(values));

    return (
      <>
        <TokenContext.Consumer>
          {token => (
            <UserDataContext.Consumer>
              {currentUserData => (
                <div className={styles.userInformationBox}>
                  <DashboardNavigation currentUserData={currentUserData} />
                  {/* <Switch>
                    <Route exact path="/user/:id" render={() => <SettingsView token={token} currentUserData={currentUserData} />} />
                    <Route path="/user/:id?tab=address" render={() => <AddressView token={token} currentUserData={currentUserData} />} />
                    <Route path="/user/:id?tab=settings" render={() => <SettingsView token={token} currentUserData={currentUserData} />} />
                  </Switch> */}
                  <div className={styles.dashboardContainer}>
                    <span className={styles.dashboardUserName}>
                      <PersonFill style={{ marginRight: 8 + 'px' }} size={20} />
                      ({currentUserData.user.username})
                    </span>
                    <div className={styles.dashboardContentContainer}>
                      <DashboardTabSection 
                        values={values}
                        currentUserData={currentUserData}
                        tabWidth={this.testWidth}
                        navigation={props}
                      />
                      <div className={styles.dashboardViewContainer}>
                        <RenderBasedQuery token={token} currentUserData={currentUserData} tab={values.tab} />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </UserDataContext.Consumer>
          )}
        </TokenContext.Consumer>
      </>
    )
  }
}

export default MainViewWithContext;