import React from 'react';
import s from '../../../styles/styles';
import c from '../../../styles/colors';
import {View, ViewProps} from 'react-native';
import {IconButton} from 'react-native-paper';

type PropType = ViewProps & {
  /** Method called whenever the value for rating changes */
  onRatingChange: (rating: number) => void;
};
type StateType = {rating: number};

/** Allows rating input from 1 to 5 */
export default class RatingInput extends React.Component<PropType, StateType> {
  constructor(props: PropType) {
    super(props);
    this.state = {rating: 0};
  }
  render() {
    const stars = [null, null, null, null, null];
    return (
      <View style={[s.row, s.center, ...[this.props.style]]}>
        {stars.map((_, i) => (
          <this.Star key={i} index={i} />
        ))}
      </View>
    );
  }

  Star = ({index}: {index: number}) => (
    <IconButton
      icon={this.state.rating > index ? 'star' : 'star-outline'}
      color={this.state.rating > 0 ? c.yellow : undefined}
      onPress={() => {
        this.setState({rating: index + 1});
        this.props.onRatingChange(index + 1);
      }}
    />
  );
}
