import {NavigationProp, RouteProp} from '@react-navigation/core';
import React from 'react';
import {Image, TextInput, View} from 'react-native';
import {Divider, IconButton, Surface} from 'react-native-paper';
import {connect} from 'react-redux';
import themeService from '../../services/theme.service';
import {AppStateType, UserState} from '@app/store/state';
import s from '../../../styles/styles';
import {MessageList} from './MessageList';
import messageService from '../../services/message.service';
import {UserType} from '@app/models/types/user.types';
import {MessageInput} from './MessageInput';

type P = {
  navigation: NavigationProp<any>;
  route: RouteProp<any>;
  readonly user: UserState;
};

type S = {
  message: string;
};

class Chat extends React.Component<P, S> {
  state: S = {message: ''};

  constructor(props: P) {
    super(props);
    const {user, route, navigation} = this.props;
    const thread = route.params!.thread;
    const otherUser = thread.from!.id === user.id ? thread.to! : thread.from!;
    navigation.setOptions({
      headerTitle: otherUser.firstName,
      headerTitleStyle: s.ml20,
      headerBackground: () => (
        <>
          <View
            style={{
              width: '100%',
              height: '100%',
              backgroundColor: themeService.currentTheme.colors.card,
              position: 'absolute',
            }}></View>
          <Image
            source={{uri: otherUser.profileImage, height: 32, width: 32}}
            style={{marginLeft: 48, marginVertical: 12}}
          />
        </>
      ),
    });
  }

  render() {
    const thread = this.props.route.params!.thread;
    return (
      <View style={s.flex}>
        <View style={s.flex}>
          <MessageList threadId={thread.id} />
        </View>
        <Divider />
        <MessageInput
          onSend={message => messageService.sendMessage(message, thread.id)}
        />
      </View>
    );
  }
}

function mapStateToProps(state: AppStateType) {
  return {user: state.user};
}

export default connect(mapStateToProps)(Chat);
