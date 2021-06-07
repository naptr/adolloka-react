import { createStore } from 'redux';


const preloader = {
  token: null,
  currentUserData: null,
  currentUserShop: null,
  isLogin: false,
  cartCounter: 0
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'MAKE_LOGGEDIN':
      return {
        ...state,
        isLogin: true
      };
    case 'ADD_USER_DATA':
      return {
        ...state, 
        currentUserData: action.currentUserData, 
        currentUserShop: action.currentUserShop
      }
    case 'SAVE_TOKEN':
      return {
        ...state, 
        token: action.token
      }
    case 'MAKE_LOGOUT':
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('currentUserData');
      return ({
        ...state, 
        isLogin: false, 
        token: null, 
        currentUserData: null
      }, window.location.reload())
    case 'ADD_CART_COUNT':
      return ({
        ...state,
        cartCounter: state.cartCounter + 1
      })
    case 'SUBTRACT_CART_COUNT':
      return ({
        ...state,
        cartCounter: state.cartCounter - 1
      })
    case 'ADD_LATEST_CART_COUNT':
      return ({
        ...state,
        cartCounter: action.latestCartCounter
      })
    default:
      return state;
  };
}

export default createStore(reducer, preloader);