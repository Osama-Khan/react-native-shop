import React from 'react';
import {Divider, List, Text} from 'react-native-paper';
import appState from '../state/state';
import s from '../../styles/styles';

export default () => {
  const cart = appState.cart.getTotalPrice();
  const shipping = appState.cart.products.length * 299;
  const discount = 0;
  return (
    <List.Section title="Cost Summary">
      <SummaryItem
        title="Products"
        description="Cost of the products in your cart"
        price={cart}
        icon="archive"
      />
      <SummaryItem
        title="Shipping"
        description="Charges for shipping the order"
        price={shipping}
        icon="truck"
      />
      <SummaryItem
        title="Discounts"
        description="Discounts on the total price"
        price={discount}
        icon="sale"
      />
      <Divider />
      <SummaryItem title="Total Payable" price={cart + shipping - discount} />
    </List.Section>
  );
};

const SummaryItem = ({price, icon, ...props}: any) => (
  <List.Item
    {...props}
    left={() => (icon ? <List.Icon icon={icon} /> : <></>)}
    right={() => (
      <Text style={[s.alignCenter, s.textBadge, s.textPrice]}>Rs. {price}</Text>
    )}
  />
);
