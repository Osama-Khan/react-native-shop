import {NavigationProp} from '@react-navigation/native';
import React from 'react';
import {ScrollView} from 'react-native';
import {ProgressBar} from 'react-native-paper';
import ProductListingCard from './product-listing-card';
import Criteria from '../../models/criteria';
import {ProductType} from '../../models/types/product.types';
import productService from '../../services/product.service';

type PropType = {
  /** Used to update card data when navigating back after construction. */
  navigation: NavigationProp<any>;

  /** Criteria for fetching the product */
  criteria?: Criteria<ProductType>;
};
type StateType = {products?: ProductType[]};

/** Shows products in a list */
export default class extends React.Component<PropType, StateType> {
  constructor(props: PropType) {
    super(props);
    this.state = {products: undefined};
  }

  componentDidMount() {
    const criteria = this.props.criteria || new Criteria<any>();
    this.fetchProducts(criteria);
  }

  componentDidUpdate(prevProps: PropType) {
    if (prevProps.criteria !== this.props.criteria) {
      this.fetchProducts(this.props.criteria!);
    }
  }

  render() {
    const products = this.state.products?.map((p: any) => (
      <ProductListingCard product={p} key={p.id} {...this.props} />
    )) || <ProgressBar indeterminate={true} />;
    return <ScrollView>{products}</ScrollView>;
  }

  fetchProducts = (criteria: Criteria<ProductType>) => {
    criteria.addRelation('images');
    productService.fetchProducts(criteria).then((res: any) => {
      this.setState({...this.state, products: res.data.data});
    });
  };
}
