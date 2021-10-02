import {NavigationProp} from '@react-navigation/core';
import React from 'react';
import {useSelector} from 'react-redux';
import {accountRoute, chatDetailRoute} from '../app.routes';
import IconMessageView from '../components/icon-message-view/icon-message-view';
import ListingComponent from '../components/listing/listing';
import Criteria from '../models/criteria';
import {ThreadType} from '../models/types/thread.type';
import threadService from '../services/thread.service';
import {AppStateType} from '../store/state';
import {ChatListItem} from './chat-list-item';

type P = {navigation: NavigationProp<any>};

let criteria: Criteria<ThreadType>;

export function ChatThreads(props: P) {
  const user = useSelector((state: AppStateType) => state.user);
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

  return (
    <ListingComponent
      container={t => (
        <ChatListItem
          key={t.id}
          thread={t}
          onPress={() => {
            props.navigation.navigate(chatDetailRoute.name, {thread: t});
          }}
        />
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
              //TODO: Add new chat action
            },
          }}
        />
      )}
    />
  );
}
