import Modal from '../components/modal';
import {ModalPropType} from '@app/components/modal/modal-prop-type';
import React, {useState} from 'react';
import {Divider, IconButton, TextInput, Title} from 'react-native-paper';
import {View} from 'react-native';
import threadService from '../services/thread.service';
import {ThreadType} from '@app/models/types/thread.type';

type P = Omit<ModalPropType, 'children'> & {
  userId: number;
  onSend: (thread: ThreadType) => void;
};
export const NewThreadModal = ({userId, visible, onDismiss, onSend}: P) => {
  const [id, setId] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  return (
    <Modal visible={visible} onDismiss={onDismiss}>
      <Title style={{margin: 8, fontWeight: 'bold'}}>Start a Thread</Title>
      <Divider />
      <View style={{padding: 8}}>
        <TextInput
          label="User ID"
          mode="outlined"
          keyboardType="decimal-pad"
          onChangeText={id => setId(id)}
          disabled={loading}
        />
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
        disabled={!id || !message || loading}
        onPress={() => {
          setLoading(true);
          threadService
            .startThread({from: userId, to: parseInt(id)}, message)
            .then(res => {
              onSend(res.data);
            })
            .finally(() => setLoading(false));
        }}
      />
    </Modal>
  );
};
