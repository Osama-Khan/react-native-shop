import React from 'react';
import {ViewProps} from 'react-native';
import {View} from 'react-native';
import colors from '../../../styles/colors';
import s from '../../../styles/styles';
import Icon from '../icon';

type PropType = ViewProps & {rating?: number; iconSize?: number};
export default function ProductRating({rating, iconSize, ...props}: PropType) {
  const starsEl = [];
  const color = rating ? colors.yellow : colors.gray;
  const iProps = {color, size: iconSize};

  if (rating && rating > 0) {
    let iters,
      count = 0;
    for (iters = rating; iters >= 1; iters--) {
      starsEl.push(<Icon key={count} name="star" {...iProps} />);
      count++;
    }
    if (iters !== 0) {
      starsEl.push(<Icon key={count} name="star-half-full" {...iProps} />);
      count++;
    }
    while (count < 5) {
      starsEl.push(<Icon key={count} name="star-outline" {...iProps} />);
      count++;
    }
  } else {
    for (let i = 0; i < 5; i++) {
      starsEl.push(<Icon key={i} name="star-outline" {...iProps} />);
    }
  }

  return (
    <View {...props} style={[s.row, [props.style || {}]]}>
      {starsEl}
    </View>
  );
}
