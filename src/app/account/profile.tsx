import {NavigationProp} from '@react-navigation/native';
import React from 'react';
import {ScrollView, Image, View} from 'react-native';
import {Title, Divider, List, Caption} from 'react-native-paper';
import {connect} from 'react-redux';
import colors from '../../styles/colors';
import s from '../../styles/styles';
import Triangle from '../components/svg/triangle';
import themeService from '../services/theme.service';
import uiService from '../services/ui.service';
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
        <View style={{backgroundColor: colors.primary}}>
          <View style={[s.p8, {paddingTop: 48}, s.row, s.center]}>
            <View style={[s.ml8, s.col9]}>
              <Title style={[{fontWeight: 'bold', color: colors.white}]}>
                {user.firstName} {user.lastName}
              </Title>
              <Caption style={{color: colors.light}}>
                {'@' + user.username}
              </Caption>
            </View>
            <Image
              source={{uri: user.profileImage, height: 48, width: 48}}
              resizeMode="cover"
              style={[s.roundedFull, s.mlAuto, s.mr16]}
            />
          </View>
          <View style={{height: 24, width: '100%'}}>
            <Triangle color={themeService.currentTheme.colors.background} />
          </View>
        </View>
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
            title="Support"
            onPress={() => {
              const messages = [
                'You got this!',
                'I believe in you!',
                'You can do this!',
              ];
              uiService.toast(messages[Math.floor(Math.random() * 3)]);
            }}
            left={() => <List.Icon icon="lifebuoy" />}
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
