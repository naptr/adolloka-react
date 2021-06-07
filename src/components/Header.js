import 
  React, 
  { 
    useEffect,
    useState, 
    // useHistory
  } from 'react';
// import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { 
  Search, 
  CartFill, 
  BellFill,
  EnvelopeFill
} from 'react-bootstrap-icons';
import Logo from '../components/Assets/Logo';
import styles from '../styles/Header/Header.module.css';
import { ADD_CART_COUNT, ADD_LATEST_CART_COUNT, SUBTRACT_CART_COUNT } from '../constant/CONSTANT';
// import { MAKE_LOGOUT } from '../constant/CONSTANT';


const LeftHeader = (props) => {
  const [categoryHovered, setCategoryHovered] = useState(false);
  const { history } = props;

  return (
    <>
      <div className={styles.logoContainer}>
        <Logo />
      </div>
      <div className={styles.categorySection}>
        <div 
          className={styles.categoryAsButton}
          {
            ...categoryHovered ? 
            {style: {
              color: "#3A86FF", 
              borderRadius: 4+"px", 
              backgroundColor: "rgba(49, 53, 59, 0.12)"
            }} : 
            null
          }
          onClick={() => history.push('/category')}
          onMouseEnter={() => setCategoryHovered(true)}
          onMouseLeave={() => setCategoryHovered(false)}>
          Kategori
        </div>
      </div>
    </>
  )
}

class SearchBar extends React.Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    return (
      <div 
        className={styles.searchBarContainer}
        {
        ...this.props.isLogin ?
          { style: { width: 90 + "%" } } :
          { style: { width: 70 + "%" } }
        }
      >
        <form className={styles.searchBarForm}>
          <div className={styles.searchBar}>
            <div className={styles.searchBarWrapper}>
              <div className={styles.searchBarMiddle}>
                <input 
                  className={styles.searchBarInput}
                  placeholder="Cari Fashionmu"/>
                <button
                  type="button"
                  className={styles.searchBarButton}
                ><Search color='rgba(108, 117, 125)'/></button>
              </div>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

const Button = (props) => {
  const [buttonHovered, setButtonHovered] = useState(false);
  const { anotherProps } = props;

  return (
      <div
        className={styles.button}
        {
        ...buttonHovered ? {
          style: {
            backgroundColor: "rgba(49, 53, 59, 0.12)",
            borderRadius: 4 + "px"
          }
        } :
          null
        }
        onMouseEnter={() => setButtonHovered(true)}
        onMouseLeave={() => setButtonHovered(false)}
      >
        <props.buttonName size={18} />
        
        {props.buttonName === CartFill ? (anotherProps.cartCounter !== 0 ? <span className={styles.littleCartCounter}>{anotherProps.cartCounter}</span> : null) : null }
      </div>
  )
}

const RightHeader = (props) => {
  const [shopButtonHovered, setShopButtonHovered] = useState(false);
  const [accountButtonHovered, setAccountButtonHovered] = useState(false);
  const [currentCartQuantity, setCurrentCartQuantity] = useState(0);
  const { 
    isLogin, 
    mainProps, 
    currentUserData, 
    anotherProps 
  } = props;

  console.log(props)

  const gettingCartData = () => {
    const { token } = anotherProps;

    fetch(
      'https://adolloka.herokuapp.com/api/cart', 
      {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
    )
    .then(async res => {
      if (res.status === 200) {
        const body = await res.json();
        
        console.log(body.data)
        setCurrentCartQuantity((body.data).length)

        anotherProps.saveLatestCartCount(currentCartQuantity);
      } else {
        console.log('Failed while fetching data')
      }
    })
    .catch(err => console.error(err));
  }

  useEffect(() => {
    gettingCartData()
  })

  if (isLogin) {
    return (
      <>
      {/* {console.log(props)} */}
        <div className={styles.buttonsContainer}>
          <div className={styles.buttonLoggedIn}>
            <Button buttonName={CartFill} anotherProps={anotherProps}/>
          </div>
          <div className={styles.buttonLoggedIn}>
            <Button buttonName={BellFill} />
          </div>
          <div className={styles.buttonLoggedIn}>
            <Button buttonName={EnvelopeFill}/>
          </div>
        </div>
        <div className={styles.verticalLine}>
        </div>
        <div 
          className={styles.userButtonContainer} 
          // onClick={() => props.mainProps.push(`/user/${props.userData != null ? props.userData.id : null}`)}
          onClick={() => {

            // sessionStorage.removeItem('token');
            // sessionStorage.removeItem('currentUserData');
            // anotherProps.makeLogout();
            console.log(props);
            // return <Redirect to="/" />
            // return <Redirect to="/createshop" />
            if (currentUserData.user.profile === null) {
              alert('Lengkapi profile terlebih dahulu')
            } else {
              mainProps.push('/createshop')
            }

            // console.log(props.anotherProps)
          }}
          onMouseEnter={() => setShopButtonHovered(true)}
          onMouseLeave={() => setShopButtonHovered(false)}
        >
          <div 
            className={styles.userButton}
            {...shopButtonHovered ? { style: { color: "#3A86FF", backgroundColor: "rgba(49, 53, 59, 0.12)" } } : { style: null }}
          >
            <img src={"/assets/store-icon.png"} alt="Store" style={{width: 25+'px', height: 25+'px'}}/>
            <div 
              className={styles.buttonText} 
            >
              adolloka shop
            </div>
          </div>
        </div>
        <div 
          className={styles.userButtonContainer}
          onClick={() => mainProps.push({
            pathname: `/user/${currentUserData.user.id}`, 
            state: currentUserData
          })}
          onMouseEnter={() => setAccountButtonHovered(true)}
          onMouseLeave={() => setAccountButtonHovered(false)}
        >
          <div 
            className={styles.userButton}
            {...accountButtonHovered ? { style: { color: "#3A86FF", backgroundColor: "rgba(49, 53, 59, 0.12)" } } : { style: null }}
          >
            {/* <div><Link to={`/user/${props.userid}`}>User {props.userid != null ? props.userid : null}</Link></div> */}
            {/* <div><Link to={`/user/${props.userData != null ? props.userData.id : null}`}>{props.userData != null ? props.userData.username : null}</Link></div> */}
            <img src={currentUserData === null ? null : (currentUserData.user.profile === undefined ? (currentUserData.profile.foto === null ? "/assets/user-alt-icon.png" : currentUserData.profile.foto.foto) : "/assets/user-alt-icon.png") } alt={ currentUserData === null ? null : currentUserData.user.username} style={{width: 25+'px', height: 25+'px'}} />
            <div 
              className={styles.buttonText}
            >
              { currentUserData === null ? null : currentUserData.user.username }
            </div>
          </div>
        </div>
      </>
    )
  } else {
    return (
      <>
        <div className={styles.buttonCartBeforeLoggin}>
          <Button buttonName={CartFill} />
        </div>
        <div className={styles.verticalLine}>
        </div>
        <div className={styles.loginRegisterContainer}>
          <button 
            className={styles.loginButton}
            onClick={() => window.location = "/login"}>
            Masuk
          </button>
          <button 
            className={styles.registerButton}
            onClick={() => window.location = "/register" }>
            Daftar
          </button>
        </div>
      </>
    )
  }
}

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false, 
      userData: null, 
      result: '',
    }
  }

  // getUserId = () => {
  //   this.setState(
  //     {isLoading: true}, 
  //     () => {
  //       fetch(
  //         'https://adolloka.herokuapp.com/api/user', 
  //         {
  //           headers: {
  //             'Authorization': `Bearer ${this.props.token}`
  //           }
  //         }
  //       )
  //       .then(async (res) => {
  //         if (res.status == 200) {
  //           const body = await res.json();
            
  //           this.setState({
  //             result: 'success', 
  //             userData: body.user,
  //             isLoading: false
  //           })
  //         } else {
  //           console.log('res !200')
  //           this.setState({
  //             result: '!success', 
  //             isLoading: false
  //           })
  //         }
  //       })
  //       .catch(err => {
  //         console.trace();
  //         this.setState({
  //           result: '!success catch', 
  //           isLoading: false
  //         })
  //       });
  //     }
  //   )
  // }

  // componentDidMount() {
  //   // if (this.props.isLogin) {
  //   //   this.getUserId();
  //   // }
  //   // console.log(this.props);
  //   console.log(this.props.currentUserData)
  // }

  render() {
    // if (this.state.isLoading && this.state.result != 'success') {
    //   return <LoadingPage />
    // } else {
      return (
        <div style={{marginTop: 88+"px"}} className={styles.spacer}>
          {console.log(this.props)}
          <div className={styles.headerContainer}>
            <div className={styles.headerContentTop}>
              <LeftHeader history={this.props.mainProps}/>
              <SearchBar isLogin={this.props.isLogin}/>
              {/* {console.log(this.state.userData)} */}
              <RightHeader 
                isLogin={this.props.isLogin} 
                mainProps={this.props.mainProps} 
                currentUserData={this.props.currentUserData} 
                anotherProps={this.props}
              />
            </div>
          </div>
        </div>
      )
    // }
  };
};

const mapStateToProps = (state) => {
  return {
    isLogin: state.isLogin,
    currentUserData: state.currentUserData,
    cartCounter: state.cartCounter,
    token: state.token
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    saveLatestCartCount: (count) => {
      dispatch({
        type: ADD_LATEST_CART_COUNT, 
        latestCartCounter: count
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);