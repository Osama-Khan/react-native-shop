import React from 'react';
import {Card, Menu, Text} from 'react-native-paper';
import s from '../../../styles/styles';

type OptionType = {
  name: string;
  value: string;
  key?: string;
  icon?: string;
  disabled?: boolean;
  selected?: boolean;
};
type PropType = {options: OptionType[]; onSelect: (option: OptionType) => void};
type StateType = {visible: boolean; selected: OptionType};

export default class DropDown extends React.Component<PropType, StateType> {
  constructor(props: PropType) {
    super(props);
    let selected = props.options.findIndex(o => o.selected);
    selected = selected === -1 ? 0 : selected;
    this.state = {visible: false, selected: props.options[selected]};
  }

  render() {
    return (
      <Menu
        anchor={
          <Card
            style={cardStyle}
            onPress={() => this.setState({...this.state, visible: true})}>
            <Text>{this.state.selected.name}</Text>
          </Card>
        }
        onDismiss={() => this.setState({...this.state, visible: false})}
        visible={this.state.visible}>
        {this.props.options.map(o => (
          <Menu.Item
            title={o.name}
            onPress={() => {
              this.setState({visible: false, selected: o});
              this.props.onSelect(o);
            }}
            disabled={o.disabled}
            icon={o.icon}
            key={o.key}
          />
        ))}
      </Menu>
    );
  }
}

const cardStyle = [s.p8, s.m4];
