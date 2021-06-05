import React from 'react';


class CategoryPage extends React.Component {
  componentDidMount() {
    console.log(this.props)
  }

  render() {
    return (
      <div>{this.props.match.path}</div>
    )
  }
}

export default CategoryPage;