import React from 'react';
import {View, Image} from 'react-native';
import {Caption, Card, IconButton, Surface, Text} from 'react-native-paper';
import colors from '../../../styles/colors';
import s from '../../../styles/styles';
import ProductRating from '../../components/product/product-rating';
import {RatingType} from '../../models/types/product.types';

type PropType = {
  /** The review object to use data of */
  review: RatingType;
  /** An optional method that, if given a value, adds an edit button
   * to the top right of the card which calls the given method. */
  onEdit?: () => void;
};

type StateType = {
  expanded: boolean;
};

/** Card used to display user reviews on products */
export default class extends React.Component<PropType, StateType> {
  constructor(props: PropType) {
    super(props);
    this.state = {expanded: false};
  }

  render() {
    const review = this.props.review;
    return (
      <Card
        style={[s.m8, s.overflowHidden]}
        onPress={() =>
          this.setState({...this.state, expanded: !this.state.expanded})
        }>
        {this.props.onEdit ? (
          <IconButton
            icon="pencil"
            style={s.topRight}
            size={16}
            onPress={this.props.onEdit}
          />
        ) : (
          <></>
        )}
        <View style={s.row}>
          <Surface style={[s.col3, s.center, s.p8]}>
            <Image
              source={{
                uri: review.user!.profileImage,
                height: 48,
                width: 48,
              }}
              style={s.rounded}
            />
            <Caption>@{review.user!.username}</Caption>
          </Surface>
          <View style={[s.col9, s.p8]}>
            <ProductRating rating={review.stars} />
            {review.title ? (
              <Text style={s.textBold}>{review.title}</Text>
            ) : (
              <Caption style={s.textBold}>No Title</Caption>
            )}
            {review.description ? (
              <Text
                numberOfLines={this.state.expanded ? undefined : 3}
                style={this.state.expanded ? {} : {color: colors.gray}}>
                {review.description}
              </Text>
            ) : (
              <Caption>No Description</Caption>
            )}
          </View>
        </View>
      </Card>
    );
  }
}
