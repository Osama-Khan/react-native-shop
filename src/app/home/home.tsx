import React from 'react';
import {View, ScrollView, Image} from 'react-native';
import {
  Caption,
  Divider,
  Surface,
  Title,
  TextInput,
  Button,
  IconButton,
  Searchbar,
} from 'react-native-paper';
import {connect} from 'react-redux';
import s from '../../styles/styles';
import NewArrivals from './recent-products-list';
import {AppStateType, UserState} from '../store/state';
import {NavigationProp} from '@react-navigation/native';
import CategoriesList from './categories-list';
import Wave from '../components/svg/wave';
import colors from '../../styles/colors';
import themeService from '../services/theme.service';

type P = {navigation: NavigationProp<any>; readonly user: UserState};
type S = {searchTerm: string};

class Home extends React.Component<P, S> {
  state = {searchTerm: ''};

  render() {
    return (
      <ScrollView>
        <View style={s.p8}>
          <Title style={s.textBold}>
            Hello
            {this.props.user.firstName ? ', ' + this.props.user.firstName : ''}!
          </Title>
          <Caption>What would you like to Shop today?</Caption>
        </View>
        <Searchbar
          style={[s.m4, s.col8, s.roundedFull]}
          placeholder="Search..."
          value={this.state.searchTerm}
          onChangeText={searchTerm => this.setState({searchTerm})}
        />
        <View style={s.mt8} />
        <Image
          style={[s.topRight, s.mr24, s.mt4, {width: 84, height: 204}]}
          source={require('../../assets/images/character/hi.png')}
        />
        <View style={[s.col12, {height: 24}]}>
          <Wave
            color={
              themeService.currentThemeName === 'dark'
                ? themeService.currentTheme.colors.border
                : themeService.currentTheme.colors.surface
            }
          />
        </View>
        <Surface>
          <Title style={s.m8}>Browse Categories</Title>
          <CategoriesList navigation={this.props.navigation} />
          <Divider style={s.mt16} />
          <Title style={s.m8}>New Arrivals</Title>
          <NewArrivals navigation={this.props.navigation} />
        </Surface>
      </ScrollView>
    );
  }
}

const mapStateToProps = (state: AppStateType) => {
  return {user: state.user};
};

export default connect(mapStateToProps)(Home);
