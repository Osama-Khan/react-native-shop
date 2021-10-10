import {NavigationProp, RouteProp} from '@react-navigation/core';
import React from 'react';
import {Image, View} from 'react-native';
import {Divider, Title} from 'react-native-paper';
import {connect} from 'react-redux';
import {AppStateType, UserState} from '@app/store/state';
import s from '../../../styles/styles';
import MessageList from './MessageList';
import messageService from '../../services/message.service';
import {MessageInput} from './MessageInput';
import colors from '../../../styles/colors';

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
      headerTitleStyle: s.ml20,
      headerTitle: () => (
        <View style={s.row}>
          <Image
            source={{uri: otherUser.profileImage, height: 32, width: 32}}
            style={{position: 'relative', right: 24}}
          />
          <Title
            style={{
              position: 'relative',
              right: 16,
              color: colors.light,
            }}>
            {otherUser.firstName}
          </Title>
        </View>
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
