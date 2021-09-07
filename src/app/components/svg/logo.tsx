import React from 'react';
import Svg, {Circle, ClipPath, Defs, Rect, Text} from 'react-native-svg';
import appVariables from '../../../styles/abstract/app.variables';
import colors from '../../../styles/colors';

export default function Logo({size}: {size: number}) {
  return (
    <Svg width={size} height={size}>
      <Defs>
        <ClipPath id="clip">
          <Rect
            x="10%"
            y="45%"
            width="80%"
            height="50%"
            rx={appVariables.borderRadius}
            ry={appVariables.borderRadius}
          />
        </ClipPath>
      </Defs>
      <Circle
        cx="50%"
        cy="40%"
        r="30%"
        stroke={colors.primaryDark}
        strokeWidth="6"
      />
      <Rect
        x="10%"
        y="38%"
        width="80%"
        height="58%"
        rx={appVariables.borderRadius}
        ry={appVariables.borderRadius}
        fill={colors.primaryDark}
      />
      <Rect
        x="10%"
        y="42%"
        width="80%"
        height="58%"
        rx={appVariables.borderRadius}
        ry={appVariables.borderRadius}
        fill={colors.primary}
      />
      <Circle
        cx="50%"
        cy="40%"
        r="30%"
        stroke={colors.primaryDark}
        strokeWidth="6"
        clipPath="url(#clip)"
      />
    </Svg>
  );
}
