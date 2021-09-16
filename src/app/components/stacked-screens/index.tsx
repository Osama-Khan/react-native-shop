import React from 'react';
import {
  PanResponder,
  Animated,
  Dimensions,
  Easing,
  StyleSheet,
  View,
} from 'react-native';

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
      const shouldGoLeft = isCenter && acceptRGesture && isLeft;
      const shouldGoRight = isCenter && acceptLGesture && !isLeft;
      const shouldGoCenter =
        (isLeft && acceptLGesture) || (!isLeft && acceptRGesture);
      if (shouldGoLeft) {
        this.snapTo(this.windowWidth * 0.9);
      } else if (shouldGoRight) {
        this.snapTo((this.xV = this.windowWidth * -0.9));
      } else if (shouldGoCenter) {
        this.snapToCenter();
      } else {
        this.snapToLast();
      }
    },
  });

  render() {
    const {MainScreen, LeftScreen, RightScreen} = this.props;
    const isLeft = this.state.currentScreen === leftScreen;
    return (
      <View style={styles.container} {...this.panResponder.panHandlers}>
        <View
          style={{
            marginRight: this.windowWidth * 0.1,
            display: isLeft ? 'flex' : 'none',
            flex: 1,
          }}>
          <LeftScreen />
        </View>
        <View
          style={{
            marginLeft: this.windowWidth * 0.1,
            display: !isLeft ? 'flex' : 'none',
            flex: 1,
          }}>
          <RightScreen />
        </View>
        <Animated.View
          style={[styles.mainScreen, {transform: [{translateX: this.x}]}]}>
          <MainScreen />
        </Animated.View>
      </View>
    );
  }

  /** Slides main screen to the left side */
  snapToLeft = () => {
    this.setState({currentScreen: leftScreen});
    this.snapTo(this.windowWidth * 0.9);
  };
  /** Slides main screen to the right side */
  snapToRight = () => {
    this.setState({currentScreen: rightScreen});
    this.snapTo(this.windowWidth * -0.9);
  };
  /** Slides main screen to the center */
  snapToCenter = () => this.snapTo(0);
  /** Slides main screen to the last position */
  snapToLast = () => this.snapTo(this.lastPosition);

  /** Snaps the main screen smoothly to parameter x */
  snapTo = (x: number) => {
    Animated.timing(this.x, {
      toValue: x,
      duration: 200,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
    this.xV = x;
    this.lastPosition = x;
  };

  get windowWidth() {
    return Dimensions.get('window').width;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainScreen: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
});
