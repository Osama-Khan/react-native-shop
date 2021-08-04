import React from 'react';
import Icon from '../../components/icon/';
import {Image, View} from 'react-native';
import {Button, Card, Headline, ProgressBar, Text} from 'react-native-paper';
import s from '../../../styles/styles';
import {ProductType, RatingType} from '../../models/types/product.types';
import productService from '../../services/product.service';
import Criteria from '../../models/criteria';
import colors from '../../../styles/colors';
import Rating from '../../components/product/product-rating';

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
        <Headline>
          <Icon name="account-star" size={22} /> User Reviews
        </Headline>
        {this.state.reviews ? (
          <>
            {this.state.reviews.map(r => (
              <Card key={r.id} style={[s.p4, s.m4]}>
                <View style={s.row}>
                  <View style={[s.col3, s.center]}>
                    <Image
                      source={{
                        uri: r.user!.profileImage,
                        height: 48,
                        width: 48,
                      }}
                      style={s.rounded}
                    />
                    <Text>@{r.user!.username}</Text>
                  </View>
                  <View style={[s.col9, s.p4]}>
                    <Rating rating={r.stars} />
                    <Text style={[s.textBold]}>{r.title || 'No Title'}</Text>
                    <Text>{r.description || 'No Description'}</Text>
                  </View>
                </View>
              </Card>
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
              <Button color={colors.gray}>No more reviews</Button>
            )}
          </>
        ) : (
          <this.Progress />
        )}
      </View>
    );
  }

  Progress = () => <ProgressBar style={s.m20} indeterminate={true} />;

  fetchReviews = () => {
    this.setState({...this.state, loading: true});
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
