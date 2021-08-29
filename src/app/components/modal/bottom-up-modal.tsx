import React from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import colors from '../../../styles/colors';
import s from '../../../styles/styles';
import LinearGradient from '../gradient/linear-gradient';
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

const bgGradient = <LinearGradient start="bottom" end="top" />;

const modalStyle = {maxHeight: '80%'};
