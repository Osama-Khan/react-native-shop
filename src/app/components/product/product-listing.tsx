import React from 'react';
import productService from '../../services/product.service';
import ProductListingCard from './product-listing-card';
import ListingComponent, {ListingProps} from '../listing/listing';
import {ProductType} from '../../models/types/product.types';
import {NavigationProp} from '@react-navigation/core';
import Criteria from '../../models/criteria';
import IconMessageView from '../icon-message-view/icon-message-view';
import {searchRoute} from '../../app.routes';

type P = Partial<ListingProps<ProductType>> & {
  categoryName?: string;
  navigation: NavigationProp<any>;
};
type S = {
  updateCount: number;
};

export default class ProductListing extends React.Component<P, S> {
  state = {updateCount: 0};
  previousCat?: string = this.props.categoryName;

  componentDidUpdate() {
    if (this.previousCat !== this.props.categoryName) {
      this.previousCat = this.props.categoryName;
      this.setState({
        updateCount: this.state.updateCount + 1,
      });
    }
  }

  render() {
    return (
      <ListingComponent
        {...this.props}
        animation="fadeIn"
        container={p => (
          <ProductListingCard
            product={p}
            key={p.id}
            navigation={this.props.navigation}
          />
        )}
        fetchMethod={c => {
          c = new Criteria(c);
          // Criteria MUST have images relation to show image in listing
          c.addRelation('images');
          if (this.props.fetchMethod) {
            return this.props.fetchMethod(c);
          }

          if (this.props.categoryName) {
            return productService.fetchFromCategory(this.props.categoryName, c);
          }
          return productService.fetchProducts(c);
        }}
        noResultsView={
          this.props.noResultsView ||
          (() => (
            <IconMessageView
              icon="emoticon-sad"
              title="No Products"
              caption="No products were found"
              btnProps={{
                text: 'Go to Search',
                icon: 'magnify',
                action: () => this.props.navigation.navigate(searchRoute.name),
              }}
            />
          ))
        }
        updateCount={this.state.updateCount}
      />
    );
  }
}
