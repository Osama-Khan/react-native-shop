import {NavigationProp} from '@react-navigation/native';
import React from 'react';
import {View} from 'react-native';
import {Searchbar, Text} from 'react-native-paper';
import s from '../../styles/styles';
import Criteria from '../models/criteria';
import {ProductType} from '../models/types/product.types';
import ProductList from '../components/product/product-list';
import Icon from '../components/icon';
import colors from '../../styles/colors';
import {createRef} from 'react';
import ListingComponent from '../components/listing/listing';
import ProductListingCard from '../components/product/product-listing-card';
import productService from '../services/product.service';

type PropType = {navigation: NavigationProp<any>};
type StateType = {criteria?: Criteria<ProductType>; query: string};
export default class Search extends React.Component<PropType, StateType> {
  readonly updateDelay = 500;
  updateTimeout?: NodeJS.Timeout;
  searchBarRef: any;

  constructor(props: PropType) {
    super(props);
    this.state = {query: ''};
    this.searchBarRef = createRef();
    props.navigation.addListener('focus', () => {
      this.searchBarRef.current?.focus();
    });
  }

  render() {
    return (
      <View style={s.flex}>
        <Searchbar
          style={[s.m4]}
          value={this.state.query}
          placeholder="Search Products..."
          onChangeText={this.handleSearchChange}
          ref={this.searchBarRef}
        />
        {this.state.criteria ? (
          <ListingComponent
            criteria={this.state.criteria}
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
        ) : (
          <View style={[s.flex, s.myAuto, s.mt24, s.center]}>
            <Icon name="text-box-search" size={48} color={colors.gray} />
            <Text style={[s.textMuted, s.mt12]}>
              Start typing to see results...
            </Text>
          </View>
        )}
      </View>
    );
  }

  handleSearchChange = (query: string) => {
    this.setState({...this.state, query});
    this.setUpdate();
  };

  /** Sets a timeout to update criteria with a delay */
  setUpdate = () => {
    // Clear previous timeout to update criteria
    if (this.updateTimeout) {
      clearTimeout(this.updateTimeout);
    }

    // Set a timeout to update criteria
    this.updateTimeout = setTimeout(() => {
      const criteria = this.state.query
        ? new Criteria<ProductType>()
        : undefined;
      const query = `%${this.state.query}%`;
      criteria?.addFilter('title', query, 'like');
      criteria?.addRelation('images');
      this.setState({...this.state, criteria});
      this.updateTimeout = undefined;
    }, this.updateDelay);
  };
}
