import Modal from '../components/modal';
import {ModalPropType} from '@app/components/modal/modal-prop-type';
import React, {useState} from 'react';
import {
  Divider,
  IconButton,
  TextInput,
  Card,
  Title,
  Text,
} from 'react-native-paper';
import {View} from 'react-native';
import threadService from '../services/thread.service';
import {ThreadType} from '@app/models/types/thread.type';
import {UserType} from '@app/models/types/user.types';
import {SelectUserModal} from './select-user-modal';

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
        <Title style={{margin: 8, fontWeight: 'bold'}}>New Chat</Title>
        <Divider />
        <View style={{padding: 8}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text>Send To: </Text>
            <Card style={{padding: 8}} onPress={() => setPickerVisible(true)}>
              <Text>{user ? user.username : 'Choose User'}</Text>
            </Card>
          </View>
          <TextInput
            label="Message"
            mode="outlined"
            multiline
            onChangeText={message => setMessage(message)}
            disabled={loading}
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
