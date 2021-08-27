import React from 'react';
import {NavigationProp} from '@react-navigation/native';
import {ProductType} from '../../models/types/product.types';
import {Caption, Card, Surface, Text} from 'react-native-paper';
import {Image, View} from 'react-native';
import {productDetailRoute} from '../../app.routes';
import s from '../../../styles/styles';
import ProductRating from './product-rating';

type P = {product: ProductType; navigation: NavigationProp<any>};

export default function ProductCard({product, navigation}: P) {
  return (
    <Card
      mode="outlined"
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
      <Card style={[s.bottom, s.col12]}>
        <Caption numberOfLines={1} style={[s.m8, s.mt8]}>
          {product.title}
        </Caption>
        <View style={s.row}>
          <ProductRating rating={product.rating} style={[s.m8]} />
          <Text style={[s.textBadge, s.textPrice, s.mlAuto, s.mb4, s.mr4]}>
            Rs. {product.price}
          </Text>
        </View>
      </Card>
    </Card>
  );
}
