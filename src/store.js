import { createStore } from 'redux';


const preloader = {
  token: null, 
  isLogin: false
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TOKEN':
      return {
        ...state,
        token: action.token, 
        isLogin: true
      };
    default:
      return state;
  };
}

export default createStore(reducer, preloader);