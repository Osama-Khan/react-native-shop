import React from 'react';
import {View, ScrollView, Image} from 'react-native';
import {
  Card,
  Divider,
  List,
  Text,
  Surface,
  FAB,
  Title,
  IconButton,
} from 'react-native-paper';
import s from '../../styles/styles';
import CartProduct from '../models/product/cart-product';
import CartActions from '../components/cart/manage-cart-product-actions';
import {checkoutRoute, productDetailRoute, searchRoute} from '../app.routes';
import IconMessageView from '../components/icon-message-view/icon-message-view';
import {connect} from 'react-redux';
import {AppStateType} from '../store/state';
import colors from '../../styles/colors';
import cartActions from '../store/actions/cart.actions';
import ConfirmModal from '../components/modal/confirm.modal';

class Cart extends React.Component<any, any> {
  state = {modalVisible: false};
  render() {
    const state = this.props.state as AppStateType;
    const products = state.cart.products;
    const isLoggedIn = state.user.token;
    return (
      <View style={s.flex}>
        <Surface style={[s.p8, s.row, s.flexWrap, s.center]}>
          <Title style={[s.col6, s.textCenter]}>Products</Title>
          <Title style={[s.col6, s.textCenter]}>Total Price</Title>
          <Title style={[s.col6, s.textBold, s.textCenter]}>
            {products.length}
          </Title>
          <Text style={[s.col6, s.textBadge, s.textPrice, s.textCenter]}>
            Rs. {state.cart.getTotalPrice()}
          </Text>
        </Surface>
        <Divider />
        {products.length > 0 ? (
          <>
            <ScrollView>
              <List.Section title="Products">
                <IconButton
                  style={[s.topRight, s.m8]}
                  icon="trash-can"
                  color={colors.red}
                  onPress={this.showModal}
                />
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
              action: () => this.props.navigation.navigate(searchRoute.name),
              icon: 'plus',
              text: 'Add Something',
            }}
          />
        )}
        <ConfirmModal
          title="Clear cart?"
          description="Are you sure you want to clear the cart?"
          positiveButton={{
            onPress: () => {
              this.props.dispatch(cartActions.clearCart());
              this.hideModal();
            },
          }}
          negativeButton={{onPress: this.hideModal}}
          visible={this.state.modalVisible}
          onDismiss={this.hideModal}
        />
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

  hideModal = () => this.setState({modalVisible: false});
  showModal = () => this.setState({modalVisible: true});
}

function mapStateToProps(state: AppStateType) {
  return {state};
}

export default connect(mapStateToProps)(Cart);
