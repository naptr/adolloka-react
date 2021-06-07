import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';


class AllCategories extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loadingCategories: false,
      allCategories: []
    }
  }

  getAllCategories = () => {
    const { token } = this.props;

    this.setState(
      {loadingCategories: true}, 
      () => {
        fetch(
          'https://adolloka.herokuapp.com/api/barang/kategori', 
          {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          }
        )
        .then(async res => {
          if (res.status === 200) {
            const body = await res.json();
            this.setState({allCategories: body.kat})
          } else {
            console.log('Failed getting categories data')
          }
          this.setState({loadingCategories: false})
        })
        .catch(err => {
          console.log(err)
          this.setState({ loadingCategories: false })
        })
      }
    )
  }

  componentDidMount() {
    this.getAllCategories()
  }

  render() {
    if (this.state.loadingCategories) {
      return <div>Loading</div>
    } else if (this.state.loadingCategories === false) {
      return (  
        <>
          <ol>
            {this.state.allCategories.map((el, key) => <li key={key}>
              <Link to={{
                pathname: `/category/${el.slug}`, 
                state: el.id
              }}>{el.kategori}</Link>
            </li>)}
          </ol>
          <Link to="/">go to Home</Link>
        </>
      )
    }
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.token
  }
}

export default connect(mapStateToProps, null)(AllCategories)