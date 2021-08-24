import React from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import Svg, {Defs, LinearGradient, Rect, Stop} from 'react-native-svg';
import colors from '../../../styles/colors';
import s from '../../../styles/styles';
import Icon from '../icon';
import ModalBase from './modal-base';
import {ModalPropType} from './modal-prop-type';

export default function BottomUpModal(props: ModalPropType) {
  const {children, ...other} = props;
  return (
    <ModalBase
      {...other}
      position="bottom"
      animationType="slide"
      modalStyle={[s.roundedTop, modalStyle]}
      backgroundColor="#0000"
      backgroundChildren={bgGradient}>
      <Icon name="minus" color={colors.gray} size={16} style={s.alignCenter} />
      <ScrollView>{children}</ScrollView>
    </ModalBase>
  );
}

const bgGradient = (
  <Svg width="100%" height="100%">
    <Defs>
      <LinearGradient id="grad" x1="0" y1="1" x2="0" y2="0">
        <Stop offset="0" stopColor="#000" stopOpacity="1" />
        <Stop offset="1" stopColor="#0000" stopOpacity="0" />
      </LinearGradient>
    </Defs>
    <Rect width="100%" height="100%" x="0" y="0" fill="url(#grad)" />
  </Svg>
);

const modalStyle = {maxHeight: '80%'};
