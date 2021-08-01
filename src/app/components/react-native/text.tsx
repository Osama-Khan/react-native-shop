import React from 'react';
import {Text as T, useColorScheme} from 'react-native';
import colors from '../../../styles/colors';

export default function Text(props: any) {
  const isDarkMode = useColorScheme() === 'dark';

  const color = isDarkMode || props.dark ? colors.light : colors.dark;

  return (
    <T {...props} style={[{color}, props.style]}>
      {props.children}
    </T>
  );
}
