import React from 'react';
import Svg, {Color, Rect} from 'react-native-svg';

type P = {color: Color; height?: number};

export default function Triangle({color, height}: P) {
  height = height || 24;
  return (
    <Svg width="100%" height="100%">
      <Rect width="100%" height="100%" rotation={height / 8} fill={color} />
    </Svg>
  );
}
