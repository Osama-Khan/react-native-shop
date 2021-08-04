import React from 'react';
import {Divider, Title, Text} from 'react-native-paper';
import s from '../../../styles/styles';
import {HighlightType, ProductType} from '../../models/types/product.types';
import Icon from '../../components/icon';

type PropType = {product: ProductType};

export default ({product}: PropType) => (
  <>
    <Title style={s.textBold}>{product.title}</Title>
    <Text
      style={[
        s.mlAuto,
        s.p4,
        s.mt8,
        s.textBadge,
        product.stock === 0 ? s.textOutOfStock : s.textPrice,
      ]}>
      Rs. {product.price}
    </Text>
    <Divider style={s.my4} />
    <Text>{product.description}</Text>
    <Text style={[s.textBold, s.mt4]}>
      <Icon name="star-circle" /> Highlights
    </Text>
    {product.highlights!.map((h: HighlightType) => (
      <Text key={h.id}> • {h.highlight}</Text>
    ))}
  </>
);
