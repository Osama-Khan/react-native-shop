import React from 'react';
import {NavigationProp} from '@react-navigation/native';
import {ProductType} from '../../models/types/product.types';
import {Card, Surface, Text} from 'react-native-paper';
import {Image} from 'react-native';
import {productDetailRoute} from '../../app.routes';
import s from '../../../styles/styles';
import ProductRating from './product-rating';

type P = {product: ProductType; navigation: NavigationProp<any>};

export default function ProductCard({product, navigation}: P) {
  return (
    <Card
      style={[s.overflowHidden, s.mx4]}
      onPress={() => {
        navigation.navigate(productDetailRoute.name, {
          id: product.id,
        });
      }}>
      <Image
        source={{
          uri: product.images![0].image,
          height: 200,
          width: 240,
        }}
        resizeMode="cover"
      />
      <ProductRating rating={product.rating} style={[s.topRight, s.m4]} />
      <Surface style={[s.bottom, s.col12]}>
        <Text numberOfLines={1} style={[s.my16, s.mx8]}>
          {product.title}
        </Text>
        <Text style={[s.textBadge, s.textPrice, s.mlAuto, s.mb4, s.mr4]}>
          Rs. {product.price}
        </Text>
      </Surface>
    </Card>
  );
}
