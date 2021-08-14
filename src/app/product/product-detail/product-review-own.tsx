import React from 'react';
import {Caption, Text} from 'react-native-paper';
import s from '../../../styles/styles';
import LoadingSpinner from '../../components/loading/loading-spinner';
import Criteria from '../../models/criteria';
import {OrderStateType} from '../../models/types/order.types';
import {RatingType} from '../../models/types/product.types';
import orderService from '../../services/order.service';
import productService from '../../services/product.service';
import uiService from '../../services/ui.service';
import appState from '../../state/state';
import ManageReviewCard from './manage-review-card';
import ReviewCard from './product-review-card';

type PropType = {productId: number};

type StateType = {
  loading: boolean;
  updating: boolean;
  orderState?: OrderStateType;
  review?: RatingType;
  posting: boolean;
};

/** Shows the user's own review with update options or an
 * option to add review. Also shows a message in case user
 * is not allowed to leave a review. */
export default class OwnReview extends React.Component<PropType, StateType> {
  constructor(props: PropType) {
    super(props);
    this.state = {
      loading: true,
      updating: false,
      posting: false,
    };
  }

  componentDidMount() {
    this.fetch();
  }

  render() {
    const {review, orderState, updating, loading} = this.state;
    return loading ? (
      <LoadingSpinner />
    ) : updating ? (
      <this.ManageReviewCard />
    ) : review ? (
      <ReviewCard
        review={review}
        onEdit={() => this.setState({...this.state, updating: true})}
      />
    ) : orderState ? (
      orderState.state === 'Delivered' ? (
        <this.ManageReviewCard />
      ) : (
        <Text style={[s.m8, s.textCenter, s.textMuted]}>
          {this.stateMessage(orderState.state)}
        </Text>
      )
    ) : (
      <Caption style={s.alignCenter}>
        You must place an order before you can leave a review!
      </Caption>
    );
  }

  ManageReviewCard = () => (
    <ManageReviewCard
      loading={this.state.posting}
      onPost={data => this.postReview(data)}
      updating={this.state.updating}
      onCancelUpdate={() => this.setState({...this.state, updating: false})}
      review={this.state.review!}
    />
  );

  /** Generates message that tells user the current order state */
  stateMessage = (state: string) => {
    const inProgEnd = 'You can leave a review once it is delivered.';
    let m = 'Your order ';
    m +=
      state === 'Processing'
        ? `is being processed. ${inProgEnd}`
        : state === 'Shipped'
        ? `is on the way! ${inProgEnd}`
        : 'has been CANCELED. Please place an order again to leave a review.';
    return m;
  };

  /** Attempts to fetch user review. If no review is found, fetches orderState. */
  fetch = () => {
    const criteria = new Criteria<RatingType>();
    criteria.addFilter('user', appState.user.id!);
    criteria.addFilter('product', this.props.productId);
    criteria.addRelation('user');
    productService.getRatings(criteria).then(res => {
      const review = res.data.data.length > 0 ? res.data.data[0] : undefined;
      if (review) {
        this.setState({...this.state, review, loading: false});
        return;
      }
      orderService
        .getUserProduct(appState.user.id!, this.props.productId)
        .then(oRes => {
          this.setState({
            ...this.state,
            orderState: oRes.data.orderState,
            loading: false,
          });
        });
    });
  };

  /** Posts or updates review based on `updating` property of state */
  postReview = (reviewData: any) => {
    this.setState({...this.state, posting: true});
    const rating = reviewData;
    rating.product = this.props.productId;
    rating.user = appState.user!.id;
    const method = this.state.updating
      ? () => productService.editRating(this.state.review!.id, rating)
      : () => productService.addRating(rating);
    method()
      .then(() => {
        this.setState({...this.state, posting: false, updating: false});
        this.fetch();
      })
      .catch(() => uiService.toast('Could not post review!'));
  };
}
