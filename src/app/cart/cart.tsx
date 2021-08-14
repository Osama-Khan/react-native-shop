import {NavigationProp} from '@react-navigation/native';
import React from 'react';
import {View, Image} from 'react-native';
import {
  Card,
  Divider,
  List,
  Text,
  Surface,
  FAB,
  Title,
} from 'react-native-paper';
import s from '../../styles/styles';
import CartProduct from '../models/product/cart-product';
import appState from '../state/state';
import CartActions from '../components/cart/manage-cart-product-actions';
import {ScrollView} from 'react-native-gesture-handler';
import {checkoutRoute, productDetailRoute} from '../app.routes';
import IconMessageView from '../components/icon-message-view/icon-message-view';

type PropType = {navigation: NavigationProp<any>};
export default class extends React.Component<PropType, any> {
  constructor(props: PropType) {
    super(props);
    this.state = {};

    // Forces update on focus
    this.props.navigation.addListener('focus', () => this.setState({}));
  }

  render() {
    const products = appState.cart.products;
    const isLoggedIn = appState.user.token;
    return (
      <View style={s.flex}>
        <Surface style={[s.p8, s.row, s.flexWrap, s.center]}>
          <Title style={[s.col6, s.textCenter]}>Products</Title>
          <Title style={[s.col6, s.textCenter]}>Total Price</Title>
          <Title style={[s.col6, s.textBold, s.textCenter]}>
            {products.length}
          </Title>
          <Text style={[s.col6, s.textBadge, s.textPrice, s.textCenter]}>
            Rs. {appState.cart.getTotalPrice()}
          </Text>
        </Surface>
        <Divider />
        {products.length > 0 ? (
          <>
            <ScrollView>
              <List.Section title="Products">
                {products.map(p => (
                  <this.CartProduct key={p.id} product={p} />
                ))}
              </List.Section>
              <View style={s.my24} />
            </ScrollView>
            <FAB
              style={[s.bottomRight, s.mb8, s.mr8]}
              label={isLoggedIn ? 'Checkout' : 'Login'}
              icon={isLoggedIn ? 'cart-arrow-right' : 'account-arrow-right'}
              onPress={() => {
                if (isLoggedIn) {
                  this.props.navigation.navigate(checkoutRoute.name);
                  return;
                }
                this.props.navigation.navigate('Account');
              }}
            />
          </>
        ) : (
          <IconMessageView
            icon="cart-outline"
            title="Cart Empty"
            caption="Your cart is empty"
            btnProps={{
              action: () => this.props.navigation.navigate('Search'),
              icon: 'plus',
              text: 'Add Something',
            }}
          />
        )}
      </View>
    );
  }

  CartProduct = ({product}: {product: CartProduct}) => (
    <Card
      style={[s.m8, s.overflowHidden]}
      onPress={() => {
        this.props.navigation.navigate(productDetailRoute.name, {
          id: product.id,
        });
      }}>
      <View style={[s.row, s.center]}>
        <Image
          source={{
            uri: product.img,
            height: 64,
            width: 64,
          }}
          resizeMode="contain"
        />
        <Text style={[s.flex, s.m12]}>
          {product.quantity}x {product.title}
        </Text>
        <Text style={[s.textBadge, s.textPrice, s.mr4]}>
          Rs. {product.quantity * product.price}
        </Text>
      </View>
      <Divider />
      <CartActions
        product={product}
        onAdd={() => this.setState({})}
        onRemove={() => this.setState({})}
      />
    </Card>
  );
}
