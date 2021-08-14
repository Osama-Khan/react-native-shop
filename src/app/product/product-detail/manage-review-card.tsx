import React from 'react';
import {
  Button,
  Caption,
  Card,
  Divider,
  IconButton,
  TextInput,
  Title,
} from 'react-native-paper';
import s from '../../../styles/styles';
import Icon from '../../components/icon';
import RatingInput from '../../components/product/product-rating-input';
import {RatingType} from '../../models/types/product.types';

type ReviewDataType = {
  stars: number;
  title: string;
  description: string;
};
type PropType = {
  /** Indicates that the review is being updated */
  updating: boolean;

  /** The review used to prepopulate text fields when updating */
  review: RatingType;

  /** Disables the action button and sets it to loading state */
  loading: boolean;

  /** Called with the data when action button is tapped */
  onPost: (data: ReviewDataType) => void;

  /** Called when the back button is pressed to remove updating state */
  onCancelUpdate: () => void;
};

type StateType = {reviewData: ReviewDataType};

/** Allows adding or updating a review */
export default class ManageReviewCard extends React.Component<
  PropType,
  StateType
> {
  constructor(props: PropType) {
    super(props);
    this.state = {
      reviewData: {
        stars: 0,
        title: '',
        description: '',
      },
    };
  }

  render() {
    const {reviewData} = this.state;
    const {updating, review, onPost, loading} = this.props;
    return (
      <Card style={[s.m8, s.p8]}>
        <Title>
          <Icon name="comment" size={16} /> {updating ? 'Update' : 'Add'} Review
        </Title>
        {updating ? (
          <IconButton
            style={s.topRight}
            icon="arrow-left"
            size={16}
            onPress={() => this.props.onCancelUpdate()}
          />
        ) : (
          <></>
        )}
        <Divider style={s.my8} />
        <RatingInput
          onRatingChange={stars =>
            this.setState({
              reviewData: {...this.state.reviewData, stars},
            })
          }
        />
        <TextInput
          mode="outlined"
          label="Title"
          dense
          defaultValue={review ? review.title : ''}
          onChangeText={title =>
            this.setState({
              reviewData: {...reviewData, title},
            })
          }
        />
        <TextInput
          mode="outlined"
          label="Description"
          multiline
          defaultValue={review ? review.description : ''}
          onChangeText={description =>
            this.setState({
              reviewData: {...reviewData, description},
            })
          }
        />
        <Divider style={s.my8} />
        <Caption>
          Please note that the review is public and can be seen by anyone.
        </Caption>
        <Button
          mode="contained"
          style={s.my8}
          onPress={() => onPost(reviewData)}
          loading={loading}
          disabled={loading || !reviewData.stars}>
          {updating ? 'Update' : 'Post'}
        </Button>
      </Card>
    );
  }
}
