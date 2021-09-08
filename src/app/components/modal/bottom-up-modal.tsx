import React from 'react';
import {
  ScrollView,
  PanResponder,
  PanResponderInstance,
  Dimensions,
} from 'react-native';
import colors from '../../../styles/colors';
import Reanimated, {EasingNode} from 'react-native-reanimated';
import s from '../../../styles/styles';
import themeService from '../../services/theme.service';
import Icon from '../icon';
import ModalBase from './modal-base';
import {ModalPropType} from './modal-prop-type';

export default class BottomUpModal extends React.Component<ModalPropType, any> {
  height = new Reanimated.Value(this.collapsedHeight);
  heightValue = this.collapsedHeight;
  modalHeight = this.collapsedHeight;
  _panResponder: PanResponderInstance = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderGrant: () => {
      const modalExpanded = this.modalHeight > this.heightCenter;
      this.modalHeight = modalExpanded
        ? this.expandedHeight
        : this.collapsedHeight;
    },
    onPanResponderMove: (_, g) => {
      const height = this.modalHeight - g.dy;
      this.heightValue = height;
      this.height.setValue(height);
    },
    onPanResponderRelease: (_, g) => {
      // Should dismiss if height too small
      if (this.heightValue < this.windowHeight * 0.2) {
        this.props.onDismiss();
        this.height.setValue(this.collapsedHeight);
        return;
      }

      if (g.dy < 0) {
        this.modalHeight = this.expandedHeight;
      } else {
        this.modalHeight = this.collapsedHeight;
      }
      Reanimated.timing(this.height, {
        toValue: this.modalHeight,
        duration: 200,
        easing: EasingNode.out(EasingNode.ease),
      }).start();
    },
  });

  render() {
    const {children, ...other} = this.props;
    return (
      <>
        <ModalBase
          visible={this.props.visible}
          animationType="fade"
          children={[]}
        />
        <ModalBase
          {...other}
          position="bottom"
          animationType="slide"
          backgroundColor="#0000"
          modalStyle={s.roundedTop}>
          <Reanimated.View
            style={[s.roundedTop, modalStyle, {height: this.height}]}
            {...this._panResponder.panHandlers}>
            <Icon
              name="drag-horizontal-variant"
              color={colors.gray}
              size={24}
              style={s.alignCenter}
            />
            <ScrollView>{children}</ScrollView>
          </Reanimated.View>
        </ModalBase>
      </>
    );
  }

  get windowHeight() {
    return Dimensions.get('window').height;
  }

  get expandedHeight() {
    return this.windowHeight * 0.9;
  }

  get collapsedHeight() {
    return this.windowHeight * 0.4;
  }

  get heightCenter() {
    return this.windowHeight * 0.6;
  }
}

const modalStyle = {
  backgroundColor: themeService.currentTheme.colors.surface,
};
