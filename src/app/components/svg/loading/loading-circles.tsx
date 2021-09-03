import React from 'react';
import {StyleProp, View, ViewStyle} from 'react-native';
import {createAnimatableComponent} from 'react-native-animatable';
import Svg, {Circle, Color} from 'react-native-svg';
import colors from '../../../../styles/colors';

type P = {
  color?: Color;
  circleSize?: number;
  containerStyle?: StyleProp<ViewStyle>;
};

export default function LoadingCircles({color, circleSize, containerStyle}: P) {
  const AnimatedView = createAnimatableComponent(View);
  circleSize = circleSize || 16;
  color = color || colors.primary;
  const zoomInOut = {
    0: {
      opacity: 0,
      scale: 0,
    },
    0.5: {
      opacity: 1,
      scale: 1,
    },
    1: {
      opacity: 0,
      scale: 0,
    },
  };
  const circStyle = {width: circleSize, height: circleSize};

  const AnimCircle = ({delay}: {delay?: number}) => (
    <AnimatedView
      style={circStyle}
      animation={zoomInOut}
      iterationCount="infinite"
      delay={delay}>
      <Svg>
        <Circle fill={color} r={'50%'} cx="50%" cy="50%" />
      </Svg>
    </AnimatedView>
  );
  return (
    <View style={containerStyle || {alignItems: 'center'}}>
      <View style={{flexDirection: 'row'}}>
        <AnimCircle />
        <AnimCircle delay={100} />
        <AnimCircle delay={200} />
      </View>
    </View>
  );
}
