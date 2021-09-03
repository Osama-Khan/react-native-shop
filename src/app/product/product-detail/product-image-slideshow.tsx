import React from 'react';
import {Image, View} from 'react-native';
import Swiper from 'react-native-swiper';
import colors from '../../../styles/colors';
import s from '../../../styles/styles';
import {ProductType} from '../../models/types/product.types';
import ProductLikeAction from './product-like-action';

type P = {product: ProductType; userId: number};

const imageHeight = 240;

export default class ProductImageSlideshow extends React.Component<P> {
  render() {
    const p = this.props.product;
    const images = p.images!.map(i => (
      <Image
        key={i.id}
        source={{
          uri: i.image,
          height: imageHeight,
        }}
        resizeMode="contain"
      />
    ));

    return (
      <View style={{backgroundColor: colors.white}}>
        <Swiper height={imageHeight} activeDotColor={colors.primary}>
          {images}
        </Swiper>
        {this.props.userId ? (
          <ProductLikeAction
            style={s.topRight}
            productId={p.id}
            userId={this.props.userId}
          />
        ) : (
          <></>
        )}
      </View>
    );
  }
}
