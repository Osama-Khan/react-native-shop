import React from 'react';
import productService from '../../services/product.service';
import ProductListingCard from './product-listing-card';
import ListingComponent from '../listing/listing';
import {ProductType} from '../../models/types/product.types';
import {NavigationProp} from '@react-navigation/core';
import Criteria from '../../models/criteria';
import {AxiosResponse} from 'axios';
import EmptyListView from '../empty-list-view/empty-list-view';

type ResponseType = Promise<AxiosResponse<{data: ProductType[]; meta: any}>>;
type PropType = {
  criteria?: Criteria<ProductType>;
  navigation: NavigationProp<any>;
  fetchMethod?: (criteria?: Criteria<ProductType>) => ResponseType;
  noResultsView?: () => React.ReactElement;
};
export default class extends React.Component<PropType> {
  render() {
    return (
      <ListingComponent
        criteria={this.props.criteria}
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
          return productService.fetchProducts(c);
        }}
        noResultsView={
          this.props.noResultsView ||
          (() => (
            <EmptyListView
              icon="emoticon-sad"
              title="No Products"
              caption="No products were found"
              btnProps={{
                text: 'Go to Search',
                icon: 'magnify',
                action: () => this.props.navigation.navigate('Search'),
              }}
            />
          ))
        }
        padding={{bottom: 68}}
      />
    );
  }
}
