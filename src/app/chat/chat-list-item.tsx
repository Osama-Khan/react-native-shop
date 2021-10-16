import moment from 'moment';
import React from 'react';
import {Image, View} from 'react-native';
import {Badge, Caption, List} from 'react-native-paper';
import {useSelector} from 'react-redux';
import s from '../../styles/styles';
import {ThreadType} from '../models/types/thread.type';
import themeService from '../services/theme.service';
import {AppStateType} from '../store/state';

type P = {onPress: () => void; thread: ThreadType; newestMessage?: string};

export function ChatListItem(props: P) {
  const {thread, newestMessage, ...p} = props;
  const userId = useSelector((state: AppStateType) => state.user.id);
  const from = userId === thread.from!.id ? thread.to! : thread.from!;
  const message = thread.latestMessage!;
  const isNew =
    (message.sender!.id !== userId && !message.seenAt) || !!newestMessage;

  return (
    <List.Item
      title={from.firstName + ' ' + from.lastName}
      titleStyle={{fontWeight: isNew ? 'bold' : 'normal'}}
      description={newestMessage || message.message}
      descriptionStyle={{fontWeight: isNew ? 'bold' : 'normal'}}
      descriptionNumberOfLines={1}
      style={{
        borderBottomWidth: 1,
        borderBottomColor: themeService.currentTheme.colors.border,
      }}
      left={() => (
        <Image
          style={[
            s.rounded,
            s.alignCenter,
            {
              backgroundColor: themeService.currentTheme.colors.card,
              width: 48,
              height: 48,
            },
          ]}
          source={{
            uri: from.profileImage,
          }}
          resizeMode="cover"
        />
      )}
      right={() => (
        <View>
          <Caption>{moment(message.createdAt).fromNow()}</Caption>
          {isNew ? <Badge>NEW</Badge> : <></>}
        </View>
      )}
      {...p}
    />
  );
}
