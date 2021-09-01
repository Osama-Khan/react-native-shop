import {NavigationProp} from '@react-navigation/native';
import React from 'react';
import {ToastAndroid, View} from 'react-native';
import {
  Title,
  Text,
  Divider,
  TextInput,
  Switch,
  Button,
  FAB,
  Surface,
  Card,
} from 'react-native-paper';
import {connect} from 'react-redux';
import colors from '../../styles/colors';
import s from '../../styles/styles';
import uiService from '../services/ui.service';
import userService from '../services/user.service';
import userActions from '../store/actions/user.actions';
import UserState from '../store/state/user-state';
import {settingsRoute} from './account.routes';

type PropType = {
  dispatch: any;
  navigation: NavigationProp<any>;
};
type StateType = {
  username: string;
  password: string;
  remember: boolean;
  loading: boolean;
};

class Login extends React.Component<PropType, StateType> {
  passwordRef: any;

  constructor(props: PropType) {
    super(props);
    this.state = {username: '', password: '', remember: false, loading: false};
    this.passwordRef = React.createRef();
  }

  render() {
    return (
      <View style={[s.m8, s.flex, {justifyContent: 'center'}]}>
        <Card style={s.p8} mode="outlined">
          <Title style={s.textCenter}>Login</Title>
          <Text style={[s.textCenter, s.textMuted]}>
            Please enter your account details.
          </Text>
          <Divider style={s.mt8} />
          <TextInput
            label="Username"
            style={s.mt8}
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
            style={s.mt8}
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
          <View style={[s.m4, s.row]}>
            <Text style={[s.m4, s.mlAuto]}>Remember me</Text>
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
          <Button style={s.mlAuto}>Forgot Password?</Button>
          <Button
            mode="contained"
            loading={this.state.loading}
            disabled={
              this.state.loading || !this.state.username || !this.state.password
            }
            style={s.mt8}
            color={colors.primary}
            onPress={this.login}>
            Login
          </Button>
        </Card>
        <FAB
          icon="cog"
          style={s.bottomRight}
          onPress={() => this.props.navigation.navigate(settingsRoute.name)}
        />
      </View>
    );
  }
  login = () => {
    this.setState({...this.state, loading: true});
    const {username, password, remember} = this.state;
    if (!username || !password) {
      ToastAndroid.show('Please fill in both fields.', ToastAndroid.SHORT);
      return;
    }

    userService
      .login(username, password, remember)
      .then(res => {
        const user = UserState.fromJson(res.data);
        this.setState({...this.state, loading: false});
        this.props.dispatch(userActions.setUser(user));
      })
      .catch(e => {
        const rc = e.response.status;
        uiService.toast(
          rc === 401
            ? 'Username and password combination is not valid!'
            : "We couldn't log you in!",
        );
        this.setState({...this.state, loading: false});
      });
  };
}

export default connect()(Login);
