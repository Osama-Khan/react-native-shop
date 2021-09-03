import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';
import Icon from '../icon';
import {TouchableOpacity} from 'react-native-gesture-handler';

type BreadCrumbType = {
  /** Text to show */
  text: string;

  /** Action to perform on press */
  onPress?: () => void;

  key?: string;
};

type P = {
  crumbs: BreadCrumbType[];

  /** Wrapper for the text. The text is placed inside this component
   * if specified. This prop MUST be a text based prop. */
  textWrapper?: React.ComponentType<any>;

  /** Custom element to place between crumbs. Right chevron by default. */
  icon?: React.ComponentType<any>;
};

export default class BreadCrumbs extends React.Component<P> {
  render() {
    return <View style={styles.row}>{this.props.crumbs.map(this.Crumb)}</View>;
  }

  Crumb = (c: BreadCrumbType, i: number) => {
    const isLast = i === this.props.crumbs.length - 1;
    const Wrapper =
      this.props.textWrapper || (p => <Text style={styles.text} {...p} />);
    const IconEl =
      this.props.icon || (() => <Icon name="chevron-right" size={18} />);

    return (
      <View style={[styles.row, styles.centerV]} key={c.key || i}>
        <TouchableOpacity onPress={c.onPress}>
          <Wrapper>{c.text}</Wrapper>
        </TouchableOpacity>
        {!isLast ? <IconEl /> : <></>}
      </View>
    );
  };
}

const styles = StyleSheet.create({
  text: {
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
  },
  centerV: {
    alignItems: 'center',
  },
});
