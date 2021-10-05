import Modal from '../components/modal';
import {ModalPropType} from '@app/components/modal/modal-prop-type';
import React, {useState} from 'react';
import {Divider, IconButton, Card, Title, Text} from 'react-native-paper';
import {View, TextInput} from 'react-native';
import threadService from '../services/thread.service';
import {ThreadType} from '@app/models/types/thread.type';
import {UserType} from '@app/models/types/user.types';
import {SelectUserModal} from './select-user-modal';
import s from '../../styles/styles';
import themeService from '../services/theme.service';

type P = Omit<ModalPropType, 'children'> & {
  userId: number;
  onSend: (thread: ThreadType) => void;
};
export const NewThreadModal = ({userId, visible, onDismiss, onSend}: P) => {
  const [user, setUser] = useState<UserType>();
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [pickerVisible, setPickerVisible] = useState(false);
  return (
    <>
      <Modal visible={visible} onDismiss={onDismiss}>
        <Title style={[s.m8, s.textBold]}>New Chat</Title>
        <Divider />
        <View style={s.p8}>
          <View style={s.row}>
            <Text style={s.alignCenter}>Send To: </Text>
            <Card style={s.p8} onPress={() => setPickerVisible(true)}>
              <Text>{user ? user.username : 'Choose User'}</Text>
            </Card>
          </View>
          <TextInput
            style={[
              s.rounded,
              s.p8,
              {
                borderWidth: 2,
                borderColor: themeService.currentTheme.colors.border,
                backgroundColor: themeService.currentTheme.colors.card,
              },
            ]}
            onChangeText={message => setMessage(message)}
            placeholder={'Your Message...'}
            editable={!loading}
            multiline
          />
        </View>
        <Divider />
        <IconButton
          icon="send"
          style={{alignSelf: 'flex-end'}}
          disabled={!user || !message || loading}
          onPress={() => {
            setLoading(true);
            threadService
              .startThread({from: userId, to: user!.id}, message)
              .then(res => {
                onSend(res.data);
              })
              .finally(() => setLoading(false));
          }}
        />
      </Modal>
      <SelectUserModal
        onDismiss={() => setPickerVisible(false)}
        onPick={user => {
          setUser(user);
          setPickerVisible(false);
        }}
        visible={pickerVisible}
      />
    </>
  );
};
