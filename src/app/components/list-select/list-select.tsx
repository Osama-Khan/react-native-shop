import React, {Component} from 'react';
import {Card, List, Text} from 'react-native-paper';
import s from '../../../styles/styles';
import Icon from '../icon';
import BottomUpModal from '../modal/bottom-up-modal';

type OptionType = {
  name: string;
  value: string;
  key?: string;
  icon?: string;
  disabled?: boolean;
  selected?: boolean;
};

type P<T extends OptionType> = {
  options: T[];
  onSelect: (option: T) => void;
};
type S<T extends OptionType> = {visible: boolean; selected: T};

/** Functions like a dropdown with a bottom up modal. Renders a card that
 * triggers a bottom up modal with the list of given options when pressed. */
export default class ListSelect<T extends OptionType> extends Component<
  P<T>,
  S<T>
> {
  constructor(props: P<T>) {
    super(props);
    let selected = props.options.findIndex(o => o.selected);
    selected = selected === -1 ? 0 : selected;
    this.state = {visible: false, selected: props.options[selected]};
  }

  render() {
    return (
      <>
        <Card
          style={cardStyle}
          onPress={() => this.setState({...this.state, visible: true})}>
          <Text>{this.state.selected.name}</Text>
        </Card>
        <BottomUpModal
          onDismiss={() => this.setState({...this.state, visible: false})}
          visible={this.state.visible}>
          {this.props.options.map((o, i) => (
            <List.Item
              title={o.name}
              onPress={() => {
                this.setState({visible: false, selected: o});
                this.props.onSelect(o);
              }}
              disabled={o.disabled}
              left={() => (o.icon ? <List.Icon icon={o.icon} /> : <></>)}
              right={() =>
                o === this.state.selected ? <List.Icon icon="check" /> : <></>
              }
              key={o.key || i}
            />
          ))}
        </BottomUpModal>
      </>
    );
  }

  ListIcon = (name: string) => (
    <Icon name={name} size={18} style={s.alignCenter} />
  );
}

const cardStyle = [s.p8, s.m4];
