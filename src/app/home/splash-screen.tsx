import React from 'react';
import {Modal, View} from 'react-native';
import {Caption, Title} from 'react-native-paper';
import colors from '../../styles/colors';
import Logo from '../components/svg/logo';
import {createAnimatableComponent} from 'react-native-animatable';
import themeService from '../services/theme.service';

type P = {duration?: number};
type S = {visible: boolean};
export default class SplashScreen extends React.Component<P, S> {
  state = {visible: true};

  componentDidMount() {
    setTimeout(() => {
      this.setState({visible: false});
    }, this.props.duration || 3000);
  }

  render() {
    const AnimView = createAnimatableComponent(View);
    return (
      <Modal
        animationType="fade"
        visible={this.state.visible}
        statusBarTranslucent={true}>
        <View
          style={{
            flex: 1,
            backgroundColor: themeService.currentTheme.colors.background,
          }}>
          <AnimView
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            animation="zoomIn">
            <Logo size={92} />
            <Title style={{color: colors.primary}}>ShopNative</Title>
            <Caption>One stop shop, literally.</Caption>
          </AnimView>
        </View>
      </Modal>
    );
  }
}
