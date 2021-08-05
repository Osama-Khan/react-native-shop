import {NavigationProp} from '@react-navigation/native';
import React from 'react';
import {ScrollView, View} from 'react-native';
import {ProgressBar, Text} from 'react-native-paper';
import ProductListingCard from './product-listing-card';
import Criteria from '../../models/criteria';
import {ProductType} from '../../models/types/product.types';
import productService from '../../services/product.service';
import s from '../../../styles/styles';
import colors from '../../../styles/colors';
import Icon from '../icon';

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
    const products = this.state.products;
    const view = products ? (
      products.length > 0 ? (
        <ScrollView>
          {products.map((p: any) => (
            <ProductListingCard product={p} key={p.id} {...this.props} />
          ))}
        </ScrollView>
      ) : (
        <View style={[s.flex, s.center]}>
          <Icon name="emoticon-sad" size={48} color={colors.gray} />
          <Text style={[s.textMuted, s.mt12]}>No Products Found</Text>
          <Text style={[s.textMuted]}>Try changing the filters</Text>
        </View>
      )
    ) : (
      <ProgressBar indeterminate={true} />
    );
    return <View style={s.flex}>{view}</View>;
  }

  fetchProducts = (criteria: Criteria<ProductType>) => {
    criteria.addRelation('images');
    productService.fetchProducts(criteria).then((res: any) => {
      this.setState({...this.state, products: res.data.data});
    });
  };
}
