import {NavigationProp} from '@react-navigation/native';
import React from 'react';
import {ScrollView, Image, View} from 'react-native';
import {Title, Text, Divider, List, Card} from 'react-native-paper';
import colors from '../../styles/colors';
import appStyles from '../../styles/styles';
import {
  accountEditRoute,
  addressesRoute,
  likesRoute,
  listingsRoute,
  orderRoute,
  reviewsRoute,
  settingsRoute,
} from './account.routes';
import appState from '../state/state';

type PropType = {onLogout: () => void; navigation: NavigationProp<any>};
export default ({onLogout, navigation}: PropType) => {
  const goto = (name: string, params?: any) =>
    navigation.navigate(name, params);
  return (
    <ScrollView>
      <View style={[styles.m4, styles.row]}>
        <Image
          source={{uri: appState.user.profileImage}}
          resizeMode="contain"
          style={styles.profileImage}
        />
        <View style={styles.headerContent}>
          <Title>
            {appState.user.firstName} {appState.user.lastName}
          </Title>
          <Text style={styles.textMuted}>{'@' + appState.user.username}</Text>
          <View style={styles.row}>
            <Card style={[styles.mt4, styles.p4]}>
              <Text>{appState.user.roles && appState.user.roles[0].name}</Text>
            </Card>
          </View>
        </View>
      </View>
      <Divider />
      <List.Section title="Overview">
        <List.Item
          title="Listings"
          description="Manage your products"
          onPress={() => goto(listingsRoute.name)}
          left={() => <List.Icon icon="archive" />}
        />
        <List.Item
          title="Orders"
          description="View your orders"
          onPress={() => goto(orderRoute.name)}
          left={() => <List.Icon icon="receipt" />}
        />
        <List.Item
          title="Likes"
          description="See your likes"
          onPress={() => goto(likesRoute.name)}
          left={() => <List.Icon icon="heart-multiple" />}
        />
      </List.Section>
      <Divider />
      <List.Section title="Management">
        <List.Item
          title="Account"
          description="Update your account information"
          onPress={() => goto(accountEditRoute.name)}
          left={() => <List.Icon icon="card-account-details" />}
        />
        <List.Item
          title="Addresses"
          description="Manage your addresses"
          onPress={() => goto(addressesRoute.name)}
          left={() => <List.Icon icon="home-group" />}
        />
        <List.Item
          title="Reviews"
          description="See your reviews on different products"
          onPress={() => goto(reviewsRoute.name)}
          left={() => <List.Icon icon="star" />}
        />
        <Divider />
      </List.Section>
      <List.Section title="Settings">
        <List.Item
          title="Settings"
          onPress={() => goto(settingsRoute.name)}
          left={() => <List.Icon icon="cog" />}
        />
        <List.Item
          title="Logout"
          titleStyle={{color: colors.red}}
          onPress={onLogout}
          left={() => <List.Icon icon="power" color={colors.red} />}
        />
      </List.Section>
    </ScrollView>
  );
};

const styles = {
  ...appStyles,
  profileImage: {
    width: '25%',
    minHeight: 92,
    height: 'auto',
  },
  headerContent: {
    width: '70%',
    marginLeft: 'auto',
  },
};
