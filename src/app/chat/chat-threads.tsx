import {NavigationProp} from '@react-navigation/core';
import s from '../../styles/styles';
import React, {useState} from 'react';
import {FAB} from 'react-native-paper';
import {useSelector} from 'react-redux';
import {accountRoute, chatDetailRoute} from '../app.routes';
import IconMessageView from '../components/icon-message-view/icon-message-view';
import ListingComponent from '../components/listing/listing';
import Criteria from '../models/criteria';
import {ThreadType} from '../models/types/thread.type';
import threadService from '../services/thread.service';
import {AppStateType} from '../store/state';
import {ChatListItem} from './chat-list-item';
import {NewThreadModal} from './new-thread-modal';

type P = {navigation: NavigationProp<any>};

let criteria: Criteria<ThreadType>;

export function ChatThreads(props: P) {
  const user = useSelector((state: AppStateType) => state.user);
  const [showModal, setShowModal] = useState(false);
  if (!user.id)
    return (
      <IconMessageView
        title="Login Required"
        caption="You need to login before you can start chatting!"
        icon="account-question"
        btnProps={{
          action: () => props.navigation.navigate(accountRoute.name),
          icon: 'location-enter',
          text: 'Login',
        }}
      />
    );

  if (!criteria) {
    criteria = new Criteria();
    criteria.setLimit(15);
    criteria.addRelation('to');
    criteria.addRelation('from');
  }

  const gotoChat = (thread: ThreadType) => {
    props.navigation.navigate(chatDetailRoute.name, {thread});
  };

  return (
    <>
      <ListingComponent
        container={t => (
          <ChatListItem key={t.id} thread={t} onPress={() => gotoChat(t)} />
        )}
        criteria={criteria}
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
                setShowModal(true);
              },
            }}
          />
        )}
      />
      <FAB
        style={[s.bottomRight, s.m8]}
        icon="chat-plus"
        onPress={() => setShowModal(true)}
      />
      <NewThreadModal
        visible={showModal}
        onDismiss={() => setShowModal(false)}
        userId={user.id}
        onSend={thread => gotoChat(thread)}
      />
    </>
  );
}
