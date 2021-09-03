import React from 'react';
import {ScrollView, View} from 'react-native';
import {ProductType} from '../models/types/product.types';
import productService from '../services/product.service';
import Criteria from '../models/criteria';
import {NavigationProp} from '@react-navigation/native';
import ProductCard from '../components/product/product-card';
import {LoadingCircles} from '../components/svg/loading';

type P = {navigation: NavigationProp<any>};
type S = {recent?: ProductType[]};

export default class RecentProductsList extends React.Component<P, S> {
  constructor(props: P) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const criteria = new Criteria<ProductType>();
    criteria.addRelation('images');
    criteria.setOrderBy('createdAt');
    criteria.setLimit(4);
    productService.fetchProducts(criteria).then(res => {
      this.setState({recent: res.data.data});
    });
  }

  render() {
    return (
      <View>
        {this.state.recent ? (
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            snapToInterval={248}>
            {this.state.recent.map(p => (
              <ProductCard
                product={p}
                navigation={this.props.navigation}
                key={p.id}
              />
            ))}
          </ScrollView>
        ) : (
          <LoadingCircles />
        )}
      </View>
    );
  }
}
