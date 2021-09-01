import React from 'react';
import {View, ScrollView, Image} from 'react-native';
import {Caption, Divider, IconButton, Surface, Title} from 'react-native-paper';
import {connect} from 'react-redux';
import s from '../../styles/styles';
import NewArrivals from './recent-products-list';
import {AppStateType, UserState} from '../store/state';
import {NavigationProp} from '@react-navigation/native';
import CategoriesList from './categories-list';
import themeService from '../services/theme.service';
import Triangle from '../components/svg/triangle';
import AnimatedSearchbar from './animated-searchbar';
import {createAnimatableComponent} from 'react-native-animatable';

type P = {navigation: NavigationProp<any>; readonly user: UserState};

class Home extends React.Component<P> {
  hiGuyImage: any;

  render() {
    const AnimatedImage = createAnimatableComponent(Image);
    return (
      <ScrollView>
        <View style={s.p8}>
          <Title style={s.textBold}>
            Hello
            {this.props.user.firstName ? ', ' + this.props.user.firstName : ''}!
          </Title>
          <Caption>What would you like to Shop today?</Caption>
        </View>
        <AnimatedImage
          style={[s.topRight, s.mr24, s.mt4, {width: 84, height: 204}]}
          source={require('../../assets/images/character/hi.png')}
          resizeMode="contain"
          ref={ref => (this.hiGuyImage = ref)}
        />
        <AnimatedSearchbar
          onSearch={withSearch =>
            this.props.navigation.navigate('Search', {withSearch})
          }
          onFocus={() => {
            this.hiGuyImage.lightSpeedOut(500);
          }}
          onBlur={() => {
            this.hiGuyImage.lightSpeedIn(500);
          }}
        />
        <View style={s.mt8} />
        <View style={[s.col12, {height: 24}]}>
          <Triangle
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
          <View style={[s.mt16, s.col12, {height: 24}]}>
            <Triangle color={themeService.currentTheme.colors.background} />
          </View>
        </Surface>
        <Image
          source={require('../../assets/images/box.png')}
          style={[s.bottomLeft, s.ml4, {width: 114, height: 120}]}
        />
        <Title style={s.textCenter}> Get in Touch</Title>
        <View style={[s.row, s.alignCenter]}>
          <IconButton icon="facebook" />
          <IconButton icon="twitter" />
          <IconButton icon="instagram" />
          <IconButton icon="linkedin" />
          <IconButton icon="email" />
        </View>
        <Divider />
        <View style={s.center}>
          <Title> Useful links</Title>
          <Caption style={{textDecorationLine: 'underline'}}>Support</Caption>
          <Caption style={{textDecorationLine: 'underline'}}>
            Privacy Policy
          </Caption>
          <Caption style={{textDecorationLine: 'underline'}}>Website</Caption>
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = (state: AppStateType) => {
  return {user: state.user};
};

export default connect(mapStateToProps)(Home);
