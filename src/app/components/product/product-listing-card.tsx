import React from 'react';
import {Image, View} from 'react-native';
import {Text, IconButton, Card, Divider} from 'react-native-paper';
import colors from '../../../styles/colors';

export default function ProductListingCard({product}: any) {
  const outOfStock = product.stock === 0;
  return (
    <Card style={styles.card} onPress={() => {}}>
      <View style={styles.row}>
        <Image
          source={{uri: product.images[0].image}}
          style={styles.imgBg}
          blurRadius={12}
        />
        <Image
          source={{uri: product.images[0].image}}
          style={styles.img}
          resizeMode="contain"
        />
        <View style={styles.content}>
          <Text style={styles.textHead}>{product.title}</Text>
          <Text>{product.description.substr(0, 35) + '...'}</Text>
          <Text style={[styles.textPrice, outOfStock ? styles.textRed : {}]}>
            {outOfStock ? 'Out Of Stock' : 'Rs. ' + product.price}
          </Text>
        </View>
      </View>
      <View style={styles.row}>
        <Divider style={{width: '100%'}} />
        <IconButton
          style={{width: '100%', margin: 'auto'}}
          icon="cart-plus"
          onPress={() => {}}
        />
      </View>
    </Card>
  );
}

const styles = {
  card: {
    margin: 4,
    overflow: 'hidden',
  },
  row: {flexDirection: 'row', flexWrap: 'wrap'},
  imgBg: {width: '25%', height: '100%', position: 'absolute', left: 0},
  img: {width: '25%', minHeight: 64},
  content: {padding: 8, width: '75%'},
  textHead: {fontSize: 16, fontWeight: 'bold'},
  textPrice: {
    color: colors.green,
    backgroundColor: colors.greenSubtle,
    borderRadius: 8,
    padding: 4,
    fontWeight: 'bold',
    marginLeft: 'auto',
    marginTop: 8,
  },
  textRed: {
    color: colors.red,
    backgroundColor: colors.redSubtle,
  },
};
