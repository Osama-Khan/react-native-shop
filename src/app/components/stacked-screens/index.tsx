import React from 'react';
import {
  PanResponder,
  Animated,
  Dimensions,
  Easing,
  StyleSheet,
} from 'react-native';
import {View} from 'react-native-animatable';

type P = {
  MainScreen: React.ElementType;
  LeftScreen: React.ElementType;
  RightScreen: React.ElementType;
};
type S = {
  currentScreen: 0 | 1;
};

const leftScreen = 0,
  rightScreen = 1;

export default class StackedScreens extends React.Component<P, S> {
  state: S = {currentScreen: leftScreen};
  x = new Animated.Value(0);
  xV = 0;
  lastPosition = 0;

  panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (_, g) => {
      const isLeft = this.state.currentScreen === leftScreen;
      const isCenter = this.lastPosition === 0;
      this.xV = this.lastPosition + g.dx;
      if (isCenter) {
        if (this.xV > 0 && !isLeft) {
          this.setState({currentScreen: leftScreen});
        }
        if (this.xV < 0 && isLeft) {
          this.setState({currentScreen: rightScreen});
        }
      }
      this.x.setValue(this.xV);
    },
    onPanResponderEnd: (_, g) => {
      const thresh = this.windowWidth * 0.2;
      const velThresh = 2;
      const isLeft = this.state.currentScreen === leftScreen;
      const isCenter = this.lastPosition === 0;
      const acceptRGesture = g.dx > thresh || g.vx > velThresh;
      const acceptLGesture = g.dx < -thresh || g.vx < -velThresh;
      const shouldGoLeft = isCenter && acceptRGesture;
      const shouldGoRight = isCenter && acceptLGesture;
      const shouldGoCenter =
        (isLeft && acceptLGesture) || (!isLeft && acceptRGesture);
      if (shouldGoLeft) {
        this.xV = this.windowWidth * 0.9;
      } else if (shouldGoRight) {
        this.xV = this.windowWidth * -0.9;
      } else if (shouldGoCenter) {
        this.xV = 0;
      } else {
        this.xV = this.lastPosition;
      }
      Animated.timing(this.x, {
        toValue: this.xV,
        duration: 200,
        easing: Easing.ease,
        useNativeDriver: true,
      }).start();
      this.lastPosition = this.xV;
    },
  });

  render() {
    const {MainScreen, LeftScreen, RightScreen} = this.props;
    const isLeft = this.state.currentScreen === leftScreen;
    return (
      <View style={styles.container} {...this.panResponder.panHandlers}>
        <View style={styles.stack}>
          <View
            style={{
              marginRight: this.windowWidth * 0.1,
              display: isLeft ? 'flex' : 'none',
            }}>
            <LeftScreen />
          </View>
          <View
            style={{
              marginLeft: this.windowWidth * 0.1,
              display: !isLeft ? 'flex' : 'none',
            }}>
            <RightScreen />
          </View>
        </View>
        <Animated.View
          style={[styles.stack, {transform: [{translateX: this.x}]}]}>
          <MainScreen />
        </Animated.View>
      </View>
    );
  }

  get windowWidth() {
    return Dimensions.get('window').width;
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  stack: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
});
