import React from 'react';
import {View} from 'react-native';
import {Button, Caption, Title} from 'react-native-paper';
import colors from '../../../styles/colors';
import s from '../../../styles/styles';
import Icon from '../icon';

type ButtonProps = {text: string; icon: string; action: () => void};
type PropType = {
  icon: string;
  title: string;
  caption: string;
  btnProps: ButtonProps;
};

/** Component that shows a message with icon and action button */
export default class IconMessageView extends React.Component<PropType> {
  render() {
    return (
      <View style={[s.flex, s.center]}>
        <Icon name={this.props.icon} size={64} color={colors.gray} />
        <Title>{this.props.title}</Title>
        <Caption>{this.props.caption}</Caption>
        <Button
          style={s.my8}
          mode="contained"
          icon={this.props.btnProps.icon}
          onPress={this.props.btnProps.action}>
          {this.props.btnProps.text}
        </Button>
      </View>
    );
  }
}
