import {NavigationProp} from '@react-navigation/core';
import s from '../../styles/styles';
import React from 'react';
import {ActivityIndicator, FAB} from 'react-native-paper';
import {accountRoute, chatDetailRoute} from '../app.routes';
import IconMessageView from '../components/icon-message-view/icon-message-view';
import ListingComponent from '../components/listing/listing';
import Criteria from '../models/criteria';
import {ThreadType} from '../models/types/thread.type';
import threadService from '../services/thread.service';
import {AppStateType} from '../store/state';
import {ChatListItem} from './chat-list-item';
import {NewThreadModal} from './new-thread-modal';
import {connect} from 'react-redux';
import {UserState} from '@app/store/state';
import {NewMessageType} from '@app/store/state/message-state';
import {FlatList} from 'react-native-gesture-handler';
import {RefreshControl, ToastAndroid} from 'react-native';

type P = {
  navigation: NavigationProp<any>;
  readonly user: UserState;
  readonly messages: NewMessageType[];
};
type S = {modalShown: boolean; data?: ThreadType[]; loading: boolean};

class ChatThreads extends React.Component<P, S> {
  criteria = new Criteria<ThreadType>();
  state: S = {modalShown: false, data: undefined, loading: false};

  constructor(props: P) {
    super(props);
    this.criteria.setLimit(99999);
    this.criteria.addRelation('to');
    this.criteria.addRelation('from');
    this.criteria.setOrderBy('updatedAt');
    this.criteria.setOrderDir('DESC');
  }

  componentDidMount() {
    const {navigation, user} = this.props;
    navigation.addListener('focus', () => {
      if (!user.id) return;
      if (!this.state.data) {
        this.loadData();
      }
    });
  }

  render() {
    const {navigation, user, messages} = this.props;
    if (!user.id)
      return (
        <IconMessageView
          title="Login Required"
          caption="You need to login before you can start chatting!"
          icon="account-question"
          btnProps={{
            action: () => navigation.navigate(accountRoute.name),
            icon: 'location-enter',
            text: 'Login',
          }}
        />
      );

    const gotoChat = (thread: ThreadType) => {
      navigation.navigate(chatDetailRoute.name, {thread});
    };

    return (
      <>
        <FlatList
          data={this.state.data}
          renderItem={({item: t}) => (
            <ChatListItem
              key={t.id}
              newestMessage={
                messages.find(
                  m => t.from!.id === m.sender.id || t.to!.id === m.sender.id,
                )?.message
              }
              thread={t}
              onPress={() => gotoChat(t)}
            />
          )}
          ListEmptyComponent={() =>
            this.state.loading ? (
              <ActivityIndicator style={[s.flex, s.center]} />
            ) : (
              <IconMessageView
                title="No Threads"
                caption="You don't have any threads active"
                icon="chat-processing"
                btnProps={{
                  icon: 'message-plus',
                  text: 'Start a Chat',
                  action: () => {
                    this.setState({...this.state, modalShown: true});
                  },
                }}
              />
            )
          }
          refreshControl={
            <RefreshControl
              refreshing={this.state.loading && !!this.state.data}
              onRefresh={this.loadData}
            />
          }
          contentContainerStyle={s.flex}
        />
        <FAB
          style={[s.bottomRight, s.m8]}
          icon="chat-plus"
          onPress={() => this.setState({...this.state, modalShown: true})}
        />
        <NewThreadModal
          visible={this.state.modalShown}
          onDismiss={() => this.setState({...this.state, modalShown: false})}
          userId={user.id}
          onSend={thread => gotoChat(thread)}
        />
      </>
    );
  }

  loadData = () => {
    this.setState({...this.state, loading: true});
    threadService
      .fetchThreadsOf(this.props.user.id!, this.criteria)
      .then(res => {
        this.setState({...this.state, data: res.data.data, loading: false});
      })
      .catch(e => {
        ToastAndroid.show('Could not load your chats!', ToastAndroid.SHORT);
        this.setState({...this.state, loading: false});
      });
  };
}

const mapStateToProps = (state: AppStateType) => {
  const user = state.user;
  const messages = state.message.newMessages.filter(
    m => m.sender.id !== user.id,
  );
  return {user, messages};
};
const Connected = connect(mapStateToProps)(ChatThreads);

export {Connected as ChatThreads};
