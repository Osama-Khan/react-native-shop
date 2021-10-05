import {NavigationProp} from '@react-navigation/core';
import s from '../../styles/styles';
import React from 'react';
import {FAB} from 'react-native-paper';
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

type P = {navigation: NavigationProp<any>; readonly user: UserState};
type S = {modalShown: boolean; update: number};

class ChatThreads extends React.Component<P, S> {
  criteria = new Criteria<ThreadType>();
  state: S = {modalShown: false, update: 0};

  constructor(props: P) {
    super(props);
    this.criteria.setLimit(15);
    this.criteria.addRelation('to');
    this.criteria.addRelation('from');
    this.criteria.setOrderBy('createdAt');
    this.criteria.setOrderDir('DESC');
  }

  render() {
    const {navigation, user} = this.props;
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
        <ListingComponent
          container={t => (
            <ChatListItem key={t.id} thread={t} onPress={() => gotoChat(t)} />
          )}
          criteria={this.criteria}
          fetchMethod={c => threadService.fetchThreadsOf(user.id!, c)}
          noResultsView={() => (
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
          )}
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
}

const mapStateToProps = (state: AppStateType) => {
  return {user: state.user};
};
const Connected = connect(mapStateToProps)(ChatThreads);

export {Connected as ChatThreads};
