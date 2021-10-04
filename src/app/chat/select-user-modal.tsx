import React, {useEffect, useState} from 'react';
import {Caption, Divider, List, Searchbar, Title} from 'react-native-paper';
import {ActivityIndicator, Image, View} from 'react-native';
import {BottomUpModal} from '../components/modal';
import {UserType} from '@app/models/types/user.types';
import userService from '../services/user.service';
import Criteria from '../models/criteria';
import s from '../../styles/styles';

type P = {
  visible: boolean;
  onPick: (user: UserType) => void;
  onDismiss: () => void;
};

const criteria = new Criteria<UserType>();

export const SelectUserModal = ({visible, onDismiss, onPick}: P) => {
  const [username, setUsername] = useState('');
  const [users, setUsers] = useState<UserType[]>();
  useEffect(() => {
    if (username) {
      setUsers(undefined);
      criteria.addFilter('username', '%' + username + '%', 'like');
      userService.getUsers(criteria).then(res => {
        setUsers(res.data.data);
      });
    }
  }, [username]);

  return (
    <BottomUpModal visible={visible} onDismiss={onDismiss}>
      <Title style={[s.m8, s.textBold]}>Choose User</Title>
      <Divider />
      <View style={s.p8}>
        <Searchbar
          placeholder="Username..."
          value={username}
          onChangeText={text => setUsername(text)}
        />
      </View>
      <Divider />
      {username ? (
        users ? (
          users.map(u => (
            <List.Item
              key={u.id}
              style={{flexDirection: 'row', alignItems: 'center', padding: 8}}
              onPress={() => {
                onPick(u);
              }}
              left={() => (
                <Image
                  source={{uri: u.profileImage, width: 48, height: 48}}
                  style={[s.roundedFull, s.alignCenter]}
                />
              )}
              title={u.username}
              description={`${u.firstName} ${u.lastName}`}
            />
          ))
        ) : (
          <ActivityIndicator />
        )
      ) : (
        <Caption style={[s.m8, s.textCenter]}>
          Start typing to find users...
        </Caption>
      )}
    </BottomUpModal>
  );
};
