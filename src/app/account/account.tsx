import React from 'react';
import {ScrollView, StyleSheet, ToastAndroid, View, Image} from 'react-native';
import {
  Badge,
  Button,
  Divider,
  List,
  Text,
  TextInput,
  Title,
} from 'react-native-paper';
import colors from '../../styles/colors';
import defaultStyles from '../../styles/styles';
import userService from '../services/user.service';
import state from '../state/state';
import UserState from '../state/user-state';
import {createRef} from 'react';

export default class Account extends React.Component<any, any> {
  passwordRef: any;

  constructor(props: any) {
    super(props);
    this.state = {loginData: {username: '', password: ''}};
    this.passwordRef = createRef();
  }

  render() {
    return state.user.token ? <this.Profile /> : <this.LoginForm />;
  }

  Profile = () => (
    <ScrollView>
      <View style={[styles.m4, styles.row]}>
        <Image
          source={{uri: state.user.profileImage}}
          resizeMode="contain"
          style={styles.profileImage}
        />
        <View style={{width: '70%', marginLeft: 'auto'}}>
          <Title>
            {state.user.firstName} {state.user.lastName}
          </Title>
          <Text style={styles.textMuted}>{'@' + state.user.username}</Text>
          <View style={styles.row}>
            <Badge style={[styles.mt8, {backgroundColor: colors.primary}]}>
              {state.user.roles && state.user.roles[0].name}
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
      {state.user.roles?.some(r => r.name === 'admin') ? (
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
        onPress={() => {
          state.user = new UserState();
          this.setState({...this.state});
        }}
        left={() => <List.Icon icon="power" color={colors.red} />}
      />
    </ScrollView>
  );

  LoginForm = () => (
    <View style={styles.loginForm}>
      <Title style={styles.textCenter}>Login</Title>
      <Text style={[styles.textCenter, styles.textMuted]}>
        Please enter your account details.
      </Text>
      <Divider style={styles.mt8} />
      <TextInput
        label="Username"
        style={styles.mt8}
        value={this.state.loginData.username}
        mode="outlined"
        onSubmitEditing={() => this.passwordRef.current.focus()}
        onChangeText={username =>
          this.setState({
            ...this.state,
            loginData: {...this.state.loginData, username},
          })
        }
      />
      <TextInput
        label="Password"
        style={styles.mt8}
        value={this.state.loginData.password}
        mode="outlined"
        secureTextEntry={true}
        onSubmitEditing={this.login}
        ref={this.passwordRef}
        onChangeText={password =>
          this.setState({
            ...this.state,
            loginData: {...this.state.loginData, password},
          })
        }
      />
      <Button style={styles.mlAuto}>Forgot Password?</Button>
      <Button
        mode="contained"
        style={styles.mt8}
        color={colors.primary}
        onPress={this.login}>
        Login
      </Button>
    </View>
  );

  login = () => {
    const {username, password} = this.state.loginData;
    if (!username || !password) {
      ToastAndroid.show('Please fill in both fields.', ToastAndroid.SHORT);
    }

    userService.login(username, password).then(u => {
      state.user = u.data;
      this.setState({...this.state});
    });
  };
}

const styles = StyleSheet.create({
  ...defaultStyles,
  loginForm: {
    margin: 8,
    flex: 1,
    justifyContent: 'center',
  },
  profileImage: {
    width: '25%',
    minHeight: 92,
    height: 'auto',
  },
});
