import React from 'react';
import {IconProps} from 'react-native-vector-icons/Icon';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../../../styles/colors';
import themeService from '../../services/theme.service';

export default (props: IconProps) => {
  const theme = themeService.getCurrentTheme();
  const color = theme === 'dark' ? colors.white : colors.dark;
  return <Icon {...props} color={props.color || color} />;
};
