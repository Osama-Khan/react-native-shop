import {NavigationProp, RouteProp} from '@react-navigation/native';
import React from 'react';
import ProductListing from '../components/product/product-listing';
import productService from '../services/product.service';

type P = {navigation: NavigationProp<any>; route: RouteProp<any>};
type S = {};
export default class CategoryProducts extends React.Component<P, S> {
  state = {};

  componentDidMount() {
    const {category} = this.props.route.params!;
    this.props.navigation.setOptions({
      title: 'Category: ' + category.name,
    });
  }

  render() {
    const {category} = this.props.route.params!;
    return (
      <ProductListing
        navigation={this.props.navigation}
        fetchMethod={c => productService.fetchFromCategory(category.name, c)}
      />
    );
  }
}
