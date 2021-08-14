import React from 'react';
import {View} from 'react-native';
import {Divider, Title, Text, Caption} from 'react-native-paper';
import s from '../../../styles/styles';
import {HighlightType, ProductType} from '../../models/types/product.types';

type PropType = {product: ProductType};

export default ({product}: PropType) => (
  <>
    <View style={s.row}>
      <Title style={[s.textBold, s.flex]}>{product.title}</Title>
      <Text
        style={[
          s.mlAuto,
          s.p4,
          s.textBadge,
          product.stock === 0 ? s.textOutOfStock : s.textPrice,
        ]}>
        Rs. {product.price}
      </Text>
    </View>
    <Divider style={s.my4} />
    <Caption style={s.mt4}>Description</Caption>
    <Text>{product.description}</Text>
    <Caption style={s.mt4}>Highlights</Caption>
    {product.highlights!.map((h: HighlightType) => (
      <Text key={h.id}>{`    ◈    ${h.highlight}`}</Text>
    ))}
  </>
);
