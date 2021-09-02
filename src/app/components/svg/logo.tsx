import React from 'react';
import Svg, {Circle, Rect, Text} from 'react-native-svg';
import appVariables from '../../../styles/abstract/app.variables';
import colors from '../../../styles/colors';

export default function Logo({size}: {size: number}) {
  return (
    <Svg width={size} height={size}>
      <Circle
        cx="50%"
        cy="35%"
        r="28%"
        stroke={colors.primaryDark}
        strokeWidth="6"
      />
      <Rect
        x="10%"
        y="40%"
        width="80%"
        height="60%"
        rx={appVariables.borderRadius}
        ry={appVariables.borderRadius}
        fill={colors.primary}
      />
      <Circle
        cx="50%"
        cy="40%"
        r="30%"
        stroke={colors.primary}
        strokeWidth="6"
      />
      <Text
        x="35%"
        y="85%"
        fill={colors.white}
        stroke={colors.primaryDark}
        fontSize={size / 2}
        fontWeight="bold">
        S
      </Text>
    </Svg>
  );
}
