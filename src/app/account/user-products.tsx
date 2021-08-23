import React from 'react';
import {connect} from 'react-redux';
import ProductListing from '../components/product/product-listing';
import Criteria from '../models/criteria';
import {ProductType} from '../models/types/product.types';
import {AppStateType} from '../store/state';

class UserProducts extends React.Component<any, any> {
  render() {
    const criteria = new Criteria<ProductType>();
    criteria.addFilter('user', this.props.userId);
    return (
      <ProductListing navigation={this.props.navigation} criteria={criteria} />
    );
  }
}

const mapStateToProps = (state: AppStateType) => {
  return {userId: state.user.id};
};

export default connect(mapStateToProps)(UserProducts);
