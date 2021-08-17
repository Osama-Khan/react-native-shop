import {NavigationProp} from '@react-navigation/native';
import React from 'react';
import {IconButton, List} from 'react-native-paper';
import s from '../../styles/styles';
import {productDetailRoute} from '../app.routes';
import ListingComponent from '../components/listing/listing';
import Criteria from '../models/criteria';
import {ProductType} from '../models/types/product.types';
import favoriteService from '../services/favorite.service';
import appState from '../state/state';
import colors from '../../styles/colors';
import IconMessageView from '../components/icon-message-view/icon-message-view';
import {FavoriteType} from '../models/types/favorite.type';

type PropType = {navigation: NavigationProp<any>};
type StateType = {unliked: number[]; unliking: number[]};

export default class UserLikes extends React.Component<PropType, StateType> {
  constructor(props: PropType) {
    super(props);
    this.state = {unliked: [], unliking: []};
  }
  render() {
    const criteria = new Criteria<FavoriteType>();
    criteria.addFilter('user', appState.user.id!);
    return (
      <ListingComponent
        container={product =>
          /** Favorite and Product type collision occurs because
           * ListingComponent expects request criteria type and
           * response object type to be same. However, the endpoint
           * used in getFavoritesOfUser method gets the criteria of
           * FavoriteType but returns ProductType data. */
          this.state.unliked.includes(product.id) ? (
            <></>
          ) : (
            <this.Item product={product as ProductType} key={product.id} />
          )
        }
        fetchMethod={c =>
          favoriteService.getFavoritesOfUser(appState.user.id!, c)
        }
        criteria={criteria}
        noResultsView={() => (
          <IconMessageView
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

  Item = ({product}: {product: ProductType}) => (
    <List.Item
      style={s.card}
      onPress={() =>
        this.props.navigation.navigate(productDetailRoute.name, {
          id: product.id,
        })
      }
      title={product.title}
      description={product.description}
      right={() => (
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
      )}
    />
  );
}
