import {NavigationProp} from '@react-navigation/native';
import React from 'react';
import {ScrollView, Image, View} from 'react-native';
import {Title, Text, Divider, List, Card} from 'react-native-paper';
import {connect} from 'react-redux';
import colors from '../../styles/colors';
import s from '../../styles/styles';
import {AppStateType} from '../store/state';
import UserState from '../store/state/user-state';
import {
  accountEditRoute,
  addressesRoute,
  likesRoute,
  listingsRoute,
  orderRoute,
  reviewsRoute,
  settingsRoute,
} from './account.routes';

type PropType = {
  onLogout: () => void;
  navigation: NavigationProp<any>;
  readonly user: UserState;
};

class Profile extends React.Component<PropType> {
  render() {
    const {navigation, user, onLogout} = this.props;
    const goto = (name: string, params?: any) =>
      navigation.navigate(name, params);
    return (
      <ScrollView>
        <View style={[s.m8, s.row, s.center]}>
          <Image
            source={{uri: user.profileImage, height: 92}}
            resizeMode="contain"
            style={[s.col3, s.rounded]}
          />
          <View style={[s.ml8, s.col9]}>
            <Title>
              {user.firstName} {user.lastName}
            </Title>
            <Text style={s.textMuted}>{'@' + user.username}</Text>
            <View style={s.row}>
              <Card style={[s.mt4, s.p4]}>
                <Text>
                  {(user.roles &&
                    user.roles.length > 0 &&
                    user.roles[0].name) ||
                    'Member'}
                </Text>
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
        <List.Section title="Application">
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
  }
}

const mapStateToProps = (state: AppStateType) => {
  return {user: state.user};
};

export default connect(mapStateToProps)(Profile);
