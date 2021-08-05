import {NavigationProp} from '@react-navigation/native';
import React from 'react';
import ProductList from '../components/product/product-list';

type PropType = {navigation: NavigationProp<any>};

export default class Explore extends React.Component<PropType> {
  render() {
    return <ProductList {...this.props} />;
  }
}
