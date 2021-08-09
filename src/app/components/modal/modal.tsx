import React from 'react';
import {Modal as M, Surface} from 'react-native-paper';
import s from '../../../styles/styles';

type Props = {
  dismissable?: boolean;
  onDismiss?: () => void;
  visible: boolean;
  children: React.ReactNode;
};

export default function Modal(props: Props) {
  const {children, ...otherProps} = props;
  return (
    <M {...otherProps} contentContainerStyle={style}>
      <Surface>{children}</Surface>
    </M>
  );
}

const style = [s.m16, s.overflowHidden, s.rounded];
