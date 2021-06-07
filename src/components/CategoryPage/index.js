import React from 'react';
import { 
  Switch, 
  Route
} from 'react-router-dom';
import ProductBasedOnCategory from '../CategoryPage/ProductBasedOnCategory';
import AllCategories from './AllCategories';


class CategoryPage extends React.Component {
  componentDidMount() {
    console.log(this.props)
  }

  render() {
    return (
      <Switch>
        <Route path="/category" exact component={AllCategories} />
        <Route path="/category/:slug" component={ProductBasedOnCategory} />
      </Switch>
    )
  }
}

export default CategoryPage;