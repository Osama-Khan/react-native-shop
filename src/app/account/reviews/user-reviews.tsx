import React from 'react';
import ListingComponent from '../../components/listing/listing';
import Criteria from '../../models/criteria';
import {AppStateType} from '../../store/state';
import IconMessageView from '../../components/icon-message-view/icon-message-view';
import {RatingType} from '../../models/types/product.types';
import productService from '../../services/product.service';
import {NavigationProp} from '@react-navigation/native';
import {List} from 'react-native-paper';
import ProductRating from '../../components/product/product-rating';
import s from '../../../styles/styles';
import {productDetailRoute} from '../../app.routes';
import {connect} from 'react-redux';

type P = {navigation: NavigationProp<any>; readonly userId?: number};
type S = {updateCount: number};

class UserReviews extends React.Component<P, S> {
  criteria: Criteria<RatingType>;

  constructor(props: P) {
    super(props);
    this.state = {updateCount: -1};
    this.criteria = new Criteria<RatingType>();
    this.criteria.addFilter('user', this.props.userId!);
    this.criteria.addRelation('product');
    this.criteria.setLimit(20);
  }

  componentDidMount() {
    this.props.navigation.addListener('focus', () => {
      this.setState({updateCount: this.state.updateCount + 1});
    });
  }

  componentWillUnmount() {
    this.props.navigation.removeListener('focus', () => {});
  }

  render() {
    return (
      <>
        <ListingComponent
          container={review => <this.Item review={review} key={review.id} />}
          fetchMethod={c => productService.getRatings(c)}
          criteria={this.criteria}
          noResultsView={() => (
            <IconMessageView
              icon="star-off"
              title="No Reviews"
              caption="You don't have any reviews on any products"
              btnProps={{
                text: 'Add a Review',
                icon: 'star',
                action: () => this.props.navigation.navigate('Search'),
              }}
            />
          )}
          updateCount={this.state.updateCount}
        />
      </>
    );
  }

  Item = ({review}: {review: RatingType}) => (
    <List.Item
      title={review.title || 'No Title'}
      description={review.product!.title}
      onPress={() =>
        this.props.navigation.navigate(productDetailRoute.name, {
          id: review.product!.id,
        })
      }
      right={() => (
        <ProductRating style={s.alignCenter} rating={review.stars} />
      )}
    />
  );
}

const mapStateToProps = (state: AppStateType) => {
  return {userId: state.user.id};
};

export default connect(mapStateToProps)(UserReviews);
