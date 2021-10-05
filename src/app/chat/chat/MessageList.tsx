import React from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {ActivityIndicator, Caption, Text, Title} from 'react-native-paper';
import {connect} from 'react-redux';
import Criteria from '../../models/criteria';
import {MessageType} from '@app/models/types/message.type';
import messageService from '../../services/message.service';
import {AppStateType} from '@app/store/state';
import {View} from 'react-native-animatable';
import themeService from '../../services/theme.service';
import s from '../../../styles/styles';
import {getTime} from '../helpers';
import {NewMessageType} from '@app/store/state/message-state';
import messageActions from '../../store/actions/message.actions';

type P = {
  threadId: number;
  readonly userId?: number;
  readonly newMessages: NewMessageType[];
  readonly dispatch: (action: any) => void;
};
type S = {messages?: Partial<MessageType[]>};

class MessageList extends React.Component<P, S> {
  state: S = {};
  criteria = this.initCriteria();

  initCriteria() {
    const criteria = new Criteria<MessageType>();
    criteria.setLimit(20);
    criteria.addFilter('thread', this.props.threadId);
    criteria.addRelation('sender');
    criteria.setOrderBy('createdAt');
    criteria.setOrderDir('DESC');
    return criteria;
  }

  componentDidMount() {
    messageService.fetchMessages(this.criteria).then(res => {
      if (this.props.newMessages.length > 0) {
        this.seenMessages();
      }
      this.setState({...this.state, messages: res.data.data});
    });
  }

  render() {
    const messages = this.state.messages;
    return messages ? (
      messages.length > 0 ? (
        <FlatList
          inverted={true}
          data={[...this.props.newMessages.reverse(), ...messages]}
          renderItem={m => <this.Message key={m.item!.id} message={m.item} />}
          onScroll={e => {
            if (
              e.nativeEvent.contentOffset.y === 0 &&
              this.props.newMessages.length > 0
            ) {
              this.seenMessages();
            }
          }}
        />
      ) : (
        <this.NoMessages />
      )
    ) : (
      <this.LoadingMessages />
    );
  }

  Message = ({message}: any) => {
    const userId = this.props.userId;
    const senderId = message.sender.id;
    const isOwn = senderId === userId;
    return (
      <View
        style={[
          styles.message,
          isOwn ? styles.ownMessage : styles.otherMessage,
        ]}>
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

  NoMessages = () => (
    <View style={[s.flex, s.center]}>
      <Title>Start a Conversation!</Title>
      <Caption>Send a message and start a conversation.</Caption>
    </View>
  );
  LoadingMessages = () => (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <ActivityIndicator size="large" />
    </View>
  );

  seenMessages = () =>
    this.props.dispatch(
      messageActions.seenMessage(this.props.newMessages.map(m => m.id)),
    );
}

const mapStateToProps = (state: AppStateType, props: Partial<P>) => {
  const userId = state.user.id;
  const threadId = props.threadId;
  const newMessages = state.message.newMessages.filter(
    m => m.thread.id === threadId,
  );
  return {userId, newMessages};
};

export default connect(mapStateToProps)(MessageList);

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
