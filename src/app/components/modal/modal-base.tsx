import React from 'react';
import {Modal as M, StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import {Surface} from 'react-native-paper';
import colors from '../../../styles/colors';
import s from '../../../styles/styles';
import {ModalPropType} from './modal-prop-type';

type PropType = ModalPropType & {
  /** Style of the modal holder */
  holderStyle?: StyleProp<ViewStyle>;

  /** Color of the background overlay */
  backgroundColor?: string;

  /** Children of the background view */
  backgroundChildren?: React.ReactNode;

  /** Style of the modal */
  modalStyle?: StyleProp<ViewStyle>;

  /** Position of the modal. Defaults to center. */
  position?: 'bottom' | 'center' | 'top';

  /** If the background should be transparent. Defaults to true. */
  transparent?: boolean;

  /** Type of animation */
  animationType?: 'fade' | 'none' | 'slide';
};

/** Base Modal component to provide a more tailored API over react native Modal */
export default class ModalBase extends React.Component<PropType> {
  render() {
    const {children, onDismiss, ...props} = this.props;
    return (
      <M {...props} transparent={props.transparent !== false}>
        <View style={props.holderStyle || this.holderStyle}>
          <View
            style={[
              styles.touchable,
              {
                backgroundColor:
                  props.backgroundColor || colors.blackTransparent,
              },
            ]}
            onTouchEnd={onDismiss}
            children={props.backgroundChildren}
          />
          <Surface
            style={props.modalStyle || [s.m16, s.overflowHidden, s.rounded]}>
            {children}
          </Surface>
        </View>
      </M>
    );
  }

  /** Converts position prop to flex compatible vertical alignments */
  get holderStyle() {
    const {position} = this.props;
    let jc: 'flex-start' | 'flex-end' | 'center';
    switch (position) {
      case 'top':
        jc = 'flex-start';
        break;
      case 'bottom':
        jc = 'flex-end';
        break;
      default:
        jc = 'center';
        break;
    }
    return {
      flex: 1,
      justifyContent: jc,
    };
  }
}

const styles = StyleSheet.create({
  touchable: {
    position: 'absolute',
    height: '100%',
    width: '100%',
  },
});
