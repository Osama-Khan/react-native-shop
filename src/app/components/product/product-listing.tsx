import React from 'react';
import {View} from 'react-native';
import {Text} from 'react-native-paper';
import colors from '../../../styles/colors';
import s from '../../../styles/styles';
import productService from '../../services/product.service';
import Icon from '../icon';
import ProductListingCard from './product-listing-card';
import ListingComponent from '../listing/listing';
import {ProductType} from '../../models/types/product.types';
import {NavigationProp} from '@react-navigation/core';
import Criteria from '../../models/criteria';

type PropType = {
  criteria: Criteria<ProductType>;
  navigation: NavigationProp<any>;
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
        fetchMethod={c => productService.fetchProducts(c)}
        noResultsView={() => (
          <View style={[s.flex, s.center]}>
            <Icon name="emoticon-sad" size={48} color={colors.gray} />
            <Text style={[s.textMuted, s.mt12]}>No Products Found</Text>
            <Text style={[s.textMuted]}>Try changing the filters</Text>
          </View>
        )}
      />
    );
  }
}
