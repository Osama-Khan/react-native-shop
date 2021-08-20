import React from 'react';
import {View} from 'react-native';
import {List} from 'react-native-paper';
import s from '../../../styles/styles';
import ListSelect from '../../components/list-select';

export default class Settings extends React.Component {
  render() {
    return (
      <List.Section title="Appearance">
        <List.Item
          title="Theme"
          description="Theme of the application"
          right={() => (
            <View style={s.alignCenter}>
              <ListSelect onSelect={() => {}} options={themeOptions} />
            </View>
          )}
        />
      </List.Section>
    );
  }
}

const themeOptions = [
  {
    name: 'Device Theme',
    value: '',
    icon: 'theme-light-dark',
  },
  {
    name: 'Light Theme',
    value: 'light',
    icon: 'white-balance-sunny',
  },
  {
    name: 'Dark Theme',
    value: 'dark',
    icon: 'weather-night',
  },
];
