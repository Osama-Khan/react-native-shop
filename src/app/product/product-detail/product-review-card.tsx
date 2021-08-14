import React from 'react';
import {View, Image} from 'react-native';
import {Caption, Card, IconButton, Text} from 'react-native-paper';
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

/** Card used to display user reviews on products */
export default class extends React.Component<PropType> {
  render() {
    const review = this.props.review;
    return (
      <Card style={[s.m8]}>
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
        <View style={[s.row, s.m8]}>
          <View style={[s.col3, s.center]}>
            <Image
              source={{
                uri: review.user!.profileImage,
                height: 48,
                width: 48,
              }}
              style={s.rounded}
            />
            <Text>@{review.user!.username}</Text>
          </View>
          <View style={[s.col9, s.p4]}>
            <ProductRating rating={review.stars} />
            {review.title ? (
              <Text style={s.textBold}>{review.title}</Text>
            ) : (
              <Caption style={s.textBold}>No Title</Caption>
            )}
            {review.description ? (
              <Text>{review.description}</Text>
            ) : (
              <Caption>No Description</Caption>
            )}
          </View>
        </View>
      </Card>
    );
  }
}
