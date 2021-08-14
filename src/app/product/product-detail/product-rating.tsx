import React from 'react';
import {Text, Card, Title, Caption} from 'react-native-paper';
import s from '../../../styles/styles';
import {ProductType, RatingType} from '../../models/types/product.types';
import Icon from '../../components/icon';
import Rating from '../../components/product/product-rating';
import {View} from 'react-native';
import c from '../../../styles/colors';

type PropType = {product: ProductType};

export default ({product}: PropType) => (
  <>
    <Title>
      <Icon name="star" size={22} /> Rating
    </Title>
    <ReviewSummary ratings={product.ratings!} />
  </>
);

const ReviewSummary = ({ratings}: {ratings: RatingType[]}) => {
  let stars = [0, 0, 0, 0, 0];

  let sum = 0;

  ratings.forEach(r => {
    sum += r.stars;
    stars[r.stars - 1]++;
  });

  const average = sum / ratings.length;

  const colors = [c.green, c.teal, c.yellow, c.orange, c.red];

  // Moves 5 star at top and 1 star at bottom
  stars = stars.reverse();
  return (
    <View style={s.p4}>
      <Rating rating={average} iconSize={32} style={s.center} />
      <Text style={[s.textCenter, s.textBold, average ? {} : s.textMuted]}>
        {average ? `${average?.toFixed(1)} Stars` : 'No Reviews'}
      </Text>
      <Caption>Summary</Caption>
      {stars.map((count, i) => (
        <RatingSummaryStar
          key={'summary-star-' + i}
          number={5 - i}
          stars={count}
          totalRatings={ratings.length}
          color={colors[i]}
        />
      ))}
    </View>
  );
};

const RatingSummaryStar = ({number, stars, totalRatings, color}: any) => {
  const noRating = totalRatings === 0;
  const width = noRating || stars === 0 ? 100 : (stars / totalRatings) * 100;
  color = noRating || stars === 0 ? undefined : color;

  return (
    <View style={[s.row, s.my4]}>
      <View style={[s.col2, s.pr8]}>
        <Text>
          {number}&nbsp;
          <Icon name="star" />
        </Text>
      </View>
      <View style={[s.myAuto, s.col10]}>
        <Card>
          <View
            style={[
              {
                backgroundColor: color,
                width: `${width}%`,
              },
              s.rounded,
            ]}>
            <Text style={s.textCenter}>{stars}</Text>
          </View>
        </Card>
      </View>
    </View>
  );
};
