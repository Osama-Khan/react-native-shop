import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {ActivityIndicator, Caption, Text, Title} from 'react-native-paper';
import {useSelector} from 'react-redux';
import Criteria from '../../models/criteria';
import {MessageType} from '@app/models/types/message.type';
import messageService from '../../services/message.service';
import {AppStateType} from '@app/store/state';
import {View} from 'react-native-animatable';
import themeService from '../../services/theme.service';
import s from '../../../styles/styles';
import {getTime} from '../helpers';

type P = {threadId: number};

export function MessageList({threadId}: P) {
  const [messages, setMessages] = useState<MessageType[]>();

  const newMessages = useSelector<AppStateType, Partial<MessageType>[]>(state =>
    state.message.newMessages
      .filter(m => m.threadId === threadId)
      .map((m, i) => {
        const newMsg = m as any;
        newMsg.id = 'new-' + i;
        newMsg.createdAt = newMsg.time;
        return newMsg;
      }),
  );
  useEffect(() => {
    const criteria = new Criteria<MessageType>();
    criteria.setLimit(20);
    criteria.addFilter('thread', threadId);
    criteria.addRelation('sender');
    messageService.fetchMessages(criteria).then(res => {
      setMessages(res.data.data.reverse());
    });
  }, []);

  return messages ? (
    messages.length > 0 ? (
      <FlatList
        inverted={true}
        data={[...newMessages.reverse(), ...messages]}
        renderItem={m => (
          <Message key={m.item.id} message={m.item} />
        )}></FlatList>
    ) : (
      <NoMessages />
    )
  ) : (
    <LoadingMessages />
  );
}

const Message = ({message}: any) => {
  const userId = useSelector((state: AppStateType) => state.user.id);
  const senderId = message.sender.id || message.sender;
  const isOwn = senderId === userId;
  return (
    <View
      style={[styles.message, isOwn ? styles.ownMessage : styles.otherMessage]}>
      <View
        style={[
          styles.messageSurface,
          isOwn ? styles.ownMessageSurface : styles.otherMessageSurface,
        ]}>
        <Text style={{marginVertical: 8}}>{message.message}</Text>
        <Caption style={{marginLeft: 'auto', marginTop: 'auto'}}>
          {getTime(new Date(message.createdAt))}
        </Caption>
      </View>
    </View>
  );
};

const NoMessages = () => (
  <View style={[s.flex, s.center]}>
    <Title>Start a Conversation!</Title>
    <Caption>Send a message and start a conversation.</Caption>
  </View>
);
const LoadingMessages = () => (
  <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
    <ActivityIndicator size="large" />
  </View>
);

const styles = StyleSheet.create({
  message: {
    flexDirection: 'row',
  },
  messageSurface: {
    flexDirection: 'row',
    paddingHorizontal: 8,
    minWidth: '30%',
  },
  ownMessage: {
    justifyContent: 'flex-end',
    paddingLeft: '20%',
  },
  ownMessageSurface: {
    backgroundColor: themeService.currentTheme.colors.primary,
    ...s.rounded,
    margin: 4,
  },
  otherMessage: {
    justifyContent: 'flex-start',
    paddingRight: '20%',
  },
  otherMessageSurface: {
    backgroundColor: themeService.currentTheme.colors.card,
    ...s.rounded,
    margin: 4,
  },
});
