import React from 'react';
import {View} from 'react-native';
import {List} from 'react-native-paper';
import s from '../../../styles/styles';
import ListSelect from '../../components/list-select';
import storageService from '../../services/storage.service';
import themeService from '../../services/theme.service';
import uiService from '../../services/ui.service';

export default class Settings extends React.Component {
  initialTheme = themeService.currentThemeName;
  initiallyDeviceTheme = themeService.isDeviceTheme;

  render() {
    return (
      <List.Section title="Appearance">
        <List.Item
          title="Theme"
          description="Theme of the application"
          right={() => (
            <View style={s.alignCenter}>
              <ListSelect
                onSelect={v => {
                  if (v) {
                    storageService.setUserTheme(v.value as 'light' | 'dark');
                  } else {
                    storageService.clearUserTheme();
                  }
                  uiService.toast('Changes will be applied on restart!');
                }}
                options={this.themeOptions}
              />
            </View>
          )}
        />
      </List.Section>
    );
  }

  get themeOptions() {
    return [
      {
        name: 'Device Theme',
        value: '',
        icon: 'theme-light-dark',
        selected: this.initiallyDeviceTheme,
      },
      {
        name: 'Light Theme',
        value: 'light',
        icon: 'white-balance-sunny',
        selected: this.initialTheme === 'light',
      },
      {
        name: 'Dark Theme',
        value: 'dark',
        icon: 'weather-night',
        selected: this.initialTheme === 'dark',
      },
    ];
  }
}
