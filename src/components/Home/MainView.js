import React from 'react';
// import LoadingPage from '../../components/Assets';


class MainView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false
    }
  }

  render() {  
    return (
      <>
        {/*<div style={{minHeight: 200+"vh"}}>*/}
        <div>
          <h1 style={{padding: 0, margin: 0, zIndex: -1000}}>Main View Page</h1>
        </div>
      </>
    )
  }
}

export default MainView;