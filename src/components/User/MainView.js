import React from 'react';


class MainView extends React.Component {
  constructor(props) {
    super(props);

  }

  getUserData = () => {
    this.setState(
      {}, 
      () => {
        fetch(
          'https://adolloka.herokuapp.com/api/user', 
          {
            headers: {
              'Authorization': `Bearer ${this.props.token}`
            }
          }
        )
        .then(res => console.log(res.json()))
      }
    )
  }

  componentDidMount() {
    this.getUserData();
  }

  render() {
    return (
      <div style={{minHeight: 200+'vh', zIndex: -1000}}>
        <h1>User da</h1>
      </div>
    )
  }
}

export default MainView;