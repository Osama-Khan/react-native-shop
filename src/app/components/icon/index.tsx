import React from 'react';
import {IconProps} from 'react-native-vector-icons/Icon';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../../../styles/colors';
import themeService from '../../services/theme.service';

export default function Icon(props: IconProps) {
  const theme = themeService.currentThemeName;
  const color = theme === 'dark' ? colors.white : colors.dark;
  return <MaterialIcon {...props} color={props.color || color} />;
}
