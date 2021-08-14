import React from 'react';
import {StyleSheet, ToastAndroid, View} from 'react-native';
import {
  Title,
  Text,
  Divider,
  TextInput,
  Switch,
  Button,
} from 'react-native-paper';
import colors from '../../styles/colors';
import defaultStyles from '../../styles/styles';
import userService from '../services/user.service';
import appState from '../state/state';

type PropType = {onLogin: () => void};
type StateType = {
  username: string;
  password: string;
  remember: boolean;
  loading: boolean;
};

export default class extends React.Component<PropType, StateType> {
  passwordRef: any;

  constructor(props: PropType) {
    super(props);
    this.state = {username: '', password: '', remember: false, loading: false};
    this.passwordRef = React.createRef();
  }

  render() {
    return (
      <View style={styles.loginForm}>
        <Title style={styles.textCenter}>Login</Title>
        <Text style={[styles.textCenter, styles.textMuted]}>
          Please enter your account details.
        </Text>
        <Divider style={styles.mt8} />
        <TextInput
          label="Username"
          style={styles.mt8}
          value={this.state.username}
          mode="outlined"
          onSubmitEditing={() => this.passwordRef.current.focus()}
          onChangeText={username =>
            this.setState({
              ...this.state,
              username,
            })
          }
        />
        <TextInput
          label="Password"
          style={styles.mt8}
          value={this.state.password}
          mode="outlined"
          secureTextEntry={true}
          onSubmitEditing={this.login}
          ref={this.passwordRef}
          onChangeText={password =>
            this.setState({
              ...this.state,
              password,
            })
          }
        />
        <View style={[styles.m4, styles.row]}>
          <Text style={[styles.m4, styles.mlAuto]}>Remember me</Text>
          <Switch
            value={this.state.remember}
            onValueChange={remember =>
              this.setState({
                ...this.state,
                remember,
              })
            }
          />
        </View>
        <Button style={styles.mlAuto}>Forgot Password?</Button>
        <Button
          mode="contained"
          loading={this.state.loading}
          disabled={
            this.state.loading || !this.state.username || !this.state.password
          }
          style={styles.mt8}
          color={colors.primary}
          onPress={this.login}>
          Login
        </Button>
      </View>
    );
  }
  login = () => {
    this.setState({...this.state, loading: true});
    const {username, password} = this.state;
    if (!username || !password) {
      ToastAndroid.show('Please fill in both fields.', ToastAndroid.SHORT);
      return;
    }

    userService.login(username, password).then(u => {
      appState.user = u.data;
      this.setState({...this.state, loading: false});
      this.props.onLogin();
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
});
