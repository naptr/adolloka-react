import React from 'react';

import { Link } from 'react-router-dom';


class ProductBasedOnCategory extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      allItems: []
    }
  }

  getCategoryItems = () => {
    this.setState(
      {loading: true}, 
      () => {
        fetch(
          `https://adolloka.herokuapp.com/api/barang/kategori/${this.props.location.state}`
        )
        .then(async res => {
          if (res.status === 200) {
            const body = await res.json();

            // console.log(body)
            this.setState({ allItems: body.kat.barang })
          } else {
            console.log("error while fetching data")
          }
          this.setState({ loading: false })
        })
        .catch(err => {
          this.setState({ loading: false });
          console.log(err)
        })
      }
    )
  }

  componentDidMount() {
    this.getCategoryItems()
  }

  render() {
    if (this.state.loading) {
      return <div>Loading</div>
    } else if (this.state.loading === false) {
      return (
        <>
          {console.log(this.props)}
          {console.log(this.state)}
          <div>Kore wa Kategori desu {this.props.match.params.slug}</div>
          <Link to="/category">Kembali desu</Link>
          <ul>
            {this.state.allItems.map((el, key) => <li key={key}>
              <Link to={`/item/${el.toko.domain_toko}/${el.id}`}>{el.nama}</Link>
            </li>)}
          </ul>
        </>
      )
    }
  }
}

export default ProductBasedOnCategory;