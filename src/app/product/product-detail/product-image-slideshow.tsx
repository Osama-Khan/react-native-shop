import React from 'react';
import {Image, View} from 'react-native';
import {IconButton, Surface} from 'react-native-paper';
import colors from '../../../styles/colors';
import s from '../../../styles/styles';
import Icon from '../../components/icon';
import {ProductType} from '../../models/types/product.types';
import ProductLikeAction from './product-like-action';

type S = {activeIndex: number};
type P = {product: ProductType; userId: number};

export default class ProductImageSlideshow extends React.Component<P, S> {
  state = {activeIndex: 0};
  render() {
    const p = this.props.product;
    return (
      <View style={{backgroundColor: colors.white}}>
        <Image
          source={{
            uri: p.images![this.state.activeIndex].image,
            height: 240,
          }}
          resizeMode="contain"
        />
        <IconButton
          style={[s.left, {marginTop: 100}]}
          onPress={() => {
            let activeIndex = this.state.activeIndex;
            if (--activeIndex < 0) {
              activeIndex = p.images!.length - 1;
            }
            this.setState({...this.state, activeIndex});
          }}
          icon="arrow-left-circle"
          color={colors.dark}
        />
        <IconButton
          style={[s.right, {marginTop: 100}]}
          onPress={() => {
            let activeIndex = this.state.activeIndex;
            if (++activeIndex >= p.images!.length) {
              activeIndex = 0;
            }
            this.setState({...this.state, activeIndex});
          }}
          icon="arrow-right-circle"
          color={colors.dark}
        />
        <View style={[s.bottom, s.row, s.center, s.col12]}>
          {p.images?.map((img, i) => (
            <Icon
              key={img.id}
              name={this.state.activeIndex === i ? 'circle' : 'circle-outline'}
              onPress={() => this.setState({...this.state, activeIndex: i})}
              color={colors.dark}
            />
          ))}
        </View>

        {this.props.userId ? (
          <ProductLikeAction
            style={s.bottomRight}
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
