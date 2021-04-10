import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';


class User extends React.Component {
  // constructor(props) {
  //   super(props);

  //   this.state = {
  //     userName: '', 
  //     userGender: '', 
  //     userBirthDate: ''
  //   }
  // }

  

  // updateUserData = () => {
  //   fetch(
  //     'https://adolloka.herokuapp.com/api/user/update/', 
  //     { 
  //       method: 'POST',
  //       body: {
  //         nama: this.state.userName, 
  //         gender: this.state.userGender, 
  //         tgl_lahir: this.state.userBirthDate,
  //         alamat: this.state.userAddress
  //       }
  //     }
  //   )
  // }

  getUserData = () => {
    fetch(
      'https://adolloka.herokuapp.com/api/user', 
      {
        headers: {
          'Authorization': `Bearer ${this.props.token}`
        }
      }
    )
    .then(async (res) => {
      if (res.status == 200) {
        console.log(res.json())
      }
    })
  }

  componentDidMount() {
    this.getUserData();
  }

  render() {
    if (this.props.isLogin) {
      return (
        <h1>User da! {this.props.match.params.id}</h1>
      )
    } else {
      return (
        <Redirect to="/" />
      )
    }
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.token, 
    isLogin: state.isLogin
  }
}

export default connect(mapStateToProps)(User);