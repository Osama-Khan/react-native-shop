import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {Text, IconButton, Card, Divider} from 'react-native-paper';
import appStyle from '../../../styles/styles';

export default function ProductListingCard({product, ...props}: any) {
  const outOfStock = product.stock === 0;
  return (
    <Card style={s.card} {...props}>
      <View style={s.row}>
        <Image
          source={{uri: product.images[0].image}}
          style={s.imgBg}
          blurRadius={12}
        />
        <Image
          source={{uri: product.images[0].image}}
          style={s.img}
          resizeMode="contain"
        />
        <View style={s.content}>
          <Text numberOfLines={2} style={s.textBold}>
            {product.title}
          </Text>
          <Text numberOfLines={1}>{product.description}</Text>
          <Text
            style={[
              s.mlAuto,
              s.p4,
              s.mt8,
              s.textBadge,
              outOfStock ? s.textOutOfStock : s.textPrice,
            ]}>
            {outOfStock ? 'Out Of Stock' : 'Rs. ' + product.price}
          </Text>
        </View>
      </View>
      <View style={[s.row, s.flexWrap]}>
        <Divider style={s.col12} />
        <IconButton
          style={[s.col12, s.mAuto]}
          icon="cart-plus"
          onPress={() => {}}
        />
      </View>
    </Card>
  );
}

const s = StyleSheet.create({
  ...appStyle,
  imgBg: {width: '25%', height: '100%', position: 'absolute', left: 0},
  img: {width: '25%', minHeight: 64},
  content: {padding: 8, width: '75%'},
});
