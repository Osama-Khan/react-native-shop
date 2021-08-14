import React from 'react';
import Icon from '../../components/icon/';
import {View} from 'react-native';
import {Button, Caption, ProgressBar, Title} from 'react-native-paper';
import s from '../../../styles/styles';
import {ProductType, RatingType} from '../../models/types/product.types';
import productService from '../../services/product.service';
import Criteria from '../../models/criteria';
import appState from '../../state/state';
import OwnReview from './product-review-own';
import ReviewCard from './product-review-card';

type PropType = {product: ProductType};
type StateType = {
  reviews?: RatingType[];
  meta?: any;
  criteria: Criteria<RatingType>;
  loading?: boolean;
};

export default class extends React.Component<PropType, StateType> {
  page = 1;
  constructor(props: PropType) {
    super(props);
    this.state = {criteria: new Criteria()};
    this.state.criteria.addFilter('product', this.props.product.id);
    this.state.criteria.addRelation('user');
    this.state.criteria.setLimit(5);
  }

  componentDidMount() {
    this.fetchReviews();
  }

  render() {
    return (
      <View>
        <Title>
          <Icon name="account-star" size={22} /> User Reviews
        </Title>
        {appState.user.token ? (
          <>
            <Caption>Your review</Caption>
            <OwnReview productId={this.props.product.id} />
            <Caption>Other reviews</Caption>
          </>
        ) : (
          <></>
        )}
        {this.state.reviews ? (
          this.state.reviews.length > 0 ? (
            <>
              {this.state.reviews.map(r => (
                <ReviewCard key={r.id} review={r} />
              ))}
              {this.state.loading ? (
                <this.Progress />
              ) : this.state.meta.currentPage < this.state.meta.totalPages ? (
                <Button
                  onPress={() => {
                    this.state.criteria.setPage(++this.page);
                    this.fetchReviews();
                  }}>
                  More
                </Button>
              ) : (
                <Caption style={s.alignCenter}>No more reviews</Caption>
              )}
            </>
          ) : (
            <Caption style={s.alignCenter}>
              No reviews found for this product
            </Caption>
          )
        ) : (
          <this.Progress />
        )}
      </View>
    );
  }

  Progress = () => <ProgressBar style={s.m20} indeterminate={true} />;

  fetchReviews = () => {
    this.setState({...this.state, loading: true});
    // Filter out own review
    this.state.criteria.addFilter('user', appState.user.id, '!=');
    productService.getRatings(this.state.criteria).then(res => {
      let reviews = this.state.reviews || [];
      reviews = reviews.concat(res.data.data);
      this.setState({
        ...this.state,
        reviews,
        meta: res.data.meta,
        loading: false,
      });
    });
  };
}
