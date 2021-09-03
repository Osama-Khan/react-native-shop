import {NavigationProp} from '@react-navigation/core';
import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {Divider, Title, Text, Caption} from 'react-native-paper';
import s from '../../../styles/styles';
import {categoryProductRoute} from '../../app.routes';
import BreadCrumbs from '../../components/breadcrumbs';
import {HighlightType, ProductType} from '../../models/types/product.types';
import categoryService from '../../services/category.service';

type PropType = {product: ProductType; navigation: NavigationProp<any>};

export default function ProductInfo({product, navigation}: PropType) {
  const [parentCategories, setParentCategories] = useState([]);
  useEffect(() => {
    categoryService.fetchParentsOf(product.category!.id).then(res => {
      const p = res.data.reverse() || undefined;
      setParentCategories(p);
    });
  }, []);

  const parents = parentCategories;
  const category = product.category!;

  const cats = parents ? [...parents, category] : [category];

  const catBread = (
    <BreadCrumbs
      crumbs={cats.map(c => {
        return {
          text: c.name,
          onPress: () =>
            navigation.navigate(categoryProductRoute.name, {category: c}),
        };
      })}
    />
  );

  return (
    <>
      <View style={s.row}>
        {catBread}
        <Text
          style={[
            s.m4,
            s.mlAuto,
            s.p4,
            s.alignCenter,
            s.textBadge,
            product.stock === 0 ? s.textOutOfStock : s.textPrice,
          ]}>
          Rs. {product.price}
        </Text>
      </View>
      <Title style={[s.textBold, s.flex]}>{product.title}</Title>
      <Divider style={s.my4} />
      <Caption style={s.mt4}>Description</Caption>
      <Text>{product.description}</Text>
      <Caption style={s.mt4}>Highlights</Caption>
      {product.highlights!.map((h: HighlightType) => (
        <Text key={h.id}>{`    ◈    ${h.highlight}`}</Text>
      ))}
    </>
  );
}
