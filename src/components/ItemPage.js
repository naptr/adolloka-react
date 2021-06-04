import React from 'react';
import { Link } from 'react-router-dom';


class ItemPage extends React.Component {

  getBarangIdBased = () => {
    fetch(
      `http://adolloka.herokuapp.com/api/barang/${this.props.match.params.id}/show`
    )
    .then(async res => {
      if (res.status === 200) {
        console.log(await res.json());
      } else {
        console.log(res.status)
      }
    })
    .catch(err => {
      console.log(err)
    })
  }

  componentDidMount() {
    this.getBarangIdBased()
  }

  render() {
    return (
      <>
        <div>{console.log(this.props)}</div>
        <Link to="/">Back to home</Link>
      </>
    )
  }
}

export default ItemPage;