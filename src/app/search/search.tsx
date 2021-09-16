import {NavigationProp, RouteProp} from '@react-navigation/native';
import React from 'react';
import {IconButton, Searchbar} from 'react-native-paper';
import s from '../../styles/styles';
import Criteria from '../models/criteria';
import {ProductType} from '../models/types/product.types';
import ProductListing from '../components/product/product-listing';
import IconMessageView from '../components/icon-message-view/icon-message-view';
import StackedScreens, {ScreenProps} from '../components/stacked-screens';
import FiltersScreen from './filters.screen';
import CategoriesScreen from './categories.screen';
import {CategoryType} from '../models/types/category.type';
import {StyleSheet, View} from 'react-native';
import themeService from '../services/theme.service';
import Icon from '../components/icon';

type RouteParamType = {withSearch?: string; withCategory?: CategoryType};
type PropType = {
  navigation: NavigationProp<any>;
  route: RouteProp<any>;
};
type StateType = {
  criteria?: Criteria<ProductType>;
  category?: CategoryType;
  query: string;
};

export default class Search extends React.Component<PropType, StateType> {
  readonly updateDelay = 500;
  updateTimeout?: NodeJS.Timeout;

  constructor(props: PropType) {
    super(props);
    this.state = this.deriveStateFromParams(props.route.params) || {query: ''};
  }

  componentDidMount() {
    this.props.navigation.addListener('focus', () => {
      const newState = this.deriveStateFromParams(this.props.route.params);
      if (newState) {
        this.setState(newState);
      }
    });
  }

  deriveStateFromParams = (params?: RouteParamType): StateType | undefined => {
    const withSearch = params?.withSearch;
    const withCategory = params?.withCategory;
    const shouldSetQuery = withSearch && withSearch !== this.state?.query;
    const shouldSetCategory =
      withCategory && withCategory?.id !== this.state?.category?.id;
    if (shouldSetCategory || shouldSetQuery) {
      const criteria = new Criteria(this.state?.criteria);
      const query = shouldSetQuery ? withSearch : this.state?.query;
      const category = shouldSetCategory ? withCategory : this.state?.category;
      return {...this.state, query, category, criteria};
    }
  };

  render() {
    return (
      <StackedScreens
        MainScreen={this.SearchScreen}
        LeftScreen={this.LeftScreen}
        RightScreen={this.RightScreen}
      />
    );
  }

  RightScreen = (p: ScreenProps) => (
    <FiltersScreen
      {...p}
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
        this.setState({...this.state, criteria});
      }}
      onClear={this.resetFilters}
    />
  );
  LeftScreen = (p: ScreenProps) => (
    <CategoriesScreen
      {...p}
      onSelectCategory={cat => {
        const criteria = new Criteria(this.state.criteria);
        const category = cat.id === this.state.category?.id ? undefined : cat;
        this.setState({...this.state, category, criteria});
      }}
      selectedCategory={this.state.category}
    />
  );

  SearchScreen = () => {
    return (
      <View
        style={[
          s.flex,
          {backgroundColor: themeService.currentTheme.colors.card},
        ]}>
        <Searchbar
          style={s.roundedNone}
          value={this.state.query}
          placeholder="Search Products..."
          onChangeText={this.handleSearchChange}
          clearButtonMode="always"
          clearIcon={() => (
            <IconButton
              icon="filter-remove"
              onPress={() => this.resetFilters(true)}
            />
          )}
        />
        <ProductListing
          criteria={this.state.criteria}
          navigation={this.props.navigation}
          categoryName={this.state.category?.name}
          noResultsView={() => (
            <IconMessageView
              icon="magnify-close"
              title="Nothing found"
              caption="No products matching current filters found"
              btnProps={{
                action: () => this.resetFilters(true),
                icon: 'reload',
                text: 'Reset Filters',
              }}
            />
          )}
          padding={{bottom: 64}}
        />
        <Icon name="shape" size={24} style={[styles.icon, styles.left]} />
        <Icon name="filter" size={24} style={[styles.icon, styles.right]} />
      </View>
    );
  };

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

  resetFilters = (clearQuery = false) => {
    const criteria = new Criteria<ProductType>();
    if (!clearQuery) {
      this.addSearchQuery(criteria);
    }
    this.setState({
      ...this.state,
      criteria,
      category: undefined,
      query: clearQuery ? '' : this.state.query,
    });
  };
  addSearchQuery = (criteria?: Criteria<ProductType>) =>
    criteria?.addFilter('title', `%25${this.state.query}%25`, 'like');
}

const styles = StyleSheet.create({
  icon: {
    position: 'absolute',
    bottom: 18,
    padding: 12,
    borderColor: themeService.currentTheme.colors.border,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    backgroundColor: themeService.currentTheme.colors.card,
  },
  left: {
    left: 0,
    ...s.roundedTopRight,
    ...s.roundedBottomRight,
    borderRightWidth: 1,
  },
  right: {
    right: 0,
    ...s.roundedTopLeft,
    ...s.roundedBottomLeft,
    borderLeftWidth: 1,
  },
});
