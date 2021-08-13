import React from 'react';
import ProductListing from '../components/product/product-listing';
import Criteria from '../models/criteria';
import {ProductType} from '../models/types/product.types';
import appState from '../state/state';

export default class UserProducts extends React.Component<any, any> {
  render() {
    const criteria = new Criteria<ProductType>();
    criteria.addFilter('user', appState.user.id!);
    return (
      <ProductListing navigation={this.props.navigation} criteria={criteria} />
    );
  }
}
