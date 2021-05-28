import React from 'react';


class AddressView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      addresses: [],
      gettingDataLoading: true
    }
  }

  getAddressAll = () => {
    const { token } = this.props;

    fetch(
      'http://adolloka.herokuapp.com/api/user/alamat', 
      {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
    )
    .then(async res => {
      if (res.status === 200) {
        const body = await res.json();

        this.setState({
          addresses: body.data
        })
        console.log(body);
        console.log(this.state);
      }
    })
    .catch(err => console.log(err))
  }

  componentDidMount() {
    this.getAddressAll();
  }

  render() {
    return (
      <div>
        <ul>
          {this.state.addresses.map((el, key) => <li>{JSON.stringify(el)}</li>)}
        </ul>
      </div>
    )
  }
}

export default AddressView;