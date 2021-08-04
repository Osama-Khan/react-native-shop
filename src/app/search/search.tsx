import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Badge, Searchbar, Text} from 'react-native-paper';
import colors from '../../styles/colors';
import styles from '../../styles/styles';
import ProductListingCard from '../components/product/product-listing-card';
import Criteria from '../models/criteria';
import productService from '../services/product.service';

export default class Search extends React.Component<any, any> {
  requestCaller?: NodeJS.Timeout;

  constructor(props: any) {
    super(props);
    this.state = {products: undefined, meta: undefined, query: ''};
  }

  componentDidUpdate(_: any, prevState: any) {
    if (this.state.query !== prevState.query) {
      if (this.requestCaller) {
        clearTimeout(this.requestCaller);
      }
      this.requestCaller = setTimeout(this.fetchProducts, 500);
    }
  }

  handleSearchChange = (query: string) => {
    this.setState({...this.state, query});
  };

  render() {
    const productList = this.state.products ? (
      this.state.products.length === 0 ? (
        <View style={[styles.flex, styles.center]}>
          <Text style={styles.textMuted}>Nothing found...</Text>
        </View>
      ) : (
        <View>
          <Badge style={styles.m4}>
            {`${this.state.meta.totalRecords} RESULTS`}
          </Badge>
          <ScrollView>
            {this.state.products.map((p: any) => (
              <ProductListingCard
                product={p}
                key={p.id}
                onPress={() =>
                  this.props.navigation.navigate('Detail', {id: p.id})
                }
              />
            ))}
            <View style={{margin: 48}} />
          </ScrollView>
        </View>
      )
    ) : (
      <></>
    );
    return (
      <>
        <Searchbar
          style={styles.m4}
          value={this.state.query}
          placeholder="Search Products..."
          onChangeText={this.handleSearchChange}
        />
        <View style={styles.flex}>{productList}</View>
      </>
    );
  }

  fetchProducts = () => {
    const criteria = new Criteria<any>();
    criteria.addFilter('title', `%${this.state.query}%`, 'like');
    criteria.addRelation('images');
    productService.fetchProducts(criteria).then(res => {
      const [products, meta] = [res.data.data, res.data.meta];
      this.setState({...this.state, products, meta});
    });
  };
}
