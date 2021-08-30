import React from 'react';
import Svg, {ClipPath, Color, Defs, Ellipse, G, Rect} from 'react-native-svg';

type P = {color: Color};
export default function Wave({color}: P) {
  return (
    <Svg width="100%" height="100%">
      <Defs>
        <ClipPath id="clip">
          <G>
            <Ellipse cx="75%" cy="50%" rx="25%" ry="50%" />
            <Rect width="100%" height="100%" />
          </G>
        </ClipPath>
      </Defs>
      <Ellipse cx="25%" cy="50%" rx="25%" ry="50%" fill={color} />
      <Rect
        width="100%"
        height="100%"
        y="50%"
        fill={color}
        clipPath="url(#clip)"
      />
    </Svg>
  );
}
