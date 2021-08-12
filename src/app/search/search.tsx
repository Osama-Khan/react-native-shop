import {NavigationProp} from '@react-navigation/native';
import React from 'react';
import {View} from 'react-native';
import {FAB, Searchbar, Text} from 'react-native-paper';
import s from '../../styles/styles';
import Criteria from '../models/criteria';
import {ProductType} from '../models/types/product.types';
import Icon from '../components/icon';
import colors from '../../styles/colors';
import {createRef} from 'react';
import ProductListing from '../components/product/product-listing';
import ProductFiltersModal from '../components/product/product-filters-modal/product-filters-modal';

type PropType = {navigation: NavigationProp<any>};
type StateType = {
  criteria?: Criteria<ProductType>;
  query: string;
  showFilters: boolean;
};
export default class Search extends React.Component<PropType, StateType> {
  readonly updateDelay = 500;
  updateTimeout?: NodeJS.Timeout;
  searchBarRef: any;

  constructor(props: PropType) {
    super(props);
    this.state = {query: '', showFilters: false};
    this.searchBarRef = createRef();
    props.navigation.addListener('focus', () => {
      this.searchBarRef.current?.focus();
    });
  }

  render() {
    const filters = this.state.showFilters;
    return (
      <View style={s.flex}>
        <Searchbar
          style={[s.roundedNone]}
          value={this.state.query}
          placeholder="Search Products..."
          onChangeText={this.handleSearchChange}
          ref={this.searchBarRef}
          editable={!filters}
        />
        {this.state.criteria ? (
          <ProductListing
            criteria={this.state.criteria}
            navigation={this.props.navigation}
          />
        ) : (
          <View style={[s.flex, s.myAuto, s.mt24, s.center]}>
            <Icon name="text-box-search" size={48} color={colors.gray} />
            <Text style={[s.textMuted, s.mt12]}>
              Start typing to see results...
            </Text>
          </View>
        )}
        <FAB
          icon="filter"
          style={[s.bottomRight, s.m8]}
          onPress={() => this.setState({...this.state, showFilters: true})}
          disabled={filters}
        />
        <ProductFiltersModal
          visible={filters}
          onApply={state => {
            const criteria = new Criteria<ProductType>();
            criteria.setOrderBy(state.sortBy);
            criteria.setOrderDir(state.sortByOrder);
            if (state.maxPrice < 100000) {
              criteria.addFilter('price', state.maxPrice, '<=');
            }
            if (state.outOfStock === false) {
              criteria.addFilter('stock', 0, '>');
            }
            this.addSearchQuery(criteria);
            this.setState({...this.state, criteria, showFilters: false});
          }}
          onClear={() => {
            const criteria = new Criteria<ProductType>();
            this.addSearchQuery(criteria);
            this.setState({...this.state, criteria, showFilters: false});
          }}
          onDismiss={() => this.setState({...this.state, showFilters: false})}
        />
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
        ? new Criteria<ProductType>(this.state.criteria)
        : undefined;
      this.addSearchQuery(criteria);
      this.setState({...this.state, criteria});
      this.updateTimeout = undefined;
    }, this.updateDelay);
  };

  addSearchQuery = (criteria?: Criteria<ProductType>) =>
    criteria?.addFilter('title', `%25${this.state.query}%25`, 'like');
}
