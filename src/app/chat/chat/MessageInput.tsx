import React, {useState} from 'react';
import {TouchableOpacity, TextInput, View} from 'react-native';
import {Surface} from 'react-native-paper';
import s from '../../../styles/styles';
import themeService from '../../services/theme.service';
import Icon from '../../components/icon';
import colors from '../../../styles/colors';

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
      <TouchableOpacity
        style={[
          s.roundedFull,
          s.m4,
          s.center,
          {
            backgroundColor: themeService.currentTheme.colors.primary,
            opacity: message ? 1 : 0.5,
            width: 48,
          },
        ]}
        onPress={() => {
          onSend(message);
          setMessage('');
        }}
        disabled={!message}>
        <Icon name="send" size={24} color={colors.light} />
      </TouchableOpacity>
    </View>
  );
}
