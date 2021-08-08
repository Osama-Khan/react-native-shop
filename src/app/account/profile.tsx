import {NavigationProp} from '@react-navigation/native';
import React from 'react';
import {ScrollView, Image, View} from 'react-native';
import {Title, Text, Badge, Divider, List} from 'react-native-paper';
import colors from '../../styles/colors';
import appStyles from '../../styles/styles';
import appState from '../state/state';

type PropType = {onLogout: () => void; navigation: NavigationProp<any>};
export default ({onLogout, navigation}: PropType) => {
  return (
    <ScrollView>
      <View style={[styles.m4, styles.row]}>
        <Image
          source={{uri: appState.user.profileImage}}
          resizeMode="contain"
          style={styles.profileImage}
        />
        <View style={styles.headerContent}>
          <Title>
            {appState.user.firstName} {appState.user.lastName}
          </Title>
          <Text style={styles.textMuted}>{'@' + appState.user.username}</Text>
          <View style={styles.row}>
            <Badge style={[styles.mt8, {backgroundColor: colors.primary}]}>
              {appState.user.roles && appState.user.roles[0].name}
            </Badge>
          </View>
        </View>
      </View>
      <Divider />
      <List.Section title="Overview">
        <List.Item
          title="Listings"
          description="Manage your products"
          onPress={() => {}}
          left={() => <List.Icon icon="clipboard-list" />}
        />
        <List.Item
          title="Orders"
          description="View your orders"
          onPress={() => {}}
          left={() => <List.Icon icon="receipt" />}
        />
        <List.Item
          title="Favorites"
          description="See your favorite products"
          onPress={() => {}}
          left={() => <List.Icon icon="star" />}
        />
      </List.Section>
      <Divider />
      <List.Section title="Management">
        <List.Item
          title="Account"
          description="Update your account information"
          onPress={() => {}}
          left={() => <List.Icon icon="account-edit" />}
        />
        <List.Item
          title="Addresses"
          description="Manage your addresses"
          onPress={() => {}}
          left={() => <List.Icon icon="home-edit" />}
        />
        <Divider />
      </List.Section>
      {appState.user.roles?.some(r => r.name === 'admin') ? (
        <List.Section title="Admin Panel">
          <List.Item
            title="Users"
            description="Manage Users"
            onPress={() => {}}
            left={() => <List.Icon icon="account-group" />}
          />
          <List.Item
            title="Products"
            description="Manage Products"
            onPress={() => {}}
            left={() => <List.Icon icon="archive" />}
          />
          <List.Item
            title="Categories"
            description="Manage Categories"
            onPress={() => {}}
            left={() => <List.Icon icon="shape" />}
          />
          <List.Item
            title="Orders"
            description="Manage Orders"
            onPress={() => {}}
            left={() => <List.Icon icon="receipt" />}
          />
        </List.Section>
      ) : (
        <></>
      )}
      <Divider />
      <List.Item
        title="Logout"
        titleStyle={{color: colors.red}}
        onPress={onLogout}
        left={() => <List.Icon icon="power" color={colors.red} />}
      />
    </ScrollView>
  );
};

const styles = {
  ...appStyles,
  profileImage: {
    width: '25%',
    minHeight: 92,
    height: 'auto',
  },
  headerContent: {
    width: '70%',
    marginLeft: 'auto',
  },
};
