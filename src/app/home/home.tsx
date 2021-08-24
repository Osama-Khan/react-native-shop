import React from 'react';
import {View, ScrollView} from 'react-native';
import {Caption, Divider, Title} from 'react-native-paper';
import {connect} from 'react-redux';
import s from '../../styles/styles';
import NewArrivals from './recent-products-list';
import {AppStateType, UserState} from '../store/state';
import {NavigationProp} from '@react-navigation/native';
import CategoriesList from './categories-list';

type P = {navigation: NavigationProp<any>; readonly user: UserState};
class Home extends React.Component<P> {
  render() {
    return (
      <ScrollView>
        <View style={s.p8}>
          <Title style={[s.textBold, s.alignCenter]}>
            Hello
            {this.props.user.firstName ? ', ' + this.props.user.firstName : ''}!
          </Title>
          <Caption style={s.alignCenter}>
            What would you like to Shop today?
          </Caption>
        </View>
        <Divider />
        <Title style={s.m8}>New Arrivals</Title>
        <NewArrivals navigation={this.props.navigation} />
        <Divider style={s.mt8} />
        <Title style={s.m8}>Browse Categories</Title>
        <CategoriesList navigation={this.props.navigation} />
      </ScrollView>
    );
  }
}

const mapStateToProps = (state: AppStateType) => {
  return {user: state.user};
};

export default connect(mapStateToProps)(Home);
