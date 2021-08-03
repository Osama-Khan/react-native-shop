import React from 'react';
import {ScrollView} from 'react-native';
import {ProgressBar} from 'react-native-paper';
import ProductListingCard from '../components/product/product-listing-card';
import Criteria from '../models/criteria';
import productService from '../services/product.service';

export default class Explore extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {products: undefined};
  }
  componentDidMount() {
    const criteria = new Criteria<any>();
    criteria.addRelation('images');
    productService.fetchProducts(criteria).then((res: any) => {
      this.setState({...this.state, products: res.data.data});
    });
  }

  render() {
    const products = this.state.products?.map((p: any) => (
      <ProductListingCard product={p} key={p.id} />
    )) || <ProgressBar indeterminate={true} />;
    return <ScrollView>{products}</ScrollView>;
  }
}
