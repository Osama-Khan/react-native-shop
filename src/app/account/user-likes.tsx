import {NavigationProp} from '@react-navigation/native';
import React from 'react';
import {View} from 'react-native';
import {Card, IconButton, Text} from 'react-native-paper';
import s from '../../styles/styles';
import {productDetailRoute} from '../app.routes';
import ListingComponent from '../components/listing/listing';
import Criteria from '../models/criteria';
import {ProductType} from '../models/types/product.types';
import favoriteService from '../services/favorite.service';
import appState from '../state/state';
import colors from '../../styles/colors';
import EmptyListView from '../components/empty-list-view/empty-list-view';

type PropType = {navigation: NavigationProp<any>};
type StateType = {unliked: number[]; unliking: number[]};

export default class UserLikes extends React.Component<PropType, StateType> {
  constructor(props: PropType) {
    super(props);
    this.state = {unliked: [], unliking: []};
  }
  render() {
    const criteria = new Criteria<ProductType>();
    criteria.addFilter('user', appState.user.id!);
    return (
      <ListingComponent
        container={product =>
          this.state.unliked.includes(product.id) ? (
            <></>
          ) : (
            <this.Card product={product} key={product.id} />
          )
        }
        fetchMethod={c =>
          favoriteService.getFavoritesOfUser(appState.user.id!, c)
        }
        criteria={criteria}
        noResultsView={() => (
          <EmptyListView
            icon="heart-broken"
            title="No Likes"
            caption="You don't have any liked products"
            btnProps={{
              text: 'Find One',
              icon: 'heart-plus',
              action: () => this.props.navigation.navigate('Search'),
            }}
          />
        )}
      />
    );
  }

  Card = ({product}: {product: ProductType}) => (
    <Card
      style={s.card}
      onPress={() =>
        this.props.navigation.navigate(productDetailRoute.name, {
          id: product.id,
        })
      }>
      <View style={s.row}>
        <View style={[s.flex, s.m8]}>
          <View>
            <Text numberOfLines={2} style={s.textBold}>
              {product.title}
            </Text>
          </View>
        </View>
        <View style={s.mlAuto}>
          <IconButton
            style={s.alignCenter}
            icon="heart-off"
            color={colors.red}
            disabled={this.state.unliking.includes(product.id)}
            onPress={() => {
              const unliking = [...this.state.unliking, product.id];
              this.setState({...this.state, unliking});
              favoriteService
                .unsetFavorite(appState.user.id!, product.id)
                .then(() => {
                  const unliked = [...this.state.unliked, product.id];
                  this.setState({...this.state, unliked});
                });
            }}
          />
        </View>
      </View>
    </Card>
  );
}
