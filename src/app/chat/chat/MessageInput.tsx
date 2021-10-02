import React, {useState} from 'react';
import {TextInput, View} from 'react-native';
import {IconButton, Surface} from 'react-native-paper';
import s from '../../../styles/styles';
import themeService from '../../services/theme.service';

type P = {onSend: (message: string) => void};
export function MessageInput({onSend}: P) {
  const [message, setMessage] = useState('');
  return (
    <View style={s.row}>
      <Surface
        style={[s.roundedFull, s.px16, s.m4, {flexGrow: 1, borderWidth: 1}]}>
        <TextInput
          placeholder="Type a message..."
          value={message}
          onChangeText={text => setMessage(text)}
        />
      </Surface>
      <View
        style={[
          s.roundedFull,
          s.m4,
          s.center,
          {backgroundColor: themeService.currentTheme.colors.primary},
        ]}>
        <IconButton
          icon="send"
          onPress={() => {
            onSend(message);
            setMessage('');
          }}
        />
      </View>
    </View>
  );
}
